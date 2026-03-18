const LANGUAGE_SET = new Set(['fr', 'en', 'es']);
const ROUTE_MAP = new Map([
  ['/', '/'],
  ['/services', '/services'],
  ['/projects', '/projects'],
  ['/contact', '/contact'],
]);

export default function middleware(request) {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  // Canonical host: non-www
  if (host === 'www.henryteran.com') {
    url.hostname = 'henryteran.com';
    return Response.redirect(url.toString(), 301);
  }

  const normalizedPath = url.pathname.replace(/\/+$/, '') || '/';
  const firstSegment = normalizedPath.split('/').filter(Boolean)[0] || '';

  // Avoid loops for already-localized routes
  if (LANGUAGE_SET.has(firstSegment)) {
    return;
  }

  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  if (!LANGUAGE_SET.has(lang)) {
    return;
  }

  const mappedRoute = ROUTE_MAP.get(normalizedPath);
  if (!mappedRoute) {
    return;
  }

  // Preserve other query params, remove only lang
  url.searchParams.delete('lang');
  url.pathname = `/${lang}${mappedRoute === '/' ? '' : mappedRoute}`;

  return Response.redirect(url.toString(), 301);
}

export const config = {
  matcher: ['/((?!api|assets|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
};
