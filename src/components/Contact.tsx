import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send, MapPin, Clock } from 'lucide-react';
import { sendContactEmail, ContactFormData } from '../services/emailService';
import { useTranslation } from 'react-i18next';
import QuoteModal from './QuoteModal';

const Contact = () => {
  const { t } = useTranslation();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendContactEmail(formData as ContactFormData);
      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-app">
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-display font-bold mb-6" style={{color:'var(--text)'}}>
            {t('contact.title')}
          </h2>
          <p className="text-xl text-[var(--muted)] max-w-3xl mx-auto">
            Prêt à discuter de votre prochain projet ? N'hésitez pas à me contacter
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[var(--primary)] to-[var(--primary)] mx-auto mt-6"></div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[var(--primary)]">Parlons de votre projet</h3>
              <p className="text-[var(--muted)] text-lg leading-relaxed mb-8">
                Que vous ayez besoin d'un ERP sur mesure, d'une application mobile innovante
                ou d'intégrer l'IA dans vos processus, je suis là pour vous accompagner.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--primary)]/20 rounded-lg flex items-center justify-center mr-4 border border-[var(--primary)]/30">
                  <Mail className="text-[var(--primary)]" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Email</div>
                  <a href="mailto:teranhenryc@gmail.com" className="text-[var(--muted)] hover:text-[var(--primary)] transition-colors">
                    teranhenryc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 border border-green-500/30">
                  <MapPin className="text-green-400" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Localisation</div>
                  <div className="text-[var(--muted)]">Genève/France - Télétravail/Hybride</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-[var(--accent)]/20 rounded-lg flex items-center justify-center mr-4 border border-[var(--accent)]/30">
                  <Clock className="text-[var(--accent)]" size={24} />
                </div>
                <div>
                  <div className="font-semibold">Disponibilité</div>
                  <div className="text-[var(--muted)]">Immédiate - Flexible</div>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-semibold mb-4">Retrouvez-moi sur</h4>
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
                  href="https://github.com/henry-teran"
                  className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="text-[var(--muted)]" size={24} />
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

          <div className="card">
            <h3 className="text-2xl font-bold mb-6">Envoyez-moi un message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)]"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  Adresse email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)]"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[var(--muted)] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-colors text-[var(--text)] placeholder-[var(--muted)] resize-none"
                  placeholder="Décrivez votre projet..."
                  required
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                  Message envoyé avec succès ! Je vous recontacterai sous 24h.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                  Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                <Send size={20} />
              </button>
            </form>

            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <div className="text-center">
                <div className="text-sm text-[var(--muted)] mb-1">Temps de réponse moyen</div>
                <div className="text-lg font-semibold text-green-400">{"< 24 heures"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <div className="card bg-gradient-to-r from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/30">
            <h3 className="text-xl font-bold mb-4">Besoin d'un devis rapide ?</h3>
            <p className="text-[var(--muted)] mb-6">
              Utilisez notre formulaire détaillé pour une estimation personnalisée
            </p>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="btn"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </div>
    </section>
  )
};

export default Contact;