import React from 'react';
import { Code, Server, Smartphone, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();

  const getSkillsData = () => {
    const categories = t('skills.categories', { returnObjects: true }) as any;
    return [
      {
        key: 'frontend',
        title: categories.frontend.title,
        icon: Code,
        color: 'blue',
        items: categories.frontend.items
      },
      {
        key: 'backend',
        title: categories.backend.title,
        icon: Server,
        color: 'green',
        items: categories.backend.items
      },
      {
        key: 'tools',
        title: categories.tools.title,
        icon: Smartphone,
        color: 'teal',
        items: categories.tools.items
      },
      {
        key: 'other',
        title: categories.other.title,
        icon: Brain,
        color: 'emerald',
        items: categories.other.items
      }
    ];
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
      green: 'border-green-500/30 bg-green-500/10 text-green-400',
      teal: 'border-teal-500/30 bg-teal-500/10 text-teal-400',
      emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
    };
    return colors[color as keyof typeof colors];
  };

  const skillsData = getSkillsData();

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
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className="card transition-all duration-300 group hover:transform hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl border-2 ${getColorClasses(category.color)} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={32} />
                </div>

                <h3 className="text-2xl font-bold mb-6">{category.title}</h3>

                <div className="space-y-3">
                  {category.items.map((skill: { name: string; level: number }) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[var(--muted)] text-sm">{skill.name}</span>
                        <span className="text-[var(--primary)] text-xs font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--primary)] to-emerald-400 transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
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