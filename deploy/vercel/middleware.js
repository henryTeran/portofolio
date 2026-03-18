// Vercel Edge Middleware (optional but recommended)
// Place this file at project root as `middleware.js` when deploying on Vercel.

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

  const hasWww = host.startsWith('www.');
  const isHttp = (request.headers.get('x-forwarded-proto') || 'https') !== 'https';

  if (hasWww || isHttp) {
    url.protocol = 'https:';
    url.hostname = 'henryteran.com';
    return Response.redirect(url.toString(), 301);
  }

  const path = url.pathname.replace(/\/+$/, '') || '/';
  const firstSegment = path.split('/').filter(Boolean)[0] || '';

  // Avoid loops: never redirect already localized paths
  if (LANGUAGE_SET.has(firstSegment)) {
    return;
  }

  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  if (!LANGUAGE_SET.has(lang)) {
    return;
  }

  const mappedPath = ROUTE_MAP.get(path);
  if (!mappedPath) {
    return;
  }

  url.searchParams.delete('lang');
  url.pathname = `/${lang}${mappedPath === '/' ? '' : mappedPath}`;

  return Response.redirect(url.toString(), 301);
}

export const config = {
  matcher: ['/((?!assets|api|_next|favicon.ico|robots.txt|sitemap.xml).*)'],
};
