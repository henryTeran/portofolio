import React, { useEffect, useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ⬇️ adapte l'import selon le nom de ton fichier (email.service ou emailService)
import { sendContactEmail, initEmailJS, validateContactForm } from '../services/emailService'
import type { ContactFormData } from '../services/emailService';

import QuoteModal from './QuoteModal';

const Contact = () => {
  const { t } = useTranslation();

  // UI states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  // Honeypot anti-bot
  const [website, setWebsite] = useState(''); // doit rester vide

  useEffect(() => {
    initEmailJS();
  }, []);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // anti-bot : si rempli, on "réussit" silencieusement sans envoyer
    if (website) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      return;
    }

    // Validation robuste
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      console.error('[Contact] Erreurs de validation:', validation.errors);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const ok = await sendContactEmail(
        formData,
        {
          sourcePage: `${window.location.pathname}#contact`,
          tags: 'lead, portfolio'
        }
      );

      if (ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('[Contact] Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="py-20 bg-app">
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{ color: 'var(--text)' }}>
            {t('contact.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            {t('contact.subtitle')}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Colonne gauche : infos */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[var(--primary)]">{t('contact.info.title')}</h3>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                {t('contact.info.description')}
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-lg flex items-center justify-center mr-4 border border-[var(--primary)]/30">
                  <Mail className="text-[var(--primary)]" size={24} />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.info.email')}</div>
                  <a href="mailto:teranhenryc@gmail.com" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    teranhenryc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-4 border border-emerald-500/30">
                  <MapPin className="text-emerald-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.info.location')}</div>
                  <div className="text-[var(--muted)]">{t('contact.info.locationValue')}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-lg flex items-center justify-center mr-4 border border-[var(--accent)]/30">
                  <Clock className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <div className="font-semibold">{t('contact.info.availability')}</div>
                  <div className="text-[var(--muted)]">{t('contact.info.availabilityValue')}</div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">{t('contact.info.social')}</h4>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/henry-teran"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="text-[var(--primary)]" size={24} />
                </a>
                <a
                  href="https://github.com/henryTeran"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* s'adapte au thème via CSS vars */}
                  <Github className="text-[var(--text)] hover:text-[var(--primary)]" size={24} />
                </a>
                <a
                  href="mailto:teranhenryc@gmail.com"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <Mail className="text-[var(--primary)]" size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Colonne droite : formulaire */}
          <div className="card">
            <h3 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h3>

            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Honeypot invisible */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)]"
                  placeholder={t('contact.form.namePlaceholder')}
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)]"
                  placeholder={t('contact.form.emailPlaceholder')}
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)] resize-none"
                  placeholder={t('contact.form.messagePlaceholder')}
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                  {t('contact.form.success')}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                  {t('contact.form.error')}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                <Send size={20} />
              </button>
            </form>

            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-center">
                <div className="text-sm text-[var(--muted)] mb-1">{t('contact.info.responseTime')}</div>
                <div className="text-lg font-semibold text-emerald-400">{t('contact.info.responseTimeValue')}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="card bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/30">
            <h3 className="text-xl font-bold mb-4">{t('contact.quote.title')}</h3>
            <p className="text-[var(--muted)] mb-6">
              {t('contact.quote.description')}
            </p>
            <button onClick={() => setIsQuoteModalOpen(true)} className="btn">
              {t('contact.quote.cta')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
