import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPage } from './analytics';
import useScrollDepth from './useScrollDepth';

/**
 * Rendered inside BrowserRouter → useLocation() is always valid.
 * - Initializes GA4 once on mount
 * - Tracks every pathname + hash navigation (SPA page views)
 * - Tracks scroll depth thresholds (25 / 50 / 75 / 90 %) via useScrollDepth
 */
export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPage(location.pathname + location.hash);
  }, [location.pathname, location.hash]);

  // Scroll depth tracking — resets automatically on route change
  useScrollDepth();

  return null;
}
