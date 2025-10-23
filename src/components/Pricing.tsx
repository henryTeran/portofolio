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
            Des tarifs transparents pour une collaboration sereine
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
                <h3 className="text-2xl font-bold mb-4">Tarif Journalier</h3>
                <div className="text-5xl font-bold text-[var(--primary)] mb-2">450-500€</div>
                <div className="text-[var(--muted)]">par jour</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-[var(--muted)]">Développement full-stack complet</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-[var(--muted)]">Architecture technique & conseil</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-[var(--muted)]">Tests & documentation inclus</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-[var(--muted)]">Support post-livraison</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-[var(--muted)]">Formations utilisateurs</span>
                </div>
              </div>
            </div>

            <div className="card hover:border-[var(--primary)]/50 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[var(--primary)]/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-[var(--primary)]/30">
                  <Clock className="text-[var(--primary)]" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Disponibilité</h3>
                <div className="text-3xl font-bold text-[var(--primary)] mb-2">Immédiate</div>
                <div className="text-[var(--muted)]">Prêt à démarrer</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">Modalités de travail</div>
                    <div className="text-[var(--muted)]">Télétravail ou hybride (Genève/France)</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="text-[var(--primary)] mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold mb-1">Horaires flexibles</div>
                    <div className="text-[var(--muted)]">Adaptation à vos fuseaux horaires</div>
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-green-400 mb-1">STATUT ACTUEL</div>
                    <div className="text-lg font-bold">Disponible immédiatement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-[var(--primary)]">Missions courtes</h4>
                <p className="text-[var(--muted)]">À partir de 3 jours pour des interventions ponctuelles</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">Projets moyens</h4>
                <p className="text-[var(--muted)]">1-6 mois pour des développements complets</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-[var(--accent)]">Accompagnement long terme</h4>
                <p className="text-[var(--muted)]">Maintenance et évolutions continues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;