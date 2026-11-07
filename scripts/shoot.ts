/**
 * Captures desktop and phone screenshots of a project's live site.
 *
 *   npm run shoot -- coffee-roaster                 uses `url` from the project's index.md
 *   npm run shoot -- coffee-roaster https://…       or pass the URL
 *   npm run shoot -- --all                          every project with a url
 *
 * Writes src/content/projects/<id>/desktop.webp (1440×900 at 2x, stored 1600 wide)
 * and mobile.webp (390×844 at 2x). Always look at the result: cookie banners and
 * pop-ups get captured too. Re-run with SETTLE=4000 if a site animates in slowly.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { Browser, type Viewport } from './lib/chrome.ts';

const ROOT = path.resolve(import.meta.dirname, '..');
const PROJECTS = path.join(ROOT, 'src/content/projects');

const shots: Array<{ kind: 'desktop' | 'mobile'; viewport: Viewport; width: number }> = [
  { kind: 'desktop', viewport: { width: 1440, height: 900, scale: 2 }, width: 1600 },
  { kind: 'mobile', viewport: { width: 390, height: 844, scale: 2, mobile: true }, width: 780 },
];

function urlFor(id: string): string | undefined {
  const file = path.join(PROJECTS, id, 'index.md');
  if (!existsSync(file)) throw new Error(`No project called "${id}" (looked for ${file})`);
  return readFileSync(file, 'utf8').match(/^url:\s*(\S+)/m)?.[1];
}

const args = process.argv.slice(2);
let jobs: Array<{ id: string; url: string }>;
if (args[0] === '--all') {
  jobs = readdirSync(PROJECTS)
    .map((id) => ({ id, url: urlFor(id) }))
    .filter((j): j is { id: string; url: string } => Boolean(j.url));
} else if (args[0]) {
  const url = args[1] ?? urlFor(args[0]);
  if (!url) {
    console.error(`"${args[0]}" has no url yet. Add one to its index.md, or pass it: npm run shoot -- ${args[0]} https://…`);
    process.exit(1);
  }
  jobs = [{ id: args[0], url }];
} else {
  console.error('Usage: npm run shoot -- <project-id> [url]   |   npm run shoot -- --all');
  process.exit(1);
}

const settle = Number(process.env.SETTLE ?? 2500);
const browser = await Browser.launch();
try {
  for (const { id, url } of jobs) {
    for (const shot of shots) {
      const page = await browser.newPage();
      await page.goto(url, shot.viewport, settle);
      // hide scrollbars and pause animations so the capture is clean
      await page.eval(`document.documentElement.style.scrollbarWidth = 'none'`);
      const png = await page.screenshot();
      page.close();
      const out = path.join(PROJECTS, id, `${shot.kind}.webp`);
      const webp = await sharp(png).resize({ width: shot.width }).webp({ quality: 90 }).toBuffer();
      writeFileSync(out, webp);
      console.log(`✓ ${id} ${shot.kind} → ${path.relative(ROOT, out)} (${Math.round(webp.length / 1024)} KB)`);
    }
  }
} finally {
  browser.close();
}
