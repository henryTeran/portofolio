import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { LanguageCode } from '../../constants/i18n';
const labels = {
  fr: { pause: 'Mettre les animations en pause', play: 'Reprendre les animations' },
  en: { pause: 'Pause animations', play: 'Resume animations' },
  es: { pause: 'Pausar animaciones', play: 'Reanudar animaciones' },
};
export default function HeroAtmosphere({ language }: { language: LanguageCode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
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
  const active = !paused && !reduced && visible && foreground;
  return <>
    <div ref={ref} className="hero-starfield hero-starfield--live" data-active={active} aria-hidden="true"><i /><i /><i /><div className="hero-grid-plane" /></div>
    {!reduced && <button type="button" className="motion-control" aria-label={paused ? labels[language].play : labels[language].pause} title={paused ? labels[language].play : labels[language].pause} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}</button>}
  </>;
}
