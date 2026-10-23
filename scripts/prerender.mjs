// Generates one static HTML file per public route after `vite build`.
// Each file contains the rendered page plus its own <title>, description,
// canonical, hreflang and Open Graph tags, so crawlers that do not execute
// JavaScript (Bing, social previews, AI search) see the real page.
// Vercel serves these files first (cleanUrls); other paths fall back as configured in vercel.json.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';

// Production React builds: no dev-only warnings, same markup as the live site.
process.env.NODE_ENV = 'production';

const root = process.cwd();
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const languages = ['fr', 'en', 'es'];
const pageSlugs = ['', 'projects/zigoma', 'projects/applyflow', 'projects/jobtrace-ai', 'projects/wellsync', 'privacy'];

const template = readFileSync(resolve(distDir, 'index.html'), 'utf8');

// Minimal browser globals: some components read document/localStorage/matchMedia
// during their first render. A fresh visitor's defaults (light theme, no consent) are used.
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'https://henryteran.com/' });
const { window } = dom;
window.matchMedia ??= (query) => ({
  matches: false, media: query, onchange: null,
  addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {}, dispatchEvent: () => false,
});
class NoopObserver { observe() {} unobserve() {} disconnect() {} takeRecords() { return []; } }
window.IntersectionObserver ??= NoopObserver;
window.ResizeObserver ??= NoopObserver;
window.scrollTo = () => {};
for (const key of ['window', 'document', 'localStorage', 'sessionStorage', 'matchMedia', 'IntersectionObserver', 'ResizeObserver', 'HTMLElement', 'Element', 'Node', 'getComputedStyle', 'requestAnimationFrame', 'cancelAnimationFrame']) {
  if (!(key in globalThis) && key in window) {
    globalThis[key] = key === 'window' ? window : typeof window[key] === 'function' && !/^[A-Z]/.test(key) ? window[key].bind(window) : window[key];
  }
}
globalThis.window = window;
globalThis.requestAnimationFrame ??= (callback) => setTimeout(() => callback(Date.now()), 16);
globalThis.cancelAnimationFrame ??= (id) => clearTimeout(id);
if (!('navigator' in globalThis) || !globalThis.navigator?.language) {
  Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
}
const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

// Removes template <meta> tags that the page's own Helmet output redefines,
// so every page has exactly one title/description/og:* value.
function stripDuplicateHead(html, head) {
  const keys = new Set();
  for (const match of head.matchAll(/<meta[^>]*\s(name|property)="([^"]+)"/g)) keys.add(`${match[1]}=${match[2]}`);
  let result = html.replace(/<title>[\s\S]*?<\/title>/i, '');
  result = result.replace(/<meta\b[^>]*>/gi, (tag) => {
    const key = tag.match(/\s(name|property)\s*=\s*"([^"]+)"/i);
    if (!key) return tag;
    const id = `${key[1].toLowerCase()}=${key[2]}`;
    if (keys.has(id) || id === 'name=keywords') return '';
    return tag;
  });
  return result.replace(/\n(\s*\n){2,}/g, '\n\n');
}

let count = 0;
for (const language of languages) {
  for (const slug of pageSlugs) {
    const url = slug ? `/${language}/${slug}` : `/${language}`;
    dom.reconfigure({ url: `https://henryteran.com${url}` });
    const { html, head } = await render(url, language);
    if (!html.trim()) throw new Error(`Empty render for ${url}`);

    let page = stripDuplicateHead(template, head);
    page = page.replace(/<html\b[^>]*>/i, `<html lang="${language}">`);
    page = page.replace('</head>', `${head}\n  </head>`);
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const outputPath = resolve(distDir, `${url.slice(1)}.html`);
    mkdirSync(dirname(outputPath), { recursive: true });
    writeFileSync(outputPath, page, 'utf8');
    count += 1;
  }
}

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${count} pages into ${distDir}`);
