import React from 'react';
import { Code, Server, Smartphone, Brain, Database, GitBranch } from 'lucide-react';

const Skills = () => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div 
                key={category.title}
                className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300 group hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${getColorClasses(category.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{category.description}</p>
                
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full bg-${category.color}-400 mr-3`}></div>
                      <span className="text-gray-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <div className="text-center">
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