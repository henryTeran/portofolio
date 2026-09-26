import { useTilt } from '../motion/useTilt';
import { useParams } from 'react-router-dom';
import type { PortfolioProject } from '../../types/portfolio';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { caseStudyLabels } from '../../content/case-studies/labels';
import ZigomaVisual from './visuals/ZigomaVisual';
import ApplyflowVisual from './visuals/ApplyflowVisual';
import JobtraceVisual from './visuals/JobtraceVisual';
import WellsyncVisual from './visuals/WellsyncVisual';
import './visuals/visuals.css';
import ProjectPreviewTabs from './ProjectPreviewTabs';

export default function ProjectPreview({ project, label, eager = false }: { project: PortfolioProject; label: string; eager?: boolean }) {
  const tiltRef = useTilt<HTMLElement>();
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  if (project.productSlides?.length) return <ProjectPreviewTabs key={project.slug} project={project} language={language} eager={eager} />;
  return <figure ref={tiltRef} data-project={project.slug} className={`product-visual product-visual--${project.slug}`} aria-label={`${project.title} — ${label}`}>
    <div className="visual-toolbar"><span className="visual-brand">{project.title}</span><span aria-hidden="true">● ● ●</span></div>
    {project.slug === 'zigoma' ? <ZigomaVisual language={language} /> : project.slug === 'applyflow' ? <ApplyflowVisual language={language} /> : project.slug === 'jobtrace-ai' ? <JobtraceVisual language={language} /> : project.slug === 'wellsync' ? <WellsyncVisual language={language} /> : null}
    <figcaption>{caseStudyLabels[language].illustrative}</figcaption>
  </figure>;
}
