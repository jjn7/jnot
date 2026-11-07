/**
 * Pre-launch check, run against the built site (dist/).
 *
 *   npm run launch-check              placeholders and unfinished content
 *   npm run launch-check -- --links   also checks every external link responds
 *
 * Anything still showing a placeholder carries a data-todo attribute; this lists
 * them and exits non-zero. The deploy workflow shows the list in each run's summary
 * but deploys regardless.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';

const DIST = path.resolve(import.meta.dirname, '..', 'dist');

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const decode = (s: string) =>
  s.replace(/&#39;|&#x27;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

let files: string[];
try {
  files = htmlFiles(DIST);
} catch {
  console.error('No dist/ folder. Run npm run build first.');
  process.exit(1);
}

const todos = new Set<string>();
const links = new Set<string>();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/data-todo="([^"]+)"/g)) {
    for (const part of decode(m[1]!).split('; ')) {
      const [scope, ...rest] = part.split(': ');
      todos.add(rest.length ? `${scope}: ${rest.join(': ')}` : part);
    }
  }
  for (const m of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) links.add(decode(m[1]!));
}

// group by page/project so the list reads like a checklist
const grouped = new Map<string, Set<string>>();
for (const t of todos) {
  const [scope, ...rest] = t.split(': ');
  const key = rest.length ? scope! : 'general';
  if (!grouped.has(key)) grouped.set(key, new Set());
  grouped.get(key)!.add(rest.length ? rest.join(': ') : t);
}

let failed = false;
if (grouped.size) {
  failed = true;
  console.log('\nStill to do before launch:\n');
  for (const [scope, items] of [...grouped].sort()) {
    console.log(`  ${scope}`);
    for (const item of items) console.log(`    ☐ ${item}`);
  }
} else {
  console.log('\n✓ No placeholders left.');
}

if (process.argv.includes('--links')) {
  const skip = /googletagmanager|schema\.org|fonts\.(googleapis|gstatic)/;
  const external = [...links].filter((l) => !skip.test(l) && !l.startsWith('https://jnot.net'));
  console.log(`\nChecking ${external.length} external links…`);
  const results = await Promise.all(
    external.map(async (url) => {
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15_000) });
        return { url, ok: res.ok || res.status === 999 /* LinkedIn blocks bots */, status: String(res.status) };
      } catch (e) {
        return { url, ok: false, status: (e as Error).message };
      }
    }),
  );
  for (const r of results) {
    console.log(`  ${r.ok ? '✓' : '✗'} ${r.status.padEnd(4)} ${r.url}`);
    if (!r.ok) failed = true;
  }
}

console.log('');
process.exit(failed ? 1 : 0);
