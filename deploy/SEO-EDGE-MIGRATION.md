# SEO Edge/Server Migration — `?lang=` -> localized routes

This repository now supports localized routes at application level:
- `/fr`, `/fr/services`, `/fr/projects`, `/fr/contact`
- `/en`, `/en/services`, `/en/projects`, `/en/contact`
- `/es`, `/es/services`, `/es/projects`, `/es/contact`

This document finalizes the **server/edge 301 migration layer**.

## 1) Choose one platform config

- Nginx: use [nginx/henryteran.com.conf](nginx/henryteran.com.conf)
- Apache: use [apache/.htaccess-seo-migration](apache/.htaccess-seo-migration)
- Vercel: use [vercel/vercel.json](vercel/vercel.json) and (recommended) [vercel/middleware.js](vercel/middleware.js)
- Netlify: use [netlify/netlify.toml](netlify/netlify.toml) and [netlify/edge-functions/seo-migration.js](netlify/edge-functions/seo-migration.js)
- Cloudflare: use [cloudflare/worker.js](cloudflare/worker.js) or rules from [cloudflare/rules.md](cloudflare/rules.md)

## 2) Redirect behavior (expected)

The migration layer returns **301 permanent redirects**:
- `/?lang=fr` -> `/fr`
- `/?lang=en` -> `/en`
- `/?lang=es` -> `/es`
- `/services?lang=fr` -> `/fr/services`
- `/projects?lang=en` -> `/en/projects`
- `/contact?lang=es` -> `/es/contact`

Additional query parameters are preserved when using Nginx/Edge Function/Worker middleware:
- `/services?lang=fr&utm_source=google` -> `/fr/services?utm_source=google`

## 3) Canonical host policy

All platform configs enforce:
- HTTPS only
- Non-WWW only (`https://henryteran.com`)

## 4) Test strategy (production)

Run these commands after deployment:

```bash
curl -I "http://www.henryteran.com/?lang=fr"
curl -I "https://henryteran.com/?lang=en"
curl -I "https://henryteran.com/services?lang=fr"
curl -I "https://henryteran.com/projects?lang=en&utm_source=test"
curl -I "https://henryteran.com/contact?lang=es&ref=abc"
curl -I "https://henryteran.com/fr/services"
curl -I "https://henryteran.com/en/projects"
```

Expected:
- old query URLs return `301` to localized paths
- localized paths return `200`
- no redirect loops

Full chain validation:

```bash
curl -sIL "http://www.henryteran.com/projects?lang=en&utm_source=test"
```

Expected final URL:
- `https://henryteran.com/en/projects?utm_source=test`

## 5) Sitemap and robots checks

Sitemap must not include query-based URLs:

```bash
grep -n "\?lang=" public/sitemap.xml
```

Expected output: empty.

Robots must point to canonical sitemap URL:

```bash
grep -n "Sitemap:" public/robots.txt
```

Expected:
- `Sitemap: https://henryteran.com/sitemap.xml`

## 6) Google Search Console post-deploy checklist

1. Add both properties if needed (Domain + URL Prefix) and keep canonical property active.
2. Submit `https://henryteran.com/sitemap.xml`.
3. Use URL Inspection for:
   - `/fr/`, `/en/`, `/es/`
   - `/fr/services`, `/en/projects`, `/es/contact`
4. Validate that legacy URLs (`?lang=`) show `301` in inspection and crawl logs.
5. Check **Page indexing** report for duplicate/canonical conflicts.
6. Check **International targeting/hreflang** signals in rendered HTML.
7. Request re-indexing for key localized pages.
8. Monitor 7–14 days: coverage, impressions, and canonical selection.

## 7) Rollout order

1. Deploy server/edge redirect config.
2. Purge CDN cache.
3. Re-submit sitemap.
4. Validate with `curl -I` and Search Console inspection.
5. Monitor logs for unexpected 404/302/loops.
