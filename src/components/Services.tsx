import React from 'react';
import { Code, Building, Smartphone, Brain, ShoppingCart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.fullstack.title'),
      description: t('services.fullstack.desc'),
      icon: Code,
      color: 'blue',
      includes: t('services.fullstack.includes', { returnObjects: true }),
    },
    {
      title: t('services.erp.title'),
      description: t('services.erp.desc'),
      icon: Building,
      color: 'green',
      includes: t('services.erp.includes', { returnObjects: true }),
    },
    {
      title: t('services.mobile.title'),
      description: t('services.mobile.desc'),
      icon: Smartphone,
      color: 'emerald',
      includes: t('services.mobile.includes', { returnObjects: true }),
    },
    {
      title: t('services.ai.title'),
      description: t('services.ai.desc'),
      icon: Brain,
      color: 'teal',
      includes: t('services.ai.includes', { returnObjects: true }),
    },
    {
      title: t('services.ecommerce.title'),
      description: t('services.ecommerce.desc'),
      icon: ShoppingCart,
      color: 'blue',
      includes: t('services.ecommerce.includes', { returnObjects: true }),
    }
  ];
  const steps = [
    {
      step: '01',
      title: t('services.process.0.title'),
      desc: t('services.process.0.desc'),
    },
    {
      step: '02',
      title: t('services.process.1.title'),
      desc: t('services.process.1.desc'),
    },
    {
      step: '03',
      title: t('services.process.2.title'),
      desc: t('services.process.2.desc'),
    },
    {
      step: '04',
      title: t('services.process.3.title'),
      desc: t('services.process.3.desc'),
    },
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

        <div className="grid lg:grid-cols-3 gap-8">
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
        <div className="max-w-4xl mx-auto mt-16 lg:mt-12 pt-6 lg:pt-16 border-t border-white/10 dark:border-white/10">
          <h3 className="text-3xl font-bold text-center mb-14" style={{ color: 'var(--text)' }}>
            {t('services.processTitle')}
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((phase) => (
              <div key={phase.step} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-600)] rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg text-white group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--text)' }}>
                  {phase.title}
                </h4>
                <p className="text-[var(--muted)] text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;