import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const base = import.meta.env.BASE_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // dès qu'on scrolle OU qu'on ouvre le menu → fond visible
  const hasBackground = isScrolled || isMenuOpen;

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
          {/* Logo */}
          <div className="flex items-center">
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
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-[var(--muted)]">
            <button onClick={() => scrollTo('accueil')} className="hover:text-[var(--primary)]">
              {t('nav.home')}
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-[var(--primary)]">
              {t('nav.about')}
            </button>
            <button onClick={() => scrollTo('skills')} className="hover:text-[var(--primary)]">
              {t('nav.skills')}
            </button>
            <button onClick={() => scrollTo('projects')} className="hover:text-[var(--primary)]">
              {t('nav.projects')}
            </button>
            <button onClick={() => scrollTo('services')} className="hover:text-[var(--primary)]">
              {t('nav.services')}
            </button>
            <button onClick={() => scrollTo('contact')} className="btn">
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[var(--text)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg)] border-t border-white/10">
            <div className="flex flex-col p-4 space-y-3">
              <button
                onClick={() => scrollTo('accueil')}
                className="text-left hover:text-[var(--primary)] py-2"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="text-left hover:text-[var(--primary)] py-2"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollTo('skills')}
                className="text-left hover:text-[var(--primary)] py-2"
              >
                {t('nav.skills')}
              </button>
              <button
                onClick={() => scrollTo('projects')}
                className="text-left hover:text-[var(--primary)] py-2"
              >
                {t('nav.projects')}
              </button>
              <button
                onClick={() => scrollTo('services')}
                className="text-left hover:text-[var(--primary)] py-2"
              >
                {t('nav.services')}
              </button>

              <div className="flex items-center justify-between pt-2">
                <LanguageSwitcher />
                <ThemeToggle />
              </div>

              <button
                onClick={() => scrollTo('contact')}
                className="text-left btn mt-4 w-full"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
