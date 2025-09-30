import React from 'react';
import { Globe, Users, Lightbulb, MessageSquare } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              À propos de moi
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-orange-400">
                Ingénieur & Développeur Full-Stack
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Fort d'une formation d'ingénieur en microtechnique et d'une expertise approfondie 
                en développement full-stack, je me spécialise dans la création de solutions 
                technologiques innovantes et performantes.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Mon approche combine rigueur technique, créativité et une communication 
                multilingue pour livrer des projets qui dépassent les attentes de mes clients.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-orange-400 mb-2">450-500€</div>
                  <div className="text-sm text-gray-400">TJM</div>
                </div>
                <div className="text-center p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <div className="text-2xl font-bold text-blue-400 mb-2">Immédiat</div>
                  <div className="text-sm text-gray-400">Disponibilité</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600 hover:border-orange-500/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                    <Lightbulb className="text-orange-400" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Rigueur & Créativité</h4>
                </div>
                <p className="text-gray-300">
                  Approche méthodique combinée à une pensée innovante pour des solutions sur mesure.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600 hover:border-blue-500/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Users className="text-blue-400" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Autonomie</h4>
                </div>
                <p className="text-gray-300">
                  Capacité à gérer des projets complexes de A à Z en toute indépendance.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600 hover:border-green-500/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                    <MessageSquare className="text-green-400" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Communication Multilingue</h4>
                </div>
                <p className="text-gray-300">
                  Français, Anglais, Espagnol, Italien - pour une collaboration internationale.
                </p>
              </div>

              <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-6 rounded-xl border border-slate-600 hover:border-purple-500/50 transition-colors">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                    <Globe className="text-purple-400" size={24} />
                  </div>
                  <h4 className="text-xl font-semibold">Télétravail & Hybride</h4>
                </div>
                <p className="text-gray-300">
                  Flexible sur Genève/France avec possibilité de déplacements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;