import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { trackProjectClick } from '../analytics/trackingEvents';

type Project = {
  key: string;
  title: string;
  period: string;
  category: string;
  description: string;
  features: string[];
  technologies: string[];
};

const Projects = () => {
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(null);

  // Récupérer les 6 projets depuis i18n
  const projectsList = t('projects.list', { returnObjects: true }) as Record<
    string,
    Omit<Project, 'key'>
  >;

  const projects = Object.entries(projectsList).map(([key, project]) => ({
    key,
    ...project,
  }));

  const openProjectDetails = (project: Project) => {
    trackProjectClick(project.title);
    setSelectedProject(project);
  };

  const closeProjectDetails = () => setSelectedProject(null);

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
              key={project.key}
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

              <button
                type="button"
                onClick={() => openProjectDetails(project)}
                aria-label={`${t('projects.learnmore')} ${project.title}`}
                className="mt-2 inline-flex items-center rounded-lg border border-[var(--primary)]/40 px-4 py-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
              >
                {t('projects.learnmore')}
              </button>

            </motion.div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedProject.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeProjectDetails}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[var(--bg)] p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-[var(--primary)]">{selectedProject.category}</p>
                <h3 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>
                  {selectedProject.title}
                </h3>
                <p className="text-sm text-[var(--muted)]">{selectedProject.period}</p>
              </div>
              <button
                type="button"
                aria-label="Close project details"
                onClick={closeProjectDetails}
                className="rounded-lg p-2 text-[var(--muted)] transition-colors hover:bg-white/10 hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 leading-relaxed text-[var(--muted)]">{selectedProject.description}</p>

            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                {t('projects.featuresTitle')}
              </h4>
              <ul className="list-disc space-y-1 pl-5 text-sm text-[var(--muted)]">
                {selectedProject.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--muted)]">
                {t('projects.techTitle')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[var(--muted)]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;