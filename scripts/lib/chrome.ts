/**
 * A tiny headless-Chrome driver over the DevTools protocol.
 * Uses the Chrome you already have installed, so there's no browser download.
 * Set CHROME_PATH to point somewhere else.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { mkdtempSync, rmSync, existsSync } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const DEFAULT_PATHS: Record<string, string[]> = {
  darwin: ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/Applications/Chromium.app/Contents/MacOS/Chromium'],
  linux: ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'],
  win32: ['C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'],
};

function chromePath(): string {
  const found = process.env.CHROME_PATH ?? DEFAULT_PATHS[process.platform]?.find((p) => existsSync(p));
  if (!found) throw new Error('Chrome not found. Set CHROME_PATH to your Chrome or Chromium binary.');
  return found;
}

export interface Viewport {
  width: number;
  height: number;
  scale?: number;
  mobile?: boolean;
}

const IPHONE_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

export class Browser {
  private proc: ChildProcess;
  private origin: string;
  private profile: string;

  private constructor(proc: ChildProcess, origin: string, profile: string) {
    this.proc = proc;
    this.origin = origin;
    this.profile = profile;
  }

  static async launch(): Promise<Browser> {
    const profile = mkdtempSync(path.join(os.tmpdir(), 'jnot-chrome-'));
    const proc = spawn(chromePath(), [
      '--headless',
      '--remote-debugging-port=0',
      `--user-data-dir=${profile}`,
      '--hide-scrollbars',
      '--no-first-run',
      '--no-default-browser-check',
      'about:blank',
    ]);
    const ws = await new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Chrome did not start in time')), 20_000);
      proc.stderr!.on('data', (chunk: Buffer) => {
        const match = String(chunk).match(/ws:\/\/[^\s]+/);
        if (match) {
          clearTimeout(timer);
          resolve(match[0]);
        }
      });
      proc.on('exit', (code) => reject(new Error(`Chrome exited (${code})`)));
    });
    return new Browser(proc, new URL(ws).origin.replace('ws:', 'http:'), profile);
  }

  async newPage(): Promise<Page> {
    const res = await fetch(`${this.origin}/json/new?about:blank`, { method: 'PUT' });
    const { webSocketDebuggerUrl } = (await res.json()) as { webSocketDebuggerUrl: string };
    return Page.connect(webSocketDebuggerUrl);
  }

  close() {
    this.proc.kill();
    try {
      rmSync(this.profile, { recursive: true, force: true });
    } catch {
      /* Chrome may still hold files for a moment; the OS cleans tmp */
    }
  }
}

type Pending = { resolve: (v: any) => void; reject: (e: Error) => void };

export class Page {
  private id = 0;
  private pending = new Map<number, Pending>();
  private listeners = new Map<string, Array<(params: any) => void>>();
  private ws: WebSocket;

  private constructor(ws: WebSocket) {
    this.ws = ws;
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(String(ev.data));
      if (msg.id && this.pending.has(msg.id)) {
        const p = this.pending.get(msg.id)!;
        this.pending.delete(msg.id);
        msg.error ? p.reject(new Error(msg.error.message)) : p.resolve(msg.result);
      } else if (msg.method) {
        this.listeners.get(msg.method)?.forEach((fn) => fn(msg.params));
      }
    });
  }

  static connect(url: string): Promise<Page> {
    const ws = new WebSocket(url);
    return new Promise((resolve, reject) => {
      ws.addEventListener('open', () => resolve(new Page(ws)));
      ws.addEventListener('error', () => reject(new Error('Could not connect to Chrome')));
    });
  }

  send<T = any>(method: string, params: Record<string, unknown> = {}): Promise<T> {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  once(event: string, timeout = 30_000): Promise<any> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for ${event}`)), timeout);
      const list = this.listeners.get(event) ?? [];
      const fn = (params: any) => {
        clearTimeout(timer);
        this.listeners.set(event, (this.listeners.get(event) ?? []).filter((f) => f !== fn));
        resolve(params);
      };
      this.listeners.set(event, [...list, fn]);
    });
  }

  async goto(url: string, viewport: Viewport, settleMs = 1500) {
    await this.send('Page.enable');
    await this.send('Emulation.setDeviceMetricsOverride', {
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.scale ?? 1,
      mobile: viewport.mobile ?? false,
    });
    if (viewport.mobile) {
      await this.send('Emulation.setUserAgentOverride', { userAgent: IPHONE_UA });
      await this.send('Emulation.setTouchEmulationEnabled', { enabled: true });
    }
    const loaded = this.once('Page.loadEventFired');
    await this.send('Page.navigate', { url });
    await loaded;
    await new Promise((r) => setTimeout(r, settleMs));
  }

  async eval<T = unknown>(expression: string): Promise<T> {
    const { result } = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    return result.value as T;
  }

  /** Scrolls to the bottom and back so lazy-loaded images are fetched. */
  async loadLazyContent() {
    await this.eval(`(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight / 2) {
        scrollTo(0, y); await new Promise(r => setTimeout(r, 120));
      }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 400));
    })()`);
  }

  async screenshot(opts: { fullPage?: boolean } = {}): Promise<Buffer> {
    let clip: Record<string, number> | undefined;
    if (opts.fullPage) {
      const { cssContentSize } = await this.send('Page.getLayoutMetrics');
      clip = { x: 0, y: 0, width: cssContentSize.width, height: cssContentSize.height, scale: 1 };
    }
    const { data } = await this.send<{ data: string }>('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: Boolean(opts.fullPage),
      ...(clip ? { clip } : {}),
    });
    return Buffer.from(data, 'base64');
  }

  close() {
    this.ws.close();
  }
}
