const LANGUAGE_SET = new Set(['fr', 'en', 'es']);
const ROUTE_MAP = new Map([
  ['/', 'home'],
  ['/services', 'services'],
  ['/projects', 'projects'],
  ['/contact', 'contact'],
]);

// First supported language in the visitor's Accept-Language header (in priority order).
function preferredLanguage(header) {
  const ranked = (header || '')
    .split(',')
    .map((part, index) => {
      const [tag, ...params] = part.trim().toLowerCase().split(';');
      const q = params.map((p) => p.trim()).find((p) => p.startsWith('q='));
      const weight = q ? Number(q.slice(2)) : 1;
      return { lang: tag.split('-')[0], weight: Number.isFinite(weight) ? weight : 0, index };
    })
    .filter(({ lang, weight }) => LANGUAGE_SET.has(lang) && weight > 0)
    .sort((a, b) => b.weight - a.weight || a.index - b.index);
  return ranked[0]?.lang || 'en';
}

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
    if (pathSegments.length === 2 && ['services', 'projects', 'contact'].includes(secondSegment)) {
      url.pathname = `/${firstSegment}`;
      url.hash = `#${secondSegment}`;
      return Response.redirect(url.toString(), 301);
    }

    return;
  }

  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  if (!LANGUAGE_SET.has(lang)) {
    // Bare root: answer with a real HTTP redirect (crawlers see it without running JavaScript).
    if (normalizedPath === '/') {
      url.pathname = `/${preferredLanguage(request.headers.get('accept-language'))}`;
      return new Response(null, {
        status: 302,
        headers: { Location: url.toString(), Vary: 'Accept-Language', 'Cache-Control': 'private, no-store' },
      });
    }
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
