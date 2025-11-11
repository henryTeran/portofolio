import React from 'react';
import { Code, Server, Smartphone, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();

  const skillCategories = [
    {
      title: t('skills.frontend.title'),
      icon: Code,
      color: 'blue',
      skills: ['Angular', 'React', 'Tailwind CSS', 'Ionic', 'TypeScript', 'JavaScript'],
      description: t('skills.frontend.desc')
    },
    {
      title: t('skills.backend.title'),
      icon: Server,
      color: 'green',
      skills: ['Python/Flask', 'Node.js', 'REST API', 'Express.js', 'FastAPI'],
      description: t('skills.backend.desc')
    },
    {
      title: t('skills.mobile.title'),
      icon: Smartphone,
      color: 'emerald',
      skills: ['Ionic', 'PWA', 'React Native', 'Mobile-First Design'],
      description: t('skills.mobile.desc')
    },
    {
      title: t('skills.ai.title'),
      icon: Brain,
      color: 'teal',
      skills: ['OpenAI', 'RPA', 'Pandas', 'NumPy', 'Machine Learning'],
      description: t('skills.ai.desc')
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      green: 'border-green-500/30 bg-green-500/10 text-green-400',
      teal: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
      emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    };
    return colors[color as keyof typeof colors];
  };


  return (
    <section id="skills" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('skills.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {t('skills.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className="card transition-all duration-300 group hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${getColorClasses(category.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                <p className="text-[var(--muted)] mb-6 leading-relaxed">{category.description}</p>

                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></div>
                      <span className="text-[var(--muted)]">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;