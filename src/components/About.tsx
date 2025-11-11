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
                {t('about.intro')}
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-semibold mb-4">{t('about.expertise.title')}</h4>
                <div className="space-y-4">
                  {(t('about.expertise.items', { returnObjects: true }) as Array<{ title: string; description: string }>).map((item, index) => (
                    <div key={index} className="border-l-4 border-[var(--primary)] pl-4">
                      <div className="font-semibold text-[var(--text)]">{item.title}</div>
                      <div className="text-sm text-[var(--muted)]">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center card">
                  <div className="text-2xl font-bold text-[var(--primary)] mb-2">450-500€</div>
                  <div className="text-sm text-[var(--muted)]">{t('pricing.dayRate')}</div>
                </div>
                <div className="text-center card">
                  <div className="text-2xl font-bold text-[var(--primary)] mb-2">{t('pricing.availability')}</div>
                  <div className="text-sm text-[var(--muted)]">{t('contact.info.availability')}</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="mb-6">
                <h4 className="text-xl font-semibold mb-4">{t('about.approach.title')}</h4>
                <p className="text-[var(--muted)] mb-4">{t('about.approach.description')}</p>
                <ul className="space-y-2">
                  {(t('about.approach.values', { returnObjects: true }) as string[]).map((value, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-[var(--muted)]">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;