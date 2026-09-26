import { trackCaseStudyOpen } from './trackingEvents';
import { getProject } from '../data/projects';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { syncAnalyticsConsent, trackPage } from './analytics';
import { getConsent, subscribeConsent } from '../privacy/consent';
import useScrollDepth from './useScrollDepth';

export default function AnalyticsTracker() {
  const location = useLocation();
  const lastCaseStudy = useRef('');
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const allowed = consent?.analytics === true;
  useEffect(() => { syncAnalyticsConsent(); }, [allowed, location.pathname]);
  useEffect(() => {
    if (allowed) trackPage(location.pathname + location.hash);
  }, [allowed, location.pathname, location.hash]);
  useEffect(() => {
    const slug = location.pathname.match(/^\/(fr|en|es)\/projects\/([^/]+)$/)?.[2];
    if (!allowed || !slug || !getProject(slug)) { lastCaseStudy.current = ''; return; }
    if (lastCaseStudy.current !== location.pathname) {
      trackCaseStudyOpen(slug); lastCaseStudy.current = location.pathname;
    }
  }, [allowed, location.pathname]);
  useScrollDepth(allowed && !location.pathname.endsWith('/verify'));
  return null;
}
