import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Projects = () => {
  const { t } = useTranslation();

  // Récupérer les 6 projets depuis i18n
  const projectsList = t('projects.list', { returnObjects: true }) as Record<string, {
    title: string;
    period: string;
    category: string;
    description: string;
    features: string[];
    technologies: string[];
  }>;

  const projects = Object.values(projectsList);

  return (
    <section id="projects" className="py-20 bg-app">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('projects.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              className="card transition-all duration-300 group hover:transform hover:scale-[1.02]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-block px-3 py-1 text-sm font-medium rounded-full border border-[var(--primary)]/30 text-[var(--primary)] mb-3">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                </div>
                <span className="text-sm text-[var(--muted)]">{project.period}</span>
              </div>

              <p className="text-[var(--muted)] mb-6 leading-relaxed">
                {project.description}
              </p>

              {/* Features */}
              <div className="mb-6">
                <div className="space-y-2">
                  {project.features.map((feature) => (
                    <div key={feature} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mr-3 flex-shrink-0"></div>
                      <span className="text-[var(--muted)] text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 text-[var(--muted)] rounded-full text-xs border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;