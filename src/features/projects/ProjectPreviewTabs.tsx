import { developmentLabels, screenshotLabels } from './screenshotLabels';
import { useId, useRef, useState } from 'react';
import type { PortfolioLanguage, PortfolioProject } from '../../types/portfolio';
import ProjectScreenshot from './ProjectScreenshot';


export default function ProjectPreviewTabs({ project, language, eager = false }: { project: PortfolioProject; language: PortfolioLanguage; eager?: boolean }) {
  const visuals = project.visuals?.filter((visual) => visual.featured).slice(0, 4) ?? [];
  const [active, setActive] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const visual = visuals[active] ?? visuals[0];
  if (!visual) return null;
  return <div className="screenshot-preview" data-project={project.slug}>
    <div className="screenshot-heading"><span>{project.title}</span>{project.status && <span className="screenshot-status">{developmentLabels[language]}</span>}</div>
    <div className="screenshot-tabs" role="tablist" aria-label={`${project.title} — ${screenshotLabels[language]}`}>
      {visuals.map((item, index) => <button key={item.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => {
        let next: number;
        if (event.key === 'ArrowRight') next = (index + 1) % visuals.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + visuals.length) % visuals.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = visuals.length - 1;
        else return;
        event.preventDefault(); setActive(next); tabs.current[next]?.focus();
      }}>{item.label[language]}</button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
      <ProjectScreenshot visual={visual} language={language} eager={eager} />
      <p className="screenshot-caption">{visual.caption[language]}</p>
    </div>
  </div>;
}
