import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'ZIGOMA ERP',
      description: 'ERP modulaire complet avec CRM intégré, système de facturation avancé et intelligence artificielle pour l\'optimisation des processus métiers.',
      technologies: ['Python/Flask', 'React', 'PostgreSQL', 'OpenAI', 'Docker'],
      features: ['CRM intégré', 'Facturation automatisée', 'IA intégrée', 'Modules personnalisables'],
      category: 'ERP',
      color: 'blue'
    },
    {
      title: 'WellSync',
      description: 'Application mobile de bien-être avec IA intégrée, utilisant Firebase pour la synchronisation en temps réel et Ionic pour l\'expérience mobile.',
      technologies: ['Ionic', 'Firebase', 'Angular', 'OpenAI', 'TypeScript'],
      features: ['IA personnalisée', 'Sync temps réel', 'Interface intuitive', 'Analytics avancés'],
      category: 'Mobile & IA',
      color: 'green'
    },
    {
      title: 'HealthSync',
      description: 'Plateforme médicale complète connectant patients et médecins avec gestion des consultations, dossiers médicaux et télémédecine.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
      features: ['Télémédecine', 'Dossiers sécurisés', 'Planning intégré', 'Notifications'],
      category: 'Santé',
      color: 'purple'
    },
    {
      title: 'BeautyBooker',
      description: 'Plateforme de réservation pour soins esthétiques avec gestion des créneaux, paiements en ligne et système de fidélité client.',
      technologies: ['Angular', 'Firebase', 'Stripe', 'PWA', 'Tailwind'],
      features: ['Réservations en ligne', 'Paiements sécurisés', 'Programme fidélité', 'Interface responsive'],
      category: 'E-commerce',
      color: 'indigo'
    },
    {
      title: 'SelfServiceDesk',
      description: 'Application mobile de commande rapide pour restaurants avec interface intuitive, gestion des stocks et analytics en temps réel.',
      technologies: ['Ionic', 'Firebase', 'Angular', 'PayPal', 'PWA'],
      features: ['Commandes rapides', 'Gestion stocks', 'Analytics', 'Mode hors-ligne'],
      category: 'Mobile',
      color: 'teal'
    },
    {
      title: 'FromDeepestRecord',
      description: 'E-commerce musical multilingue avec catalogue avancé, recommandations IA et système de streaming intégré.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      features: ['Multilingue', 'Recommandations IA', 'Streaming intégré', 'Gestion catalogue'],
      category: 'E-commerce',
      color: 'blue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/30 text-blue-400',
      green: 'border-green-500/30 text-green-400',
      purple: 'border-purple-500/30 text-purple-400',
      purple: 'border-purple-500/30 text-purple-400',
      indigo: 'border-indigo-500/30 text-indigo-400',
      teal: 'border-teal-500/30 text-teal-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="projects" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Réalisations & Projets
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez mes projets les plus récents et les technologies utilisées
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto mt-6"></div>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 overflow-hidden hover:transform hover:scale-[1.02]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Project Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getColorClasses(project.color)} mb-3`}>
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <ExternalLink size={18} />
                    </button>
                    <button className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                      <Github size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                    Fonctionnalités clés
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <div className={`w-1.5 h-1.5 rounded-full bg-${project.color}-400 mr-2`}></div>
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                    Technologies utilisées
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-sm border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button className={`flex items-center gap-2 text-${project.color}-400 hover:text-${project.color}-300 font-medium transition-colors group-hover:gap-3`}>
                  En savoir plus
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Vous avez un projet en tête ?</h3>
            <p className="text-gray-300 mb-6">
              Discutons de la façon dont je peux vous aider à le concrétiser
            </p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Démarrer un projet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;