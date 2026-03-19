import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { sendQuoteEmail, validateQuoteForm, QuoteFormData } from '../services/emailService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    features: [],
    technologies: [],
    timeline: '',
    budget: '',
    urgency: '',
    hasDesign: false,
    needsHosting: false,
    needsMaintenance: false,
    needsTraining: false,
    additionalInfo: ''
  });

  // Détecter le thème au montage du composant
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains('dark'));
    
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    
    observer.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const projectTypes = t('quoteModal.step2.projectTypes', { returnObjects: true }) as string[];
  const availableFeatures = t('quoteModal.step2.featuresList', { returnObjects: true }) as string[];
  const availableTechnologies = t('quoteModal.step2.technologiesList', { returnObjects: true }) as string[];
  const budgetRanges = t('quoteModal.step3.budgetRanges', { returnObjects: true }) as string[];
  const timelineOptions = t('quoteModal.step3.timelineOptions', { returnObjects: true }) as string[];
  const urgencyLevels = t('quoteModal.step3.urgencyLevels', { returnObjects: true }) as string[];

  const handleInputChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'features' | 'technologies', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: string) => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    const validation = validateQuoteForm(formData);
    if (!validation.isValid) {
      console.error('[Quote] Erreurs de validation:', validation.errors);
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const success = await sendQuoteEmail(formData);
      if (success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          resetForm();
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('[Quote] Erreur lors de l\'envoi:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSubmitStatus('idle');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      projectDescription: '',
      features: [],
      technologies: [],
      timeline: '',
      budget: '',
      urgency: '',
      hasDesign: false,
      needsHosting: false,
      needsMaintenance: false,
      needsTraining: false,
      additionalInfo: ''
    });
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  if (!isOpen) return null;

  // Classes conditionnelles basées sur le thème
  const bgModal = isDark ? 'bg-slate-900' : 'bg-white';
  const borderColor = isDark ? 'border-slate-700' : 'border-slate-200';
  const textPrimary = isDark ? 'text-white' : 'text-gray-900';
  const textSecondary = isDark ? 'text-gray-400' : 'text-gray-600';
  const bgInput = isDark ? 'bg-slate-800' : 'bg-slate-100';
  const bgInputBorder = isDark ? 'border-slate-600' : 'border-slate-300';
  const bgHover = isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-50';
  const bgHoverDarker = isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-100';
  const bgProgress = isDark ? 'bg-slate-800/50' : 'bg-slate-100/50';
  const bgProgressBar = isDark ? 'bg-slate-700' : 'bg-slate-300';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center overflow-y-auto overscroll-contain p-0 sm:items-center sm:p-4">
      <div className={`${bgModal} flex h-[100dvh] w-full flex-col overflow-hidden rounded-none border ${borderColor} sm:h-auto sm:max-h-[90vh] sm:max-w-4xl sm:rounded-2xl`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 flex items-start justify-between border-b ${borderColor} ${bgModal} px-4 py-4 sm:p-6`}>
          <div>
            <h2 className={`pr-4 text-2xl font-bold leading-tight ${textPrimary}`}>{t('quoteModal.title')}</h2>
            <p className={textSecondary}>{t('quoteModal.step', { step: currentStep })}</p>
          </div>
          <button onClick={onClose} className={`shrink-0 p-2 ${bgHover} rounded-lg transition-colors`}>
            <X size={24} className={textPrimary} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className={`px-4 py-4 sm:px-6 ${bgProgress}`}>
          <div className="mb-3 flex items-center justify-between gap-2 sm:mb-2 sm:gap-0">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex min-w-0 flex-1 items-center last:flex-initial">
                <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-blue-500 text-white' : `${bgProgressBar} ${textSecondary}`
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`mx-2 h-1 flex-1 ${
                    step < currentStep ? 'bg-blue-500' : bgProgressBar
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className={`grid grid-cols-4 gap-2 text-center text-[11px] leading-tight sm:text-xs ${textSecondary}`}>
            <span>{t('quoteModal.steps.info')}</span>
            <span>{t('quoteModal.steps.project')}</span>
            <span>{t('quoteModal.steps.planning')}</span>
            <span>{t('quoteModal.steps.finalization')}</span>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:p-6">
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold mb-4 ${textPrimary}`}>{t('quoteModal.step1.title')}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step1.fullName')}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    placeholder={t('quoteModal.step1.fullNamePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step1.email')}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    placeholder={t('quoteModal.step1.emailPlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step1.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    placeholder={t('quoteModal.step1.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step1.company')}
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    placeholder={t('quoteModal.step1.companyPlaceholder')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Détails du projet */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold mb-4 ${textPrimary}`}>{t('quoteModal.step2.title')}</h3>
              
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  {t('quoteModal.step2.projectType')}
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                  required
                >
                  <option value="">{t('quoteModal.step2.selectType')}</option>
                  {projectTypes.map((type: string) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  {t('quoteModal.step2.description')}
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary} resize-none`}
                  placeholder={t('quoteModal.step2.descriptionPlaceholder')}
                  required
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-3`}>
                  {t('quoteModal.step2.features')}
                </label>
                <div className="grid gap-2 md:grid-cols-2">
                  {availableFeatures.map((feature: string) => (
                    <label key={feature} className={`flex items-center p-3 ${bgInput} rounded-lg ${bgHoverDarker} transition-colors cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleArrayToggle('features', feature)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${textPrimary}`}>{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-3`}>
                  {t('quoteModal.step2.technologies')}
                </label>
                <div className="grid gap-2 md:grid-cols-3">
                  {availableTechnologies.map((tech: string) => (
                    <label key={tech} className={`flex items-center p-3 ${bgInput} rounded-lg ${bgHoverDarker} transition-colors cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={formData.technologies.includes(tech)}
                        onChange={() => handleArrayToggle('technologies', tech)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={`text-sm ${textPrimary}`}>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Planning et budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold mb-4 ${textPrimary}`}>{t('quoteModal.step3.title')}</h3>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step3.timeline')}
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    required
                  >
                    <option value="">{t('quoteModal.step3.selectTimeline')}</option>
                    {timelineOptions.map((option: string) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                    {t('quoteModal.step3.budget')}
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary}`}
                    required
                  >
                    <option value="">{t('quoteModal.step3.selectBudget')}</option>
                    {budgetRanges.map((range: string) => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  {t('quoteModal.step3.urgency')}
                </label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                  {urgencyLevels.map((level: string) => (
                    <label key={level} className={`flex items-center p-3 sm:p-4 ${bgInput} rounded-lg ${bgHoverDarker} transition-colors cursor-pointer`}>
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={textPrimary}>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-3`}>
                  {t('quoteModal.step3.additionalServices')}
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'hasDesign', label: t('quoteModal.step3.design') },
                    { key: 'needsHosting', label: t('quoteModal.step3.hosting') },
                    { key: 'needsMaintenance', label: t('quoteModal.step3.maintenance') },
                    { key: 'needsTraining', label: t('quoteModal.step3.training') }
                  ].map(service => (
                    <label key={service.key} className={`flex items-center p-3 ${bgInput} rounded-lg ${bgHoverDarker} transition-colors cursor-pointer`}>
                      <input
                        type="checkbox"
                        checked={formData[service.key as keyof QuoteFormData] as boolean}
                        onChange={(e) => handleInputChange(service.key as keyof QuoteFormData, e.target.checked)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className={textPrimary}>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 4: Finalisation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className={`text-xl font-semibold mb-4 ${textPrimary}`}>{t('quoteModal.step4.title')}</h3>
              
              <div>
                <label className={`block text-sm font-medium ${textSecondary} mb-2`}>
                  {t('quoteModal.step4.additionalInfo')}
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 ${bgInput} border ${bgInputBorder} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${textPrimary} resize-none`}
                  placeholder={t('quoteModal.step4.additionalInfoPlaceholder')}
                />
              </div>

              {/* Résumé */}
              <div className={`${bgInput} p-6 rounded-xl`}>
                <h4 className={`text-lg font-semibold mb-4 ${textPrimary}`}>{t('quoteModal.step4.summary')}</h4>
                <div className={`space-y-2 text-sm ${textPrimary}`}>
                  <p><span className={textSecondary}>{t('quoteModal.step4.project')}</span> {formData.projectType}</p>
                  <p><span className={textSecondary}>{t('quoteModal.step4.budget')}</span> {formData.budget}</p>
                  <p><span className={textSecondary}>{t('quoteModal.step4.timeline')}</span> {formData.timeline}</p>
                  <p><span className={textSecondary}>{t('quoteModal.step4.features')}</span> {formData.features.length} {t('quoteModal.step4.selected')}</p>
                  <p><span className={textSecondary}>{t('quoteModal.step4.technologies')}</span> {formData.technologies.length} {t('quoteModal.step4.selected')}</p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                  <span className="text-green-400">{t('quoteModal.step4.successMessage')}</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="text-red-400 mr-3" size={20} />
                  <span className="text-red-400">{t('quoteModal.step4.errorMessage')}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`sticky bottom-0 flex flex-col gap-3 border-t ${borderColor} ${bgModal} px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:p-6`}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`order-2 px-6 py-2 text-left sm:order-1 ${textSecondary} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
          >
            {t('quoteModal.buttons.previous')}
          </button>
          
          <div className="order-1 flex w-full gap-3 sm:order-2 sm:w-auto">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.email)) ||
                  (currentStep === 2 && (!formData.projectType || !formData.projectDescription)) ||
                  (currentStep === 3 && (!formData.timeline || !formData.budget))
                }
                className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
              >
                {t('quoteModal.buttons.next')}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitStatus === 'success'}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    {t('quoteModal.buttons.submitting')}
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    {t('quoteModal.buttons.submit')}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
