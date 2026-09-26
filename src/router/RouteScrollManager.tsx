import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const sectionAliases: Record<string, string> = {
  work: 'projects', skills: 'expertise', services: 'approach', about: 'journey',
};

export default function RouteScrollManager() {
  const { pathname, hash, key } = useLocation();
  useLayoutEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previous; };
  }, []);

  useLayoutEffect(() => {
    let id = '';
    try { id = decodeURIComponent(hash.slice(1)); } catch { /* Ignore malformed anchors. */ }
    const section = id ? document.getElementById(sectionAliases[id] ?? id) : null;
    const main = document.querySelector<HTMLElement>('main');
    const target = section ?? main;
    if (!target) return;
    const oldTabIndex = target.getAttribute('tabindex');
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    if (section) section.scrollIntoView({ behavior: 'instant', block: 'start' });
    else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const animation = !section && !reducedMotion ? main?.animate?.([{ opacity: 0.85 }, { opacity: 1 }], { duration: 180 }) : undefined;
    return () => {
      animation?.cancel();
      if (oldTabIndex === null) target.removeAttribute('tabindex');
      else target.setAttribute('tabindex', oldTabIndex);
    };
  }, [pathname, hash, key]);
  return null;
}
