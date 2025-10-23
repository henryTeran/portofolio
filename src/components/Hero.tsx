import React from 'react';
import { ArrowRight, Code2, Database, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' });

  return (
    <section id="accueil" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(34,211,238,.06), transparent 40%), radial-gradient(600px at 30% 10%, rgba(99,102,241,.08), transparent 60%), var(--bg)'}}/>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="text-[var(--primary)] font-medium text-lg">{t('hero.hi')}</span>
              <h1 className="text-5xl lg:text-7xl font-display font-extrabold mt-2 mb-2" style={{color:'var(--text)'}}>Henry Teran</h1>
              <h2 className="text-2xl lg:text-3xl font-semibold" style={{color:'var(--primary)'}}>{t('hero.role')}</h2>
            </div>

            <p className="text-xl text-[var(--muted)] mb-8 leading-relaxed">
              Spécialisé en <span className="text-[var(--primary)] font-semibold">ERP</span>,
              <span className="text-[var(--primary)] font-semibold"> plateformes médicales</span>,
              <span className="text-green-400 font-semibold"> IA</span> et
              <span className="text-[var(--accent)] font-semibold"> e-commerce</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button onClick={scrollToContact} className="btn">
                {t('hero.cta.work')} <ArrowRight size={20}/>
              </button>
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="kbd">
                {t('hero.cta.projects')}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">6+</div>
                <div className="text-sm text-[var(--muted)]">Projets réalisés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[var(--primary)]">5+</div>
                <div className="text-sm text-[var(--muted)]">Technologies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-[var(--muted)]">Disponibilité</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card">
              <div className="grid grid-cols-2 gap-6">
                <div className="card bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10">
                  <Code2 className="text-[var(--primary)] mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Frontend</h3>
                  <p className="text-sm text-[var(--muted)]">Angular, React, Tailwind</p>
                </div>
                <div className="card bg-gradient-to-br from-green-500/20 to-green-600/10">
                  <Database className="text-green-400 mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Backend</h3>
                  <p className="text-sm text-[var(--muted)]">Python/Flask, Node.js</p>
                </div>
                <div className="card bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10">
                  <Smartphone className="text-[var(--accent)] mb-4" size={40} />
                  <h3 className="font-semibold mb-2">Mobile</h3>
                  <p className="text-sm text-[var(--muted)]">Ionic, PWA</p>
                </div>
                <div className="card bg-gradient-to-br from-emerald-500/20 to-emerald-600/10">
                  <div className="text-emerald-400 mb-4 text-2xl font-bold">AI</div>
                  <h3 className="font-semibold mb-2">Intelligence</h3>
                  <p className="text-sm text-[var(--muted)]">OpenAI, RPA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;