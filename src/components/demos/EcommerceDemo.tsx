'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, ShoppingBag, Plus, Minus, Trash2, Check, ArrowRight, ShieldCheck, Leaf, X } from 'lucide-react';

interface CartItem {
  id: string;
  productId: string;
  title: { es: string; en: string };
  size: string;
  vessel: string;
  vesselId?: string;
  unitPrice: number;
  quantity: number;
}

interface ProductSpec {
  id: string;
  code: string;
  title: { es: string; en: string };
  category: { es: string; en: string };
  tagline: { es: string; en: string };
  basePrice: number;
  sizes: string[];
  sizeDelta: Record<string, number>;
  vessels: { id: string; name: { es: string; en: string }; delta: number }[];
  images: {
    glass: string;
    refill: string;
    vesselNote: { es: string; en: string };
  };
  actives: { name: string; conc: string }[];
  sensory: {
    texture: { es: string; en: string };
    aroma: { es: string; en: string };
    origin: { es: string; en: string };
  };
}

export const EcommerceDemo: React.FC = () => {
  const { language } = useLanguage();

  const products: ProductSpec[] = [
    {
      id: 'soma-01',
      code: 'FORM-01/REG',
      title: {
        es: 'Néctar Celular Regenerativo',
        en: 'Regenerative Cellular Nectar',
      },
      category: {
        es: 'Suero Reparador Nocturno',
        en: 'Night Repair Serum',
      },
      tagline: {
        es: 'Complejo de péptidos botánicos, escualano vegetal puro y resina silvestre de mirra.',
        en: 'Botanical peptide matrix, pure plant squalane, and wild myrrh resin.',
      },
      basePrice: 78,
      sizes: ['30ml', '50ml'],
      sizeDelta: { '30ml': 0, '50ml': 26 },
      vessels: [
        { id: 'glass', name: { es: 'Vidrio Biofotónico Miron', en: 'Miron Biophotonic Glass' }, delta: 0 },
        { id: 'refill', name: { es: 'Recarga Eco-Pouch Compostable', en: 'Compostable Refill Pouch' }, delta: -8 },
      ],
      images: {
        glass: '/images/soma-01-glass.webp',
        refill: '/images/soma-refill-pouch.webp',
        vesselNote: {
          es: 'Frasco violeta oscuro con gotero de precisión',
          en: 'Dark violet glass bottle with precision dropper',
        },
      },
      actives: [
        { name: 'Phyto-Peptide Matrix', conc: '4.8%' },
        { name: 'Olive Squalane', conc: '100% Purity' },
        { name: 'Wild Frankincense', conc: 'Trace Terpenes' },
      ],
      sensory: {
        texture: { es: 'Fluido sedoso de absorción inmediata', en: 'Silky fast-absorbing dry oil' },
        aroma: { es: 'Corteza de cedro, resina ahumada e higo verde', en: 'Cedarwood, smoked amber & green fig' },
        origin: { es: 'Recolectado en micro-parcelas andinas', en: 'Harvested in high-altitude Andean micro-plots' },
      },
    },
    {
      id: 'soma-02',
      code: 'FORM-02/LIP',
      title: {
        es: 'Bálsamo Barrera Lipídica',
        en: 'Lipid Barrier Botanical Balm',
      },
      category: {
        es: 'Cuidado Regenerador de Barrera',
        en: 'Barrier Restoration Balm',
      },
      tagline: {
        es: 'Tres ceramidas de origen botánico, semilla de lino salvaje y bisabolol orgánico.',
        en: 'Three plant-derived bio-ceramides, wild flaxseed lipid, and organic bisabolol.',
      },
      basePrice: 64,
      sizes: ['30ml', '50ml'],
      sizeDelta: { '30ml': 0, '50ml': 22 },
      vessels: [
        { id: 'glass', name: { es: 'Vidrio Biofotónico Miron', en: 'Miron Biophotonic Glass' }, delta: 0 },
        { id: 'refill', name: { es: 'Recarga Eco-Pouch Compostable', en: 'Compostable Refill Pouch' }, delta: -8 },
      ],
      images: {
        glass: '/images/soma-02-glass.webp',
        refill: '/images/soma-refill-pouch.webp',
        vesselNote: {
          es: 'Tarro apotecario de vidrio de boca ancha',
          en: 'Wide-mouth biophotonic apothecary glass jar',
        },
      },
      actives: [
        { name: 'Botanical Ceramides (I, III, VI)', conc: '3.2%' },
        { name: 'Flaxseed Omega 3-6-9', conc: 'Cold Pressed' },
        { name: 'Alpha-Bisabolol', conc: '1.0% Pure' },
      ],
      sensory: {
        texture: { es: 'Emulsión densa fundente al contacto cutáneo', en: 'Rich melt-on-skin dense emulsion' },
        aroma: { es: 'Manzanilla silvestre y grano tostado', en: 'Wild chamomile & roasted oat husk' },
        origin: { es: 'Prensado en frío en Bariloche, Patagonia', en: 'Cold pressed in Bariloche, Patagonia' },
      },
    },
    {
      id: 'soma-03',
      code: 'FORM-03/HYD',
      title: {
        es: 'Bruma Biofotónica Esencial',
        en: 'Biophotonic Essence Mist',
      },
      category: {
        es: 'Tónico Celular Micro-Activado',
        en: 'Micro-Activated Cellular Mist',
      },
      tagline: {
        es: 'Hidrolato de rosas silvestres, ácido poliglutámico marino y flor de sal.',
        en: 'Wild damask rose hydrosol, marine polyglutamic acid, and sea salt minerals.',
      },
      basePrice: 52,
      sizes: ['50ml', '100ml'],
      sizeDelta: { '50ml': 0, '100ml': 28 },
      vessels: [
        { id: 'glass', name: { es: 'Vidrio Biofotónico Miron', en: 'Miron Biophotonic Glass' }, delta: 0 },
        { id: 'refill', name: { es: 'Recarga Eco-Pouch Compostable', en: 'Compostable Refill Pouch' }, delta: -8 },
      ],
      images: {
        glass: '/images/soma-03-glass.webp',
        refill: '/images/soma-refill-pouch.webp',
        vesselNote: {
          es: 'Botella esbelta con atomizador micro-bruma',
          en: 'Slender bottle with fine micro-mist atomizer',
        },
      },
      actives: [
        { name: 'High-Weight Polyglutamic', conc: '1.5%' },
        { name: 'Organic Damask Rose Water', conc: '92% Active Base' },
        { name: 'Electrolyte Mineral Matrix', conc: 'Deep Ocean Origin' },
      ],
      sensory: {
        texture: { es: 'Micronizado ultra fino refrescante', en: 'Ultra-fine weightless micro-mist' },
        aroma: { es: 'Pétalo fresco, rocío matinal y mineralidad marina', en: 'Fresh petal, morning dew & ocean mineral' },
        origin: { es: 'Destilado botánico artesanal en Valle de Uco', en: 'Artisanal steam distillation in Uco Valley' },
      },
    },
  ];

  const [activeProductIdx, setActiveProductIdx] = useState(0);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);
  const [selectedVesselIdx, setSelectedVesselIdx] = useState(0);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'init-item-1',
      productId: 'soma-01',
      title: {
        es: 'Néctar Celular Regenerativo',
        en: 'Regenerative Cellular Nectar',
      },
      size: '30ml',
      vessel: 'Vidrio Biofotónico Miron',
      vesselId: 'glass',
      unitPrice: 78,
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const product = products[activeProductIdx] ?? products[0];
  const currentSize = product.sizes[selectedSizeIdx] ?? product.sizes[0];
  const currentVessel = product.vessels[selectedVesselIdx] ?? product.vessels[0];
  const sizeDeltaValue = product.sizeDelta[currentSize] ?? 0;
  const currentPrice = product.basePrice + sizeDeltaValue + currentVessel.delta;
  const isRefillSelected = currentVessel.id === 'refill';
  const activeImageSrc = isRefillSelected ? product.images.refill : product.images.glass;
  const secondaryImageSrc = isRefillSelected ? product.images.glass : product.images.refill;

  const getCartItemImage = (item: CartItem) => {
    const matchedProduct = products.find((p) => p.id === item.productId) ?? products[0];
    const isRefill =
      item.vesselId === 'refill' ||
      item.vessel.toLowerCase().includes('pouch') ||
      item.vessel.toLowerCase().includes('recarga');
    return isRefill ? matchedProduct.images.refill : matchedProduct.images.glass;
  };

  const handleAddToCart = () => {
    const itemKey = `${product.id}-${currentSize}-${currentVessel.id}`;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemKey);
      if (existing) {
        return prev.map((i) => (i.id === itemKey ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [
        ...prev,
        {
          id: itemKey,
          productId: product.id,
          title: product.title,
          size: currentSize,
          vessel: currentVessel.name[language],
          vesselId: currentVessel.id,
          unitPrice: currentPrice,
          quantity: 1,
        },
      ];
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2200);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 100;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;

  return (
    <div className="rounded-2xl border border-zy-border bg-zy-card overflow-hidden text-zy-fg font-sans relative shadow-sm">
      {/* Top Demo Bar */}
      <div className="bg-zy-surface px-4 sm:px-6 py-3 border-b border-zy-border flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center space-x-2 text-zy-blue">
          <Sparkles size={14} />
          <span className="font-semibold uppercase tracking-wider">
            {language === 'es' ? 'DEMO INTERACTIVA' : 'INTERACTIVE DEMO'}
          </span>
          <span className="text-zy-muted">| SŌMA FORMULATIONS</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg transition-colors"
            aria-label="Abrir carrito simulado"
          >
            <ShoppingBag size={13} className="text-zy-blue" />
            <span className="text-[11px] font-medium">{language === 'es' ? 'Bolsa' : 'Cart'}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-zy-blue text-[10px] text-white font-bold">
              {cartCount}
            </span>
          </button>

          <span className="inline-flex items-center px-2 py-0.5 rounded bg-zy-control text-zy-muted border border-zy-border-subtle text-[10px] hidden sm:inline-flex">
            {language === 'es' ? 'Simulación conceptual de e-commerce' : 'Conceptual e-commerce simulation'}
          </span>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Product Specimen Showcase & Selector */}
        <div className="lg:col-span-7 space-y-6">
          {/* Product tabs */}
          <div className="flex flex-wrap gap-2 p-1 bg-zy-surface border border-zy-border-card rounded-lg">
            {products.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setActiveProductIdx(idx);
                  setSelectedSizeIdx(0);
                  setSelectedVesselIdx(0);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all text-left flex-1 min-w-[130px] ${
                  activeProductIdx === idx
                    ? 'bg-zy-control-active text-zy-fg border border-zy-border shadow-sm'
                    : 'text-zy-muted hover:text-zy-fg'
                }`}
              >
                <span className="text-[10px] text-zy-dim block">{p.code}</span>
                <span className="font-semibold block truncate">{p.title[language]}</span>
              </button>
            ))}
          </div>

          {/* Product Hero Visual Card */}
          <div className="relative rounded-xl bg-zy-surface-alt border border-zy-border p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
            {/* Architectural Grid and Specimen Label */}
            <div className="flex justify-between items-start text-xs font-mono text-zy-muted z-10">
              <div>
                <span className="text-zy-blue font-semibold block">{product.code}</span>
                <span className="text-[11px] text-zy-muted">{product.category[language]}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] block uppercase text-zy-dim">// SPECIMEN</span>
                <span className="text-zy-fg font-mono text-sm font-semibold">${currentPrice} USD</span>
              </div>
            </div>

            {/* Differentiated Studio Product Photography Stage */}
            <div className="relative my-3 sm:my-4 aspect-[4/3] sm:aspect-[16/10] w-full rounded-lg bg-[#07090b] border border-zy-border overflow-hidden flex items-center justify-center">
              <div
                className={`relative w-full h-full transition-transform duration-500 ease-out ${
                  selectedSizeIdx === 1 ? 'scale-100' : 'scale-[0.94]'
                }`}
              >
                <Image
                  key={`${product.id}-${currentVessel.id}`}
                  src={activeImageSrc}
                  alt={`${product.title[language]} — ${currentSize} ${currentVessel.name[language]}`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 540px"
                  className="object-contain object-center select-none"
                  priority
                />
              </div>

              {/* Subtle Vignette & Active Variant Badges */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#07090b] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 z-10">
                <div className="px-2.5 py-1.5 rounded-md bg-[#0b0e14]/90 backdrop-blur-md border border-[#232b3a] text-[11px] font-mono">
                  <span className="text-white font-semibold">{currentSize}</span>
                  <span className="text-[#8b92a5]"> · {currentVessel.name[language]}</span>
                  <span className="block text-[10px] text-[#9ba3b8]">
                    {isRefillSelected
                      ? language === 'es'
                        ? `Recarga para ${product.images.vesselNote.es.toLowerCase()}`
                        : `Refill for ${product.images.vesselNote.en.toLowerCase()}`
                      : product.images.vesselNote[language]}
                  </span>
                </div>

                {/* Quick Vessel Switcher Preview Thumbnail */}
                <button
                  type="button"
                  onClick={() => setSelectedVesselIdx(isRefillSelected ? 0 : 1)}
                  className="group/vessel flex items-center space-x-2 p-1.5 rounded-md bg-[#0b0e14]/90 hover:bg-[#141a26] backdrop-blur-md border border-[#232b3a] hover:border-zy-blue transition-all text-left shrink-0"
                  title={
                    isRefillSelected
                      ? language === 'es'
                        ? 'Ver envase de vidrio biofotónico'
                        : 'View biophotonic glass vessel'
                      : language === 'es'
                        ? 'Ver recarga Eco-Pouch'
                        : 'View Eco-Pouch refill'
                  }
                >
                  <div className="relative w-8 h-8 rounded overflow-hidden bg-[#07090b] border border-[#1e2533] shrink-0">
                    <Image
                      src={secondaryImageSrc}
                      alt={
                        isRefillSelected
                          ? product.vessels[0].name[language]
                          : product.vessels[1].name[language]
                      }
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden sm:block pr-1 font-mono">
                    <span className="block text-[9px] uppercase text-[#8b92a5] group-hover/vessel:text-zy-blue transition-colors">
                      {isRefillSelected
                        ? language === 'es'
                          ? 'Ver Vidrio'
                          : 'View Glass'
                        : language === 'es'
                          ? 'Ver Eco-Pouch'
                          : 'View Refill'}
                    </span>
                    <span className="block text-[10px] text-white font-medium">
                      {isRefillSelected ? product.code.split('/')[0] : '-$8 USD'}
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Actives Footer in Card */}
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zy-border-card text-[10px] font-mono z-10">
              {product.actives.map((act, i) => (
                <div key={i} className="text-center sm:text-left">
                  <span className="text-zy-muted block truncate">{act.name}</span>
                  <span className="text-zy-fg-secondary font-semibold">{act.conc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sensory Profile Accordion */}
          <div className="p-4 rounded-xl bg-zy-surface border border-zy-border-card space-y-3 text-xs">
            <span className="font-mono text-[10px] text-zy-blue uppercase tracking-wider block">
              // {language === 'es' ? 'Perfil Sensorial & Origen Botánico' : 'Sensory Profile & Botanical Origin'}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-sans">
              <div>
                <span className="text-zy-muted text-[11px] block font-mono">
                  {language === 'es' ? 'Textura' : 'Texture'}
                </span>
                <p className="text-zy-fg-secondary mt-0.5">{product.sensory.texture[language]}</p>
              </div>
              <div>
                <span className="text-zy-muted text-[11px] block font-mono">
                  {language === 'es' ? 'Aroma' : 'Aroma'}
                </span>
                <p className="text-zy-fg-secondary mt-0.5">{product.sensory.aroma[language]}</p>
              </div>
              <div>
                <span className="text-zy-muted text-[11px] block font-mono">
                  {language === 'es' ? 'Origen' : 'Origin'}
                </span>
                <p className="text-zy-fg-secondary mt-0.5">{product.sensory.origin[language]}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customization & Cart Checkout Simulator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zy-fg">
              {product.title[language]}
            </h3>
            <p className="text-xs sm:text-sm text-zy-muted font-sans leading-relaxed">
              {product.tagline[language]}
            </p>
          </div>

          {/* Variant Selector 1: Volume */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-zy-muted uppercase">
                // {language === 'es' ? 'Seleccionar Volumen' : 'Select Volume'}
              </span>
              <span className="text-zy-fg font-medium">{currentSize}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {product.sizes.map((s, idx) => (
                <button
                  key={s}
                  onClick={() => setSelectedSizeIdx(idx)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedSizeIdx === idx
                      ? 'bg-zy-accent-soft border-zy-blue text-zy-fg shadow-[0_0_12px_rgba(10,92,255,0.15)]'
                      : 'bg-zy-surface border-zy-border-card text-zy-muted hover:border-zy-border-strong'
                  }`}
                >
                  <span className="font-semibold block">{s}</span>
                  <span className="text-[10px] text-zy-muted block mt-0.5">
                    {idx === 0 ? (language === 'es' ? 'Tamaño estudio' : 'Studio size') : (language === 'es' ? 'Formato extendido' : 'Extended supply')}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Variant Selector 2: Vessel & Sustainability */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-baseline text-xs font-mono">
              <span className="text-zy-muted uppercase">
                // {language === 'es' ? 'Tipo de Envase' : 'Vessel Type'}
              </span>
              <span className="text-zy-fg font-medium">{currentVessel.name[language]}</span>
            </div>
            <div className="space-y-2 font-mono text-xs">
              {product.vessels.map((v, idx) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVesselIdx(idx)}
                  className={`w-full p-3 rounded-lg border text-left flex items-center justify-between transition-all ${
                    selectedVesselIdx === idx
                      ? 'bg-zy-accent-soft border-zy-blue text-zy-fg'
                      : 'bg-zy-surface border-zy-border-card text-zy-muted hover:border-zy-border-strong'
                  }`}
                >
                  <div>
                    <span className="font-medium block">{v.name[language]}</span>
                    <span className="text-[10px] text-zy-muted block">
                      {v.id === 'glass' ? (language === 'es' ? 'Protección fotónica completa' : 'Full photonic light seal') : (language === 'es' ? 'Menor huella de carbono (-$8)' : 'Eco lower carbon footprint (-$8)')}
                    </span>
                  </div>
                  {v.delta !== 0 && (
                    <span className="text-[11px] text-zy-blue font-semibold">{v.delta < 0 ? `-$${Math.abs(v.delta)}` : `+$${v.delta}`}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="pt-2 space-y-3">
            <div className="flex items-baseline justify-between text-xs font-mono border-t border-zy-border-card pt-4">
              <span className="text-zy-muted uppercase">{language === 'es' ? 'Total Ficha' : 'Item Total'}:</span>
              <span className="text-xl font-bold text-zy-fg">${currentPrice} USD</span>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-4 rounded-xl bg-zy-blue hover:bg-zy-blue-hover active:scale-[0.99] text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_20px_rgba(10,92,255,0.35)]"
            >
              {addedNotice ? (
                <>
                  <Check size={16} />
                  <span>{language === 'es' ? 'AÑADIDO A LA BOLSA' : 'ADDED TO CART'}</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={16} />
                  <span>{language === 'es' ? 'AÑADIR AL CARRITO' : 'ADD TO CART'}</span>
                  <span>· ${currentPrice}</span>
                </>
              )}
            </button>
          </div>

          {/* Environmental Guarantees */}
          <div className="p-3 bg-zy-surface border border-zy-border-subtle rounded-lg flex items-center space-x-3 text-[11px] text-zy-muted font-mono">
            <Leaf size={14} className="text-zy-blue shrink-0" />
            <span>
              {language === 'es'
                ? 'Embalaje 100% libre de plásticos. Envíos carbono neutrales.'
                : '100% plastic-free packaging. Carbon-neutral global delivery.'}
            </span>
          </div>
        </div>
      </div>

      {/* Cart Drawer Overlay & Panel */}
      {isCartOpen && (
        <div
          style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
          className="absolute inset-0 backdrop-blur-sm z-30 flex justify-end"
        >
          <div className="w-full sm:w-[380px] bg-zy-card border-l border-zy-border h-full flex flex-col justify-between p-6 overflow-y-auto">
            {/* Drawer Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zy-border-card">
                <div className="flex items-center space-x-2">
                  <ShoppingBag size={16} className="text-zy-blue" />
                  <h4 className="font-mono text-xs uppercase tracking-wider text-zy-fg">
                    {language === 'es' ? 'Tu Bolsa de Compra' : 'Your Shopping Bag'} ({cartCount})
                  </h4>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded text-zy-muted hover:text-zy-fg transition-colors"
                  aria-label="Cerrar bolsa"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-4 max-h-[46vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono text-zy-muted">
                    {language === 'es' ? 'Tu bolsa está vacía.' : 'Your bag is empty.'}
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-lg bg-zy-surface border border-zy-border flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-[#07090b] border border-zy-border shrink-0">
                        <Image
                          src={getCartItemImage(item)}
                          alt={`${item.title[language]} — ${item.size}`}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <span className="font-sans font-bold text-zy-fg block truncate">
                          {item.title[language]}
                        </span>
                        <span className="text-[10px] font-mono text-zy-muted block">
                          {item.size} · {item.vessel}
                        </span>
                        <span className="text-xs font-mono text-zy-fg-secondary font-medium block">
                          ${item.unitPrice} USD
                        </span>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-zy-muted hover:text-red-500 p-0.5"
                          title="Eliminar"
                        >
                          <Trash2 size={13} />
                        </button>
                        <div className="flex items-center space-x-1.5 bg-zy-card border border-zy-border px-1.5 py-0.5 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-zy-muted hover:text-zy-fg"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="font-mono text-xs px-1 text-zy-fg">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-zy-muted hover:text-zy-fg"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Drawer Checkout Footer */}
            <div className="pt-4 border-t border-zy-border-card space-y-3">
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-zy-muted">
                  <span>{language === 'es' ? 'Subtotal' : 'Subtotal'}</span>
                  <span className="text-zy-fg">${cartSubtotal} USD</span>
                </div>
                <div className="flex justify-between text-zy-muted">
                  <span>{language === 'es' ? 'Envío Sustentable' : 'Eco Shipping'}</span>
                  <span className={isFreeShipping ? 'text-zy-blue font-semibold' : 'text-zy-fg'}>
                    {isFreeShipping ? (language === 'es' ? 'Bonificado' : 'Complimentary') : '$15 USD'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zy-fg pt-2 border-t border-zy-border-subtle">
                  <span>{language === 'es' ? 'Total Estimado' : 'Estimated Total'}</span>
                  <span>${isFreeShipping ? cartSubtotal : cartSubtotal + 15} USD</span>
                </div>
              </div>

              <button
                disabled={cart.length === 0}
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutModalOpen(true);
                }}
                className="w-full py-3 rounded-xl bg-zy-blue hover:bg-zy-blue-hover disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all shadow-[0_0_15px_rgba(10,92,255,0.3)]"
              >
                <span>{language === 'es' ? 'SIMULAR CHECKOUT' : 'PROCEED TO MOCK CHECKOUT'}</span>
                <ArrowRight size={14} />
              </button>

              <p className="text-[10px] text-center text-zy-muted font-mono">
                {language === 'es'
                  ? 'Entorno de demostración: no se cobrará importe real.'
                  : 'Demonstration environment: no real charge will be incurred.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Simulator Modal */}
      {checkoutModalOpen && (
        <div
          style={{ backgroundColor: 'var(--zy-modal-backdrop)' }}
          className="absolute inset-0 backdrop-blur-md z-40 flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full bg-zy-card border border-zy-border rounded-2xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <div className="w-12 h-12 mx-auto rounded-full bg-zy-blue/10 border border-zy-blue/30 flex items-center justify-center text-zy-blue">
              <ShieldCheck size={24} />
            </div>

            <div className="space-y-2">
              <span className="font-mono text-[10px] text-zy-blue uppercase tracking-widest block">
                // {language === 'es' ? 'SIMULACIÓN COMPLETADA CON ÉXITO' : 'SIMULATION COMPLETED'}
              </span>
              <h3 className="text-xl font-sans font-bold text-zy-fg">
                {language === 'es' ? 'Orden de Prueba SŌMA-9842' : 'Test Order SŌMA-9842'}
              </h3>
              <p className="text-xs text-zy-muted font-sans leading-relaxed">
                {language === 'es'
                  ? 'Esta demostración valida la arquitectura de variantes, estados de carrito, microinteracciones reactivas y cálculo de envíos sin requerir pasarelas de pago reales.'
                  : 'This demonstration validates variant architecture, cart state persistence, reactive microinteractions, and shipping calculus without executing real payments.'}
              </p>
            </div>

            <div className="p-3.5 bg-zy-surface border border-zy-border rounded-xl text-left space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-zy-muted">
                <span>{language === 'es' ? 'Artículos' : 'Units'}:</span>
                <span className="text-zy-fg">{cartCount}</span>
              </div>
              <div className="flex justify-between text-zy-muted">
                <span>{language === 'es' ? 'Total simulado' : 'Mock total'}:</span>
                <span className="text-zy-blue font-bold">${isFreeShipping ? cartSubtotal : cartSubtotal + 15} USD</span>
              </div>
              <div className="flex justify-between text-zy-muted">
                <span>{language === 'es' ? 'Estado' : 'Status'}:</span>
                <span className="text-emerald-500 font-semibold">DEMO VERIFIED</span>
              </div>
            </div>

            <button
              onClick={() => setCheckoutModalOpen(false)}
              className="w-full py-2.5 rounded-lg bg-zy-control hover:bg-zy-control-hover border border-zy-border text-zy-fg text-xs font-mono font-medium transition-colors"
            >
              {language === 'es' ? 'Regresar a la demostración' : 'Return to demonstration'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
