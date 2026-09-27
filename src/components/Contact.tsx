import { clearSubmission, useSubmissionTracking } from '../security/submissionTracking';
import DeliveryStatus from '../security/DeliveryStatus';
import { contactFields, fieldIssue } from '../forms/validation';
import { apiErrorMessage, type ApiCode } from '../forms/apiErrors';
import { formCopy } from '../forms/copy';
import { FieldValidationMessage, FormStatusSummary } from '../forms/ValidationFeedback';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, isSupportedLanguage } from '../constants/i18n';
import { contactCopy } from '../content/contact';
import { sendContactEmail, validateContactForm, type ContactFormData } from '../services/emailService';
import { trackContactSubmit, trackCTA } from '../analytics/trackingEvents';
import QuoteModal from './QuoteModal';
import FormDisclosure from '../privacy/FormDisclosure';
import Turnstile from '../security/Turnstile';

export default function Contact() {
  const { t, i18n } = useTranslation();
  const feedback = formCopy(i18n.language);
  const delivery = useSubmissionTracking('contact');
  const { lang } = useParams();
  const language = lang && isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const copy = contactCopy[language];
  const [briefOpen, setBriefOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [form, setForm] = useState<ContactFormData>({ name: '', email: '', message: '' });
  const [website, setWebsite] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [securityReset, setSecurityReset] = useState(0);

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errorCode, setErrorCode] = useState<ApiCode>('server_error');
  const valid = validateContactForm(form).isValid;
  const fieldProps = (field: keyof ContactFormData) => ({
    'aria-invalid': Boolean(touched[field] && fieldIssue(field, form[field])),
    'aria-describedby': `${field}-feedback`,
    onBlur: () => setTouched(current => ({ ...current, [field]: true })),
  });
  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (delivery !== 'idle') clearSubmission('contact');
    setStatus('idle');
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (submitting) return;
    const invalid = contactFields.find(field => fieldIssue(field, form[field as keyof ContactFormData]));
    if (invalid) { setTouched({ name: true, email: true, message: true }); document.getElementById(invalid)?.focus(); return; }
    if (!turnstileToken) { setErrorCode('turnstile_failed'); setStatus('error'); return; }
    setSubmitting(true);
    setStatus('idle');
    const sent = await sendContactEmail(form, { website, turnstileToken }, setErrorCode);
    setSubmitting(false);
    setSecurityReset(value => value + 1);
    setStatus(sent ? 'success' : 'error');
    if (sent) { trackContactSubmit('contact_section'); setForm({ name: '', email: '', message: '' }); setTouched({}); }
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
          <form id="contact-form" noValidate onSubmit={submit} className="mt-8 space-y-5 border-t border-[var(--v2-border)] pt-7">
            <h4 className="text-lg font-semibold">{copy.form}</h4>
            <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="name" className="mb-2 block text-sm">{t('contact.form.name')}</label><input id="name" {...fieldProps('name')} name="name" value={form.name} onChange={change} autoComplete="name" required minLength={2} maxLength={120} className="w-full rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /><FieldValidationMessage id="name" field="name" value={form.name} language={i18n.language} touched={Boolean(touched.name)} /></div><div><label htmlFor="email" className="mb-2 block text-sm">{t('contact.form.email')}</label><input id="email" {...fieldProps('email')} name="email" type="email" value={form.email} onChange={change} autoComplete="email" required maxLength={254} className="w-full rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /><FieldValidationMessage id="email" field="email" value={form.email} language={i18n.language} touched={Boolean(touched.email)} /></div></div>
            <div><label htmlFor="message" className="mb-2 block text-sm">{t('contact.form.message')}</label><textarea id="message" {...fieldProps('message')} name="message" value={form.message} onChange={change} required minLength={30} maxLength={2000} rows={5} className="w-full resize-y rounded-lg border border-[var(--v2-border)] bg-[var(--v2-surface)] px-4 py-3 text-[var(--v2-text)] focus-visible:outline-2 focus-visible:outline-[var(--v2-accent)]" /><FieldValidationMessage id="message" field="message" value={form.message} language={i18n.language} touched={Boolean(touched.message)} /></div>
            <div className="sr-only" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" value={website} onChange={(event) => setWebsite(event.target.value)} tabIndex={-1} autoComplete="off" /></div>
            <Turnstile action="contact" onToken={setTurnstileToken} resetKey={securityReset} />
            <FormStatusSummary id="contact-readiness" language={i18n.language} busy={submitting} readyText={feedback.contactReady} items={[
              ...contactFields.map(field => ({ label: feedback.labels[field], valid: !fieldIssue(field, form[field as keyof ContactFormData]) })),
              { label: feedback.security, valid: Boolean(turnstileToken) },
            ]} />
            <button aria-describedby="contact-readiness" type="submit" disabled={submitting || !valid || !turnstileToken} className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[var(--v2-accent)] px-5 py-3 font-semibold text-[var(--v2-on-accent)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-700 dark:disabled:bg-slate-700 dark:disabled:text-slate-200">{submitting ? t('contact.form.submitting') : t('contact.form.submit')}<ArrowUpRight size={17} aria-hidden="true" /></button>
            <DeliveryStatus kind="contact" state={delivery} language={i18n.language} />
            <p role="status" aria-live="polite" className={`text-sm ${status === 'error' ? 'text-red-500' : 'text-[var(--v2-accent)]'}`}>{status === 'success' && delivery === 'idle' ? feedback.contactSuccess : status === 'error' ? apiErrorMessage(errorCode, i18n.language) : ''}</p>
            <FormDisclosure kind="contact" />
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

