import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { expertiseCopy } from '../../content/expertise';
import { expertiseGroups } from '../../data/expertise';

export default function ExpertiseSection() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = expertiseCopy[language];

  return <section id="expertise" className="scroll-mt-20 border-y border-[var(--v2-border)] bg-[var(--v2-surface)] py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 text-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
      <div className="expertise-grid mt-14 grid gap-5 lg:grid-cols-3">
        {expertiseGroups.map((group, index) => {
          const detail = copy.groups[group.id as keyof typeof copy.groups];
          return <article key={group.id} data-motion-item className="expertise-card">
            <span className="text-sm font-mono text-[var(--v2-accent)]">0{index + 1}</span>
            <h3 className="mt-7 text-3xl font-semibold tracking-tight">{detail.title}</h3>
            <p className="mt-4 min-h-20 max-w-sm leading-relaxed text-[var(--v2-text-secondary)]">{detail.description}</p>
            <ul className="mt-8 space-y-3 border-t border-[var(--v2-border)] pt-6">{group.capabilityKeys.map((capability) => <li key={capability} className="text-sm font-medium">{capability}</li>)}</ul>
            <div className="mt-8 border-t border-[var(--v2-border)] pt-5"><p className="text-xs uppercase tracking-wider text-[var(--v2-text-secondary)]">{copy.proof}</p><p className="mt-2 text-sm text-[var(--v2-text-secondary)]">{group.technologies.join(' · ')}</p></div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
