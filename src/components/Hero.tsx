import { ArrowDownRight, ArrowUpRight, Check, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { heroCopy } from '../content/hero';
import { sectionPath } from '../router/paths';
import { trackCTA } from '../analytics/trackingEvents';

export default function Hero() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = heroCopy[language];

  return (
    <section id="home" className="overflow-hidden bg-[var(--v2-background)] text-[var(--v2-text)]">
      <div className="mx-auto grid max-w-[var(--v2-content-width)] gap-14 px-5 pb-20 pt-20 sm:px-8 sm:pt-24 lg:min-h-[740px] lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)] lg:items-center lg:gap-10 lg:pb-28 lg:pt-28">
        <div className="max-w-3xl">
          <p className="mb-7 text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)] sm:text-sm">{copy.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.9rem,5.4vw,5.9rem)] font-semibold leading-[1.05] tracking-[-.055em]">
            {copy.lineOne}<span className="block text-[var(--v2-accent)]">{copy.lineTwo}</span>
          </h1>
          <p className="mt-7 text-base font-semibold tracking-wide sm:text-lg">Senior Full-Stack Developer &amp; Applied AI Engineer</p>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-[var(--v2-text-secondary)] sm:text-xl">{copy.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to={sectionPath(language, 'projects')} onClick={() => trackCTA('hero_view_projects')} className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[var(--v2-accent)] px-5 py-3 font-semibold text-[#07120f] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)] motion-reduce:transform-none">{copy.work}<ArrowDownRight size={19} aria-hidden="true" /></Link>
            <Link to={sectionPath(language, 'contact')} onClick={() => trackCTA('hero_contact')} className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-[var(--v2-border)] px-5 py-3 font-semibold hover:bg-[var(--v2-surface-raised)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)]">{copy.contact}<ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--v2-border)] pt-5 text-sm text-[var(--v2-text-secondary)]">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" />{copy.location}</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--v2-accent)]" />{copy.availability}</span>
            <a href="https://github.com/henryTeran" onClick={() => trackCTA('hero_github')} target="_blank" rel="noreferrer" className="hover:text-[var(--v2-text)]">GitHub</a>
            <a href="https://linkedin.com/in/henry-teran" onClick={() => trackCTA('hero_linkedin')} target="_blank" rel="noreferrer" className="hover:text-[var(--v2-text)]">LinkedIn</a>
          </div>
        </div>
        <div className="relative min-w-0" aria-label={copy.system}>
          <div className="rounded-2xl border border-[var(--v2-border)] bg-[var(--v2-surface)] p-4 shadow-[0_30px_90px_rgba(0,0,0,.16)] sm:p-6">
            <div className="flex items-center justify-between border-b border-[var(--v2-border)] pb-5">
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-[var(--v2-accent)]">Henry Teran / 01</p><p className="mt-2 text-lg font-semibold">{copy.system}</p></div>
              <span className="rounded-full border border-[var(--v2-border)] px-3 py-1 text-xs text-[var(--v2-text-secondary)]">LIVE SYSTEM</span>
            </div>
            <div className="space-y-3 py-6">
              {[copy.input, copy.logic, copy.intelligence, copy.output].map((label, index) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-7 text-xs font-mono text-[var(--v2-text-secondary)]">0{index + 1}</span>
                  <div className={`flex min-h-14 flex-1 items-center justify-between rounded-lg border px-4 ${index === 2 ? 'border-[var(--v2-accent)] bg-[var(--v2-surface-raised)]' : 'border-[var(--v2-border)]'}`}>
                    <span className="font-medium">{label}</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--v2-accent)]" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-[var(--v2-border)] pt-4 text-sm text-[var(--v2-text-secondary)]"><Check size={17} className="text-[var(--v2-accent)]" aria-hidden="true" />{copy.validated}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
