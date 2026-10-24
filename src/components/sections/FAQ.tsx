'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { faqItems } from '@/data/faq';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20 border-t border-[#161a22]"
      aria-label="Frequently Asked Questions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 space-y-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#0a5cff]">
            {t.label}
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="text-sm text-[#8b92a5] font-sans leading-relaxed">
            {t.subtitle}
          </p>

          <div className="pt-4 sm:pt-6">
            <p className="font-mono text-xs text-[#515768] uppercase">
              {t.moreQuestions}
            </p>
            <a
              href="mailto:zyrvae.co@gmail.com"
              className="inline-block mt-1 font-mono text-xs text-[#cbd4e6] hover:text-[#0a5cff] transition-colors"
            >
              {t.contactUs}
            </a>
          </div>
        </motion.div>

        {/* Right Column: Accordion Items with fluid height animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 divide-y divide-[#1e232d] border-t border-b border-[#1e232d]"
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const contentId = `faq-answer-${item.id}`;
            const headerId = `faq-header-${item.id}`;

            return (
              <div key={item.id} className="py-5 sm:py-6">
                <h3>
                  <button
                    type="button"
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    onClick={() => toggleItem(idx)}
                    className="w-full flex items-center justify-between text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#0a5cff] rounded p-1"
                  >
                    <span className="text-base sm:text-lg font-sans font-semibold text-white group-hover:text-[#cbd4e6] transition-colors pr-4">
                      {item.question[language]}
                    </span>
                    <span
                      className={`p-1.5 rounded-lg bg-[#101318] border border-[#1e232d] text-[#8b92a5] group-hover:text-white transition-all duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 bg-[#161c26] text-[#0a5cff] border-[#0a5cff]/40' : ''
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
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 pb-2 text-xs sm:text-sm text-[#8b92a5] font-sans leading-relaxed pl-1">
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