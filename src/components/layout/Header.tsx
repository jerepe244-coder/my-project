'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Menu, X } from 'lucide-react';

function formatBuenosAiresTime(date: Date): string {
  try {
    return new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Argentina/Buenos_Aires',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(date);
  } catch {
    const utcHours = date.getUTCHours();
    const argHours = (utcHours + 21) % 24;
    const hh = String(argHours).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }
}

export const Header: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].nav;
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [baTime, setBaTime] = useState<string>('13:10:30');

  const lastScrollY = useRef(0);

  // Live Buenos Aires [HH:MM:SS] clock
  useEffect(() => {
    const updateClock = () => {
      setBaTime(formatBuenosAiresTime(new Date()));
    };
    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(intervalId);
  }, []);

  // Deterministic active section resolver synchronized with IntersectionObserver & scroll
  useEffect(() => {
    if (pathname !== '/') {
      return;
    }

    const sectionIds = ['hero', 'work', 'services', 'process', 'studio', 'faq', 'contact'];

    const resolveCurrentSection = () => {
      if (typeof window === 'undefined') return;
      const scrollY = window.scrollY;
      lastScrollY.current = scrollY;
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      const probeY = window.innerHeight * 0.32;
      let matched = '';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          matched = id === 'hero' ? '' : id;
          break;
        }
      }

      setActiveSection(matched);
    };

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    let observer: IntersectionObserver | null = null;

    if (elements.length > 0 && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const targetId = entry.target.id;
              if (targetId === 'hero' && window.scrollY < 260) {
                setActiveSection('');
                return;
              }
            }
          }
          resolveCurrentSection();
        },
        {
          rootMargin: '-20% 0px -60% 0px',
          threshold: [0, 0.1, 0.25, 0.5],
        }
      );

      elements.forEach((el) => observer?.observe(el));
    }

    const rafId = window.requestAnimationFrame(resolveCurrentSection);
    window.addEventListener('scroll', resolveCurrentSection, { passive: true });

    return () => {
      window.cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener('scroll', resolveCurrentSection);
    };
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

  // Fila 1 (Cabecera integrada) — Celda 2 Links: WORK | STUDIO | JOURNAL | ARCHIVE
  const monolithLinks = [
    { id: 'work', href: '/#work', label: 'WORK' },
    { id: 'studio', href: '/#studio', label: 'STUDIO' },
    { id: 'process', href: '/#process', label: 'JOURNAL' },
    { id: 'services', href: '/#services', label: 'ARCHIVE' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        setActiveSection(targetId);
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduced && window.__zyrvaeLenis) {
          window.__zyrvaeLenis.scrollTo(element, { offset: -64, duration: 1.1 });
        } else {
          element.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
        }
      }
    }
  };

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-12 z-50 px-4 py-2 bg-[#FF3B30] text-white font-mono-tech text-xs rounded-none outline-none"
      >
        {t.skipToContent}
      </a>

      {/* FILA 1 (CABECERA INTEGRADA — THE MONOLITH GRID):
          4 celdas horizontales continuas: 20% | 45% | 20% | 15% */}
      <header
        aria-label="Fila 1 — Cabecera Integrada Monolith Grid"
        className="fixed top-0 left-[28px] right-[28px] sm:left-[40px] sm:right-[40px] z-40 h-[60px] sm:h-[64px] bg-zy-bg border-b border-zy-grid-line rounded-none select-none"
      >
        {/* Desktop 4-Cell Continuous Monolith Header: 20% | 45% | 20% | 15% */}
        <div className="hidden lg:grid lg:grid-cols-[20%_45%_20%_15%] w-full h-full items-stretch rounded-none">
          {/* Celda 1 (20% del ancho — Header Izquierda): ZYRVAE / PHASE 1 [01] con padding de 16px */}
          <div className="w-full h-full p-[16px] border-r border-zy-grid-line flex items-center justify-between rounded-none">
            <Link
              href="/"
              onClick={() => {
                if (pathname === '/') setActiveSection('');
              }}
              aria-label="ZYRVAE / PHASE 1 [01] — Home"
              className="font-mono-tech text-[11px] xl:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg hover:text-[#FF3B30] transition-colors truncate"
            >
              ZYRVAE / PHASE 1 [01]
            </Link>
          </div>

          {/* Celda 2 (45% del ancho — Header Centro): WORK | STUDIO | JOURNAL | ARCHIVE */}
          <nav
            aria-label="Main Navigation"
            className="w-full h-full px-[16px] border-r border-zy-grid-line flex items-center justify-between rounded-none"
          >
            <div className="flex items-center space-x-3 xl:space-x-5">
              {monolithLinks.map((link, index) => {
                const isActive = pathname === '/' && activeSection === link.id;
                return (
                  <React.Fragment key={link.id}>
                    {index > 0 && (
                      <span
                        aria-hidden="true"
                        className="font-mono-tech text-[11px] text-zy-muted select-none"
                      >
                        |
                      </span>
                    )}
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`font-mono-tech text-[11px] xl:text-[12px] uppercase tracking-[0.08em] font-medium transition-all duration-150 hover:line-through hover:italic decoration-[1.2px] ${
                        isActive
                          ? 'text-zy-fg line-through italic decoration-[#FF3B30]'
                          : 'text-zy-fg hover:text-zy-fg'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>

            {/* Subtle Swiss Utility Controls (Theme + Language) */}
            <div className="hidden xl:flex items-center space-x-1.5">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Celda 3 (20% del ancho — Header Derecha): BUENOS AIRES, ARG [HH:MM:SS] */}
          <div className="w-full h-full px-[16px] border-r border-zy-grid-line flex items-center justify-start xl:justify-center rounded-none overflow-hidden">
            <span
              suppressHydrationWarning
              className="font-mono-tech text-[11px] xl:text-[12px] uppercase tracking-[0.08em] font-medium text-zy-fg whitespace-nowrap tabular-nums"
            >
              BUENOS AIRES, ARG [{baTime}]
            </span>
          </div>

          {/* Celda 4 (15% del ancho — Bloque Bermellón #FF3B30): CONTACT / arriba e INQUIRE → abajo */}
          <Link
            href="/#contact"
            onClick={(e) => handleLinkClick(e, '/#contact')}
            aria-label="CONTACT / INQUIRE"
            className="w-full h-full m-0 px-[16px] bg-[#FF3B30] hover:bg-[#FF4A1C] active:scale-[0.99] text-white flex flex-col justify-center items-start rounded-none transition-colors duration-150 group"
          >
            <span className="font-mono-tech text-[11px] xl:text-[12px] uppercase tracking-[0.08em] font-medium leading-[1.15] text-white block">
              CONTACT /
            </span>
            <span className="font-mono-tech text-[11px] xl:text-[12px] uppercase tracking-[0.08em] font-medium leading-[1.15] text-white inline-flex items-center space-x-1">
              <span>INQUIRE</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-150 group-hover:translate-x-1"
              >
                &#8594;
              </span>
            </span>
          </Link>
        </div>

        {/* Tablet & Mobile Compact Monolith Bar (< 1024px) */}
        <div className="grid lg:hidden grid-cols-[1fr_auto_auto] w-full h-full items-stretch rounded-none">
          {/* Cell 1 Mobile: ZYRVAE / PHASE 1 [01] */}
          <div className="p-[12px] sm:p-[16px] border-r border-zy-grid-line flex items-center justify-between overflow-hidden">
            <Link
              href="/"
              className="font-mono-tech text-[11px] uppercase tracking-[0.08em] font-medium text-zy-fg truncate"
            >
              ZYRVAE / PHASE 1 [01]
            </Link>
            <span
              suppressHydrationWarning
              className="hidden md:inline-block font-mono-tech text-[10px] uppercase tracking-[0.08em] text-zy-muted ml-3 tabular-nums"
            >
              BS.AS. [{baTime}]
            </span>
          </div>

          {/* Cell 2 Mobile: CONTACT / INQUIRE → Vermilion Block */}
          <Link
            href="/#contact"
            onClick={(e) => handleLinkClick(e, '/#contact')}
            className="px-3 sm:px-4 h-full bg-[#FF3B30] hover:bg-[#FF4A1C] text-white flex flex-col justify-center items-start rounded-none"
          >
            <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium leading-[1.1] text-white">
              CONTACT /
            </span>
            <span className="font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.08em] font-medium leading-[1.1] text-white">
              INQUIRE &#8594;
            </span>
          </Link>

          {/* Cell 3 Mobile: Menu Trigger (44x44px minimum target, 0px radius) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.close : t.menu}
            className="min-w-[52px] h-full flex items-center justify-center text-zy-fg bg-zy-bg border-l border-zy-grid-line rounded-none focus-visible:outline-none"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay (Swiss Brutalist Grid Sheet) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-30 lg:hidden bg-zy-bg flex flex-col justify-between pt-20 pb-10 px-[36px] sm:px-[56px] overflow-y-auto rounded-none"
          >
            <div className="space-y-6">
              <div className="pb-3 border-b border-zy-grid-line flex items-center justify-between font-mono-tech text-[11px] text-zy-muted">
                <span>INDEX // MONOLITH NAV</span>
                <span suppressHydrationWarning>BUENOS AIRES, ARG [{baTime}]</span>
              </div>

              <nav className="flex flex-col divide-y divide-zy-grid-line border-b border-zy-grid-line" aria-label="Mobile Menu">
                {monolithLinks.map((link, idx) => {
                  const isActive = pathname === '/' && activeSection === link.id;
                  return (
                    <Link
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className={`flex items-center justify-between py-4 font-monument text-2xl uppercase tracking-[-0.03em] transition-all ${
                        isActive ? 'text-[#FF3B30] line-through' : 'text-zy-fg hover:line-through'
                      }`}
                    >
                      <span>{link.label}</span>
                      <span className="font-mono-tech text-[11px] text-zy-muted">[0{idx + 1}]</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between p-3 bg-zy-surface border border-zy-grid-line rounded-none">
                <ThemeToggle showLabels={true} />
                <LanguageSwitcher />
              </div>

              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="flex items-center justify-between w-full min-h-[52px] px-4 py-3 bg-[#FF3B30] text-white font-mono-tech text-[12px] uppercase tracking-[0.08em] rounded-none"
              >
                <span>CONTACT / INQUIRE</span>
                <span aria-hidden="true">&#8594;</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
