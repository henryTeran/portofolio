# Cloudflare Redirect Rules (without Worker)

If you prefer Cloudflare Rules instead of a Worker, create these **Redirect Rules** in this exact order:

1) **Force HTTPS + non-WWW**
- Expression:
  `(http.host eq "www.henryteran.com") or (http.request.full_uri starts_with "http://")`
- Dynamic Redirect URL:
  `concat("https://henryteran.com", http.request.uri.path, if(len(http.request.uri.query) gt 0, concat("?", http.request.uri.query), ""))`
- Status code: `301`

2) **Root language migration**
- Expression:
  `(http.request.uri.path eq "/") and (not starts_with(http.request.uri.path, "/fr")) and (not starts_with(http.request.uri.path, "/en")) and (not starts_with(http.request.uri.path, "/es")) and (lower(http.request.uri.query["lang"]) in {"fr" "en" "es"})`
- Dynamic Redirect URL:
  `concat("https://henryteran.com/", lower(http.request.uri.query["lang"]))`
- Status code: `301`

3) **services migration**
- Expression:
  `(http.request.uri.path eq "/services") and (lower(http.request.uri.query["lang"]) in {"fr" "en" "es"})`
- Dynamic Redirect URL:
  `concat("https://henryteran.com/", lower(http.request.uri.query["lang"]), "/services")`
- Status code: `301`

4) **projects migration**
- Expression:
  `(http.request.uri.path eq "/projects") and (lower(http.request.uri.query["lang"]) in {"fr" "en" "es"})`
- Dynamic Redirect URL:
  `concat("https://henryteran.com/", lower(http.request.uri.query["lang"]), "/projects")`
- Status code: `301`

5) **contact migration**
- Expression:
  `(http.request.uri.path eq "/contact") and (lower(http.request.uri.query["lang"]) in {"fr" "en" "es"})`
- Dynamic Redirect URL:
  `concat("https://henryteran.com/", lower(http.request.uri.query["lang"]), "/contact")`
- Status code: `301`

Note: Redirect Rules are limited for selective query parameter cleanup. Use `worker.js` for full query preservation + removing only `lang`.
