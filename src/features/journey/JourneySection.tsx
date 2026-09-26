import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { valueCopy } from '../../content/value';
import { projectPath } from '../../router/paths';

export default function JourneySection() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = valueCopy[language];
  // Keep the existing anchor so saved links and navigation remain valid.
  return <section id="journey" className="value-section scroll-mt-20 py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 text-lg text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
      <div className="mt-14 grid gap-6 lg:grid-cols-3">{copy.items.map((item, index) => <article key={item.slug} data-project={item.slug} data-motion-item className="value-card">
        <span className="value-number" aria-hidden="true">0{index + 1}</span>
        <h3 className="relative text-2xl font-semibold tracking-tight">{item.title}</h3>
        <div className="mt-8"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--v2-text-secondary)]">{copy.before}</p><p className="mt-3 leading-relaxed text-[var(--v2-text-secondary)]">{item.before}</p></div>
        <ArrowDown className="my-5 text-[var(--v2-accent)]" size={22} aria-hidden="true" />
        <div className="value-outcome"><p className="text-xs font-semibold uppercase tracking-wider text-[var(--v2-accent)]">{copy.after}</p><p className="mt-3 leading-relaxed">{item.after}</p></div>
        <Link to={projectPath(language, item.slug)} className="mt-8 inline-flex min-h-11 items-center gap-3 font-semibold text-[var(--v2-accent)] underline underline-offset-4">{copy.proof} · {item.project}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      </article>)}</div>
    </div>
  </section>;
}
