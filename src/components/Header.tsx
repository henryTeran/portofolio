import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link, NavLink, useParams } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import { DEFAULT_LANGUAGE, isSupportedLanguage, type LanguageCode } from '../constants/i18n';

const Header = () => {
  const base = import.meta.env.BASE_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();
  const { lang = DEFAULT_LANGUAGE } = useParams();

  const language: LanguageCode = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;

  const buildLanguagePath = (segment = '') =>
    `/${language}${segment ? `/${segment}` : ''}`;

  const buildSectionPath = (section: 'about' | 'skills' | 'projects' | 'services' | 'contact') =>
    `/${language}#${section}`;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const hasBackground = isScrolled || isMenuOpen;

  const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
    `hover:text-[var(--primary)] ${isActive ? 'text-[var(--primary)]' : ''}`;

  const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-left py-2 hover:text-[var(--primary)] ${isActive ? 'text-[var(--primary)]' : ''}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        hasBackground
          ? 'bg-[var(--bg)]/98 backdrop-blur-lg border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo cliquable */}
          <Link
            to={buildLanguagePath()}
            onClick={closeMenu}
            className="flex items-center focus:outline-none"
            aria-label="Aller à la page d'accueil"
          >
            {/* clair */}
            <img
              src={`${base}logo-dark.svg`}
              alt="Henry Teran - logo clair"
              className="block dark:hidden w-40 sm:w-52"
            />
            {/* sombre */}
            <img
              src={`${base}logo-light.svg`}
              alt="Henry Teran - logo sombre"
              className="hidden dark:block w-40 sm:w-52"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-[var(--muted)]">
            <NavLink to={buildLanguagePath()} end className={desktopLinkClass}>
              {t('nav.home')}
            </NavLink>
            <NavLink to={`${buildLanguagePath()}#about`} className="hover:text-[var(--primary)]">
              {t('nav.about')}
            </NavLink>
            <NavLink to={`${buildLanguagePath()}#skills`} className="hover:text-[var(--primary)]">
              {t('nav.skills')}
            </NavLink>
            <NavLink to={buildSectionPath('projects')} className="hover:text-[var(--primary)]">
              {t('nav.projects')}
            </NavLink>
            <NavLink to={buildSectionPath('services')} className="hover:text-[var(--primary)]">
              {t('nav.services')}
            </NavLink>
            <NavLink to={buildSectionPath('contact')} className="btn">
              {t('nav.contact')}
            </NavLink>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[var(--text)]"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label="Ouvrir / fermer le menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu avec slide droite -> gauche */}
        <div
          className={`
            md:hidden absolute top-full left-0 right-0 bg-[var(--bg)] border-t border-white/10
            transform transition-transform duration-300
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="flex flex-col p-4 space-y-3">
            <NavLink
              to={buildLanguagePath()}
              end
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              {t('nav.home')}
            </NavLink>
            <Link
              to={`${buildLanguagePath()}#about`}
              onClick={closeMenu}
              className="text-left hover:text-[var(--primary)] py-2"
            >
              {t('nav.about')}
            </Link>
            <Link
              to={`${buildLanguagePath()}#skills`}
              onClick={closeMenu}
              className="text-left hover:text-[var(--primary)] py-2"
            >
              {t('nav.skills')}
            </Link>
            <NavLink
              to={buildSectionPath('projects')}
              onClick={closeMenu}
              className="text-left hover:text-[var(--primary)] py-2"
            >
              {t('nav.projects')}
            </NavLink>
            <NavLink
              to={buildSectionPath('services')}
              onClick={closeMenu}
              className="text-left hover:text-[var(--primary)] py-2"
            >
              {t('nav.services')}
            </NavLink>

            <div className="flex items-center justify-between pt-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <NavLink
              to={buildSectionPath('contact')}
              onClick={closeMenu}
              className="text-left btn mt-4 w-full"
            >
              {t('nav.contact')}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
