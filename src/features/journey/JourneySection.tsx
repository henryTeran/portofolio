import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../../constants/i18n';
import { journeyCopy } from '../../content/journey';
import { journey } from '../../data/journey';

export default function JourneySection() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = journeyCopy[language];

  return <section id="journey" className="scroll-mt-20 border-y border-[var(--v2-border)] bg-[var(--v2-surface)] py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 text-lg text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
      <ol className="journey-track mt-14 border-t border-[var(--v2-border)]">{journey.map((item) => <li key={item.id} data-motion-item className="grid gap-3 border-b border-[var(--v2-border)] py-7 sm:grid-cols-[11rem_1fr] sm:gap-8 sm:py-9 lg:grid-cols-[14rem_1fr_1fr]">
        <span className="font-mono text-sm text-[var(--v2-accent)]">{item.id === 'freelance' ? `${item.period} ${copy.present}` : item.period}</span>
        <div><h3 className="text-xl font-semibold sm:text-2xl">{item.organization}</h3><p className="mt-2 text-[var(--v2-text-secondary)]">{copy.roles[item.id as keyof typeof copy.roles]}</p></div>
        <p className="text-sm leading-relaxed text-[var(--v2-text-secondary)] sm:col-start-2 lg:col-start-3">{copy.notes[item.id as keyof typeof copy.notes]}</p>
      </li>)}</ol>
    </div>
  </section>;
}
