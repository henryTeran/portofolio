import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Projects = () => {
  const { t } = useTranslation();
  const projects = [
    {
      title: 'ZIGOMA ERP',
      description: 'ERP modulaire complet avec CRM intégré, système de facturation avancé et intelligence artificielle pour l\'optimisation des processus métiers.',
      technologies: ['Python/Flask', 'React', 'PostgreSQL', 'OpenAI', 'Docker'],
      features: ['CRM intégré', 'Facturation automatisée', 'IA intégrée', 'Modules personnalisables'],
      category: 'ERP',
      color: 'blue',
      period: '2025/05 – 06/2025'
    },
    {
      title: 'WellSync',
      description: 'Application mobile de bien-être avec IA intégrée, utilisant Firebase pour la synchronisation en temps réel et Ionic pour l\'expérience mobile.',
      technologies: ['Ionic', 'Firebase', 'Angular', 'OpenAI', 'TypeScript'],
      features: ['IA personnalisée', 'Sync temps réel', 'Interface intuitive', 'Analytics avancés'],
      category: 'Mobile & IA',
      color: 'green',
      period: '03/2025 – 05/2025'
    },
    {
      title: 'HealthSync',
      description: 'Plateforme médicale complète connectant patients et médecins avec gestion des consultations, dossiers médicaux et télémédecine.',
      technologies: ['React', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
      features: ['Télémédecine', 'Dossiers sécurisés', 'Planning intégré', 'Notifications'],
      category: 'Santé',
      color: 'purple',
      period: '01/2025 – 03/2025'
    },
    {
      title: 'BeautyBooker',
      description: 'Plateforme de réservation pour soins esthétiques avec gestion des créneaux, paiements en ligne et système de fidélité client.',
      technologies: ['Angular', 'Firebase', 'Stripe', 'PWA', 'Tailwind'],
      features: ['Réservations en ligne', 'Paiements sécurisés', 'Programme fidélité', 'Interface responsive'],
      category: 'E-commerce',
      color: 'indigo',
      period: '09/2024 – 12/2024'
    },
    {
      title: 'SelfServiceDesk',
      description: 'Application mobile de commande rapide pour restaurants avec interface intuitive, gestion des stocks et analytics en temps réel.',
      technologies: ['Ionic', 'Firebase', 'Angular', 'PayPal', 'PWA'],
      features: ['Commandes rapides', 'Gestion stocks', 'Analytics', 'Mode hors-ligne'],
      category: 'Mobile',
      color: 'teal',
      period: '05/2024 – 08/2024'
    },
    {
      title: 'FromDeepestRecord',
      description: 'E-commerce musical multilingue avec catalogue avancé, recommandations IA et système de streaming intégré.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
      features: ['Multilingue', 'Recommandations IA', 'Streaming intégré', 'Gestion catalogue'],
      category: 'E-commerce',
      color: 'blue',
      period: '01/2024 – 05/2024'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/30 text-blue-400',
      green: 'border-green-500/30 text-green-400',
      purple: 'border-purple-500/30 text-purple-400',
      indigo: 'border-indigo-500/30 text-indigo-400',
      teal: 'border-teal-500/30 text-teal-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="projects" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('nav.projects')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Découvrez mes projets les plus récents et les technologies utilisées
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="card transition-all duration-300 group hover:transform hover:scale-[1.02]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getColorClasses(project.color)}`}>
                      {project.category}
                    </span>
                    <span className="text-sm text-gray-400">{project.period}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
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

              <p className="text-[var(--muted)] mb-6 leading-relaxed">
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
                      <div className={`w-2 h-2 rounded-full bg-${project.color}-400 mr-3`}></div>
                      <span className="text-[var(--muted)] text-sm">{feature}</span>
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
                      className="px-3 py-1 bg-white/5 text-[var(--muted)] rounded-full text-sm border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button className="flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary)]/80 font-medium transition-colors">
                {t('projects.learnmore')}
                <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <div className="card max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('cta.quick.title')}</h3>
            <p className="text-[var(--muted)] mb-6">
              Discutons de la façon dont je peux vous aider à le concrétiser
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn"
            >
              {t('cta.quick.btn')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;