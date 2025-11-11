import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Projects = () => {
  const { t } = useTranslation();
  const projects = t('projects.list', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    image: string;
    technologies: string[];
    features: string[];
    github?: string;
    demo?: string;
  }>;

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
              className="card transition-all duration-300 group hover:transform hover:scale-[1.02] overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Project Image */}
              <div className="relative h-48 -mt-6 -mx-6 mb-6 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

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

              {/* Links */}
              <div className="flex gap-2 pt-4 border-t border-white/10">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-[var(--text)]"
                  >
                    <ExternalLink size={16} />
                    <span className="text-sm">{t('projects.cta')}</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Github size={18} className="text-[var(--text)]" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;