// Cloudflare Worker: canonical domain + HTTPS + query-lang migration (301)

const LANGUAGE_SET = new Set(['fr', 'en', 'es']);
const ROUTE_MAP = new Map([
  ['/', '/'],
  ['/services', '/services'],
  ['/projects', '/projects'],
  ['/contact', '/contact'],
]);

export default {
  async fetch(request) {
    const url = new URL(request.url);

    const isWww = url.hostname.toLowerCase() === 'www.henryteran.com';
    const isHttp = url.protocol === 'http:';

    if (isWww || isHttp) {
      url.hostname = 'henryteran.com';
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    const path = url.pathname.replace(/\/+$/, '') || '/';
    const firstSegment = path.split('/').filter(Boolean)[0] || '';

    if (!LANGUAGE_SET.has(firstSegment)) {
      const lang = (url.searchParams.get('lang') || '').toLowerCase();
      const mappedPath = ROUTE_MAP.get(path);

      if (LANGUAGE_SET.has(lang) && mappedPath) {
        url.searchParams.delete('lang');
        url.pathname = `/${lang}${mappedPath === '/' ? '' : mappedPath}`;
        return Response.redirect(url.toString(), 301);
      }
    }

    return fetch(request);
  },
};
