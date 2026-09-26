import { useEffect, useSyncExternalStore } from 'react';
import { useLocation } from 'react-router-dom';
import { syncAnalyticsConsent, trackPage } from './analytics';
import { getConsent, subscribeConsent } from '../privacy/consent';
import useScrollDepth from './useScrollDepth';

export default function AnalyticsTracker() {
  const location = useLocation();
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => null);
  const allowed = consent?.analytics === true;
  useEffect(() => { syncAnalyticsConsent(); }, [allowed, location.pathname]);
  useEffect(() => {
    if (allowed) trackPage(location.pathname + location.hash);
  }, [allowed, location.pathname, location.hash]);
  useScrollDepth(allowed && !location.pathname.endsWith('/verify'));
  return null;
}
