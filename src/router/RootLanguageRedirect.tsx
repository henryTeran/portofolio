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
    return <Navigate to={normalizedPath} replace />;
  }

  const legacyRoute = pathSegments[0];
  const routeSuffix = legacyRoute && ROUTE_SEGMENTS.has(legacyRoute) ? `/${legacyRoute}` : '';

  return <Navigate to={`/${language}${routeSuffix}`} replace />;
}
