import { useEffect, useRef, useState } from 'react';
export default function HeroAtmosphere() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [foreground, setForeground] = useState(!document.hidden);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    const visibility = () => setForeground(!document.hidden);
    update(); media.addEventListener('change', update); document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(entries => setVisible(entries.some(entry => entry.isIntersecting)));
    if (ref.current) observer.observe(ref.current);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const active = !reduced && visible && foreground;
  return <div ref={ref} className="hero-starfield hero-starfield--live" data-active={active} aria-hidden="true"><i /><i /><i /><div className="hero-grid-plane" /></div>;
}
