/**
 * Full-page screenshots of the built site at the brief's three widths.
 *
 *   npm run build && npm run viewports                 home page
 *   npm run viewports -- /work/brewery/                any page
 *
 * Starts `astro preview`, captures 375 / 768 / 1440, and writes PNGs to .shots/.
 */
import { spawn, spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { Browser } from './lib/chrome.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, '.shots');
const PORT = 4329;
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ['/'];
const widths = [375, 768, 1440];

// Astro runs one preview server at a time; stop any old one so ours uses PORT.
const astro = (...args: string[]) => spawnSync('npx', ['astro', 'preview', ...args], { cwd: ROOT, stdio: 'ignore' });
astro('stop');
spawn('npx', ['astro', 'preview', '--port', String(PORT)], { cwd: ROOT, stdio: 'ignore' }).unref();
const base = `http://localhost:${PORT}`;
for (let i = 0; ; i++) {
  try {
    await fetch(base);
    break;
  } catch {
    if (i > 50) throw new Error('astro preview did not start (did you run npm run build?)');
    await new Promise((r) => setTimeout(r, 200));
  }
}

mkdirSync(OUT, { recursive: true });
const browser = await Browser.launch();
try {
  for (const p of pages) {
    for (const width of widths) {
      const page = await browser.newPage();
      await page.goto(base + p, { width, height: width < 700 ? 812 : 900, scale: 1, mobile: width < 700 }, 1800);
      await page.loadLazyContent();
      // full-page capture repositions fixed/sticky elements; pin them to the top instead
      await page.eval(`(() => {
        const s = document.createElement('style');
        s.textContent = '.site-header{position:absolute!important;inset:0 0 auto}.skip{display:none!important}body::before{position:absolute!important}';
        document.head.append(s);
      })()`);
      const png = await page.screenshot({ fullPage: true });
      page.close();
      const name = `${p.replace(/\W+/g, '-').replace(/^-|-$/g, '') || 'home'}-${width}.png`;
      writeFileSync(path.join(OUT, name), png);
      console.log(`✓ ${p} @ ${width}px → .shots/${name}`);
    }
  }
} finally {
  browser.close();
  astro('stop');
}
