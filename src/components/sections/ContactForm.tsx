'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { BorderBeamOverlay } from '@/components/ui/BorderBeamCard';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Send,
  AlertCircle,
  Copy,
  Mail,
  Edit2,
  ArrowUpRight,
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
  const [submittedId, setSubmittedId] = useState<string | null>(null);
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
      case 'ecommerce':
        return [
          { id: 'reactive-catalog', label: { es: 'Catálogo reactivo con variantes y filtros', en: 'Reactive catalog with variants & filters' } },
          { id: 'cart-drawer', label: { es: 'Carrito y flujo de checkout a medida', en: 'Bespoke cart drawer & checkout flow' } },
          { id: 'product-specs', label: { es: 'Fichas editoriales e ingredientes/especificaciones', en: 'Editorial product & formula spec sheets' } },
          { id: 'payment-logistics', label: { es: 'Integración de pasarelas y logística', en: 'Payment gateway & shipping integration' } },
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
      if (!formData.projectDescription.trim()) {
        newErrors.projectDescription = t.errors.required;
      } else if (formData.projectDescription.trim().length < 5) {
        newErrors.projectDescription =
          language === 'es'
            ? 'Ingresá una descripción de al menos 5 caracteres.'
            : 'Please enter at least 5 characters.';
      }
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
    if (isSubmitting) return;

    if (!validateStep(1)) {
      setStep(1);
      return;
    }
    if (!validateStep(2)) {
      setStep(2);
      return;
    }
    if (!validateStep(3)) {
      setStep(3);
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

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setSubmittedId(typeof data.id === 'string' ? data.id : null);
        setSubmitSuccess(true);
      } else {
        setSubmitError({
          code: data.error || 'DISPATCH_FAILED',
          message:
            data.error === 'CONFIG_PENDING'
              ? language === 'es'
                ? 'El endpoint /api/contact validó tu brief correctamente, pero falta configurar RESEND_API_KEY en el entorno del servidor. Podés enviarlo directo a zyrvae.co@gmail.com.'
                : 'The /api/contact endpoint validated your brief, but RESEND_API_KEY is missing on the server. You can send this brief directly to zyrvae.co@gmail.com below.'
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
      data-act="04"
      style={{ scrollMarginTop: '90px' }}
      className="relative w-full bg-zy-bg text-zy-fg border-b border-zy-grid-line monolith-hairline rounded-none scroll-mt-24"
      aria-label="Acto 4 — Contacto Directo y Brief de Proyecto"
    >
      {/* =====================================================================
          CABECERA ARQUITECTÓNICA DEL ACTO 4 (CONTACTO DIRECTO)
          ===================================================================== */}
      <div className="relative px-4 sm:px-8 lg:px-10 py-8 sm:py-10 border-b border-zy-grid-line monolith-hairline flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case text-zy-muted">
            <span className="text-[#FF3B30]">[Acto 04]</span>
            <span className="text-zy-fg">03 / Direct Contact &amp; Colophon</span>
            <span className="text-[#94A3B8]">· Trato directo de fundador a fundador</span>
          </div>

          <h2 className="font-monument font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.88] text-zy-fg">
            {language === 'es' ? 'CONTACTO DIRECTO' : 'DIRECT INQUIRY'}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 lg:gap-8">
          <a
            href="mailto:zyrvae.co@gmail.com"
            className="font-serif-editorial italic text-2xl sm:text-3xl lg:text-4xl text-zy-fg hover:text-[#FF3B30] transition-colors leading-none"
          >
            zyrvae.co@gmail.com &#8599;
          </a>

          <span className="font-cota text-[#94A3B8] shrink-0">
            34°36′S 58°22′W · UTC-03:00
          </span>
        </div>
      </div>

      {/* =====================================================================
          CUADRÍCULA DE CONTACTO EN 2 COLUMNAS (FICHA DIRECTA + BRIEF PROGRESIVO)
          ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 w-full items-stretch rounded-none">
        {/* Columna Izquierda (5 cols): Ficha de Contacto Directo y SLA */}
        <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-zy-grid-line monolith-hairline flex flex-col justify-between gap-8 bg-zy-bg">
          <div className="space-y-6">
            <p className="font-serif-editorial italic text-2xl sm:text-3xl text-zy-fg leading-[1.18]">
              {language === 'es'
                ? '«Construyamos una presencia digital con la precisión arquitectónica y el carácter de tu marca.»'
                : '“Let us architect a digital presence worthy of the material precision and character of your brand.”'}
            </p>

            <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
              {language === 'es'
                ? 'Operamos con cupo limitado de encargos simultáneos para garantizar involucramiento directo en dirección de arte, arquitectura e ingeniería.'
                : 'We accept a strictly limited number of concurrent commissions to guarantee founder-level involvement across art direction and engineering.'}
            </p>

            {/* Tabla técnica de contacto (0.5px) */}
            <div
              style={{ borderTopWidth: '0.5px' }}
              className="border-t border-zy-grid-line monolith-hairline divide-y divide-zy-grid-line font-editorial-micro text-[10px] font-medium tracking-[0.015em] normal-case"
            >
              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-zy-muted">
                  {language === 'es' ? 'Bandeja directa:' : 'Direct inbox:'}
                </span>
                <a
                  href="mailto:zyrvae.co@gmail.com"
                  className="text-zy-fg hover:text-[#FF3B30] transition-colors font-semibold"
                >
                  zyrvae.co@gmail.com &#8599;
                </a>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-zy-muted">
                  {language === 'es' ? 'Modelo de colaboración:' : 'Collaboration model:'}
                </span>
                <span className="text-zy-fg">
                  {language === 'es'
                    ? 'Directo · Sin intermediarios'
                    : 'Founder-to-founder · Zero middlemen'}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-zy-muted">
                  {language === 'es' ? 'Tiempo de respuesta:' : 'Response SLA:'}
                </span>
                <span className="text-zy-fg">
                  {language === 'es' ? 'Menos de 24 horas hábiles' : 'Within 24 business hours'}
                </span>
              </div>

              <div className="py-3 flex items-center justify-between gap-2">
                <span className="text-zy-muted">
                  {language === 'es' ? 'Sede & huso horario:' : 'Base & timezone:'}
                </span>
                <span className="text-zy-fg">Buenos Aires · UTC-03:00</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zy-grid-line monolith-hairline flex items-center justify-between font-cota text-[#94A3B8]">
            <span>ZYRVAE DIGITAL STUDIO · EDICIÓN 2026</span>
            <span>ACTO 04 // BRIEF</span>
          </div>
        </div>

        {/* Columna Derecha (7 cols): Brief Progresivo de 4 Etapas */}
        <div
          id="brief-form"
          className="lg:col-span-7 overflow-hidden bg-zy-card/40 p-5 sm:p-8 lg:p-10 relative scroll-mt-20"
        >
          <BorderBeamOverlay size={520} showSurfaceGlow={false} />
        {/* Success Confirmation View */}
        {submitSuccess ? (
          <div className="relative z-10 py-10 sm:py-14 max-w-xl mx-auto space-y-8 rounded-none">
            <div className="inline-flex items-center space-x-2 text-xs font-swiss font-medium text-[#FF3B30] tabular-nums">
              <span className="w-2 h-2 bg-[#FF3B30] inline-block" />
              <span>{language === 'es' ? 'Expediente transmitido' : 'Brief transmitted'}</span>
            </div>

            <div className="space-y-3 border-b border-zy-grid-line monolith-hairline pb-6">
              <h3 className="font-serif-editorial italic text-3xl sm:text-4xl text-zy-fg leading-tight">
                {t.success.title}
              </h3>
              <p className="text-sm text-zy-muted font-sans leading-relaxed">
                {t.success.subtitle}
              </p>
            </div>

            <div className="border border-zy-grid-line monolith-hairline bg-zy-surface divide-y divide-zy-grid-line text-xs font-swiss tabular-nums rounded-none">
              <div className="px-4 py-3 flex items-center justify-between gap-4">
                <span className="text-zy-muted">{t.success.detailsSummary}</span>
                <Check size={14} className="text-[#FF3B30] shrink-0" />
              </div>
              <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                <span className="text-zy-muted">{language === 'es' ? 'Remitente' : 'Sender'}</span>
                <span className="text-zy-fg font-medium">
                  {formData.name} — {formData.brand} ({formData.email})
                </span>
              </div>
              {submittedId && (
                <div className="px-4 py-3 flex items-center justify-between gap-2">
                  <span className="text-zy-muted">{language === 'es' ? 'Referencia de envío' : 'Dispatch reference'}</span>
                  <span className="text-zy-fg font-medium">{submittedId}</span>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitSuccess(false);
                setSubmittedId(null);
                setStep(1);
                setFormData({
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
              }}
              className="px-5 py-3 border border-zy-grid-line monolith-hairline bg-zy-bg hover:bg-zy-fg hover:text-zy-bg text-xs font-swiss font-medium text-zy-fg transition-colors rounded-none"
            >
              {t.success.restart}
            </button>
          </div>
        ) : (
          <div>
            {/* Step Progress Indicator Bar */}
            <div className="relative z-10 mb-10 pb-6 border-b border-zy-grid-line monolith-hairline space-y-4">
              <div className="flex items-center justify-between text-xs text-zy-muted tabular-nums">
                <span className="font-swiss tracking-wide text-zy-fg font-semibold">
                  {step === 1 && t.step1Title}
                  {step === 2 && t.step2Title}
                  {step === 3 && t.step3Title}
                  {step === 4 && t.stepReviewTitle}
                </span>
                <span className="font-swiss text-[#FF3B30] font-semibold">
                  0{step} / 04
                </span>
              </div>

              {/* Architectural 4-stage visual track */}
              <div className="grid grid-cols-4 gap-2" aria-hidden="true">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 rounded-none transition-colors duration-300 ${
                      s <= step ? 'bg-zy-fg' : 'bg-zy-surface border border-zy-border-subtle'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Error Banner if any */}
            {submitError && (
              <div className="relative z-10 mb-8 p-5 bg-zy-error-bg border border-[#FF3B30] rounded-none space-y-3 text-xs font-swiss">
                <div className="flex items-start space-x-3 text-zy-error-fg">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-semibold block">
                      {language === 'es' ? 'Error en el envío del brief' : 'Brief dispatch error'}
                    </span>
                    <p className="text-zy-error-text leading-relaxed">{submitError.message}</p>
                  </div>
                </div>

                {/* Direct Email Fallback buttons preserving user inputs */}
                <div className="pt-3 border-t border-zy-error-divider flex flex-wrap gap-3">
                  <a
                    href={`mailto:zyrvae.co@gmail.com?subject=${encodeURIComponent(
                      `[Brief Proyecto] ${formData.brand || formData.name} — ${formData.name}`
                    )}&body=${encodeURIComponent(
                      submitError.briefText ||
                        `Nombre: ${formData.name}\nEmail: ${formData.email}\nMarca: ${formData.brand}\nPaís: ${formData.country}\nTipo: ${formData.projectType}\nPresupuesto: ${formData.budgetRange}\nObjetivo: ${formData.mainGoal}\nDescripción:\n${formData.projectDescription}`
                    )}`}
                    className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-none bg-zy-fg hover:bg-[#FF3B30] text-zy-bg hover:text-white font-swiss font-medium text-xs transition-colors"
                  >
                    <Mail size={13} />
                    <span>
                      {language === 'es'
                        ? 'Enviar directo a zyrvae.co@gmail.com'
                        : 'Send directly to zyrvae.co@gmail.com'}
                    </span>
                    <ArrowUpRight size={13} />
                  </a>

                  {submitError.briefText && (
                    <button
                      type="button"
                      onClick={() => handleCopyBrief(submitError.briefText!)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-none bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg font-swiss font-medium text-xs transition-colors"
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
              {/* Anti-spam honeypot invisible */}
              <input
                type="text"
                name="hp_field"
                value={formData.hp_field}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none',
                }}
              />
              {/* STEP 1: Essential Info */}
              {step === 1 && (
                <div className="relative z-10 space-y-6">
                  <p className="text-xs text-zy-muted font-swiss tracking-wide mb-4">{t.step1Desc}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="form-name" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.name
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.name && (
                        <p id="err-name" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="form-email" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.email
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.email && (
                        <p id="err-email" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Brand / Company */}
                    <div className="space-y-2">
                      <label htmlFor="form-brand" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.brand
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.brand && (
                        <p id="err-brand" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.brand}
                        </p>
                      )}
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <label htmlFor="form-country" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.country
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.country && (
                        <p id="err-country" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.country}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Project Details (Adaptive) */}
              {step === 2 && (
                <div className="relative z-10 space-y-6">
                  <p className="text-xs text-zy-muted font-swiss tracking-wide mb-4">{t.step2Desc}</p>

                  <div className="space-y-6">
                    {/* Project Type */}
                    <div className="space-y-2">
                      <label htmlFor="form-projectType" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
                        {t.fields.projectType}
                      </label>
                      <select
                        id="form-projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-zy-surface border border-zy-border rounded-none text-sm text-zy-fg focus:border-zy-fg outline-none"
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
                      <label htmlFor="form-mainGoal" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.mainGoal
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.mainGoal && (
                        <p id="err-mainGoal" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.mainGoal}
                        </p>
                      )}
                    </div>

                    {/* Target Audience */}
                    <div className="space-y-2">
                      <label htmlFor="form-targetAudience" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
                        {t.fields.targetAudience}
                      </label>
                      <input
                        id="form-targetAudience"
                        type="text"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        placeholder={t.fields.targetAudiencePlaceholder}
                        className="w-full px-4 py-3 bg-zy-surface border border-zy-border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none focus:border-zy-fg"
                      />
                    </div>

                    {/* Adaptive Features */}
                    <div className="space-y-2.5">
                      <label className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                              className={`p-3 rounded-none border text-left text-xs font-swiss tracking-wide transition-all flex items-center justify-between ${
                                selected
                                  ? 'bg-zy-accent-soft border-[#FF3B30] text-zy-fg font-semibold'
                                  : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg hover:border-zy-border-strong'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ml-2 ${
                                  selected
                                    ? 'bg-[#FF3B30] border-[#FF3B30] text-white'
                                    : 'border-zy-border-strong'
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
                      <label htmlFor="form-description" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                        className={`w-full px-4 py-3 bg-zy-surface border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none transition-colors ${
                          errors.projectDescription
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-zy-border focus:border-zy-fg'
                        }`}
                      />
                      {errors.projectDescription && (
                        <p id="err-desc" className="text-[11px] text-red-500 font-swiss tracking-wide">
                          {errors.projectDescription}
                        </p>
                      )}
                    </div>

                    {/* References */}
                    <div className="space-y-2">
                      <label htmlFor="form-references" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
                        {t.fields.references}
                      </label>
                      <input
                        id="form-references"
                        type="text"
                        name="references"
                        value={formData.references}
                        onChange={handleInputChange}
                        placeholder={t.fields.referencesPlaceholder}
                        className="w-full px-4 py-3 bg-zy-surface border border-zy-border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none focus:border-zy-fg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Scope and Budget */}
              {step === 3 && (
                <div className="relative z-10 space-y-6">
                  <p className="text-xs text-zy-muted font-swiss tracking-wide mb-4">{t.step3Desc}</p>

                  <div className="space-y-6">
                    {/* Budget Range Radio Brackets */}
                    <div className="space-y-2">
                      <label className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                              className={`p-3.5 rounded-none border text-left text-xs font-swiss tabular-nums transition-all flex items-center justify-between ${
                                isChecked
                                  ? 'bg-zy-accent-soft border-[#FF3B30] text-zy-fg font-semibold'
                                  : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-none border ${
                                  isChecked ? 'border-[#FF3B30] bg-[#FF3B30]' : 'border-zy-border-strong'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Timeline Radio */}
                    <div className="space-y-2">
                      <label className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
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
                              className={`p-3.5 rounded-none border text-left text-xs font-swiss tracking-wide transition-all flex items-center justify-between ${
                                isChecked
                                  ? 'bg-zy-accent-soft border-[#FF3B30] text-zy-fg font-semibold'
                                  : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                              }`}
                            >
                              <span>{label}</span>
                              <div
                                className={`w-3.5 h-3.5 rounded-none border ${
                                  isChecked ? 'border-[#FF3B30] bg-[#FF3B30]' : 'border-zy-border-strong'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <label htmlFor="form-notes" className="block text-xs font-swiss tracking-wide font-medium text-zy-fg-secondary">
                        {t.fields.additionalNotes}
                      </label>
                      <textarea
                        id="form-notes"
                        name="additionalNotes"
                        rows={3}
                        value={formData.additionalNotes}
                        onChange={handleInputChange}
                        placeholder={t.fields.additionalNotesPlaceholder}
                        className="w-full px-4 py-3 bg-zy-surface border border-zy-border rounded-none text-sm text-zy-fg placeholder-zy-dim outline-none focus:border-zy-fg"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Review Before Submission */}
              {step === 4 && (
                <div className="relative z-10 space-y-6">
                  <p className="text-xs text-zy-muted font-swiss tracking-wide mb-4">{t.stepReviewDesc}</p>

                  <div className="space-y-4">
                    {/* Section 1 Review */}
                    <div className="p-4 bg-zy-surface rounded-none border border-zy-border flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="font-swiss tracking-wide text-[#FF3B30] font-semibold block tabular-nums">
                          01. {language === 'es' ? 'Contacto' : 'Contact'}
                        </span>
                        <p className="text-zy-fg font-sans font-medium">{formData.name} — {formData.brand}</p>
                        <p className="text-zy-muted font-swiss tracking-wide">{formData.email} · {formData.country}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-swiss tracking-wide text-zy-muted hover:text-[#FF3B30] inline-flex items-center space-x-1"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>

                    {/* Section 2 Review */}
                    <div className="p-4 bg-zy-surface rounded-none border border-zy-border flex justify-between items-start">
                      <div className="text-xs space-y-1 max-w-lg">
                        <span className="font-swiss tracking-wide text-[#FF3B30] font-semibold block tabular-nums">
                          02. {language === 'es' ? 'Proyecto' : 'Project'}
                        </span>
                        <p className="text-zy-fg font-medium font-swiss tracking-wide">
                          {t.fields.projectTypeOptions[
                            formData.projectType as keyof typeof t.fields.projectTypeOptions
                          ] || formData.projectType}
                        </p>
                        <p className="text-zy-fg-secondary font-sans">{formData.mainGoal}</p>
                        <p className="text-zy-muted line-clamp-2">{formData.projectDescription}</p>
                        {formData.features.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {formData.features.map((f, i) => (
                              <span key={i} className="text-[11px] font-swiss tracking-wide bg-zy-card border border-zy-border text-zy-fg-secondary px-2 py-0.5 rounded-none">
                                {f}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="text-xs font-swiss tracking-wide text-zy-muted hover:text-[#FF3B30] inline-flex items-center space-x-1 shrink-0 ml-2"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>

                    {/* Section 3 Review */}
                    <div className="p-4 bg-zy-surface rounded-none border border-zy-border flex justify-between items-start">
                      <div className="text-xs space-y-1">
                        <span className="font-swiss tracking-wide text-[#FF3B30] font-semibold block tabular-nums">
                          03. {language === 'es' ? 'Alcance' : 'Scope'}
                        </span>
                        <p className="text-zy-fg font-swiss tabular-nums">
                          <span className="text-zy-muted">
                            {language === 'es' ? 'Inversión:' : 'Budget:'}
                          </span>{' '}
                          {t.fields.budgetOptions[
                            formData.budgetRange as keyof typeof t.fields.budgetOptions
                          ] || formData.budgetRange}
                        </p>
                        <p className="text-zy-muted font-swiss tracking-wide">
                          {language === 'es' ? 'Plazo:' : 'Timeline:'}{' '}
                          {t.fields.timelineOptions[
                            formData.timeline as keyof typeof t.fields.timelineOptions
                          ] || formData.timeline}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="text-xs font-swiss tracking-wide text-zy-muted hover:text-[#FF3B30] inline-flex items-center space-x-1"
                      >
                        <Edit2 size={12} />
                        <span>{t.buttons.edit}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation & Submission Controls */}
              <div className="relative z-10 mt-10 pt-6 border-t border-zy-grid-line monolith-hairline flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-none bg-zy-surface hover:bg-zy-surface-hover active:scale-[0.98] border border-zy-border text-xs font-swiss tracking-wide font-medium text-zy-muted hover:text-zy-fg transition-all"
                  >
                    <ArrowLeft size={13} />
                    <span>{t.buttons.back}</span>
                  </button>
                ) : (
                  <div className="text-xs font-swiss tracking-wide text-zy-dim hidden sm:block">
                    {language === 'es'
                      ? 'Confidencialidad garantizada'
                      : 'Strict confidentiality'}
                  </div>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-none bg-zy-fg hover:bg-[#FF3B30] text-zy-bg hover:text-white active:scale-[0.98] text-xs font-swiss font-medium tracking-wide transition-colors"
                  >
                    <span>{t.buttons.next}</span>
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center space-x-2 px-8 py-3 rounded-none bg-zy-fg hover:bg-[#FF3B30] active:scale-[0.98] disabled:bg-zy-control text-zy-bg hover:text-white text-xs font-swiss font-medium tracking-wide transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current animate-spin" />
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
      </div>
    </section>
  );
};
