import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const htmlPath = new URL('../index.html', import.meta.url);
const html = readFileSync(htmlPath, 'utf8');

const match = html.match(/<script\s+id="jsonld-person"\s+type="application\/ld\+json">([\s\S]*?)<\/script>/i);

if (!match) {
  console.error('JSON-LD script with id="jsonld-person" not found in index.html');
  process.exit(1);
}

const scriptContent = match[1];
const hash = createHash('sha256').update(scriptContent, 'utf8').digest('base64');

console.log('CSP hash token:');
console.log(`\'sha256-${hash}\'`);
console.log('\nscript-src example:');
console.log(`script-src \'self\' \'sha256-${hash}\' https://www.googletagmanager.com;`);
