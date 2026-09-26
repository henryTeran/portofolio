import { useEffect, useRef } from 'react';

/** Decorative, one-shot activation; content is always visible without JavaScript. */
export function useSectionMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root || !window.matchMedia || !('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const update = () => {
      observer?.disconnect();
      if (media.matches) {
        root.querySelectorAll('[data-revealed]').forEach(node => node.removeAttribute('data-revealed'));
        return;
      }
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            if (entry.target.hasAttribute('data-section-transition')) entry.target.removeAttribute('data-revealed');
            return;
          }
          entry.target.setAttribute('data-revealed', 'true'); if (!entry.target.hasAttribute('data-section-transition')) observer?.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      root.querySelectorAll('[data-motion-item], [data-section-transition]').forEach(node => observer?.observe(node));
    };
    update(); media.addEventListener('change', update);
    return () => { observer?.disconnect(); media.removeEventListener('change', update); };
  }, []);
  return ref;
}
