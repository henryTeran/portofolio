import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPage } from './analytics';

/**
 * Rendered inside BrowserRouter → useLocation() is always valid.
 * Initializes GA4 once, then tracks every pathname + hash change
 * (covers both /fr → /en navigation and anchor jumps like #projects).
 */
export default function AnalyticsTracker() {
  const location = useLocation();

  // Initialize once on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track every navigation (pathname or hash change)
  useEffect(() => {
    trackPage(location.pathname + location.hash);
  }, [location.pathname, location.hash]);

  return null;
}
