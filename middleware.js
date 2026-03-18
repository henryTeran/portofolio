const LANGUAGE_SET = new Set(['fr', 'en', 'es']);
const ROUTE_MAP = new Map([
  ['/', 'home'],
  ['/services', 'services'],
  ['/projects', 'projects'],
  ['/contact', 'contact'],
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
  const pathSegments = normalizedPath.split('/').filter(Boolean);
  const firstSegment = pathSegments[0] || '';
  const secondSegment = pathSegments[1] || '';

  // Avoid loops for already-localized routes
  if (LANGUAGE_SET.has(firstSegment)) {
    if (['services', 'projects', 'contact'].includes(secondSegment)) {
      url.pathname = `/${firstSegment}`;
      url.hash = `#${secondSegment}`;
      return Response.redirect(url.toString(), 301);
    }

    return;
  }

  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  if (!LANGUAGE_SET.has(lang)) {
    return;
  }

  const mappedHash = ROUTE_MAP.get(normalizedPath);
  if (!mappedHash) {
    return;
  }

  // Preserve other query params, remove only lang
  url.searchParams.delete('lang');
  url.pathname = `/${lang}`;
  url.hash = mappedHash === 'home' ? '' : `#${mappedHash}`;

  return Response.redirect(url.toString(), 301);
}

export const config = {
  matcher: ['/((?!api|assets|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
};
