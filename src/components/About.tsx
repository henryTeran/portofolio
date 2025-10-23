import React from 'react';
import { Globe, Users, Lightbulb, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Feature from '../ui/Feature';

const About = () => {
  const { t } = useTranslation();
  return (
    <section id="about" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
              {t('about.title')}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] mx-auto"></div>
            <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-1"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-[var(--primary)]">
                {t('about.lead')}
              </h3>
              <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed">
                Fort d'une formation d'ingénieur en microtechnique et d'une expertise approfondie
                en développement full-stack, je me spécialise dans la création de solutions
                technologiques innovantes et performantes.
              </p>
              <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed">
                Mon approche combine rigueur technique, créativité et une communication
                multilingue pour livrer des projets qui dépassent les attentes de mes clients.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center card">
                  <div className="text-2xl font-bold text-[var(--primary)] mb-2">450-500€</div>
                  <div className="text-sm text-[var(--muted)]">TJM</div>
                </div>
                <div className="text-center card">
                  <div className="text-2xl font-bold text-[var(--primary)] mb-2">Immédiat</div>
                  <div className="text-sm text-[var(--muted)]">Disponibilité</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Feature icon={<Lightbulb className="text-[var(--primary)]" size={24} />} title="Rigueur & Créativité">
                Approche méthodique combinée à une pensée innovante pour des solutions sur mesure.
              </Feature>

              <Feature icon={<Users className="text-green-400" size={24} />} title="Autonomie">
                Capacité à gérer des projets complexes de A à Z en toute indépendance.
              </Feature>

              <Feature icon={<MessageSquare className="text-[var(--accent)]" size={24} />} title="Communication Multilingue">
                Français, Anglais, Espagnol, Italien - pour une collaboration internationale.
              </Feature>

              <Feature icon={<Globe className="text-emerald-400" size={24} />} title="Télétravail & Hybride">
                Flexible sur Genève/France avec possibilité de déplacements.
              </Feature>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;