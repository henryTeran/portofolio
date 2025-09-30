import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { sendQuoteEmail, QuoteFormData } from '../services/emailService';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
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

  const projectTypes = [
    'Site web vitrine',
    'Application web',
    'Application mobile',
    'E-commerce',
    'ERP / CRM',
    'Plateforme SaaS',
    'Intégration IA',
    'Automatisation RPA',
    'API / Backend',
    'Autre'
  ];

  const availableFeatures = [
    'Authentification utilisateurs',
    'Paiements en ligne',
    'Gestion de contenu (CMS)',
    'Tableau de bord admin',
    'Notifications push',
    'Chat en temps réel',
    'Géolocalisation',
    'Intégration réseaux sociaux',
    'Analytics avancés',
    'Mode hors-ligne',
    'Multi-langues',
    'API REST'
  ];

  const availableTechnologies = [
    'React',
    'Angular',
    'Vue.js',
    'Node.js',
    'Python/Flask',
    'Firebase',
    'MongoDB',
    'PostgreSQL',
    'Ionic',
    'React Native',
    'Tailwind CSS',
    'TypeScript'
  ];

  const budgetRanges = [
    'Moins de 5 000€',
    '5 000€ - 10 000€',
    '10 000€ - 20 000€',
    '20 000€ - 50 000€',
    'Plus de 50 000€',
    'À discuter'
  ];

  const timelineOptions = [
    'Moins d\'1 mois',
    '1-3 mois',
    '3-6 mois',
    '6-12 mois',
    'Plus d\'1 an',
    'Flexible'
  ];

  const handleInputChange = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayToggle = (field: 'features' | 'technologies', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl border border-slate-700 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <div>
            <h2 className="text-2xl font-bold">Demande de devis personnalisé</h2>
            <p className="text-gray-400">Étape {currentStep} sur 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-slate-800/50">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? 'bg-blue-500 text-white' : 'bg-slate-700 text-gray-400'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <span>Informations</span>
            <span>Projet</span>
            <span>Planning</span>
            <span>Finalisation</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Étape 1: Informations personnelles */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Vos informations</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="votre@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="+33 6 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Entreprise
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    placeholder="Nom de votre entreprise"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Étape 2: Détails du projet */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Détails du projet</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Type de projet *
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                  required
                >
                  <option value="">Sélectionnez un type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description du projet *
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white resize-none"
                  placeholder="Décrivez votre projet en détail..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Fonctionnalités souhaitées
                </label>
                <div className="grid md:grid-cols-2 gap-2">
                  {availableFeatures.map(feature => (
                    <label key={feature} className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature)}
                        onChange={() => handleArrayToggle('features', feature)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Technologies préférées
                </label>
                <div className="grid md:grid-cols-3 gap-2">
                  {availableTechnologies.map(tech => (
                    <label key={tech} className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.technologies.includes(tech)}
                        onChange={() => handleArrayToggle('technologies', tech)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span className="text-sm">{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 3: Planning et budget */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Planning et budget</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Délai souhaité *
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    required
                  >
                    <option value="">Sélectionnez un délai</option>
                    {timelineOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Budget estimé *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                    required
                  >
                    <option value="">Sélectionnez un budget</option>
                    {budgetRanges.map(range => (
                      <option key={range} value={range}>{range}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Urgence du projet
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {['Faible', 'Moyenne', 'Élevée'].map(level => (
                    <label key={level} className="flex items-center p-4 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={(e) => handleInputChange('urgency', e.target.value)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Services supplémentaires
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'hasDesign', label: 'Design graphique / UI/UX' },
                    { key: 'needsHosting', label: 'Hébergement et nom de domaine' },
                    { key: 'needsMaintenance', label: 'Maintenance et support' },
                    { key: 'needsTraining', label: 'Formation utilisateurs' }
                  ].map(service => (
                    <label key={service.key} className="flex items-center p-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[service.key as keyof QuoteFormData] as boolean}
                        onChange={(e) => handleInputChange(service.key as keyof QuoteFormData, e.target.checked)}
                        className="mr-3 text-blue-500 focus:ring-blue-500"
                      />
                      <span>{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Étape 4: Finalisation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Informations supplémentaires</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Informations complémentaires
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white resize-none"
                  placeholder="Ajoutez toute information utile pour votre projet..."
                />
              </div>

              {/* Résumé */}
              <div className="bg-slate-800 p-6 rounded-xl">
                <h4 className="text-lg font-semibold mb-4">Résumé de votre demande</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Projet :</span> {formData.projectType}</p>
                  <p><span className="text-gray-400">Budget :</span> {formData.budget}</p>
                  <p><span className="text-gray-400">Délai :</span> {formData.timeline}</p>
                  <p><span className="text-gray-400">Fonctionnalités :</span> {formData.features.length} sélectionnées</p>
                  <p><span className="text-gray-400">Technologies :</span> {formData.technologies.length} sélectionnées</p>
                </div>
              </div>

              {submitStatus === 'success' && (
                <div className="flex items-center p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                  <CheckCircle className="text-green-400 mr-3" size={20} />
                  <span className="text-green-400">Demande envoyée avec succès ! Je vous recontacterai sous 24h.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="flex items-center p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                  <AlertCircle className="text-red-400 mr-3" size={20} />
                  <span className="text-red-400">Erreur lors de l'envoi. Veuillez réessayer ou me contacter directement.</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-slate-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6 py-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>
          
          <div className="flex gap-3">
            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && (!formData.name || !formData.email)) ||
                  (currentStep === 2 && (!formData.projectType || !formData.projectDescription)) ||
                  (currentStep === 3 && (!formData.timeline || !formData.budget))
                }
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Suivant
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || submitStatus === 'success'}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Envoyer la demande
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