'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].nav;
  const pathname = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY < 60) {
            setIsVisible(true);
            setIsScrolled(false);
            if (currentScrollY < 200) {
              setActiveSection('');
            }
          } else {
            setIsScrolled(true);

            const delta = currentScrollY - lastScrollY.current;
            if (delta > 15) {
              setIsVisible(false);
            } else if (delta < -15) {
              setIsVisible(true);
            }
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track active section on Home page
  useEffect(() => {
    if (pathname !== '/') return;

    const sectionIds = ['work', 'services', 'process', 'studio', 'faq', 'contact'];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0.05 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  // Lock background scroll only when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'work', href: '/#work', label: t.work },
    { id: 'services', href: '/#services', label: t.services },
    { id: 'process', href: '/#process', label: t.process },
    { id: 'studio', href: '/#studio', label: t.studio },
    { id: 'faq', href: '/#faq', label: t.faq },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-zy-blue text-white font-mono text-xs font-semibold rounded shadow-lg outline-none"
      >
        {t.skipToContent}
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <div
            style={{
              backgroundColor: isScrolled ? 'var(--zy-header-scrolled)' : 'var(--zy-header-top)',
              boxShadow: isScrolled ? 'var(--zy-header-shadow)' : 'none',
            }}
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-[background-color,border-color,box-shadow] duration-200 ease-out border ${
              isScrolled
                ? 'backdrop-blur-md border-zy-border'
                : 'backdrop-blur-sm border-transparent'
            }`}
          >
            {/* Brand Logo & Wordmark */}
            <Link
              href="/"
              className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-zy-blue rounded-lg p-1 active:scale-[0.98] transition-transform duration-100"
              aria-label="ZYRVAE Digital Studio Home"
            >
              <SymbolLogo
                size={30}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <Wordmark showDescriptor={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-5 lg:space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive = pathname === '/' && activeSection === link.id;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`inline-flex items-center space-x-1.5 text-xs font-sans font-medium transition-colors duration-150 outline-none focus-visible:text-zy-fg focus-visible:ring-1 focus-visible:ring-zy-blue rounded px-1.5 py-1 ${
                      isActive ? 'text-zy-fg font-semibold' : 'text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-zy-blue" aria-hidden="true" />
                    )}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Theme, Language & CTA */}
            <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3">
              <ThemeToggle />
              <LanguageSwitcher />

              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.98] text-white text-xs font-mono tracking-wider transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zy-bg focus-visible:ring-zy-blue"
              >
                <span>{t.cta}</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? t.close : t.menu}
                className="p-2 text-zy-muted hover:text-zy-fg active:scale-[0.95] rounded-full bg-zy-control border border-zy-border transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay with smooth motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ backgroundColor: 'var(--zy-drawer-bg)' }}
            className="fixed inset-0 z-30 md:hidden backdrop-blur-xl flex flex-col justify-between pt-24 pb-12 px-6 overflow-y-auto"
          >
            <nav className="flex flex-col space-y-3" aria-label="Mobile Menu">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="flex items-center justify-between text-2xl font-sans font-medium text-zy-fg-soft hover:text-zy-blue transition-colors py-3 border-b border-zy-border-subtle"
                >
                  <span>{link.label}</span>
                  <span className="font-mono text-xs text-zy-blue">0{idx + 1}</span>
                </Link>
              ))}
            </nav>

            <div className="flex flex-col space-y-4 pt-6">
              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-zy-surface border border-zy-border">
                <ThemeToggle showLabels={true} />
                <LanguageSwitcher />
              </div>

              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.98] text-white text-sm font-mono font-medium tracking-wider transition-all"
              >
                <span>{t.cta}</span>
                <ArrowUpRight size={16} />
              </Link>

              <p className="font-mono text-[11px] text-center text-zy-dim">
                ZYRVAE DIGITAL STUDIO — BUENOS AIRES // GLOBAL
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
