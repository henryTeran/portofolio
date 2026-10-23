import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Each URL lists its language alternates (hreflang) so Google links the
// fr/en/es versions of a page together. changefreq/priority are omitted:
// Google ignores them.
const siteUrl = (process.env.SITE_URL || 'https://henryteran.com').replace(/\/$/, '');
const languages = ['fr', 'en', 'es'];
const defaultLanguage = 'en';
const pageSlugs = ['', 'projects/zigoma', 'projects/applyflow', 'projects/jobtrace-ai', 'projects/wellsync', 'privacy'];
const today = new Date().toISOString().split('T')[0];

const buildUrl = (lang, slug) => (slug ? `${siteUrl}/${lang}/${slug}` : `${siteUrl}/${lang}`);

const entries = languages.flatMap((lang) =>
  pageSlugs.map((slug) => {
    const alternates = [
      ...languages.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${buildUrl(alt, slug)}"/>`),
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${buildUrl(defaultLanguage, slug)}"/>`,
    ].join('\n');
    return `  <url>
    <loc>${buildUrl(lang, slug)}</loc>
    <lastmod>${today}</lastmod>
${alternates}
  </url>`;
  })
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');

console.log(`Sitemap generated: ${outputPath}`);
