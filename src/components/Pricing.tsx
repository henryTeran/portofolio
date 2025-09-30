import React from 'react';
import { Check, Clock, MapPin, Euro } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Tarifs & Disponibilité
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Des tarifs transparents pour une collaboration sereine
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Euro className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Tarif Journalier</h3>
                <div className="text-5xl font-bold text-blue-400 mb-2">450-500€</div>
                <div className="text-gray-400">par jour</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Développement full-stack complet</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Architecture technique & conseil</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Tests & documentation inclus</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Support post-livraison</span>
                </div>
                <div className="flex items-center">
                  <Check className="text-green-400 mr-3 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Formations utilisateurs</span>
                </div>
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                  <Clock className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">Disponibilité</h3>
                <div className="text-3xl font-bold text-blue-400 mb-2">Immédiate</div>
                <div className="text-gray-400">Prêt à démarrer</div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-green-400 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">Modalités de travail</div>
                    <div className="text-gray-300">Télétravail ou hybride (Genève/France)</div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-blue-400 mr-3 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <div className="font-semibold text-gray-200 mb-1">Horaires flexibles</div>
                    <div className="text-gray-300">Adaptation à vos fuseaux horaires</div>
                  </div>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                  <div className="text-center">
                    <div className="text-sm font-semibold text-green-400 mb-1">STATUT ACTUEL</div>
                    <div className="text-lg font-bold">Disponible immédiatement</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-blue-400">Missions courtes</h4>
                <p className="text-gray-300">À partir de 3 jours pour des interventions ponctuelles</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-green-400">Projets moyens</h4>
                <p className="text-gray-300">1-6 mois pour des développements complets</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-3 text-purple-400">Accompagnement long terme</h4>
                <p className="text-gray-300">Maintenance et évolutions continues</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;