import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { getProjectCopy } from '../../content/projects';
import { workCopy } from '../../content/work';
import { featuredProjects } from '../../data/projects';
import { projectPath } from '../../router/paths';
import { trackProjectClick } from '../../analytics/trackingEvents';
import ProjectMasterVisual from './ProjectMasterVisual';

export default function SelectedWork() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = workCopy[language];

  return <section id="projects" className="scroll-mt-20 bg-[var(--v2-background)] py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="mb-14 max-w-3xl"><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
      <div className="space-y-16 lg:space-y-24">
        {featuredProjects.map((project, index) => {
          const detail = getProjectCopy(language, project.slug);
          return <article key={project.slug} data-project={project.slug} className="project-card master-work-card border-t border-[var(--v2-border)] pt-7">
            <ProjectMasterVisual project={project} language={language} />
            <div className="min-w-0 master-work-details">
              <div className="mb-7 flex items-center gap-4 text-xs font-mono tracking-widest text-[var(--v2-text-secondary)]"><span className="text-[var(--v2-accent)]">0{index + 1}</span><span>{detail?.category}</span></div>
              <h3 className="font-display font-semibold leading-none tracking-[-.05em] text-[clamp(3rem,5vw,4.8rem)]">{project.title}</h3>
              <p className="mt-5 text-xl font-medium">{detail?.tagline}</p>
              <p className="mt-4 max-w-lg leading-relaxed text-[var(--v2-text-secondary)]">{detail?.summary}</p>
              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-[var(--v2-border)] pt-5 text-sm"><div><dt className="text-[var(--v2-text-secondary)]">{copy.role}</dt><dd className="mt-1">{project.role.join(' · ')}</dd></div><div><dt className="text-[var(--v2-text-secondary)]">{copy.period}</dt><dd className="mt-1">{project.period}</dd></div></dl>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Capabilities">{project.capabilities.slice(0, index === 0 ? 6 : 4).map((capability) => <li key={capability} className="rounded-full border border-[var(--v2-border)] px-3 py-1 text-xs text-[var(--v2-text-secondary)]">{capability}</li>)}</ul>
              <p className="mt-5 text-xs text-[var(--v2-text-secondary)]">{project.technologies.slice(0, 5).join(' · ')}</p>
              <Link to={projectPath(language, project.slug)} onClick={() => trackProjectClick(project.title)} className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[var(--v2-accent)] pb-1 font-semibold text-[var(--v2-accent)] hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)]">{copy.explore}<ArrowUpRight size={18} aria-hidden="true" /></Link>
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
