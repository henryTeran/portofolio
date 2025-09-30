import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const Projects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, projects.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
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
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Slide */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div 
                  key={project.title}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-8 h-full">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${getColorClasses(project.color)}`}>
                            {project.category}
                          </span>
                          <span className="text-sm text-gray-400">{project.period}</span>
                        </div>
                        <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
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

                    <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                      {project.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
                        Fonctionnalités clés
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        {project.features.map((feature) => (
                          <div key={feature} className="flex items-center">
                            <div className={`w-2 h-2 rounded-full bg-${project.color}-400 mr-3`}></div>
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">
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
                    <button className={`flex items-center gap-2 text-${project.color}-400 hover:text-${project.color}-300 font-medium transition-colors`}>
                      En savoir plus
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 p-3 rounded-full border border-slate-600 transition-colors z-10"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 p-3 rounded-full border border-slate-600 transition-colors z-10"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-500' : 'bg-slate-600 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              {isAutoPlaying ? 'Pause auto-play' : 'Reprendre auto-play'}
            </button>
          </div>
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