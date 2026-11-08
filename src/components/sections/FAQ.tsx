'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { faqItems } from '@/data/faq';
import { Magnetic } from '@/components/ui/Magnetic';
import { ArrowUpRight, Mail, Plus } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const prefersReducedMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border dark:border-neutral-800"
      aria-label="Frequently Asked Questions — Minimalist Interactive Accordion"
    >
      {/* Editorial Section Heading Row */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 sm:pb-16"
      >
        <div className="lg:col-span-6 space-y-2">
          <div className="inline-flex items-center space-x-2">
            <span className="font-mono text-xs text-zy-blue font-semibold">05 //</span>
            <span className="font-swiss text-xs sm:text-sm tracking-wide text-zy-fg-secondary font-medium">
              {language === 'es' ? 'Preguntas frecuentes' : 'Frequently asked questions'}
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-sans font-medium tracking-tight text-zy-fg">
            {language === 'es' ? 'PREGUNTAS' : 'QUESTIONS'}
          </h2>
        </div>

        <div className="lg:col-span-6 lg:self-end flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zy-muted">
          <p className="max-w-md font-sans text-sm text-zy-muted">
            {t.subtitle}
          </p>
          <a
            href="mailto:zyrvae.co@gmail.com"
            className="group min-h-[44px] inline-flex items-center space-x-1.5 font-swiss tracking-wide text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors shrink-0"
          >
            <Mail size={13} className="text-zy-blue" />
            <span>zyrvae.co@gmail.com</span>
            <ArrowUpRight
              size={13}
              className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </motion.div>

      {/* Minimalist Closed Accordion with Top & Bottom Borders and Smooth CSS Height Transitions */}
      <div className="border-y border-zy-border dark:border-neutral-800 divide-y divide-zy-border dark:divide-neutral-800">
        {faqItems.map((item, idx) => {
          const itemNum = `0${idx + 1}`;
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const triggerId = `faq-trigger-${item.id}`;

          return (
            <div
              key={item.id}
              className={`transition-colors duration-200 ${
                isOpen ? 'bg-zy-card/60' : 'bg-transparent hover:bg-zy-surface/40'
              }`}
            >
              <h3>
                <button
                  id={triggerId}
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full min-h-[68px] py-5 sm:py-6 px-2 sm:px-4 text-left flex items-center justify-between gap-6 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                    <span className="font-mono text-xs text-zy-blue font-semibold shrink-0">
                      {itemNum} //
                    </span>
                    <span className="text-lg sm:text-xl lg:text-2xl font-sans font-medium text-zy-fg group-hover:text-zy-blue transition-colors tracking-tight leading-snug text-balance">
                      {item.question[language]}
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      isOpen
                        ? 'bg-zy-blue border-zy-blue text-white rotate-45'
                        : 'bg-zy-surface border-zy-border text-zy-muted group-hover:text-zy-fg group-hover:border-zy-border-strong'
                    }`}
                  >
                    <Plus size={16} />
                  </span>
                </button>
              </h3>

              {/* Smooth CSS Grid Height & Opacity Transition */}
              <div
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isOpen}
                style={{
                  transitionProperty: 'grid-template-rows, opacity',
                  transitionDuration: '320ms',
                  transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
                }}
                className={`grid ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-6 pt-1 px-2 sm:px-4 sm:pl-16 max-w-3xl">
                    <p className="text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
                      {item.answer[language]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inquiry Callout Footer Row */}
      <div className="mt-12 pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <span className="font-swiss tracking-wide text-zy-muted">
          {t.moreQuestions}
        </span>
        <Magnetic>
          <Link
            href="/#contact"
            className="group min-h-[44px] px-4 py-2 rounded-full bg-zy-surface hover:bg-zy-card border border-zy-border inline-flex items-center space-x-2 font-swiss tracking-wide font-medium text-zy-fg hover:text-zy-blue transition-colors self-start sm:self-center"
          >
            <span>{language === 'es' ? 'Iniciar brief de proyecto' : 'Start project brief'}</span>
            <ArrowUpRight
              size={13}
              className="text-zy-blue transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Magnetic>
      </div>
    </section>
  );
};
