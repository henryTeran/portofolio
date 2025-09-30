import React from 'react';
import { Mail, Linkedin, Github, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">
              Henry Teran Corrales
            </div>
            <p className="text-gray-300 mb-4">
              Développeur Full-Stack Freelance spécialisé en solutions innovantes 
              pour l'entreprise moderne.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com/in/henry-teran" 
                className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center border border-blue-600/30 hover:bg-blue-600/30 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="text-blue-400" size={20} />
              </a>
              <a 
                href="https://github.com/henry-teran" 
                className="w-10 h-10 bg-gray-600/20 rounded-lg flex items-center justify-center border border-gray-600/30 hover:bg-gray-600/30 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="text-gray-400" size={20} />
              </a>
              <a 
                href="mailto:teranhenryc@gmail.com" 
                className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
              >
                <Mail className="text-blue-400" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <div className="space-y-2">
              <button 
                onClick={() => document.getElementById('accueil')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Accueil
              </button>
              <button 
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                À propos
              </button>
              <button 
                onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Compétences
              </button>
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Projets
              </button>
              <button 
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="block text-gray-300 hover:text-blue-400 transition-colors"
              >
                Services
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="text-blue-400 mr-3" size={18} />
                <a 
                  href="mailto:teranhenryc@gmail.com" 
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  teranhenryc@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                <span className="text-gray-300">Disponible immédiatement</span>
              </div>
              <div className="text-gray-400 text-sm">
                TJM : 450-500€ / jour<br />
                Télétravail ou hybride (Genève/France)
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Henry Teran Corrales. Tous droits réservés.
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              Fait avec <Heart className="mx-2 text-red-400" size={16} /> et beaucoup de café
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;