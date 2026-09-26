import { useEffect, useRef, useState } from 'react';
import type { PortfolioLanguage, PortfolioProject } from '../../types/portfolio';
import { developmentLabels } from './screenshotLabels';
import './masterVisual.css';

export default function ProjectMasterVisual({ project, language, eager = false }: { project: PortfolioProject; language: PortfolioLanguage; eager?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setRevealed(true); observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const visual = project.masterVisual;
  if (!visual) return null;
  return <figure ref={ref} data-project={project.slug} className={`project-master${revealed ? ' project-master--revealed' : ''}`}>
    <div className="project-master-frame"><img src={visual.src} alt={visual.alt[language]} width={visual.width} height={visual.height} loading={eager ? 'eager' : 'lazy'} decoding="async" /></div>
    {project.status && <figcaption className="project-master-status">{developmentLabels[language]}</figcaption>}
  </figure>;
}
