import HeroAtmosphere from '../features/motion/HeroAtmosphere';
import { useTilt } from '../features/motion/useTilt';
import { ArrowDownRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { heroCopy } from '../content/hero';
import { sectionPath } from '../router/paths';
import { trackCTA } from '../analytics/trackingEvents';

export default function Hero() {
  const portraitRef = useTilt<HTMLElement>();
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = heroCopy[language];

  return (
    <section id="home" className="hero-section overflow-hidden bg-[var(--v2-background)] text-[var(--v2-text)]">
      <HeroAtmosphere />
      <div className="relative mx-auto grid max-w-[var(--v2-content-width)] gap-9 px-5 pb-10 pt-10 sm:px-8 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,.85fr)] lg:items-center lg:gap-10 lg:pb-12 lg:pt-14">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)] sm:text-sm">{copy.eyebrow}</p>
          <h1 className="font-display text-[clamp(2.25rem,3.7vw,4rem)] font-semibold leading-[1.05] tracking-[-.055em]">
            {copy.lineOne}<span className="block text-[var(--v2-accent)]">{copy.lineTwo}</span>
          </h1>
          <p className="mt-5 text-base font-semibold tracking-wide sm:text-lg">Senior Full-Stack Developer &amp; Applied AI Engineer</p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-[var(--v2-text-secondary)] sm:text-lg">{copy.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to={sectionPath(language, 'work')} onClick={() => trackCTA('hero_view_projects')} className="inline-flex min-h-12 items-center gap-3 rounded-lg bg-[var(--v2-accent)] px-5 py-3 font-semibold text-[var(--v2-on-accent)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)] motion-reduce:transform-none">{copy.work}<ArrowDownRight size={19} aria-hidden="true" /></Link>
            <Link to={sectionPath(language, 'contact')} onClick={() => trackCTA('hero_contact')} className="inline-flex min-h-12 items-center gap-3 rounded-lg border border-[var(--v2-border)] px-5 py-3 font-semibold hover:bg-[var(--v2-surface-raised)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)]">{copy.contact}<ArrowUpRight size={19} aria-hidden="true" /></Link>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[var(--v2-border)] pt-5 text-sm text-[var(--v2-text-secondary)]">
            <span className="inline-flex items-center gap-1.5"><MapPin size={15} aria-hidden="true" />{copy.location}</span>
            <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[var(--v2-accent)]" />{copy.availability}</span>
            <a href="https://github.com/henryTeran" onClick={() => trackCTA('hero_github')} target="_blank" rel="noreferrer" className="hover:text-[var(--v2-text)]">GitHub</a>
            <a href="https://linkedin.com/in/henry-teran" onClick={() => trackCTA('hero_linkedin')} target="_blank" rel="noreferrer" className="hover:text-[var(--v2-text)]">LinkedIn</a>
          </div>
        </div>
        <figure ref={portraitRef} className="hero-portrait">
          <div className="hero-orbit" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-photo-frame">
            <img src="/henry-portrait.webp" width="800" height="800" alt="Henry Teran" {...{ fetchpriority: 'high' }} decoding="async" className="hero-photo" />
            <figcaption><span>Henry Teran</span><span>{copy.location}</span></figcaption>
          </div>
          <div className="hero-badge hero-badge--top">Applied AI <span aria-hidden="true">&#8599;</span></div>
          <div className="hero-badge hero-badge--bottom">Full-Stack &middot; Product Engineering</div>
        </figure>
      </div>
    </section>
  );
}
