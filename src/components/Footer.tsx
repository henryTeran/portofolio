import React from 'react';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-app border-t border-white/10 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-display font-bold text-[var(--primary)] mb-4">
              Henry Teran Corrales
            </div>
            <p className="text-[var(--muted)] mb-4">
              Développeur Full-Stack Freelance spécialisé en solutions innovantes
              pour l'entreprise moderne.
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/henry-teran"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="text-[var(--primary)]" size={20} />
              </a>
              <a
                href="https://github.com/henry-teran"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="text-[var(--muted)]" size={20} />
              </a>
              <a
                href="mailto:teranhenryc@gmail.com"
                className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
              >
                <Mail className="text-[var(--primary)]" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              <button
                onClick={() => document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {t('nav.home')}
              </button>
              <button
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {t('nav.skills')}
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {t('nav.projects')}
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                {t('nav.services')}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-[var(--primary)] mr-3" size={18} />
                <a
                  href="mailto:teranhenryc@gmail.com"
                  className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
                >
                  teranhenryc@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-[var(--muted)]">Disponible immédiatement</span>
              </div>
              <div className="text-[var(--muted)] text-sm">
                TJM : 450-500€ / jour<br />
                Télétravail ou hybride (Genève/France)
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-[var(--muted)] text-sm mb-4 md:mb-0">
              © {currentYear} Henry Teran Corrales. {t('footer.rights')}
            </div>
            <div className="flex items-center text-[var(--muted)] text-sm">
              Fait avec <Heart className="mx-2 text-red-400" size={16} /> et beaucoup de café
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;