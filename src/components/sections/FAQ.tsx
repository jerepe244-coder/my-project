'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { faqItems } from '@/data/faq';
import { ArrowUpRight, Mail } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 lg:py-36 px-5 sm:px-8 lg:px-12 max-w-[1720px] mx-auto scroll-mt-20 border-t border-zy-border-subtle"
      aria-label="Frequently Asked Questions — Large Questions, Answers Beside"
    >
      {/* Editorial Table Heading Row */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 sm:pb-16 border-b border-zy-border-subtle"
      >
        <div className="lg:col-span-6 space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-zy-blue font-semibold block">
            // {t.label}
          </span>
          <h2 className="text-4xl sm:text-6xl font-sans font-medium tracking-tight text-zy-fg">
            {language === 'es' ? 'PREGUNTAS' : 'QUESTIONS'}
          </h2>
        </div>

        <div className="lg:col-span-6 lg:self-end flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-zy-dim">
          <p className="max-w-md font-sans text-sm text-zy-muted">
            {t.subtitle}
          </p>
          <a
            href="mailto:zyrvae.co@gmail.com"
            className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors shrink-0"
          >
            <Mail size={13} className="text-zy-blue" />
            <span>zyrvae.co@gmail.com</span>
          </a>
        </div>
      </motion.div>

      {/* Large Questions, Answers Beside (Taste: faq-large-questions-answers-beside) */}
      <div className="divide-y divide-zy-border-subtle">
        {faqItems.map((item, idx) => {
          const itemNum = `0${idx + 1}`;

          return (
            <motion.div
              key={item.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="py-10 sm:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-baseline"
            >
              {/* Question: Columns 1-6 at clamp(22px, 2.4vw, 36px) */}
              <div className="lg:col-span-6 space-y-2">
                <span className="font-mono text-xs text-zy-blue font-semibold block">
                  {itemNum} //
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-[1.85rem] font-sans font-medium text-zy-fg tracking-tight leading-[1.18] text-balance">
                  {item.question[language]}
                </h3>
              </div>

              {/* Answer: Columns 7-12 at 17-18px leading 1.6 */}
              <div className="lg:col-span-6 space-y-4">
                <p className="text-base sm:text-lg text-zy-muted font-sans leading-relaxed max-w-[42ch]">
                  {item.answer[language]}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Inquiry Callout Footer Row */}
      <div className="mt-16 pt-8 border-t border-zy-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs">
        <span className="text-zy-dim uppercase">
          // {t.moreQuestions}
        </span>
        <Link
          href="/#contact"
          className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-zy-blue underline underline-offset-4 decoration-zy-blue transition-colors self-start sm:self-center"
        >
          <span>{language === 'es' ? 'Iniciar brief de proyecto' : 'Start project brief'}</span>
          <ArrowUpRight size={13} className="text-zy-blue" />
        </Link>
      </div>
    </section>
  );
};
