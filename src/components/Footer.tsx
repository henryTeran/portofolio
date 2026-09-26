import { trackCTA } from '../analytics/trackingEvents';
import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { navigationCopy } from '../content/navigation';
import { homePath, sectionPath } from '../router/paths';
import BrandLogo from './BrandLogo';
import { consentCopy } from '../privacy/consentCopy';
import { openCookiePreferences } from '../privacy/consent';

export default function Footer() {
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = navigationCopy[language];
  const links = [
    { id: 'projects', label: copy.work }, { id: 'expertise', label: copy.expertise },
    { id: 'approach', label: copy.approach }, { id: 'journey', label: copy.journey },
    { id: 'contact', label: copy.contact },
  ];

  return <footer className="border-t border-[var(--v2-border)] bg-[var(--v2-surface)] text-[var(--v2-text)]">
    <div className="mx-auto grid max-w-[var(--v2-content-width)] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Link to={homePath(language)} className="inline-block focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]"><BrandLogo className="w-[180px]" /></Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--v2-text-secondary)]">Senior Full-Stack Developer &amp; Applied AI Engineer</p></div>
      <nav aria-label={copy.nav}><h2 className="mb-4 text-sm font-semibold">{copy.nav}</h2><ul className="space-y-2">{links.map((item) => <li key={item.id}><Link to={sectionPath(language, item.id)} className="text-sm text-[var(--v2-text-secondary)] hover:text-[var(--v2-accent)]">{item.label}</Link></li>)}</ul></nav>
      <div><h2 className="mb-4 text-sm font-semibold">{copy.contact}</h2><a href="mailto:teranhenryc@gmail.com" className="block break-all text-sm text-[var(--v2-text-secondary)] hover:text-[var(--v2-accent)]">teranhenryc@gmail.com</a><div className="mt-4 flex gap-5 text-sm"><a href="https://linkedin.com/in/henry-teran" onClick={() => trackCTA('footer_linkedin')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--v2-accent)]">LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://github.com/henryTeran" onClick={() => trackCTA('footer_github')} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--v2-accent)]">GitHub<ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
    </div>
    <nav aria-label={consentCopy[language].privacy} className="mx-auto flex max-w-[var(--v2-content-width)] flex-wrap gap-x-6 gap-y-2 px-5 pb-5 text-sm sm:px-8"><Link className="inline-flex min-h-11 items-center underline underline-offset-4" to={`/${language}/privacy`}>{consentCopy[language].privacy}</Link><button type="button" onClick={openCookiePreferences} className="min-h-11 underline underline-offset-4">{consentCopy[language].preferences}</button></nav>
    <div className="mx-auto flex max-w-[var(--v2-content-width)] flex-wrap justify-between gap-3 border-t border-[var(--v2-border)] px-5 py-5 text-xs text-[var(--v2-text-secondary)] sm:px-8"><span>© {new Date().getFullYear()} Henry Teran</span><span>Geneva, Switzerland</span></div>
  </footer>;
}
