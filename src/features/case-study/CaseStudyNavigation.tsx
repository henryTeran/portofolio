import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LanguageCode } from '../../constants/i18n';
import { adjacentProjects } from '../../data/projects';
import { projectPath } from '../../router/paths';
import { caseStudyLabels } from '../../content/case-studies/labels';
import { getProjectCopy } from '../../content/projects';
import './navigation.css';

export default function CaseStudyNavigation({ language, slug }: { language: LanguageCode; slug: string }) {
  const { previous, next } = adjacentProjects(slug);
  const copy = caseStudyLabels[language];
  return <nav className="case-project-navigation" aria-label={language === 'fr' ? 'Autres projets' : language === 'es' ? 'Otros proyectos' : 'Other projects'}>
    {[{ project: previous, direction: 'previous', label: copy.previous }, { project: next, direction: 'next', label: copy.next }].map(({ project, direction, label }) => project && <Link key={direction} data-project={project.slug} data-direction={direction} to={projectPath(language, project.slug)} className="case-project-link">
      <span className="case-project-direction">{direction === 'previous' && <ArrowLeft size={18} aria-hidden="true" />}{label}{direction === 'next' && <ArrowRight size={18} aria-hidden="true" />}</span>
      <span className="case-project-name">{project.title}</span>
      <span className="case-project-description">{getProjectCopy(language, project.slug)?.tagline}</span>
    </Link>)}
  </nav>;
}
