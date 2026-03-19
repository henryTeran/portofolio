import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackScrollDepth } from './trackingEvents';

const THRESHOLDS = [25, 50, 75, 90] as const;
type Threshold = (typeof THRESHOLDS)[number];
const isDev = import.meta.env.DEV;

/**
 * Tracks scroll depth thresholds (25 / 50 / 75 / 90 %).
 * - Each threshold fires only once per page load / route change.
 * - Resets automatically on SPA navigation (pathname or hash change).
 * - Uses passive scroll listener for performance.
 * - Returns null — meant to be rendered inside BrowserRouter context.
 */
export default function useScrollDepth(): void {
  const location = useLocation();
  // Set of already-fired thresholds for the current page
  const firedRef = useRef<Set<Threshold>>(new Set());

  // Reset fired thresholds on every route/hash change
  useEffect(() => {
    firedRef.current = new Set();
    if (isDev) {
      console.debug('[GA4] Scroll tracker reset', {
        path: location.pathname,
        hash: location.hash,
      });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const scrollPercent = (scrollTop / docHeight) * 100;

      for (const threshold of THRESHOLDS) {
        if (!firedRef.current.has(threshold) && scrollPercent >= threshold) {
          firedRef.current.add(threshold);
          if (isDev) {
            console.debug('[GA4] Scroll threshold reached', {
              threshold,
              scrollPercent,
              path: location.pathname,
              hash: location.hash,
            });
          }
          trackScrollDepth(threshold);
        }
      }
    };

    if (isDev) {
      console.debug('[GA4] Scroll tracker mounted', {
        path: location.pathname,
        hash: location.hash,
      });
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.hash]);
}
