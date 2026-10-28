'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { faqItems } from '@/data/faq';
import { ChevronDown, Mail, ArrowUpRight } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const prefersReducedMotion = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Frequently Asked Questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-6 lg:sticky lg:top-28"
        >
          <div className="space-y-3">
            <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold">
              {t.label}
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg leading-tight">
              {t.title}
            </h2>
            <p className="text-sm text-zy-muted font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-zy-card border border-zy-border-card space-y-3.5">
            <p className="font-mono text-[11px] text-zy-blue uppercase tracking-wider font-semibold">
              // {t.moreQuestions}
            </p>
            <p className="text-xs text-zy-muted font-sans leading-relaxed">
              {language === 'es'
                ? 'Podés iniciar un brief guiado en menos de 2 minutos o escribirnos directamente por correo.'
                : 'You can complete our guided project brief in under 2 minutes or reach out directly via email.'}
            </p>
            <div className="pt-1 flex flex-col space-y-2">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-between px-4 py-2.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover text-white text-xs font-mono transition-colors"
              >
                <span>
                  {language === 'es' ? 'Iniciar brief de proyecto' : 'Start project brief'}
                </span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href="mailto:zyrvae.co@gmail.com"
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-zy-surface hover:bg-zy-surface-hover border border-zy-border text-xs font-mono text-zy-fg-secondary hover:text-zy-blue transition-colors"
              >
                <Mail size={13} className="text-zy-blue shrink-0" />
                <span className="truncate">zyrvae.co@gmail.com</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Accordion Items with fluid height animations */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 divide-y divide-zy-border border-t border-b border-zy-border"
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${item.id}`;
            const headerId = `faq-header-${item.id}`;
            const itemNum = `0${idx + 1}`;

            return (
              <div key={item.id} className="py-5 sm:py-6">
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-start sm:items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue rounded p-1 gap-4"
                  >
                    <div className="flex items-baseline space-x-3.5 pr-2">
                      <span
                        className={`font-mono text-xs shrink-0 transition-colors ${
                          isOpen ? 'text-zy-blue font-semibold' : 'text-zy-dim group-hover:text-zy-blue'
                        }`}
                      >
                        {itemNum} //
                      </span>
                      <span className="text-base sm:text-lg font-sans font-semibold text-zy-fg group-hover:text-zy-blue transition-colors leading-snug">
                        {item.question[language]}
                      </span>
                    </div>
                    <span
                      className={`p-1.5 rounded-lg bg-zy-surface border border-zy-border text-zy-muted group-hover:text-zy-fg transition-all duration-200 shrink-0 mt-0.5 sm:mt-0 ${
                        isOpen ? 'rotate-180 bg-zy-accent-soft text-zy-blue border-zy-blue/40' : ''
                      }`}
                    >
                      <ChevronDown size={15} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={contentId}
                      role="region"
                      aria-labelledby={headerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3.5 pb-2 text-sm sm:text-base text-zy-muted font-sans leading-relaxed pl-8 sm:pl-9 pr-4">
                        <p>{item.answer[language]}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
