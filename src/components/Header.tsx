import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { navigationCopy } from '../content/navigation';
import { homePath, sectionPath } from '../router/paths';
import { trackCTA } from '../analytics/trackingEvents';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang } = useParams();
  const location = useLocation();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = navigationCopy[language];
  const links = [
    { id: 'projects', label: copy.work },
    { id: 'expertise', label: copy.expertise },
    { id: 'approach', label: copy.approach },
    { id: 'journey', label: copy.journey },
  ];

  useEffect(() => setOpen(false), [location.pathname, location.hash]);
  useEffect(() => {
    if (!open) return;
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, [open]);

  const contact = () => trackCTA('header_contact');

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--v2-border)] bg-[var(--v2-background)]/95 text-[var(--v2-text)] backdrop-blur-md">
      <nav className="mx-auto flex max-w-[var(--v2-content-width)] items-center justify-between gap-4 px-5 py-4 sm:px-8" aria-label={copy.nav}>
        <Link to={homePath(language)} className="shrink-0 text-lg font-bold tracking-tight outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" onClick={() => setOpen(false)}>
          Henry Teran<span className="text-[var(--v2-accent)]">.</span>
        </Link>
        <div className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {links.map((item) => <Link key={item.id} to={sectionPath(language, item.id)} className="text-sm text-[var(--v2-text-secondary)] transition-colors hover:text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]">{item.label}</Link>)}
          <Link to={sectionPath(language, 'contact')} onClick={contact} className="text-sm font-semibold text-[var(--v2-accent)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]">{copy.contact}</Link>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--v2-border)] lg:hidden" aria-label={open ? copy.close : copy.menu} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>
      {open && <div id="mobile-navigation" className="border-t border-[var(--v2-border)] bg-[var(--v2-background)] px-5 pb-6 pt-3 lg:hidden">
        <div className="mx-auto flex max-w-[var(--v2-content-width)] flex-col gap-1">
          {links.map((item) => <Link key={item.id} to={sectionPath(language, item.id)} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base hover:bg-[var(--v2-surface-raised)]">{item.label}</Link>)}
          <Link to={sectionPath(language, 'contact')} onClick={() => { contact(); setOpen(false); }} className="rounded-lg px-3 py-3 font-semibold text-[var(--v2-accent)] hover:bg-[var(--v2-surface-raised)]">{copy.contact}</Link>
          <div className="mt-3 flex items-center gap-4 border-t border-[var(--v2-border)] pt-4"><LanguageSwitcher /><ThemeToggle /></div>
        </div>
      </div>}
    </header>
  );
}
