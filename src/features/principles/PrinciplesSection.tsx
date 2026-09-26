import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { principlesCopy } from '../../content/principles';

export default function PrinciplesSection() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = principlesCopy[language];

  return <section id="approach" className="scroll-mt-20 bg-[var(--v2-background)] py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.5vw,4.6rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 max-w-md text-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
        <ol className="principles-track border-t border-[var(--v2-border)]">{copy.items.map((item, index) => <li key={item.title} data-motion-item className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[var(--v2-border)] py-6 sm:grid-cols-[4rem_1fr] sm:py-8"><span className="font-mono text-sm text-[var(--v2-accent)]">0{index + 1}</span><div><h3 className="text-xl font-semibold sm:text-2xl">{item.title}</h3><p className="mt-2 max-w-xl leading-relaxed text-[var(--v2-text-secondary)]">{item.description}</p></div></li>)}</ol>
      </div>
    </div>
  </section>;
}
