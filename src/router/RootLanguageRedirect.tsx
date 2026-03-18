import { Navigate, useLocation } from 'react-router-dom';
import { getPreferredLanguage, isSupportedLanguage } from '../constants/i18n';

const ROUTE_SEGMENTS = new Set(['services', 'projects', 'contact']);

export default function RootLanguageRedirect() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryLanguage = queryParams.get('lang');

  const language = queryLanguage ? getPreferredLanguage(queryLanguage) : getPreferredLanguage(navigator.language);

  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/';
  const pathSegments = normalizedPath.split('/').filter(Boolean);

  if (pathSegments.length > 0 && isSupportedLanguage(pathSegments[0])) {
    const [, maybeSection] = pathSegments;
    if (maybeSection && ROUTE_SEGMENTS.has(maybeSection)) {
      return <Navigate to={`/${pathSegments[0]}#${maybeSection}`} replace />;
    }

    return <Navigate to={`/${pathSegments[0]}`} replace />;
  }

  const legacyRoute = pathSegments[0];
  const routeHash = legacyRoute && ROUTE_SEGMENTS.has(legacyRoute) ? `#${legacyRoute}` : '';

  return <Navigate to={`/${language}${routeHash}`} replace />;
}
