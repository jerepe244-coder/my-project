'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  AlertCircle,
  Copy,
  Mail,
  Edit2,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  brand: string;
  country: string;
  projectType: string;
  mainGoal: string;
  targetAudience: string;
  features: string[];
  projectDescription: string;
  references: string;
  budgetRange: string;
  timeline: string;
  additionalNotes: string;
  hp_field: string;
}

export const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].form;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    brand: '',
    country: '',
    projectType: 'hospitality',
    mainGoal: '',
    targetAudience: '',
    features: [],
    projectDescription: '',
    references: '',
    budgetRange: 'tier2',
    timeline: 'medium',
    additionalNotes: '',
    hp_field: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<{
    code: string;
    message: string;
    briefText?: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Dynamic feature choices based on selected project type
  const getAdaptiveFeatures = (type: string) => {
    switch (type) {
      case 'hospitality':
        return [
          { id: 'booking-inquiry', label: { es: 'Flujo de consulta y reserva directa', en: 'Direct booking & stay inquiry' } },
          { id: 'room-inspector', label: { es: 'Explorador interactivo de suites', en: 'Interactive suite explorer' } },
          { id: 'multilingual', label: { es: 'Arquitectura bilingüe (ES/EN)', en: 'Bilingual architecture (ES/EN)' } },
          { id: 'amenity-curation', label: { es: 'Catálogo de experiencias y bienestar', en: 'Wellness & experiences catalog' } },
        ];
      case 'gastronomy':
        return [
          { id: 'live-menu', label: { es: 'Menú degustación interactivo', en: 'Interactive tasting menu' } },
          { id: 'wine-pairing', label: { es: 'Módulo de maridajes y bodega', en: 'Wine pairing & cellar module' } },
          { id: 'dietary-filter', label: { es: 'Filtro inteligente de alérgenos', en: 'Intelligent dietary filter' } },
          { id: 'table-request', label: { es: 'Gestión de mesas y eventos privados', en: 'Table and private dining intake' } },
        ];
      case 'architecture':
        return [
          { id: 'blueprint-viewer', label: { es: 'Visor de planos y planimetrías', en: 'Technical blueprint visualizer' } },
          { id: 'material-matrix', label: { es: 'Índice de materiales y tectónica', en: 'Material matrix & specs' } },
          { id: 'high-res-gallery', label: { es: 'Galería editorial de alta resolución', en: 'High-res editorial spatial gallery' } },
          { id: 'spec-sheet-download', label: { es: 'Descarga de fichas de proyecto', en: 'Project spec-sheet downloads' } },
        ];
      default:
        return [
          { id: 'bespoke-interactions', label: { es: 'Microinteracciones personalizadas', en: 'Custom micro-interactions' } },
          { id: 'technical-seo', label: { es: 'Optimización técnica de SEO', en: 'Technical SEO optimization' } },
          { id: 'headless-cms', label: { es: 'Gestor de contenidos (Headless CMS)', en: 'Headless CMS integration' } },
          { id: 'custom-estimator', label: { es: 'Cotizador o calculador interactivo', en: 'Interactive estimator / calculator' } },
        ];
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const toggleFeature = (featureLabel: string) => {
    setFormData((prev) => {
      const exists = prev.features.includes(featureLabel);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== featureLabel)
          : [...prev.features, featureLabel],
      };
    });
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = t.errors.required;
      if (!formData.email.trim()) {
        newErrors.email = t.errors.required;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
          newErrors.email = t.errors.emailInvalid;
        }
      }
      if (!formData.brand.trim()) newErrors.brand = t.errors.required;
      if (!formData.country.trim()) newErrors.country = t.errors.required;
    }

    if (currentStep === 2) {
      if (!formData.projectType.trim()) newErrors.projectType = t.errors.required;
      if (!formData.mainGoal.trim()) newErrors.mainGoal = t.errors.required;
      if (!formData.projectDescription.trim()) newErrors.projectDescription = t.errors.required;
    }

    if (currentStep === 3) {
      if (!formData.budgetRange) newErrors.budgetRange = t.errors.required;
      if (!formData.timeline) newErrors.timeline = t.errors.required;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      if (step === 3) {
        setStep(4); // Review step
      } else {
        setStep((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      }
    }
  };

  const prevStep = () => {
    setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      setStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.ok) {
        setSubmitSuccess(true);
      } else {
        // Documented honest handling of submission response
        setSubmitError({
          code: data.error || 'DISPATCH_PENDING',
          message:
            language === 'es'
              ? data.error === 'CONFIG_PENDING'
                ? 'El backend está verificado y a la espera de la API key de correo (RESEND_API_KEY). Podés enviar este brief directamente a zyrvae.co@gmail.com con el botón inferior.'
                : data.message || t.errors.generic
              : data.error === 'CONFIG_PENDING'
              ? 'Server endpoint is validated and awaiting email provider key (RESEND_API_KEY). You can dispatch this brief directly to zyrvae.co@gmail.com below.'
              : data.message || t.errors.generic,
          briefText: data.briefText,
        });
      }
    } catch {
      setSubmitError({
        code: 'NETWORK_ERROR',
        message: t.errors.network,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyBrief = (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const currentFeatures = getAdaptiveFeatures(formData.projectType);

  return (
    <section
      id="contact"
      className="py-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto scroll-mt-20 border-t border-[#161a22]"
      aria-label="Start a Project Brief"
    >
      {/* Header */}
      <div className="mb-14 text-center max-w-2xl mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
          {t.label}
        </span>
        <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white mt-2">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-[#8b92a5] font-sans mt-3">
          {t.subtitle}
        </p>
      </div>

      {/* Main Form Container */}
      <div className="bg-[#0c0d10] border border-[#1e232d] rounded-2xl p-6 sm:p-10 shadow-2xl relative">
        {/* Anti-spam honeypot */}
        <input
          type="text"
          name="hp_field"
          value={formData.hp_field}
          onChange={handleInputChange}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        {/* Success Confirmation View */}
        {submitSuccess ? (
          <div className="py-12 text-center max-w-lg mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#0a5cff]/20 text-[#0a5cff] flex items-center justify-center mx-auto border border-[#0a5cff]/40 shadow-[0_0_30px_rgba(10,92,255,0.3)]">
              <Check size={32} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-sans font-bold text-white">
                {t.success.title}
              </h3>
              <p className="text-sm text-[#8b92a5] font-sans leading-relaxed">
                {t.success.subtitle}
              </p>
            </div>

            <div className="p-4 bg-[#12151b] rounded-xl border border-[#1e232d] text-xs font-mono text-[#cbd4e6]">
              <span className="text-[#0a5cff] font-semibold block mb-1">
                // {t.success.detailsSummary}
              </span>
              <span>{formData.name} — {formData.brand} ({formData.email})</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setStep(1);
              }}
              className="text-xs font-mono text-[#8b92a5] hover:text-white underline"
            >
              {t.success.restart}
            </button>
          </div>
        ) : (
          <div>
            {/* Step Progress Indicator Bar */}
            <div className="mb-10 pb-6 border-b border-[#181d26]">
              <div className="flex items-center justify-between text-xs font-mono text-[#8b92a5] mb-3">
                <span className="text-white font-semibold">
                  {step === 1 && t.step1Title}
                  {step === 2 && t.step2Title}
                  {step === 3 && t.step3Title}
                  {step === 4 && t.stepReviewTitle}
                </span>
                <span className="text-[#0a5cff]">
                  {language === 'es' ? `Etapa 0${step} de 04` : `Stage 0${step} of 04`}
                </span>
              </div>

              {/* Progress track */}
              <div className="w-full h-1.5 bg-[#141820] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#0a5cff] transition-all duration-300 ease-out"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Error Banner if any */}
            {submitError && (
              <div className="mb-8 p-5 bg-[#171114] border border-[#ff4444]/40 rounded-xl space-y-3 text-xs">
                <div className="flex items-start space-x-3 text-[#ff8888]">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-mono font-semibold block">
                      {language === 'es' ? 'AVISO DEL SISTEMA DE ENVÍO' : 'DISPATCH STATUS NOTICE'}
                    </span>
                    <p className="text-[#e2e8f0] leading-relaxed">{submitError.message}</p>
                  </div>
                </div>

                {/* Direct Email Fallback buttons preserving user inputs */}
                <div className="pt-3 border-t border-[#2a1a1f] flex flex-wrap gap-3">
                  <a
                    href={`mailto:zyrvae.co@gmail.com?subject=${encodeURIComponent(
                      `[Brief Proyecto] ${formData.brand} — ${formData.name}`
                    )}&body=${encodeURIComponent(
                      submitError.briefText ||
                        `Nombre: ${formData.name}\nEmail: ${formData.email}\nMarca: ${formData.brand}\nPaís: ${formData.country}\nTipo: ${formData.projectType}\nObjetivo: ${formData.mainGoal}\nDescripción:\n${formData.projectDescription}`
                    )}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#0a5cff] hover:bg-[#2672ff] text-white font-mono text-xs transition-colors"
                  >
                    <Mail size={13} />
                    <span>
                      {language === 'es'
                        ? 'Enviar directo a zyrvae.co@gmail.com ↗'
                        : 'Send directly to zyrvae.co@gmail.com ↗'}
                    </span>
                  </a>

                  {submitError.briefText && (
                    <button
                      type="button"
                      onClick={() => handleCopyBrief(submitError.briefText!)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-[#1a1f2c] hover:bg-[#242b3d] border border-[#2a3449] text-white font-mono text-xs transition-colors"
                    >
                      <Copy size={13} />
                      <span>
                        {copied
                          ? language === 'es' ? '✓ Copiado al portapapeles' : '✓ Copied to clipboard'
                          : language === 'es' ? 'Copiar texto del brief' : 'Copy brief text'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* FORM STEPS */}
            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: Essential Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <p className="text-xs text-[#8b92a5] font-mono mb-4">{t.step1Desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.name}
                      </label>
                      <input
                        id="form-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={t.fields.namePlaceholder}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'err-name' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.name
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.name && (
                        <p id="err-name" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.email}
                      </label>
                      <input
                        id="form-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder={t.fields.emailPlaceholder}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'err-email' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.email
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.email && (
                        <p id="err-email" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Brand / Company */}
                    <div className="space-y-2">
                      <label htmlFor="form-brand" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.brand}
                      </label>
                      <input
                        id="form-brand"
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleInputChange}
                        placeholder={t.fields.brandPlaceholder}
                        aria-invalid={!!errors.brand}
                        aria-describedby={errors.brand ? 'err-brand' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.brand
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.brand && (
                        <p id="err-brand" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.brand}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label htmlFor="form-country" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.country}
                      </label>
                      <input
                        id="form-country"
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder={t.fields.countryPlaceholder}
                        aria-invalid={!!errors.country}
                        aria-describedby={errors.country ? 'err-country' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.country
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.country && (
                        <p id="err-country" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Project Details (Adaptive) */}
              {step === 2 && (
                <div className="space-y-6">
                  <p className="text-xs text-[#8b92a5] font-mono mb-4">{t.step2Desc}</p>

                  <div className="space-y-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label htmlFor="form-projectType" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.projectType}
                      </label>
                      <select
                        id="form-projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[#101216] border border-[#1e232d] rounded-xl text-sm text-white focus:border-[#0a5cff] outline-none"
                      >
                        <option value="hospitality">{t.fields.projectTypeOptions.hospitality}</option>
                        <option value="gastronomy">{t.fields.projectTypeOptions.gastronomy}</option>
                        <option value="architecture">{t.fields.projectTypeOptions.architecture}</option>
                        <option value="corporate">{t.fields.projectTypeOptions.corporate}</option>
                        <option value="ecommerce">{t.fields.projectTypeOptions.ecommerce}</option>
                        <option value="portfolio">{t.fields.projectTypeOptions.portfolio}</option>
                        <option value="custom">{t.fields.projectTypeOptions.custom}</option>
                      </select>
                    </div>

                    {/* Main Goal */}
                    <div className="space-y-2">
                      <label htmlFor="form-mainGoal" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.mainGoal}
                      </label>
                      <input
                        id="form-mainGoal"
                        type="text"
                        name="mainGoal"
                        value={formData.mainGoal}
                        onChange={handleInputChange}
                        placeholder={t.fields.mainGoalPlaceholder}
                        aria-invalid={!!errors.mainGoal}
                        aria-describedby={errors.mainGoal ? 'err-mainGoal' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.mainGoal
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.mainGoal && (
                        <p id="err-mainGoal" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.mainGoal}
                        </p>
                      )}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                      <label htmlFor="form-targetAudience" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.targetAudience}
                      </label>
                      <input
                        id="form-targetAudience"
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder={t.fields.targetAudiencePlaceholder}
                        className="w-full px-4 py-3 bg-[#101216] border border-[#1e232d] rounded-xl text-sm text-white placeholder-[#515768] outline-none focus:border-[#0a5cff]"
                      />
                    </div>

                    {/* Adaptive Features (changes dynamically!) */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.features}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {currentFeatures.map((feat) => {
                          const label = feat.label[language];
                          const selected = formData.features.includes(label);

                          return (
                            <button
                              key={feat.id}
                              type="button"
                              onClick={() => toggleFeature(label)}
                              className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                                selected
                                  ? 'bg-[#0f172a] border-[#0a5cff] text-white shadow-sm'
                                  : 'bg-[#101216] border-[#1e232d] text-[#8b92a5] hover:text-white hover:border-[#2a303d]'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ml-2 ${
                                  selected
                                    ? 'bg-[#0a5cff] border-[#0a5cff] text-white'
                                    : 'border-[#2a303d]'
                                }`}
                              >
                                {selected && <Check size={11} />}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Project Description */}
                    <div className="space-y-2">
                      <label htmlFor="form-description" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.projectDescription}
                      </label>
                      <textarea
                        id="form-description"
                        name="projectDescription"
                        rows={4}
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        placeholder={t.fields.projectDescriptionPlaceholder}
                        aria-invalid={!!errors.projectDescription}
                        aria-describedby={errors.projectDescription ? 'err-desc' : undefined}
                        className={`w-full px-4 py-3 bg-[#101216] border rounded-xl text-sm text-white placeholder-[#515768] outline-none transition-colors ${
                          errors.projectDescription
                            ? 'border-[#ff4444] focus:ring-1 focus:ring-[#ff4444]'
                            : 'border-[#1e232d] focus:border-[#0a5cff]'
                        }`}
                      />
                      {errors.projectDescription && (
                        <p id="err-desc" className="text-[11px] text-[#ff6666] font-mono">
                          {errors.projectDescription}
                        </p>
                      )}
                    </div>

                    {/* References */}
                    <div className="space-y-2">
                      <label htmlFor="form-references" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.references}
                      </label>
                      <input
                        id="form-references"
                        type="text"
                        name="references"
                        value={formData.references}
                        onChange={handleInputChange}
                        placeholder={t.fields.referencesPlaceholder}
                        className="w-full px-4 py-3 bg-[#101216] border border-[#1e232d] rounded-xl text-sm text-white placeholder-[#515768] outline-none focus:border-[#0a5cff]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Scope and Budget */}
              {step === 3 && (
                <div className="space-y-6">
                  <p className="text-xs text-[#8b92a5] font-mono mb-4">{t.step3Desc}</p>

                  <div className="space-y-6">
                    {/* Budget Range Radio Brackets */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.budgetRange}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(t.fields.budgetOptions).map(([key, label]) => {
                          const isChecked = formData.budgetRange === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, budgetRange: key }))}
                              className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                                isChecked
                                  ? 'bg-[#0f172a] border-[#0a5cff] text-white font-semibold'
                                  : 'bg-[#101216] border-[#1e232d] text-[#8b92a5] hover:text-white'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full border ${
                                  isChecked ? 'border-[#0a5cff] bg-[#0a5cff]' : 'border-[#2a303d]'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Radio */}
                    <div className="space-y-2">
                      <label className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.timeline}
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(t.fields.timelineOptions).map(([key, label]) => {
                          const isChecked = formData.timeline === key;
                          return (
                            <button
                              key={key}
                              type="button"
                              onClick={() => setFormData((p) => ({ ...p, timeline: key }))}
                              className={`p-3.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                                isChecked
                                  ? 'bg-[#0f172a] border-[#0a5cff] text-white font-semibold'
                                  : 'bg-[#101216] border-[#1e232d] text-[#8b92a5] hover:text-white'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-full border ${
                                  isChecked ? 'border-[#0a5cff] bg-[#0a5cff]' : 'border-[#2a303d]'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <label htmlFor="form-notes" className="block text-xs font-mono text-[#cbd4e6]">
                        {t.fields.additionalNotes}
                      </label>
                      <textarea
                        id="form-notes"
                        name="additionalNotes"
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder={t.fields.additionalNotesPlaceholder}
                        className="w-full px-4 py-3 bg-[#101216] border border-[#1e232d] rounded-xl text-sm text-white placeholder-[#515768] outline-none focus:border-[#0a5cff]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Before Submission */}
              {step === 4 && (
                <div className="space-y-6">
                  <p className="text-xs text-[#8b92a5] font-mono mb-4">{t.stepReviewDesc}</p>

                  <div className="space-y-4">
                    {/* Section 1 Review */}
                    <div className="p-4 bg-[#101216] rounded-xl border border-[#1e232d] flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="font-mono text-[#0a5cff] font-semibold block">
                          01. {language === 'es' ? 'Contacto' : 'Contact'}
                        </span>
                        <p className="text-white font-sans font-medium">{formData.name} — {formData.brand}</p>
                        <p className="text-[#8b92a5] font-mono">{formData.email} | {formData.country}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-mono text-[#8b92a5] hover:text-[#0a5cff] inline-flex items-center space-x-1"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>

                    {/* Section 2 Review */}
                    <div className="p-4 bg-[#101216] rounded-xl border border-[#1e232d] flex justify-between items-start">
                      <div className="text-xs space-y-1 max-w-lg">
                        <span className="font-mono text-[#0a5cff] font-semibold block">
                          02. {language === 'es' ? 'Proyecto' : 'Project'}
                        </span>
                        <p className="text-white font-sans font-medium uppercase font-mono">{formData.projectType}</p>
                        <p className="text-[#cbd4e6] font-sans">{formData.mainGoal}</p>
                        <p className="text-[#8b92a5] line-clamp-2">{formData.projectDescription}</p>
                        {formData.features.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {formData.features.map((f, i) => (
                              <span key={i} className="text-[10px] font-mono bg-[#161a24] text-[#cbd4e6] px-2 py-0.5 rounded">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-mono text-[#8b92a5] hover:text-[#0a5cff] inline-flex items-center space-x-1 shrink-0 ml-2"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>

                    {/* Section 3 Review */}
                    <div className="p-4 bg-[#101216] rounded-xl border border-[#1e232d] flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="font-mono text-[#0a5cff] font-semibold block">
                          03. {language === 'es' ? 'Alcance' : 'Scope'}
                        </span>
                        <p className="text-white font-mono">
                          {language === 'es' ? 'Inversión:' : 'Budget:'} {formData.budgetRange}
                        </p>
                        <p className="text-[#8b92a5] font-mono">
                          {language === 'es' ? 'Plazo:' : 'Timeline:'} {formData.timeline}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs font-mono text-[#8b92a5] hover:text-[#0a5cff] inline-flex items-center space-x-1"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation & Submission Controls */}
              <div className="mt-10 pt-6 border-t border-[#181d26] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#101216] hover:bg-[#151922] border border-[#1e232d] text-xs font-mono text-[#8b92a5] hover:text-white transition-colors"
                  >
                    <ArrowLeft size={13} />
                    <span>{t.buttons.back}</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#0a5cff] hover:bg-[#2672ff] text-white text-xs font-medium font-sans tracking-wide transition-all shadow-[0_0_15px_rgba(10,92,255,0.35)]"
                  >
                    <span>{t.buttons.next}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-8 py-3 rounded-full bg-[#0a5cff] hover:bg-[#2672ff] disabled:bg-[#1a202c] text-white text-xs font-medium font-sans tracking-wide transition-all shadow-[0_0_20px_rgba(10,92,255,0.4)] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.buttons.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.buttons.submit}</span>
                        <Send size={13} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};
