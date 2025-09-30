import React from 'react';
import { Code, Building, Smartphone, Brain, ShoppingCart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: 'Développement Full-Stack Sur Mesure',
      description: 'Création d\'applications web complètes avec architectures modernes, API REST et interfaces utilisateur performantes.',
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
      title: 'Création d\'ERP & Solutions Métiers',
      description: 'Développement de systèmes de gestion d\'entreprise modulaires et évolutifs adaptés à vos processus spécifiques.',
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
      title: 'Applications Web & Mobiles',
      description: 'Développement d\'applications cross-platform avec des technologies modernes pour une expérience utilisateur optimale.',
      icon: Smartphone,
      color: 'purple',
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
      title: 'Intégration IA & Automatisation',
      description: 'Implémentation de solutions d\'intelligence artificielle et d\'automatisation pour optimiser vos processus.',
      icon: Brain,
      color: 'indigo',
      includes: [
        'Chatbots intelligents',
        'Automatisation RPA',
        'Analyse de données',
        'Machine Learning',
        'Intégration OpenAI',
        'Optimisation processus'
      ]
    },
    {
      title: 'E-commerce & Plateformes SaaS',
      description: 'Création de plateformes e-commerce et SaaS avec paiements sécurisés et gestion utilisateurs avancée.',
      icon: ShoppingCart,
      color: 'blue',
      includes: [
        'Catalogue produits avancé',
        'Paiements sécurisés',
        'Gestion commandes',
        'Système d\'abonnements',
        'Analytics e-commerce',
        'Multi-tenant SaaS'
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
      green: 'bg-green-500/10 border-green-500/30 text-green-400',
      purple: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
      indigo: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="services" className="py-20 bg-slate-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Services Proposés
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Des solutions complètes pour transformer vos idées en réalité numérique
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${getColorClasses(service.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Inclus :</h4>
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-${service.color}-400 mr-3`}></div>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Process */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Mon processus de travail</h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Analyse', desc: 'Étude approfondie de vos besoins' },
              { step: '02', title: 'Conception', desc: 'Architecture et design de la solution' },
              { step: '03', title: 'Développement', desc: 'Implémentation avec tests continus' },
              { step: '04', title: 'Livraison', desc: 'Déploiement et formation utilisateurs' }
            ].map((phase, index) => (
              <div key={phase.step} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                  {phase.step}
                </div>
                <h4 className="text-lg font-semibold mb-2">{phase.title}</h4>
                <p className="text-gray-400 text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;