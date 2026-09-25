import { ArrowUpRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { navigationCopy } from '../content/navigation';
import { homePath, sectionPath } from '../router/paths';

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
      <div><Link to={homePath(language)} className="text-xl font-bold tracking-tight">Henry Teran<span className="text-[var(--v2-accent)]">.</span></Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--v2-text-secondary)]">Senior Full-Stack Developer &amp; Applied AI Engineer</p></div>
      <nav aria-label={copy.nav}><h2 className="mb-4 text-sm font-semibold">{copy.nav}</h2><ul className="space-y-2">{links.map((item) => <li key={item.id}><Link to={sectionPath(language, item.id)} className="text-sm text-[var(--v2-text-secondary)] hover:text-[var(--v2-accent)]">{item.label}</Link></li>)}</ul></nav>
      <div><h2 className="mb-4 text-sm font-semibold">{copy.contact}</h2><a href="mailto:teranhenryc@gmail.com" className="block break-all text-sm text-[var(--v2-text-secondary)] hover:text-[var(--v2-accent)]">teranhenryc@gmail.com</a><div className="mt-4 flex gap-5 text-sm"><a href="https://linkedin.com/in/henry-teran" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--v2-accent)]">LinkedIn<ArrowUpRight size={14} aria-hidden="true" /></a><a href="https://github.com/henryTeran" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-[var(--v2-accent)]">GitHub<ArrowUpRight size={14} aria-hidden="true" /></a></div></div>
    </div>
    <div className="mx-auto flex max-w-[var(--v2-content-width)] flex-wrap justify-between gap-3 border-t border-[var(--v2-border)] px-5 py-5 text-xs text-[var(--v2-text-secondary)] sm:px-8"><span>© {new Date().getFullYear()} Henry Teran</span><span>Geneva, Switzerland</span></div>
  </footer>;
}
