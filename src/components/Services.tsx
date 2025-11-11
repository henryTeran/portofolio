import React from 'react';
import { Code, Building, Smartphone, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.fullstack.title'),
      description: t('services.fullstack.desc'),
      icon: Code,
      color: 'blue',
      includes: [
        'Architecture technique complète',
        'Frontend & Backend intégrés',
        'API REST/GraphQL',
        'Base de données optimisée',
        'Tests automatisés',
        'Documentation technique'
      ]
    },
    {
      title: t('services.erp.title'),
      description: t('services.erp.desc'),
      icon: Building,
      color: 'green',
      includes: [
        'Analyse des besoins métiers',
        'Modules personnalisés',
        'Intégration CRM/Facturation',
        'Workflows automatisés',
        'Tableaux de bord analytics',
        'Formation utilisateurs'
      ]
    },
    {
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      icon: Smartphone,
      color: 'emerald',
      includes: [
        'Applications cross-platform',
        'PWA (Progressive Web App)',
        'Interface responsive',
        'Fonctionnalités offline',
        'Notifications push',
        'Store deployment'
      ]
    },
    {
      title: t('services.ai.title'),
      description: t('services.ai.desc'),
      icon: Brain,
      color: 'teal',
      includes: [
        'Chatbots intelligents',
        'Automatisation RPA',
        'Analyse de données',
        'Machine Learning',
        'Intégration OpenAI',
        'Optimisation processus'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      green: 'bg-green-500/10 border-green-500/30 text-green-400',
      emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
      teal: 'bg-teal-500/10 border-teal-500/30 text-teal-400'
    };
    return colors[color as keyof typeof colors];
  };


  return (
    <section id="services" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('services.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="card transition-all duration-300 group hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${getColorClasses(service.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-[var(--muted)] mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-3">
                  {service.includes.map((item: string) => (
                    <div key={item} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></div>
                      <span className="text-[var(--muted)]">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;