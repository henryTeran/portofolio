# Vercel Migration Guide (Final, Production-Ready)

## Scope
This project now uses **Vercel-only** deployment and edge routing.

Implemented files:
- `vercel.json` (SPA rewrite + canonical host redirect)
- `middleware.js` (301 query-lang migration + no-loop protection)

Removed/isolated legacy deployment targets:
- GitHub Pages workflow removed (`.github/workflows/deploy.yml`)
- Nginx/Apache/Netlify/Cloudflare configs removed from active setup

## 1) Required redirects (already implemented)

- `/?lang=fr` -> `/fr`
- `/?lang=en` -> `/en`
- `/?lang=es` -> `/es`
- `/services?lang=fr` -> `/fr/services`
- `/projects?lang=en` -> `/en/projects`
- `/contact?lang=es` -> `/es/contact`

Behavior details:
- Status code: **301 Permanent Redirect**
- Preserves other query params (UTM, ref, etc.)
- Removes only `lang`
- Prevents loops for already localized paths (`/fr/...`, `/en/...`, `/es/...`)

## 2) React Router + SPA fallback on Vercel

`vercel.json` rewrites all non-static routes to `index.html`, so React Router handles:
- `/fr`
- `/fr/services`
- `/en/projects`
- `/es/contact`

## 3) SEO files checks

### Canonical and hreflang
Handled in app by:
- `src/seo/SeoHelmet.tsx`
- `src/seo/HreflangLinks.tsx`

### robots.txt
Current value is correct:
- `Sitemap: https://henryteran.com/sitemap.xml`

### sitemap.xml
Current sitemap contains localized routes only and no `?lang=` URLs.

## 4) Exact migration procedure (GitHub Pages -> Vercel)

1. In Vercel dashboard, click **Add New Project**.
2. Import `henryTeran/portofolio`.
3. Framework preset: **Vite** (auto-detected).
4. Build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`
5. Add environment variables (Production/Preview/Development) listed below.
6. In Domains:
   - Add `henryteran.com`
   - Add `www.henryteran.com`
   - Set `henryteran.com` as primary
7. DNS:
   - Point apex domain to Vercel (A/ALIAS as instructed by Vercel)
   - Point `www` CNAME to Vercel target
8. Deploy.
9. Purge any external CDN cache (if used).
10. Run redirect tests (section 6).

## 5) Environment variables to configure in Vercel

Set these in **Project Settings -> Environment Variables**:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_TPL_CONTACT`
- `VITE_EMAILJS_TPL_QUOTE`
- `VITE_SITE_URL` = `https://henryteran.com`

Recommended scopes:
- Production: all variables
- Preview: all variables (or test EmailJS values)
- Development: optional but recommended for parity

## 6) 301 test strategy (exact commands)

Run from terminal after deployment:

```bash
curl -I "https://henryteran.com/?lang=fr"
curl -I "https://henryteran.com/?lang=en"
curl -I "https://henryteran.com/?lang=es"
curl -I "https://henryteran.com/services?lang=fr"
curl -I "https://henryteran.com/projects?lang=en&utm_source=test"
curl -I "https://henryteran.com/contact?lang=es&ref=abc"
curl -I "https://www.henryteran.com/fr/projects"
```

Expected:
- Legacy URLs return `301` to localized routes
- `www` returns `301` to non-www
- Localized route final response is `200`
- Example preservation:
  - `/projects?lang=en&utm_source=test` -> `/en/projects?utm_source=test`

Follow redirect chain:

```bash
curl -sIL "https://henryteran.com/projects?lang=en&utm_source=test"
```

## 7) Google Search Console post-deploy checklist

1. Keep/add canonical property for `https://henryteran.com`.
2. Submit `https://henryteran.com/sitemap.xml`.
3. Inspect URLs:
   - `/fr/`, `/en/`, `/es/`
   - `/fr/services`, `/en/projects`, `/es/contact`
4. Inspect one legacy URL with query (`?lang=`) and confirm detected `301`.
5. Monitor Indexing report for duplicate/canonical issues.
6. Monitor Performance report by page and language paths.
7. Re-request indexing for key pages after first successful crawl.

## 8) Vercel settings to verify

- Project -> General -> Framework Preset: `Vite`
- Project -> Domains:
  - Primary domain: `henryteran.com`
  - Redirect `www.henryteran.com` to primary
- Project -> Functions -> Edge enabled (middleware is active)
- Project -> Environment Variables configured for all required environments

## 9) Notes

- HTTPS is enforced by Vercel once domain + certificate are active.
- `middleware.js` handles migration-specific 301 logic that `vercel.json` cannot express safely for all query-preservation cases.
