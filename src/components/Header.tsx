import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-400">
            Henry Teran
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('accueil')} className="hover:text-blue-400 transition-colors">
              Accueil
            </button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">
              À propos
            </button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-blue-400 transition-colors">
              Compétences
            </button>
            <button onClick={() => scrollToSection('projects')} className="hover:text-blue-400 transition-colors">
              Projets
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">
              Services
            </button>
            <button onClick={() => scrollToSection('contact')} className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition-colors">
              Contact
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-t border-slate-800">
            <div className="flex flex-col p-4 space-y-4">
              <button onClick={() => scrollToSection('accueil')} className="text-left hover:text-blue-400 transition-colors py-2">
                Accueil
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-blue-400 transition-colors py-2">
                À propos
              </button>
              <button onClick={() => scrollToSection('skills')} className="text-left hover:text-blue-400 transition-colors py-2">
                Compétences
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-left hover:text-blue-400 transition-colors py-2">
                Projets
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left hover:text-blue-400 transition-colors py-2">
                Services
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;