import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteUrl = (process.env.SITE_URL || 'https://henryteran.com').replace(/\/$/, '');
const languages = ['fr', 'en', 'es'];
const pageSlugs = ['', 'services', 'projects', 'contact'];
const today = new Date().toISOString().split('T')[0];

const getPriority = (slug) => {
  if (slug === '') return '1.0';
  if (slug === 'projects') return '0.9';
  if (slug === 'services') return '0.9';
  return '0.8';
};

const buildUrl = (lang, slug) => {
  if (!slug) {
    return `${siteUrl}/${lang}/`;
  }

  return `${siteUrl}/${lang}/${slug}`;
};

const urls = languages.flatMap((lang) =>
  pageSlugs.map((slug) => ({
    loc: buildUrl(lang, slug),
    lastmod: today,
    changefreq: slug === '' ? 'weekly' : 'monthly',
    priority: getPriority(slug),
  }))
);

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, lastmod, changefreq, priority }) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outputPath = resolve(process.cwd(), 'public', 'sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');

console.log(`Sitemap generated: ${outputPath}`);
