import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LanguageCode } from '../../constants/i18n';
import { adjacentProjects } from '../../data/projects';
import { projectPath } from '../../router/paths';
import { caseStudyLabels } from '../../content/case-studies/labels';

export default function CaseStudyNavigation({ language, slug }: { language: LanguageCode; slug: string }) {
  const { previous, next } = adjacentProjects(slug);
  const copy = caseStudyLabels[language];
  return <nav className="grid gap-4 border-t border-[var(--v2-border)] py-10 sm:grid-cols-2" aria-label={language === 'fr' ? 'Autres projets' : language === 'es' ? 'Otros proyectos' : 'Other projects'}>
    {previous && <Link to={projectPath(language, previous.slug)} className="group rounded-xl border border-[var(--v2-border)] bg-[var(--v2-surface)] p-5 hover:border-[var(--v2-accent)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]"><span className="flex items-center gap-2 text-sm text-[var(--v2-text-secondary)]"><ArrowLeft size={16} aria-hidden="true" />{copy.previous}</span><span className="mt-4 block text-2xl font-semibold">{previous.title}</span></Link>}
    {next && <Link to={projectPath(language, next.slug)} className="group rounded-xl border border-[var(--v2-border)] bg-[var(--v2-surface)] p-5 hover:border-[var(--v2-accent)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]"><span className="flex items-center gap-2 text-sm text-[var(--v2-text-secondary)]">{copy.next}<ArrowRight size={16} aria-hidden="true" /></span><span className="mt-4 block text-2xl font-semibold">{next.title}</span></Link>}
  </nav>;
}
