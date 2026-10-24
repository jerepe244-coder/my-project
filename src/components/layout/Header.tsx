'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SymbolLogo } from '@/components/ui/SymbolLogo';
import { Wordmark } from '@/components/ui/Wordmark';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
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

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          // If close to top, show header and don't compact heavily
          if (currentScrollY < 60) {
            setIsVisible(true);
            setIsScrolled(false);
          } else {
            setIsScrolled(true);

            // Threshold hysteresis to avoid flicker: require at least 10px scroll delta
            const delta = currentScrollY - lastScrollY.current;
            if (delta > 15) {
              // Scrolling down
              setIsVisible(false);
            } else if (delta < -15) {
              // Scrolling up
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
    { href: '/#work', label: t.work },
    { href: '/#services', label: t.services },
    { href: '/#process', label: t.process },
    { href: '/#studio', label: t.studio },
    { href: '/#faq', label: t.faq },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('/#') && pathname === '/') {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Accessible skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#0a5cff] text-white font-mono text-xs font-semibold rounded shadow-lg outline-none"
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
            className={`flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 border ${
              isScrolled
                ? 'bg-[#090b0e]/85 backdrop-blur-md border-[#1e232d] shadow-[0_8px_30px_rgb(0,0,0,0.4)]'
                : 'bg-[#090b0e]/40 backdrop-blur-sm border-transparent'
            }`}
          >
            {/* Brand Logo & Wordmark */}
            <Link
              href="/"
              className="flex items-center space-x-3 group outline-none focus-visible:ring-2 focus-visible:ring-[#0a5cff] rounded-lg p-1"
              aria-label="ZYRVAE Digital Studio Home"
            >
              <SymbolLogo
                size={30}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <Wordmark showDescriptor={false} />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs font-sans font-medium text-[#8b92a5] hover:text-white transition-colors duration-200 outline-none focus-visible:text-white focus-visible:ring-1 focus-visible:ring-[#0a5cff] rounded px-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Controls: Language & CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <LanguageSwitcher />

              <Link
                href="/#contact"
                onClick={(e) => handleLinkClick(e, '/#contact')}
                className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0a5cff] hover:bg-[#1f6bff] text-white text-xs font-mono tracking-wider transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709] focus-visible:ring-[#0a5cff]"
              >
                <span>{t.cta}</span>
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center space-x-3">
              <LanguageSwitcher />

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? t.close : t.menu}
                className="p-2 text-[#8b92a5] hover:text-white rounded-full bg-[#12151b] border border-[#1e232d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a5cff]"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-30 md:hidden bg-[#060709]/95 backdrop-blur-xl flex flex-col justify-between pt-24 pb-12 px-6"
        >
          <nav className="flex flex-col space-y-5" aria-label="Mobile Menu">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="flex items-center justify-between text-2xl font-sans font-medium text-[#f4f5f8] hover:text-[#0a5cff] transition-colors py-2 border-b border-[#161a22]"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#515768]">0{idx + 1}</span>
              </Link>
            ))}
          </nav>

          <div className="flex flex-col space-y-4 pt-6">
            <Link
              href="/#contact"
              onClick={(e) => handleLinkClick(e, '/#contact')}
              className="flex items-center justify-center space-x-2 w-full py-3.5 rounded-xl bg-[#0a5cff] text-white text-sm font-medium tracking-wide shadow-[0_0_20px_rgba(10,92,255,0.4)]"
            >
              <span>{t.cta}</span>
              <ArrowUpRight size={16} />
            </Link>

            <p className="font-mono text-[11px] text-center text-[#515768]">
              ZYRVAE DIGITAL STUDIO — BUENOS AIRES // GLOBAL
            </p>
          </div>
        </div>
      )}
    </>
  );
};
