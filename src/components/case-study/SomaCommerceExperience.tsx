'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectDetail } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import {
  SOMA_PRODUCTS,
  SOMA_STUDIO_META,
  SomaProduct,
  SomaCartItem,
} from '@/data/commerce';
import {
  ArrowLeft,
  ArrowUpRight,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  X,
  Search,
  Sparkles,
  ShieldCheck,
  Leaf,
  Truck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';

interface SomaCommerceExperienceProps {
  project: ProjectDetail;
}

export const SomaCommerceExperience: React.FC<SomaCommerceExperienceProps> = ({ project }) => {
  const { language } = useLanguage();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  // Product Inspection Modal
  const [inspectProduct, setInspectProduct] = useState<SomaProduct | null>(null);
  const [modalSizeIdx, setModalSizeIdx] = useState<number>(0);
  const [modalVesselIdx, setModalVesselIdx] = useState<number>(0);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Cart State
  const [cart, setCart] = useState<SomaCartItem[]>([
    {
      id: 'soma-01-30ml-glass',
      productId: 'soma-01',
      title: {
        es: 'Néctar Celular Regenerativo',
        en: 'Regenerative Cellular Nectar',
      },
      categoryLabel: {
        es: 'Suero Bioactivo Reparador',
        en: 'Bioactive Repair Serum',
      },
      size: '30ml',
      vesselId: 'glass',
      vesselName: {
        es: 'Vidrio Biofotónico Miron (30ml)',
        en: 'Miron Biophotonic Glass (30ml)',
      },
      unitPrice: 78,
      quantity: 1,
      image: '/images/soma-product-01.webp',
    },
  ]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  // Checkout Form State
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');
  const [buyerCity, setBuyerCity] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderRefCode, setOrderRefCode] = useState('');

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectProduct(null);
        setIsCartOpen(false);
        setCheckoutOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & Sort Products
  const filteredProducts = SOMA_PRODUCTS.filter((prod) => {
    if (activeCategory !== 'all' && prod.category !== activeCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prod.title[language].toLowerCase().includes(q);
      const matchTagline = prod.tagline[language].toLowerCase().includes(q);
      const matchActives = prod.actives.some((a) => a.name.toLowerCase().includes(q));
      if (!matchTitle && !matchTagline && !matchActives) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
    if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
    return 0;
  });

  // Cart Calculations
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 120;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 12;
  const discountAmount = discountApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = Math.max(0, cartSubtotal + shippingCost - discountAmount);

  // Cart Management
  const handleAddToCart = (product: SomaProduct, sizeStr: string, vesselObj: SomaProduct['vessels'][0], qty: number = 1) => {
    const sizeDelta = product.sizeDelta[sizeStr] ?? 0;
    const unitPrice = product.basePrice + sizeDelta + vesselObj.delta;
    const itemKey = `${product.id}-${sizeStr}-${vesselObj.id}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) => (i.id === itemKey ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          title: product.title,
          categoryLabel: product.categoryLabel,
          size: sizeStr,
          vesselId: vesselObj.id,
          vesselName: vesselObj.name,
          unitPrice,
          quantity: qty,
          image: product.images.primary,
        },
      ];
    });

    setAddedNotice(product.title[language]);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as SomaCartItem[]
    );
  };

  const removeCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const openProductInspector = (prod: SomaProduct) => {
    setInspectProduct(prod);
    setModalSizeIdx(0);
    setModalVesselIdx(0);
    setModalQuantity(1);
  };

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    if (discountCode.trim().toUpperCase() === 'ZYRVAE10' || discountCode.trim().toUpperCase() === 'SOMA10') {
      setDiscountApplied(true);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderCode = `SOMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRefCode(orderCode);
    setCheckoutStep(3);
    setCart([]);
  };

  return (
    <div className="min-h-screen min-h-svh bg-zy-bg text-zy-fg transition-colors duration-200">
      {/* 1. STORE HEADER & IDENTITY */}
      <header className="sticky top-16 z-30 bg-zy-bg/95 backdrop-blur-md border-b border-zy-border-subtle transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link
              href="/#work"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-zy-muted hover:text-zy-fg transition-colors pr-3 border-r border-zy-border"
              aria-label="Return to ZYRVAE portfolio"
            >
              <ArrowLeft size={13} />
              <span>ZYRVAE</span>
            </Link>

            <a
              href="#soma-hero"
              onClick={(e) => scrollToSection(e, 'soma-hero')}
              className="flex items-baseline space-x-2 text-zy-fg group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue rounded"
            >
              <span className="font-sans font-extrabold text-base tracking-widest uppercase">
                SŌMA
              </span>
              <span className="font-mono text-[11px] text-zy-muted tracking-widest uppercase hidden sm:inline">
                // FORMULATIONS
              </span>
            </a>
          </div>

          {/* In-page navigation links */}
          <nav
            aria-label="Store Navigation"
            className="hidden md:flex items-center space-x-6 text-xs font-mono text-zy-muted"
          >
            <a
              href="#soma-philosophy"
              onClick={(e) => scrollToSection(e, 'soma-philosophy')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '01 // FILOSOFÍA' : '01 // PHILOSOPHY'}
            </a>
            <a
              href="#soma-catalog"
              onClick={(e) => scrollToSection(e, 'soma-catalog')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '02 // CATÁLOGO' : '02 // CATALOG'}
            </a>
            <a
              href="#soma-science"
              onClick={(e) => scrollToSection(e, 'soma-science')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '03 // VIDRIO MIRON' : '03 // MIRON GLASS'}
            </a>
            <a
              href="#soma-rituals"
              onClick={(e) => scrollToSection(e, 'soma-rituals')}
              className="hover:text-zy-fg transition-colors"
            >
              {language === 'es' ? '04 // RITUALES' : '04 // RITUALS'}
            </a>
          </nav>

          {/* Action: Cart Trigger & Honest Concept Badge */}
          <div className="flex items-center space-x-2.5">
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-zy-surface border border-zy-border text-[10px] font-mono text-zy-dim uppercase tracking-wider">
              [ CONCEPT PROJECT ]
            </span>

            {/* Shopping Bag Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zy-blue shadow-sm"
              aria-label={`Open shopping cart with ${totalCartItems} items`}
            >
              <ShoppingBag size={14} />
              <span>{language === 'es' ? 'BOLSA' : 'BAG'}</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-zy-blue text-white text-[10px] font-bold">
                {totalCartItems}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Added to cart toast notification */}
      <AnimatePresence>
        {addedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-4 z-40 bg-zy-fg text-zy-bg px-4 py-2.5 rounded-xl shadow-xl flex items-center space-x-2.5 text-xs font-mono border border-white/10"
          >
            <Check size={14} className="text-zy-blue" />
            <span>{language === 'es' ? `Añadido a la bolsa: ${addedNotice}` : `Added to bag: ${addedNotice}`}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 2. HERO EDITORIAL A GRAN ESCALA */}
        <section
          id="soma-hero"
          className="relative min-h-[80svh] sm:min-h-[85svh] flex flex-col justify-between overflow-hidden border-b border-zy-border-subtle"
          aria-label="SOMA Hero"
        >
          {/* Photographic Background Asset */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/soma-hero-editorial.webp"
              alt="SOMA Formulations - Botanical cellular biotechnology and biophotonic miron glass bottles"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30" />
          </div>

          {/* Top Coordinate Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#cbd4e6]">
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-[#0b0e14]/75 backdrop-blur-md border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-zy-blue animate-pulse" />
                <span className="tracking-wider uppercase">
                  {language === 'es' ? 'BIOTECNOLOGÍA CELULAR & CUIDADO BOTÁNICO' : 'CELLULAR BIOTECHNOLOGY & BOTANICAL CARE'}
                </span>
              </div>
              <div className="px-2.5 py-1 rounded bg-[#0b0e14]/75 backdrop-blur-md border border-white/15 text-[11px] tracking-wider uppercase">
                MIRON VIOLET GLASS · ECO-REFILL SYSTEM · ZERO CRUELTY
              </div>
            </div>
          </div>

          {/* Hero Center Editorial Copy */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-xs text-[#8f520a] dark:text-[#d8a45f] tracking-widest uppercase flex items-center space-x-2"
              >
                <span>SŌMA FORMULATIONS</span>
                <span>—</span>
                <span>HARVEST 2025 // BATCH N° 08</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold tracking-tight text-white leading-[1.08] text-balance"
              >
                {language === 'es'
                  ? 'Biotecnología celular & rituales puros.'
                  : 'Cellular biotechnology & pure rituals.'}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-base sm:text-xl text-[#d4dae8] font-sans max-w-2xl leading-relaxed"
              >
                {SOMA_STUDIO_META.mission[language]}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono"
              >
                <a
                  href="#soma-catalog"
                  onClick={(e) => scrollToSection(e, 'soma-catalog')}
                  className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors"
                >
                  {language === 'es' ? 'EXPLORAR CATÁLOGO' : 'EXPLORE CATALOG'}
                </a>

                <a
                  href="#soma-science"
                  onClick={(e) => scrollToSection(e, 'soma-science')}
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-colors"
                >
                  {language === 'es' ? 'VIDRIO BIOFOTÓNICO' : 'BIOPHOTONIC SCIENCE'}
                </a>
              </motion.div>
            </div>
          </div>

          {/* Bottom Hero Anchor Bar */}
          <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 border-t border-white/10">
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono text-[#a6b1c6]">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                <span>FITOPÉPTIDOS</span>
                <span className="text-white/40">/</span>
                <span>CERAMIDAS PURAS</span>
                <span className="text-white/40">/</span>
                <span>ESCUALANO DE OLIVA</span>
                <span className="text-white/40">/</span>
                <span>BAKUCHIOL 2%</span>
              </div>

              <div className="flex items-center space-x-2 text-white">
                <Truck size={13} className="text-[#8f520a] dark:text-[#d8a45f]" />
                <span>
                  {language === 'es'
                    ? 'Envío neutro en carbono sin cargo en pedidos sobre $120 USD'
                    : 'Free carbon-neutral delivery on orders over $120 USD'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PRESENTACIÓN BREVE DE LA FILOSOFÍA BOTÁNICA */}
        <section
          id="soma-philosophy"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="SOMA Philosophy"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-baseline pb-14 border-b border-zy-border-subtle">
            <div className="lg:col-span-4 space-y-2">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '01 // MANIFIESTO BIOMOLECULAR' : '01 // BIOMOLECULAR MANIFESTO'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zy-fg">
                {language === 'es' ? 'Activos puros en su máxima potencia celular.' : 'Pure actives at peak cellular potency.'}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <p className="text-lg sm:text-2xl font-sans font-light text-zy-fg leading-relaxed">
                {language === 'es'
                  ? '«No diluimos activos en rellenos sintéticos. Formulamos cosmética biocompatible que dialoga con los receptores celulares de la piel.»'
                  : '“We do not dilute actives with synthetic bulking agents. We engineer biocompatible formulas that communicate directly with cellular receptors.”'}
              </p>
              <p className="text-sm sm:text-base text-zy-muted font-sans leading-relaxed">
                {SOMA_STUDIO_META.tagline[language]}
              </p>
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-14">
            {SOMA_STUDIO_META.pillars.map((pillar) => (
              <div
                key={pillar.code}
                className="p-6 rounded-xl bg-zy-card border border-zy-border-card flex flex-col justify-between space-y-6 transition-colors hover:border-zy-border-strong shadow-sm"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between font-mono text-xs text-zy-dim border-b border-zy-border-subtle pb-2">
                    <span className="text-zy-blue font-semibold">{pillar.code}</span>
                    <Sparkles size={13} className="text-[#8f520a] dark:text-[#d8a45f]" />
                  </div>

                  <h3 className="text-lg font-sans font-bold text-zy-fg">
                    {pillar.title[language]}
                  </h3>

                  <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
                    {pillar.desc[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CATÁLOGO CON IMÁGENES, NOMBRES, PRECIOS Y FILTROS FUNCIONALES */}
        <section
          id="soma-catalog"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="SOMA Product Catalog"
        >
          {/* Header & Controls */}
          <div className="space-y-8 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zy-border-subtle pb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                  {language === 'es' ? '02 // DISPENSARIO CELULAR' : '02 // CELLULAR DISPENSARY'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                  {language === 'es' ? 'Catálogo de fórmulas.' : 'Formulation catalog.'}
                </h2>
                <p className="text-sm sm:text-base text-zy-muted font-sans max-w-xl mt-3">
                  {language === 'es'
                    ? 'Explore cada formulación por categoría, principio activo o ritual cutáneo. Cada frasco incluye opción de recarga sustentable.'
                    : 'Explore each formulation by category, active concentration, or skincare ritual. Every formula features sustainable refill options.'}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-zy-dim uppercase">{language === 'es' ? 'ORDENAR:' : 'SORT:'}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                  className="bg-zy-surface border border-zy-border rounded-lg px-3 py-1.5 text-zy-fg text-xs font-mono focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                  aria-label="Sort product catalog"
                >
                  <option value="featured">{language === 'es' ? 'Destacados' : 'Featured'}</option>
                  <option value="price-asc">{language === 'es' ? 'Precio: Menor a Mayor' : 'Price: Low to High'}</option>
                  <option value="price-desc">{language === 'es' ? 'Precio: Mayor a Menor' : 'Price: High to Low'}</option>
                </select>
              </div>
            </div>

            {/* Search Input & Category Filters */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Category Filter Chips */}
              <div
                role="tablist"
                aria-label="Filter catalog by category"
                className="flex flex-wrap items-center gap-1.5 p-1 bg-zy-control border border-zy-border rounded-lg"
              >
                {[
                  { id: 'all', label: language === 'es' ? 'TODAS (06)' : 'ALL (06)' },
                  { id: 'serums', label: language === 'es' ? 'SUEROS & ACEITES' : 'SERUMS & OILS' },
                  { id: 'balms', label: language === 'es' ? 'BÁLSAMOS' : 'BALMS' },
                  { id: 'mists', label: language === 'es' ? 'BRUMAS' : 'MISTS' },
                  { id: 'eye', label: language === 'es' ? 'CONTORNO' : 'EYE CARE' },
                  { id: 'cleansers', label: language === 'es' ? 'LIMPIEZA' : 'CLEANSERS' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-3 sm:px-3.5 py-1.5 rounded-md text-xs font-mono transition-colors duration-150 outline-none focus-visible:ring-1 focus-visible:ring-zy-blue ${
                      activeCategory === cat.id
                        ? 'bg-zy-control-active text-zy-fg font-semibold border border-zy-border shadow-sm'
                        : 'text-zy-muted hover:text-zy-fg'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Real-time search box */}
              <div className="relative min-w-[280px]">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zy-dim" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    language === 'es'
                      ? 'Buscar por activo, fórmula...'
                      : 'Search by active ingredient...'
                  }
                  className="w-full pl-9 pr-8 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue placeholder:text-zy-dim"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zy-dim hover:text-zy-fg"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-zy-border rounded-2xl bg-zy-card space-y-4">
              <Sparkles size={24} className="mx-auto text-zy-dim" />
              <p className="font-mono text-sm text-zy-muted">
                {language === 'es'
                  ? 'No se encontraron fórmulas que coincidan con la búsqueda.'
                  : 'No botanical formulations match your query.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono hover:text-zy-blue transition-colors"
              >
                {language === 'es' ? 'Restablecer filtros' : 'Reset filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredProducts.map((prod) => (
                  <motion.article
                    layout
                    key={prod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="group rounded-2xl bg-zy-card border border-zy-border-card hover:border-zy-border-strong transition-all flex flex-col justify-between shadow-sm overflow-hidden"
                  >
                    {/* Visual Asset Aspect Box */}
                    <div className="relative aspect-[4/3] bg-zy-surface overflow-hidden">
                      <Image
                        src={prod.images.primary}
                        alt={prod.title[language]}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[10px] font-mono pointer-events-none">
                        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-white uppercase tracking-wider">
                          {prod.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/15 text-[#d8a45f] font-semibold uppercase">
                          {prod.actives[0].name.split(' ')[0]} {prod.actives[0].concentration}
                        </span>
                      </div>

                      {/* Eco Refill Flag */}
                      <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-emerald-400 flex items-center space-x-1">
                        <Leaf size={10} />
                        <span>REFILLABLE (-$8)</span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-zy-muted">
                          <span className="text-zy-blue">{prod.categoryLabel[language]}</span>
                          <span className="font-bold text-zy-fg text-sm">${prod.basePrice} USD</span>
                        </div>

                        <h3 className="text-xl font-sans font-bold text-zy-fg group-hover:text-zy-blue transition-colors">
                          {prod.title[language]}
                        </h3>

                        <p className="text-xs text-zy-muted font-sans line-clamp-2 leading-relaxed">
                          {prod.tagline[language]}
                        </p>
                      </div>

                      {/* Key Actives Pill List */}
                      <div className="space-y-1.5 pt-3 border-t border-zy-border-subtle">
                        <span className="text-[10px] font-mono text-zy-dim uppercase block">
                          {language === 'es' ? 'CONCENTRACIÓN BIOACTIVA:' : 'BIOACTIVE PROFILE:'}
                        </span>
                        <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                          {prod.actives.slice(0, 2).map((act, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-zy-surface border border-zy-border-subtle text-zy-fg-secondary"
                            >
                              {act.name} · {act.concentration}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-4 border-t border-zy-border-subtle flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={() => openProductInspector(prod)}
                          className="inline-flex items-center space-x-1 text-xs font-mono text-zy-blue hover:underline"
                        >
                          <span>{language === 'es' ? 'Ficha y variantes' : 'Specs & variants'}</span>
                          <ChevronRight size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToCart(prod, prod.sizes[0], prod.vessels[0], 1)}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                          aria-label={`Add ${prod.title[language]} to shopping bag`}
                        >
                          <Plus size={13} />
                          <span>{language === 'es' ? 'Añadir' : 'Add to Bag'}</span>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>

        {/* 5. CIENCIA BIOFOTÓNICA: EL VIDRIO MIRON */}
        <section
          id="soma-science"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="Miron Glass Science"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Photography of Miron Glass */}
            <div className="lg:col-span-5 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zy-border bg-zy-surface shadow-sm">
                <Image
                  src="/images/soma-vessel-miron.webp"
                  alt="Miron violet biophotonic glass preserving active botanical ingredients"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 text-xs font-mono text-white">
                  MIRON VIOLETGLAS // PATENTED
                </div>
              </div>
              <p className="font-mono text-[11px] text-zy-dim text-center">
                {language === 'es'
                  ? 'FOTOGRAFÍA CIENTÍFICA: BARRERA ESPECTRAL CONTRA LA DEGRADACIÓN SOLAR'
                  : 'SCIENTIFIC SPECTRAL BARRIER PREVENTING PHOTONIC DEGRADATION'}
              </p>
            </div>

            {/* Science Explanations */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                  {language === 'es' ? '03 // CIENCIA DE PRESERVACIÓN' : '03 // PRESERVATION BIOPHYSICS'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg">
                  {language === 'es' ? 'La membrana biofotónica.' : 'The biophotonic membrane.'}
                </h2>
                <p className="text-base sm:text-lg text-zy-muted font-sans leading-relaxed">
                  {language === 'es'
                    ? 'La luz solar visible acelera el envejecimiento molecular de los aceites botánicos y destruye las vitaminas activas. El vidrio violeta Miron actúa como un filtro natural que bloquea todo el espectro visible excepto la luz violeta y los rayos infrarrojos lejanos.'
                    : 'Visible sunlight drastically accelerates molecular decay in natural plant oils and destabilizes bioactive vitamins. Miron violet glass acts as an organic optical filter, admitting only beneficial violet and far-infrared wavelengths.'}
                </p>
              </div>

              {/* Spectral Comparison Table */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-4 bg-zy-card rounded-xl border border-zy-border space-y-1">
                  <span className="text-zy-dim block uppercase text-[10px]">
                    {language === 'es' ? 'Luz Visible (400-700nm)' : 'Visible Light (400-700nm)'}
                  </span>
                  <span className="text-rose-700 dark:text-rose-400 font-bold block text-sm">0% Paso (Bloqueo Total)</span>
                  <p className="text-zy-muted text-[11px] font-sans">
                    {language === 'es' ? 'Evita la oxidación de lípidos' : 'Prevents lipid photo-oxidation'}
                  </p>
                </div>

                <div className="p-4 bg-zy-card rounded-xl border border-zy-border space-y-1">
                  <span className="text-zy-dim block uppercase text-[10px]">
                    {language === 'es' ? 'Espectro Violeta (380-420nm)' : 'Violet Spectrum (380-420nm)'}
                  </span>
                  <span className="text-purple-700 dark:text-purple-400 font-bold block text-sm">25-45% Transmisión</span>
                  <p className="text-zy-muted text-[11px] font-sans">
                    {language === 'es' ? 'Preserva la energía celular' : 'Sustains vital bio-frequency'}
                  </p>
                </div>

                <div className="p-4 bg-zy-card rounded-xl border border-zy-border space-y-1">
                  <span className="text-zy-dim block uppercase text-[10px]">
                    {language === 'es' ? 'Infrarrojo Cercano (>750nm)' : 'Near Infrared (>750nm)'}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold block text-sm">60-70% Transmisión</span>
                  <p className="text-zy-muted text-[11px] font-sans">
                    {language === 'es' ? 'Estabilidad por 24+ meses' : '24+ month bio-stability'}
                  </p>
                </div>
              </div>

              {/* Refill Eco System Callout */}
              <div className="p-5 bg-zy-surface rounded-xl border border-zy-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-zy-fg font-semibold text-sm">
                    <Leaf size={16} className="text-emerald-700 dark:text-emerald-400" />
                    <span>{language === 'es' ? 'Iniciativa Circular de Recargas' : 'Circular Refill Initiative'}</span>
                  </div>
                  <p className="text-xs text-zy-muted font-sans leading-relaxed">
                    {language === 'es'
                      ? 'Reutilizá tu frasco de vidrio de por vida. Cada sobre compostable ahorra $8 USD en tu compra y elimina el peso de flete marítimo.'
                      : 'Reuse your biophotonic violet jar for life. Every compostable pouch saves $8 USD and eliminates freight emissions.'}
                  </p>
                </div>

                <a
                  href="#soma-catalog"
                  onClick={(e) => scrollToSection(e, 'soma-catalog')}
                  className="px-4 py-2 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold whitespace-nowrap self-start sm:self-auto hover:opacity-90 transition-opacity"
                >
                  {language === 'es' ? 'Ver recargas' : 'Shop refills'}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GUÍA DE RITUALES Y SECUENCIA CUTÁNEA */}
        <section
          id="soma-rituals"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-zy-border-subtle scroll-mt-20"
          aria-label="SOMA Rituals"
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zy-border-subtle pb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                  {language === 'es' ? '04 // SECUENCIA DE APLICACIÓN' : '04 // CELLULAR APPLICATION RITUAL'}
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-bold tracking-tight text-zy-fg mt-2">
                  {language === 'es' ? 'El ritual celular diario.' : 'The daily cellular ritual.'}
                </h2>
                <p className="text-sm sm:text-base text-zy-muted font-sans max-w-xl mt-3">
                  {language === 'es'
                    ? 'Cuatro pasos diseñados para respetar el ritmo circadiano y permitir la absorción osmótica progresiva de cada principio activo.'
                    : 'Four curated steps aligned with your circadian rhythm for progressive osmotic absorption of every bioactive active.'}
                </p>
              </div>

              <span className="text-xs font-mono text-zy-dim self-start md:self-end">
                {language === 'es' ? 'ORDEN DE MENOR A MAYOR DENSIDAD LIPÍDICA' : 'ORDERED BY ASCENDING LIPID DENSITY'}
              </span>
            </div>

            {/* Ritual Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: '01',
                  time: { es: 'DÍA & NOCHE', en: 'DAY & NIGHT' },
                  title: { es: 'Purificación & Equilibrio', en: 'Purify & Rebalance' },
                  product: 'FORM-05 // Cleansing Emulsion',
                  desc: {
                    es: 'Disuelve impurezas con aceite de jojoba y reishi sin retirar el manto ácido protector.',
                    en: 'Dissolves impurities with jojoba and reishi without stripping the protective mantle.',
                  },
                },
                {
                  step: '02',
                  time: { es: 'DÍA & NOCHE', en: 'DAY & NIGHT' },
                  title: { es: 'Saturación Hídrica', en: 'Hydric Saturation' },
                  product: 'FORM-03 // Biophotonic Mist',
                  desc: {
                    es: 'Aporta ácido poliglutámico y electrolitos que multiplican por 5 la absorción del suero.',
                    en: 'Delivers polyglutamic acid and electrolytes priming the skin to absorb serums.',
                  },
                },
                {
                  step: '03',
                  time: { es: 'NOCHE / REPARACIÓN', en: 'NIGHT / REPAIR' },
                  title: { es: 'Regeneración Celular', en: 'Cellular Regeneration' },
                  product: 'FORM-01 // Cellular Nectar',
                  desc: {
                    es: 'Fitopéptidos concentrados y mirra silvestre que activan la síntesis de colágeno durante el sueño.',
                    en: 'Concentrated phyto-peptides and wild myrrh accelerating nocturnal repair.',
                  },
                },
                {
                  step: '04',
                  time: { es: 'SELLADO PROTECTOR', en: 'LIPID SEAL' },
                  title: { es: 'Barrera Lipídica', en: 'Barrier Fortification' },
                  product: 'FORM-02 // Botanical Balm',
                  desc: {
                    es: 'Tres ceramidas biocompatibles que sellan los activos y evitan la pérdida transepidérmica de agua.',
                    en: 'Three bio-identical ceramides locking in actives and preventing moisture loss.',
                  },
                },
              ].map((rit) => (
                <div
                  key={rit.step}
                  className="p-6 rounded-2xl bg-zy-card border border-zy-border space-y-4 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between font-mono text-xs text-zy-dim border-b border-zy-border-subtle pb-2">
                      <span className="text-zy-blue font-bold">PASO {rit.step}</span>
                      <span>{rit.time[language]}</span>
                    </div>

                    <h3 className="font-sans font-bold text-lg text-zy-fg">
                      {rit.title[language]}
                    </h3>

                    <p className="font-mono text-xs text-[#8f520a] dark:text-[#d8a45f]">
                      {rit.product}
                    </p>

                    <p className="text-xs text-zy-muted font-sans leading-relaxed">
                      {rit.desc[language]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CTA & FOOTER COHERENTE */}
        <section
          id="soma-footer"
          className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20"
          aria-label="SOMA Footer and Concept Disclosure"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-zy-border-subtle pb-16">
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-xs uppercase tracking-widest text-zy-blue">
                {language === 'es' ? '05 // ATELIER & DISPENSARIO' : '05 // ATELIER & LAB'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-bold tracking-tight text-zy-fg">
                {language === 'es' ? 'La pureza botánica en tu piel.' : 'Pure botanicals on your skin.'}
              </h2>
              <p className="text-sm text-zy-muted font-sans leading-relaxed">
                {SOMA_STUDIO_META.mission[language]}
              </p>

              {/* Honest Concept Notice */}
              <div className="p-4 rounded-xl bg-zy-surface border border-zy-border text-xs font-mono space-y-2 text-zy-muted">
                <div className="flex items-center space-x-2 text-zy-fg font-semibold">
                  <ShieldCheck size={14} className="text-zy-blue" />
                  <span>{language === 'es' ? 'Declaración de Proyecto Conceptual' : 'Conceptual Project Declaration'}</span>
                </div>
                <p className="leading-relaxed">
                  {language === 'es'
                    ? `${project.title} es una experiencia de comercio electrónico conceptual diseñada y desarrollada por ZYRVAE Digital Studio. Todos los productos, formulaciones botánicas y procesos de checkout se presentan para demostrar diseño digital premium sin cobros reales.`
                    : `${project.title} is a conceptual luxury e-commerce experience engineered by ZYRVAE Digital Studio. All products, botanical formulations, and checkout flows are presented for digital design demonstration with no real charges.`}
                </p>
              </div>
            </div>

            {/* Newsletter Simulation */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-2xl bg-zy-card border border-zy-border space-y-6 shadow-sm">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-zy-blue uppercase">
                    {language === 'es' ? 'CUADERNO DE LABORATORIO' : 'LABORATORY JOURNAL'}
                  </span>
                  <h3 className="text-2xl font-sans font-bold text-zy-fg">
                    {language === 'es' ? 'Recibí estudios de formulación y notas de cosecha' : 'Receive formulation digests and harvest notes'}
                  </h3>
                  <p className="text-xs font-mono text-zy-muted">
                    {language === 'es' ? 'Simulación de suscripción editorial privada.' : 'Private editorial dispatch simulation.'}
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(language === 'es' ? 'Suscripción registrada (Demostración ZYRVAE)' : 'Subscription registered (ZYRVAE Demonstration)');
                  }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <input
                    type="email"
                    required
                    placeholder="botanical@atelier.com"
                    className="flex-grow px-4 py-2.5 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    {language === 'es' ? 'Suscribirme' : 'Subscribe'}
                  </button>
                </form>

                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zy-border-subtle text-xs font-mono text-zy-dim">
                  <span>VEGAN CERTIFIED</span>
                  <span>·</span>
                  <span>MIRON VIOLET GLASS</span>
                  <span>·</span>
                  <span>100% COMPOSTABLE REFILLS</span>
                </div>
              </div>
            </div>
          </div>

          {/* Minimalist Colophon Bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zy-muted">
            <div className="flex items-center space-x-3">
              <span className="font-sans font-bold text-sm text-zy-fg tracking-widest uppercase">
                SŌMA
              </span>
              <span className="text-zy-dim">/</span>
              <span>{language === 'es' ? 'Atelier de Cosmética Celular' : 'Cellular Skincare Atelier'}</span>
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#soma-hero"
                onClick={(e) => scrollToSection(e, 'soma-hero')}
                className="hover:text-zy-fg transition-colors"
              >
                {language === 'es' ? '↑ Volver arriba' : '↑ Back to top'}
              </a>
              <Link
                href="/#work"
                className="text-zy-blue hover:underline flex items-center space-x-1"
              >
                <span>{language === 'es' ? 'Explorar ZYRVAE' : 'Explore ZYRVAE'}</span>
                <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 8. SLIDE-OVER SHOPPING BAG / CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="Shopping Cart Drawer">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 260 }}
                className="w-screen max-w-md bg-zy-card border-l border-zy-border shadow-2xl flex flex-col justify-between text-zy-fg"
              >
                {/* Cart Drawer Header */}
                <div className="p-6 border-b border-zy-border-subtle flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <ShoppingBag size={16} className="text-zy-blue" />
                    <h3 className="font-sans font-bold text-lg">
                      {language === 'es' ? 'Bolsa de Compra' : 'Your Shopping Bag'}
                    </h3>
                    <span className="text-xs font-mono text-zy-muted">
                      ({totalCartItems} {language === 'es' ? 'fórmulas' : 'items'})
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCartOpen(false)}
                    className="p-1.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg transition-colors"
                    aria-label="Close cart drawer"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Free Shipping Progress Indicator */}
                <div className="px-6 py-3 bg-zy-surface border-b border-zy-border-subtle text-xs font-mono space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-zy-dim flex items-center space-x-1.5">
                      <Truck size={12} className="text-zy-blue" />
                      <span>{language === 'es' ? 'Envío Neutro en Carbono:' : 'Carbon-Neutral Delivery:'}</span>
                    </span>
                    <span className="font-bold text-zy-fg">
                      {isFreeShipping
                        ? language === 'es' ? '¡Gratis calificado!' : 'Free qualified!'
                        : `$${freeShippingThreshold - cartSubtotal} USD ${language === 'es' ? 'restante' : 'remaining'}`}
                    </span>
                  </div>

                  <div className="w-full h-1.5 rounded-full bg-zy-control overflow-hidden">
                    <div
                      className="h-full bg-zy-blue transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Cart Items List */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 space-y-3">
                      <ShoppingBag size={32} className="mx-auto text-zy-dim" />
                      <p className="font-mono text-sm text-zy-muted">
                        {language === 'es' ? 'Tu bolsa está vacía.' : 'Your shopping bag is empty.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCartOpen(false);
                          const catEl = document.getElementById('soma-catalog');
                          if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono hover:text-zy-blue"
                      >
                        {language === 'es' ? 'Ver catálogo de fórmulas' : 'Explore formulation catalog'}
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-zy-surface border border-zy-border flex items-start space-x-4 shadow-sm"
                      >
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-zy-border-subtle bg-zy-card flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title[language]}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow space-y-1">
                          <div className="flex items-start justify-between">
                            <h4 className="font-sans font-bold text-sm text-zy-fg">
                              {item.title[language]}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeCartItem(item.id)}
                              className="text-zy-dim hover:text-rose-500 transition-colors p-1"
                              aria-label={`Remove ${item.title[language]}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="text-[11px] font-mono text-zy-muted space-x-2">
                            <span>{item.size}</span>
                            <span>·</span>
                            <span className={item.vesselId === 'refill' ? 'text-emerald-700 dark:text-emerald-400 font-semibold' : ''}>
                              {item.vesselId === 'refill' ? 'Eco-Pouch' : 'Miron Glass'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-1.5 border border-zy-border rounded bg-zy-card px-1.5 py-0.5 text-xs font-mono">
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, -1)}
                                className="p-0.5 text-zy-muted hover:text-zy-fg"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2 font-bold">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() => updateCartQuantity(item.id, 1)}
                                className="p-0.5 text-zy-muted hover:text-zy-fg"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <span className="font-mono text-xs font-bold text-zy-fg">
                              ${item.unitPrice * item.quantity} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Cart Drawer Footer & Totals */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-zy-border-subtle bg-zy-surface/50 space-y-4">
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between text-zy-muted">
                        <span>{language === 'es' ? 'Subtotal:' : 'Subtotal:'}</span>
                        <span className="text-zy-fg font-semibold">${cartSubtotal} USD</span>
                      </div>

                      <div className="flex justify-between text-zy-muted">
                        <span>{language === 'es' ? 'Envío neutro en carbono:' : 'Carbon-neutral shipping:'}</span>
                        <span className="text-zy-fg">
                          {isFreeShipping ? (
                            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{language === 'es' ? 'GRATIS' : 'FREE'}</span>
                          ) : (
                            `$${shippingCost} USD`
                          )}
                        </span>
                      </div>

                      {discountApplied && (
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                          <span>{language === 'es' ? 'Descuento ZYRVAE (10%):' : 'ZYRVAE Promo (10%):'}</span>
                          <span>-${discountAmount} USD</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-zy-border-subtle flex justify-between text-sm font-bold text-zy-fg">
                        <span>{language === 'es' ? 'Total estimado:' : 'Estimated Total:'}</span>
                        <span className="text-base text-zy-blue">${cartTotal} USD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setIsCartOpen(false);
                        setCheckoutStep(1);
                        setCheckoutOpen(true);
                      }}
                      className="w-full py-3 rounded-xl bg-zy-fg text-zy-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <span>{language === 'es' ? 'Proceder al Checkout (Demo)' : 'Proceed to Checkout (Demo)'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 9. DEEP PRODUCT DETAIL INSPECTOR MODAL */}
      <AnimatePresence>
        {inspectProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={inspectProduct.title[language]}>
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="bg-zy-card border border-zy-border rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl text-zy-fg"
            >
              <div className="flex items-start justify-between border-b border-zy-border-subtle pb-4">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-zy-blue mb-1">
                    <span>{inspectProduct.code}</span>
                    <span>//</span>
                    <span>{inspectProduct.categoryLabel[language]}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-sans font-bold">
                    {inspectProduct.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-zy-muted mt-1">
                    {inspectProduct.tagline[language]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectProduct(null)}
                  className="p-2 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg transition-colors"
                  aria-label="Close product modal"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Inspector Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left: Product Images */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="relative aspect-square rounded-xl overflow-hidden border border-zy-border bg-zy-surface shadow-sm">
                    <Image
                      src={inspectProduct.images.primary}
                      alt={inspectProduct.title[language]}
                      fill
                      sizes="40vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-zy-border bg-zy-surface">
                      <Image
                        src={inspectProduct.images.secondary}
                        alt={`${inspectProduct.title[language]} alternate`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    {inspectProduct.images.texture && (
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-zy-border bg-zy-surface">
                        <Image
                          src={inspectProduct.images.texture}
                          alt={`${inspectProduct.title[language]} texture`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Dynamic Variants & Formulation Specs */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Dynamic Price Display */}
                  <div className="flex items-baseline justify-between border-b border-zy-border-subtle pb-4">
                    <div>
                      <span className="text-[10px] font-mono text-zy-dim uppercase block">
                        {language === 'es' ? 'PRECIO SEGÚN VARIANTE:' : 'VARIANT PRICING:'}
                      </span>
                      <span className="text-3xl font-bold font-mono text-zy-fg">
                        ${inspectProduct.basePrice + (inspectProduct.sizeDelta[inspectProduct.sizes[modalSizeIdx]] ?? 0) + inspectProduct.vessels[modalVesselIdx].delta} USD
                      </span>
                    </div>

                    <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">
                      {inspectProduct.vessels[modalVesselIdx].id === 'refill'
                        ? language === 'es' ? '✓ Incluye descuento de recarga (-$8)' : '✓ Includes eco-refill savings (-$8)'
                        : 'Miron Biophotonic Glass'}
                    </span>
                  </div>

                  {/* 1. Size Variant Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-zy-muted uppercase">
                      {language === 'es' ? '1. Seleccionar Volumen:' : '1. Select Volume:'}
                    </label>
                    <div className="flex gap-2">
                      {inspectProduct.sizes.map((s, idx) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setModalSizeIdx(idx)}
                          className={`px-4 py-2 rounded-lg text-xs font-mono border transition-all ${
                            modalSizeIdx === idx
                              ? 'bg-zy-blue text-white border-zy-blue font-bold shadow-sm'
                              : 'bg-zy-surface border-zy-border text-zy-muted hover:text-zy-fg'
                          }`}
                        >
                          {s} {inspectProduct.sizeDelta[s] ? `(+$${inspectProduct.sizeDelta[s]})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Vessel Packaging Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-zy-muted uppercase">
                      {language === 'es' ? '2. Tipo de Envase:' : '2. Vessel Packaging Type:'}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                      {inspectProduct.vessels.map((v, idx) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setModalVesselIdx(idx)}
                          className={`p-3 rounded-lg border text-left transition-all space-y-1 ${
                            modalVesselIdx === idx
                              ? 'bg-zy-surface border-zy-blue text-zy-fg shadow-sm ring-1 ring-zy-blue'
                              : 'bg-zy-surface/60 border-zy-border text-zy-muted hover:text-zy-fg'
                          }`}
                        >
                          <div className="flex justify-between items-center font-bold">
                            <span>{v.name[language]}</span>
                            <span>{v.delta === 0 ? '±$0' : `-$8 USD`}</span>
                          </div>
                          <p className="text-[10px] text-zy-dim font-sans leading-tight">
                            {v.description[language]}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actives Breakdown Table */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-zy-blue uppercase block">
                      {language === 'es' ? 'PRINCIPIOS ACTIVOS DECLARADOS:' : 'ACTIVE BIOCHEMICAL PROFILE:'}
                    </span>
                    <div className="space-y-1 text-xs font-mono">
                      {inspectProduct.actives.map((act, i) => (
                        <div
                          key={i}
                          className="p-2.5 rounded bg-zy-surface border border-zy-border-subtle flex justify-between items-center"
                        >
                          <span className="font-semibold text-zy-fg">{act.name}</span>
                          <span className="text-[#8f520a] dark:text-[#d8a45f] font-bold">{act.concentration}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sensory & Origin */}
                  <div className="p-3.5 bg-zy-surface rounded-xl border border-zy-border text-xs font-mono space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zy-dim">{language === 'es' ? 'Textura cutánea:' : 'Sensory texture:'}</span>
                      <span className="text-zy-fg">{inspectProduct.sensory.texture[language]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zy-dim">{language === 'es' ? 'Perfil aromático:' : 'Botanical aroma:'}</span>
                      <span className="text-zy-fg">{inspectProduct.sensory.aroma[language]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zy-dim">{language === 'es' ? 'Origen de cosecha:' : 'Harvest provenance:'}</span>
                      <span className="text-zy-blue">{inspectProduct.sensory.origin[language]}</span>
                    </div>
                  </div>

                  {/* Add to Cart in Modal */}
                  <div className="pt-4 border-t border-zy-border-subtle flex items-center space-x-3">
                    <div className="flex items-center space-x-2 border border-zy-border rounded-lg bg-zy-surface px-2.5 py-2 text-xs font-mono">
                      <button
                        type="button"
                        onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                        className="text-zy-muted hover:text-zy-fg"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-2 font-bold">{modalQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setModalQuantity((q) => q + 1)}
                        className="text-zy-muted hover:text-zy-fg"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        handleAddToCart(
                          inspectProduct,
                          inspectProduct.sizes[modalSizeIdx],
                          inspectProduct.vessels[modalVesselIdx],
                          modalQuantity
                        );
                        setInspectProduct(null);
                        setIsCartOpen(true);
                      }}
                      className="flex-grow py-3 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
                    >
                      <ShoppingBag size={14} />
                      <span>{language === 'es' ? 'Añadir a la Bolsa' : 'Add to Shopping Bag'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 10. DEMONSTRATION CHECKOUT MODAL FLOW */}
      <AnimatePresence>
        {checkoutOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Demo Checkout">
            <motion.div
              initial={{ scale: 0.96, y: 12, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="bg-zy-card border border-zy-border rounded-2xl max-w-2xl w-full overflow-hidden p-6 sm:p-8 space-y-6 shadow-2xl text-zy-fg"
            >
              {checkoutStep === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setCheckoutStep(2);
                  }}
                  className="space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-zy-border-subtle pb-4">
                    <div>
                      <span className="text-xs font-mono text-zy-blue uppercase tracking-wider">
                        {language === 'es' ? 'PASO 1 DE 2 // ENVÍO NEUTRO EN CARBONO' : 'STEP 1 OF 2 // CARBON-NEUTRAL SHIPPING'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-bold">
                        {language === 'es' ? 'Datos de Entrega' : 'Delivery Details'}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutOpen(false)}
                      className="p-1.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg"
                      aria-label="Close checkout"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? 'Nombre completo:' : 'Full Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerName}
                        onChange={(e) => setBuyerName(e.target.value)}
                        placeholder="Clara Oswald"
                        className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? 'Correo electrónico:' : 'Email Address:'}
                      </label>
                      <input
                        type="email"
                        required
                        value={buyerEmail}
                        onChange={(e) => setBuyerEmail(e.target.value)}
                        placeholder="oswald@soma-atelier.com"
                        className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-zy-muted uppercase">
                      {language === 'es' ? 'Dirección postal de entrega:' : 'Street Address:'}
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerAddress}
                      onChange={(e) => setBuyerAddress(e.target.value)}
                      placeholder="Calle de los Aromas 412, Piso 4"
                      className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? 'Ciudad / Localidad:' : 'City / Province:'}
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerCity}
                        onChange={(e) => setBuyerCity(e.target.value)}
                        placeholder="San Carlos de Bariloche"
                        className="w-full px-3.5 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-mono text-zy-muted uppercase">
                        {language === 'es' ? 'País de destino:' : 'Country:'}
                      </label>
                      <select
                        className="w-full px-3 py-2 rounded-lg bg-zy-surface border border-zy-border text-xs font-mono text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                        aria-label="Shipping country"
                      >
                        <option>Argentina</option>
                        <option>Chile</option>
                        <option>Uruguay</option>
                        <option>España</option>
                        <option>Switzerland</option>
                        <option>United States</option>
                      </select>
                    </div>
                  </div>

                  {/* Summary row */}
                  <div className="p-3 bg-zy-surface rounded-lg border border-zy-border text-xs font-mono flex justify-between items-center">
                    <span className="text-zy-muted">{language === 'es' ? 'Total de la orden:' : 'Order total:'}</span>
                    <span className="font-bold text-zy-fg text-sm">${cartTotal} USD</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                  >
                    <span>{language === 'es' ? 'Continuar al Pago Simulado' : 'Continue to Mock Payment'}</span>
                    <ArrowRight size={13} />
                  </button>
                </form>
              )}

              {checkoutStep === 2 && (
                <form onSubmit={handleCompleteOrder} className="space-y-5">
                  <div className="flex items-center justify-between border-b border-zy-border-subtle pb-4">
                    <div>
                      <span className="text-xs font-mono text-zy-blue uppercase tracking-wider">
                        {language === 'es' ? 'PASO 2 DE 2 // SIMULACIÓN DE PAGO' : 'STEP 2 OF 2 // PAYMENT SIMULATION'}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-sans font-bold">
                        {language === 'es' ? 'Confirmación de Pago' : 'Payment Confirmation'}
                      </h3>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCheckoutStep(1)}
                      className="text-xs font-mono text-zy-blue hover:underline"
                    >
                      {language === 'es' ? '← Volver' : '← Back'}
                    </button>
                  </div>

                  {/* Promo Code Input */}
                  <div className="p-4 bg-zy-surface rounded-xl border border-zy-border space-y-2">
                    <label className="block text-xs font-mono text-zy-muted uppercase">
                      {language === 'es' ? 'Código Promocional / Cupón:' : 'Promo / Atelier Code:'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="ZYRVAE10"
                        className="flex-grow px-3 py-1.5 rounded-lg bg-zy-card border border-zy-border text-xs font-mono uppercase text-zy-fg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zy-blue"
                      />
                      <button
                        type="button"
                        onClick={handleApplyDiscount}
                        className="px-3.5 py-1.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-xs font-mono font-semibold"
                      >
                        {language === 'es' ? 'Aplicar' : 'Apply'}
                      </button>
                    </div>
                    {discountApplied && (
                      <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 block">
                        {language === 'es' ? '✓ Descuento del 10% aplicado' : '✓ 10% demo discount applied'}
                      </span>
                    )}
                  </div>

                  {/* Mock Payment Details */}
                  <div className="p-4 bg-zy-surface rounded-xl border border-zy-border space-y-3 font-mono text-xs">
                    <span className="text-zy-dim uppercase text-[10px] block">
                      {language === 'es' ? 'MÉTODO DE PAGO DEMOSTRATIVO:' : 'SIMULATED DEMO PAYMENT METHOD:'}
                    </span>
                    <div className="p-3 bg-zy-card rounded border border-zy-border-subtle flex justify-between items-center text-zy-muted">
                      <span>•••• •••• •••• 4242</span>
                      <span>EXP 12/28</span>
                    </div>
                    <p className="text-[10px] text-zy-dim leading-tight">
                      {language === 'es'
                        ? 'Simulación segura. Ningún cargo se realizará a tu tarjeta de crédito o cuenta bancaria.'
                        : 'Secure sandbox simulation. Zero real financial charges will ever occur.'}
                    </p>
                  </div>

                  {/* Total Breakdown */}
                  <div className="p-4 bg-zy-surface rounded-xl border border-zy-border text-xs font-mono space-y-1">
                    <div className="flex justify-between text-zy-muted">
                      <span>{language === 'es' ? 'Subtotal:' : 'Subtotal:'}</span>
                      <span>${cartSubtotal} USD</span>
                    </div>
                    <div className="flex justify-between text-zy-muted">
                      <span>{language === 'es' ? 'Envío neutro en carbono:' : 'Carbon-neutral shipping:'}</span>
                      <span>{isFreeShipping ? 'GRATIS' : `$${shippingCost} USD`}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                        <span>{language === 'es' ? 'Descuento 10%:' : 'Promo 10%:'}</span>
                        <span>-${discountAmount} USD</span>
                      </div>
                    )}
                    <div className="pt-2 border-t border-zy-border-subtle flex justify-between font-bold text-sm text-zy-fg">
                      <span>{language === 'es' ? 'Total final:' : 'Final Total:'}</span>
                      <span className="text-zy-blue text-base">${cartTotal} USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    {language === 'es' ? 'Completar Orden Demostrativa' : 'Complete Demonstration Order'}
                  </button>
                </form>
              )}

              {checkoutStep === 3 && (
                <div className="text-center py-6 space-y-5">
                  <div className="w-14 h-14 mx-auto rounded-full bg-zy-blue/10 border border-zy-blue flex items-center justify-center text-zy-blue">
                    <Check size={28} />
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-zy-blue uppercase tracking-widest">
                      {language === 'es' ? 'ORDEN DEMOSTRATIVA CONFIRMADA' : 'DEMO ORDER CONFIRMED'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-sans font-bold text-zy-fg">
                      {language === 'es' ? '¡Gracias por explorar SŌMA!' : 'Thank you for exploring SŌMA!'}
                    </h3>
                    <p className="font-mono text-xs text-zy-muted">
                      CÓDIGO DE EXPEDIENTE: <span className="text-zy-blue font-bold">{orderRefCode}</span>
                    </p>
                  </div>

                  <div className="p-4 bg-zy-surface rounded-xl border border-zy-border text-xs font-mono text-zy-muted space-y-2 text-left">
                    <div className="flex items-center space-x-2 text-zy-fg font-semibold">
                      <ShieldCheck size={14} className="text-zy-blue" />
                      <span>{language === 'es' ? 'Aviso del Estudio ZYRVAE' : 'ZYRVAE Studio Notice'}</span>
                    </div>
                    <p className="leading-relaxed">
                      {language === 'es'
                        ? 'Esta orden fue completada con éxito en modo simulación para verificar el flujo de compra de extremo a extremo (variantes, cálculo de envíos, códigos promocionales y registro de orden).'
                        : 'This order was completed successfully in simulation mode to verify the end-to-end e-commerce funnel (variants, shipping calculation, promo codes, and order persistence).'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutOpen(false);
                      setCheckoutStep(1);
                    }}
                    className="px-6 py-2.5 rounded-lg bg-zy-fg text-zy-bg font-mono text-xs font-semibold hover:opacity-90 transition-opacity"
                  >
                    {language === 'es' ? 'Continuar navegando' : 'Continue exploring'}
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
