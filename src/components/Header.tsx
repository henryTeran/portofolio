import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

const Header = () => {
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

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--bg)]/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-display font-bold text-[var(--text)]">
            <div className="text-xl font-display font-bold text-[var(--text)]">
              {/* Affiché en mode clair */}
              <img
                src="/logo-dark.svg"
                alt="Logo clair"
                className="block dark:hidden w-64"
              />
              {/* Affiché en mode sombre */}
              <img
                src="/logo-light.svg"
                alt="Logo sombre"
                className="hidden dark:block w-64"
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[var(--muted)]">
            <button onClick={() => scrollTo('accueil')} className="hover:text-[var(--primary)]">{t('nav.home')}</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[var(--primary)]">{t('nav.about')}</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-[var(--primary)]">{t('nav.skills')}</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-[var(--primary)]">{t('nav.projects')}</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[var(--primary)]">{t('nav.services')}</button>
            <button onClick={() => scrollTo('contact')} className="btn">{t('nav.contact')}</button>
            <LanguageSwitcher/>
            <ThemeToggle/>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[var(--bg)]/95 backdrop-blur-sm border-t border-white/10">
            <div className="flex flex-col p-4 space-y-3">
              <button onClick={() => scrollTo('accueil')} className="text-left hover:text-[var(--primary)] py-2">{t('nav.home')}</button>
              <button onClick={() => scrollTo('about')} className="text-left hover:text-[var(--primary)] py-2">{t('nav.about')}</button>
              <button onClick={() => scrollTo('skills')} className="text-left hover:text-[var(--primary)] py-2">{t('nav.skills')}</button>
              <button onClick={() => scrollTo('projects')} className="text-left hover:text-[var(--primary)] py-2">{t('nav.projects')}</button>
              <button onClick={() => scrollTo('services')} className="text-left hover:text-[var(--primary)] py-2">{t('nav.services')}</button>
              <div className="flex items-center justify-between">
                <LanguageSwitcher/><ThemeToggle/>
              </div>
              <button onClick={() => scrollTo('contact')} className="text-left btn mt-2">{t('nav.contact')}</button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;