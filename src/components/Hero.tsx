import React from 'react';
import { ArrowRight, Code2, Database, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Hero = () => {
  const { t } = useTranslation();
  const scrollToContact = () =>
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="accueil"
      // 🔽 Moins haut en mobile, plein écran seulement en desktop
      className="min-h-[80vh] lg:min-h-screen flex justify-center items-start lg:items-center relative overflow-hidden pt-20 sm:pt-24 lg:pt-0"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(34,211,238,.06), transparent 40%), radial-gradient(600px at 30% 10%, rgba(99,102,241,.08), transparent 60%), var(--bg)',
        }}
      />

      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Colonne texte */}
          <motion.div
            className="text-center lg:text-left max-w-xl mx-auto lg:mx-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="mb-4 sm:mb-6"
              variants={itemVariants}
            >
              <span className="text-[var(--primary)] font-medium text-base sm:text-lg">
                {t('hero.hi')}
              </span>
              {/* 🔽 Titre un peu plus petit en mobile */}
              <p className="mt-2 mb-1 sm:mb-2 text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold"
                style={{ color: 'var(--text)' }}>
                Henry Teran
              </p>
              <h1
                className="text-lg sm:text-2xl lg:text-3xl font-semibold"
                style={{ color: 'var(--primary)' }}
              >
                {t('hero.role')}
              </h1>
            </motion.div>

            {/* 🔽 Texte un peu plus fin en mobile */}
            <motion.p
              className="text-base sm:text-lg text-[var(--muted)] mb-6 sm:mb-8 leading-relaxed"
              variants={itemVariants}
            >
              {t('hero.specialization')}{' '}
              <span className="text-[var(--primary)] font-semibold">
                {t('hero.erp')}
              </span>
              ,<span className="text-[var(--primary)] font-semibold"> {t('hero.medical')}</span>,
              <span className="text-green-400 font-semibold"> {t('hero.ai')}</span>
              <span className="text-[var(--accent)] font-semibold"> {t('hero.ecommerce')}</span>
            </motion.p>

            {/* Boutons – un peu moins d’espace en mobile */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <button onClick={scrollToContact} className="btn">
                {t('hero.cta.work')} <ArrowRight size={20} />
              </button>
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="kbd"
              >
                {t('hero.cta.projects')}
              </button>
            </motion.div>

            {/* Stats – compactes en mobile */}
            <motion.div
              className="grid grid-cols-3 gap-3 sm:gap-6 text-center"
              variants={itemVariants}
            >
              <div>
                <div className="text-xl sm:text-3xl font-bold text-[var(--primary)]">6+</div>
                <div className="text-xs sm:text-sm text-[var(--muted)]">
                  {t('hero.stats.projects')}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold text-[var(--primary)]">5+</div>
                <div className="text-xs sm:text-sm text-[var(--muted)]">
                  {t('hero.stats.technologies')}
                </div>
              </div>
              <div>
                <div className="text-xl sm:text-3xl font-bold text-green-400">24/7</div>
                <div className="text-xs sm:text-sm text-[var(--muted)]">
                  {t('hero.stats.availability')}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne cartes */}
          <motion.div
            className="relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="card">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <motion.div
                  className="card bg-gradient-to-br from-[var(--primary)]/20 to-[var(--primary)]/10 hover:scale-105 transition-transform duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Code2 className="text-[var(--primary)] mb-3 sm:mb-4" size={32} />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {t('hero.card.frontend.title')}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--muted)]">
                    {t('hero.card.frontend.subtitle')}
                  </p>
                </motion.div>

                <motion.div
                  className="card bg-gradient-to-br from-green-500/20 to-green-600/10 hover:scale-105 transition-transform duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Database className="text-green-400 mb-3 sm:mb-4" size={32} />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {t('hero.card.backend.title')}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--muted)]">
                    {t('hero.card.backend.subtitle')}
                  </p>
                </motion.div>

                <motion.div
                  className="card bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/10 hover:scale-105 transition-transform duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <Smartphone className="text-[var(--accent)] mb-3 sm:mb-4" size={32} />
                  <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {t('hero.card.mobile.title')}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--muted)]">
                    {t('hero.card.mobile.subtitle')}
                  </p>
                </motion.div>

                <motion.div
                  className="card bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 hover:scale-105 transition-transform duration-300"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-emerald-400 mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
                    AI
                  </div>
                  <h3 className="font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-base">
                    {t('hero.card.intelligence.title')}
                  </h3>
                  <p className="text-[10px] sm:text-xs lg:text-sm text-[var(--muted)]">
                    {t('hero.card.intelligence.subtitle')}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
