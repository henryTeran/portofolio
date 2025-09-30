import React, { useState, useEffect } from 'react';
import { Code, Server, Smartphone, Brain, Database, GitBranch, ChevronLeft, ChevronRight } from 'lucide-react';

const Skills = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code,
      color: 'blue',
      skills: ['Angular', 'React', 'Tailwind CSS', 'Ionic', 'TypeScript', 'JavaScript'],
      description: 'Interfaces utilisateur modernes et performantes'
    },
    {
      title: 'Backend',
      icon: Server,
      color: 'green',
      skills: ['Python/Flask', 'Node.js', 'REST API', 'Express.js', 'FastAPI'],
      description: 'Architectures serveur robustes et scalables'
    },
    {
      title: 'Mobile',
      icon: Smartphone,
      color: 'purple',
      skills: ['Ionic', 'PWA', 'React Native', 'Mobile-First Design'],
      description: 'Applications mobiles cross-platform'
    },
    {
      title: 'IA & Automatisation',
      icon: Brain,
      color: 'indigo',
      skills: ['OpenAI', 'RPA', 'Pandas', 'NumPy', 'Machine Learning'],
      description: 'Intelligence artificielle et automatisation des processus'
    },
    {
      title: 'Bases de données',
      icon: Database,
      color: 'teal',
      skills: ['SQL', 'Firestore', 'MongoDB', 'PostgreSQL', 'Firebase'],
      description: 'Gestion et optimisation des données'
    },
    {
      title: 'DevOps',
      icon: GitBranch,
      color: 'blue',
      skills: ['Git', 'Docker', 'CI/CD', 'AWS', 'Vercel', 'Netlify'],
      description: 'Déploiement et intégration continue'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      green: 'border-green-500/30 bg-green-500/10 text-green-400',
      purple: 'border-purple-500/30 bg-purple-500/10 text-purple-400',
      indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-400',
      teal: 'border-teal-500/30 bg-teal-500/10 text-teal-400'
    };
    return colors[color as keyof typeof colors];
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, skillCategories.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % skillCategories.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + skillCategories.length) % skillCategories.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="skills" className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Compétences Techniques
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une expertise diversifiée pour répondre à tous vos besoins technologiques
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Slide */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {skillCategories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <div 
                    key={category.title}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-12 rounded-2xl border border-slate-700 text-center">
                      <div className={`w-20 h-20 rounded-xl border-2 ${getColorClasses(category.color)} flex items-center justify-center mb-8 mx-auto`}>
                        <Icon size={40} />
                      </div>
                      
                      <h3 className="text-3xl font-bold mb-6">{category.title}</h3>
                      <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                        {category.description}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                        {category.skills.map((skill) => (
                          <div key={skill} className="flex items-center justify-center">
                            <div className={`w-3 h-3 rounded-full bg-${category.color}-400 mr-3`}></div>
                            <span className="text-gray-300 font-medium">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
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
            {skillCategories.map((_, index) => (
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

        {/* Additional Skills */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-blue-400">Technologies supplémentaires</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['Firebase', 'Supabase', 'Redis', 'GraphQL', 'WebSockets', 'Microservices', 'Cloud Computing', 'API Design'].map((tech) => (
              <span 
                key={tech}
                className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-gray-300 hover:border-blue-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;