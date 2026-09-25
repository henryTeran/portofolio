import { useParams } from 'react-router-dom';
import type { PortfolioProject } from '../../types/portfolio';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { caseStudyLabels } from '../../content/case-studies/labels';
import ZigomaVisual from './visuals/ZigomaVisual';
import './visuals/visuals.css';

export default function ProjectPreview({ project, label }: { project: PortfolioProject; label: string }) {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  return <figure className={`product-visual product-visual--${project.slug}`} aria-label={`${project.title} — ${label}`}>
    <div className="visual-toolbar"><span className="visual-brand">{project.title}</span><span aria-hidden="true">● ● ●</span></div>
    {project.slug === 'zigoma' ? <ZigomaVisual language={language} /> : <ul className="visual-modules">{project.capabilities.map(item => <li key={item}>{item}</li>)}</ul>}
    <figcaption>{caseStudyLabels[language].illustrative}</figcaption>
  </figure>;
}
