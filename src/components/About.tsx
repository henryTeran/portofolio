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
                {t('about.subtitle')}
              </h3>
              <p className="text-lg text-[var(--muted)] mb-6 leading-relaxed">
                {t('about.p1')}
              </p>
              <p className="text-lg text-[var(--muted)] mb-8 leading-relaxed">
                {t('about.p2')}
              </p>
            </div>

            <div className="space-y-6">
              <Feature icon={<Lightbulb className="text-[var(--primary)]" size={24} />} title={t('about.features.rigor.title')}>
                {t('about.features.rigor.desc')}
              </Feature>

              <Feature icon={<Users className="text-emerald-400" size={24} />} title={t('about.features.autonomy.title')}>
                {t('about.features.autonomy.desc')}
              </Feature>

              <Feature icon={<MessageSquare className="text-[var(--accent)]" size={24} />} title={t('about.features.communication.title')}>
                {t('about.features.communication.desc')}
              </Feature>

              <Feature icon={<Globe className="text-emerald-400" size={24} />} title={t('about.features.remote.title')}>
                {t('about.features.remote.desc')}
              </Feature>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;