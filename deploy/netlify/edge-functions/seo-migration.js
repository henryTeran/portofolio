// Netlify Edge Function: 301 migration for ?lang= to localized routes

const LANGUAGE_SET = new Set(['fr', 'en', 'es']);
const ROUTE_MAP = new Map([
  ['/', '/'],
  ['/services', '/services'],
  ['/projects', '/projects'],
  ['/contact', '/contact'],
]);

export default async (request, context) => {
  const url = new URL(request.url);
  const host = url.hostname.toLowerCase();

  if (host === 'www.henryteran.com') {
    url.hostname = 'henryteran.com';
    url.protocol = 'https:';
    return Response.redirect(url.toString(), 301);
  }

  const path = url.pathname.replace(/\/+$/, '') || '/';
  const firstSegment = path.split('/').filter(Boolean)[0] || '';

  if (LANGUAGE_SET.has(firstSegment)) {
    return context.next();
  }

  const lang = (url.searchParams.get('lang') || '').toLowerCase();
  if (!LANGUAGE_SET.has(lang)) {
    return context.next();
  }

  const mappedPath = ROUTE_MAP.get(path);
  if (!mappedPath) {
    return context.next();
  }

  url.searchParams.delete('lang');
  url.pathname = `/${lang}${mappedPath === '/' ? '' : mappedPath}`;

  return Response.redirect(url.toString(), 301);
};
