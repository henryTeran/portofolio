import { useState, type FormEvent, type ChangeEvent } from 'react';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { contactCopy } from '../content/contact';
import { sendContactEmail, validateContactForm, type ContactFormData } from '../services/emailService';
import { trackContactSubmit, trackCTA } from '../analytics/trackingEvents';
import QuoteModal from './QuoteModal';

export default function Contact() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = contactCopy[language];
  const [briefOpen, setBriefOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [website, setWebsite] = useState('');

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (website) { setStatus('success'); return; }
    if (!validateContactForm(form).isValid) { setStatus('error'); return; }
    setSubmitting(true);
    setStatus('idle');
    const sent = await sendContactEmail(form);
    setSubmitting(false);
    setStatus(sent ? 'success' : 'error');
    if (sent) { trackContactSubmit('contact_section'); setForm({ name: '', email: '', message: '' }); }
  };

  const openBrief = () => { trackCTA('project_brief_open'); setBriefOpen(true); };

  return <section id="contact" className="scroll-mt-20 bg-[var(--v2-background)] py-[var(--v2-section-space)] text-[var(--v2-text)]">
    <QuoteModal isOpen={briefOpen} onClose={() => setBriefOpen(false)} />
    <div className="mx-auto max-w-[var(--v2-content-width)] px-5 sm:px-8">
      <div className="max-w-3xl"><p className="text-xs font-semibold tracking-[.22em] text-[var(--v2-accent)]">{copy.eyebrow}</p><h2 className="mt-4 font-display text-[clamp(2.5rem,4.6vw,4.8rem)] font-semibold leading-[1.08] tracking-[-.05em]">{copy.title}</h2><p className="mt-5 text-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy.intro}</p></div>
      <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="border-t border-[var(--v2-border)] pt-7">
          <span className="font-mono text-sm text-[var(--v2-accent)]">01 / CONNECT</span>
          <h3 className="mt-5 text-3xl font-semibold tracking-tight">{copy.opportunity}</h3>
          <p className="mt-3 max-w-lg leading-relaxed text-[var(--v2-text-secondary)]">{copy.opportunityText}</p>
          <div className="mt-7 flex flex-wrap gap-5 text-sm">
            <a href="mailto:teranhenryc@gmail.com" onClick={() => trackCTA('contact_email')} className="inline-flex min-h-11 items-center gap-2 text-[var(--v2-accent)] hover:underline"><Mail size={17} aria-hidden="true" />Email</a>
            <a href="https://linkedin.com/in/henry-teran" target="_blank" rel="noreferrer" onClick={() => trackCTA('contact_linkedin')} className="inline-flex min-h-11 items-center gap-2 text-[var(--v2-accent)] hover:underline"><Linkedin size={17} aria-hidden="true" />LinkedIn</a>
          </div>
          <form id="contact-form" onSubmit={submit} className="mt-8 space-y-5 border-t border-[var(--v2-border)] pt-7">
            <h4 className="text-lg font-semibold">{copy.form}</h4>
            <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm">{t('contact.form.name')}</label><input id="name" name="name" value={form.name} onChange={change} autoComplete="name" required minLength={2} maxLength={120} className="w-full rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /></div><div><label htmlFor="email" className="mb-2 block text-sm">{t('contact.form.email')}</label><input id="email" name="email" type="email" value={form.email} onChange={change} autoComplete="email" required maxLength={254} className="w-full rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /></div></div>
            <div><label htmlFor="message" className="mb-2 block text-sm">{t('contact.form.message')}</label><textarea id="message" name="message" value={form.message} onChange={change} required minLength={10} maxLength={5000} rows={5} className="w-full resize-y rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /></div>
            <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
            <button type="submit" disabled={submitting} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[var(--v2-accent)] px-5 py-3 font-semibold text-[#07120f] disabled:opacity-60">{submitting ? t('contact.form.submitting') : t('contact.form.submit')}<ArrowUpRight size={17} aria-hidden="true" /></button>
            <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-[var(--v2-accent)]'}`}>{status === 'success' ? t('contact.form.success') : status === 'error' ? t('contact.form.error') : ''}</p>
          </form>
        </div>
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--v2-border)] bg-[var(--v2-surface)] p-7 sm:p-10">
          <div><span className="font-mono text-sm text-[var(--v2-accent)]">02 / PROJECT BRIEF</span><h3 className="mt-5 text-3xl font-semibold tracking-tight">{copy.project}</h3><p className="mt-3 max-w-md leading-relaxed text-[var(--v2-text-secondary)]">{copy.projectText}</p></div>
          <button type="button" onClick={openBrief} className="mt-12 inline-flex min-h-12 w-fit items-center gap-2 border-b border-[var(--v2-accent)] pb-1 text-left font-semibold text-[var(--v2-accent)] hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--v2-accent)]">{copy.brief}<ArrowUpRight size={19} aria-hidden="true" /></button>
        </div>
      </div>
    </div>
  </section>;
}
