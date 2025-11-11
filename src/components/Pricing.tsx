import React from 'react';
import { Check, Clock, MapPin, Euro } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Pricing = () => {
  const { t } = useTranslation();
  return (
    <section id="pricing" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="card hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[var(--primary)]/30">
                  <Euro className="text-[var(--primary)]" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('pricing.dayRate')}</h3>
                <div className="text-5xl font-bold text-[var(--primary)] mb-2">{t('pricing.dayRateValue')}</div>
                <p className="text-[var(--muted)] text-sm mt-4">{t('pricing.dayRateDescription')}</p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold mb-2">{t('pricing.includes')}</h4>
                {(t('pricing.includesList', { returnObjects: true }) as string[]).map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3 flex-shrink-0"></div>
                    <span className="text-[var(--muted)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[var(--primary)]/30">
                  <Clock className="text-[var(--primary)]" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{t('pricing.fixedPrice')}</h3>
                <p className="text-[var(--muted)]">{t('pricing.fixedPriceDescription')}</p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-emerald-400 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">{t('contact.info.location')}</div>
                    <div className="text-[var(--muted)]">{t('contact.info.locationValue')}</div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-emerald-400 mb-1">{t('contact.info.availability')}</div>
                    <div className="text-lg font-bold">{t('pricing.availability')}</div>
                  </div>
                </div>

                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full btn"
                >
                  {t('pricing.cta')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;