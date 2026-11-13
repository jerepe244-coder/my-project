'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { SomaProduct } from '@/data/commerce';
import { addSomaCartItem, openSomaCart } from './somaCartStore';

interface SomaProductInspectorModalProps {
  product: SomaProduct | null;
  language: 'es' | 'en';
  onClose: () => void;
}

export const SomaProductInspectorModal: React.FC<SomaProductInspectorModalProps> = React.memo(
  ({ product, language, onClose }) => {
    const [modalSizeIdx, setModalSizeIdx] = useState<number>(0);
    const [modalVesselIdx, setModalVesselIdx] = useState<number>(0);
    const [modalQuantity, setModalQuantity] = useState<number>(1);

    useEffect(() => {
      if (product) {
        setModalSizeIdx(0);
        setModalVesselIdx(0);
        setModalQuantity(1);
      }
    }, [product]);

    useEffect(() => {
      if (!product) return;
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', onKeyDown);
      return () => window.removeEventListener('keydown', onKeyDown);
    }, [product, onClose]);

    const selectedSize = product ? product.sizes[modalSizeIdx] ?? product.sizes[0] : '';
    const selectedVessel = product ? product.vessels[modalVesselIdx] ?? product.vessels[0] : null;
    const dynamicPrice =
      product && selectedVessel
        ? product.basePrice + (product.sizeDelta[selectedSize] ?? 0) + selectedVessel.delta
        : 0;

    return (
      <AnimatePresence>
        {product && selectedVessel && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-swiss"
            role="dialog"
            aria-modal="true"
            aria-label={product.title[language]}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--soma-bg)] border border-[var(--soma-border-strong)] monolith-hairline max-w-4xl w-full max-h-[92vh] overflow-y-auto text-[var(--soma-fg)] rounded-none"
            >
              {/* Barra de Ficha Clínica */}
              <div className="px-6 sm:px-8 py-4 bg-[var(--soma-surface)] border-b border-[var(--soma-border)] monolith-hairline flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-[11px] font-medium text-[var(--soma-amber-ink)] tabular-nums">
                    <span>{product.code}</span>
                    <span>·</span>
                    <span>{product.categoryLabel[language]}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-swiss font-semibold tracking-tight">
                    {product.title[language]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--soma-muted)] leading-relaxed">
                    {product.tagline[language]}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] text-[var(--soma-fg)] transition-colors rounded-none shrink-0"
                  aria-label="Close product modal"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Contenido en Retícula 0.5px */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Columna Izquierda: Láminas Fotográficas */}
                <div className="lg:col-span-5 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[var(--soma-border)] monolith-hairline space-y-3 bg-[var(--soma-surface)]/40">
                  <div className="relative aspect-square overflow-hidden border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-card)] rounded-none">
                    <Image
                      src={product.images.primary}
                      alt={product.title[language]}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 1024px) 90vw, 40vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative aspect-video overflow-hidden border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-card)] rounded-none">
                      <Image
                        src={product.images.secondary}
                        alt={`${product.title[language]} secondary`}
                        fill
                        loading="lazy"
                        decoding="async"
                        sizes="20vw"
                        className="object-cover"
                      />
                    </div>
                    {product.images.texture && (
                      <div className="relative aspect-video overflow-hidden border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-card)] rounded-none">
                        <Image
                          src={product.images.texture}
                          alt={`${product.title[language]} texture`}
                          fill
                          loading="lazy"
                          decoding="async"
                          sizes="20vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-[var(--soma-muted)] leading-relaxed pt-2 border-t border-[var(--soma-border)] monolith-hairline">
                    {product.description[language]}
                  </p>
                </div>

                {/* Columna Derecha: Variantes y Matriz Bioquímica */}
                <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
                  {/* Precio dinámico tabular */}
                  <div className="flex items-baseline justify-between border-b border-[var(--soma-border)] monolith-hairline pb-4">
                    <div>
                      <span className="text-[11px] font-medium text-[var(--soma-muted)] block">
                        {language === 'es' ? 'Valor según dosificación' : 'Dosage valuation'}
                      </span>
                      <span className="text-3xl font-semibold text-[var(--soma-fg)] tabular-nums">
                        ${dynamicPrice} USD
                      </span>
                    </div>

                    <span className="text-xs font-medium text-[var(--soma-amber-ink)] tabular-nums">
                      {selectedVessel.id === 'refill'
                        ? language === 'es'
                          ? 'Incluye descuento de recarga (-$8 USD)'
                          : 'Eco-refill discount applied (-$8 USD)'
                        : language === 'es'
                          ? 'Vidrio biofotónico Miron'
                          : 'Miron biophotonic glass'}
                    </span>
                  </div>

                  {/* 1. Volumen */}
                  <div className="space-y-2">
                    <span className="block text-xs font-medium text-[var(--soma-muted)]">
                      {language === 'es' ? '1. Seleccionar volumen' : '1. Select volume'}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((s, idx) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setModalSizeIdx(idx)}
                          className={`px-4 py-2 text-xs font-medium border monolith-hairline transition-colors tabular-nums rounded-none ${
                            modalSizeIdx === idx
                              ? 'bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] border-[var(--soma-border-strong)]'
                              : 'bg-[var(--soma-surface)] border-[var(--soma-border)] text-[var(--soma-muted)] hover:text-[var(--soma-fg)]'
                          }`}
                        >
                          {s} {product.sizeDelta[s] ? `(+$${product.sizeDelta[s]})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Envase */}
                  <div className="space-y-2">
                    <span className="block text-xs font-medium text-[var(--soma-muted)]">
                      {language === 'es' ? '2. Tipo de envase' : '2. Vessel packaging'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-t border-[var(--soma-border)] monolith-hairline text-xs">
                      {product.vessels.map((v, idx) => (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setModalVesselIdx(idx)}
                          className={`p-3.5 border-r border-b border-[var(--soma-border)] monolith-hairline text-left transition-colors space-y-1 rounded-none ${
                            modalVesselIdx === idx
                              ? 'bg-[var(--soma-card)] text-[var(--soma-fg)] shadow-[inset_0_-2px_0_0_var(--soma-amber)]'
                              : 'bg-[var(--soma-bg)] text-[var(--soma-muted)] hover:text-[var(--soma-fg)]'
                          }`}
                        >
                          <div className="flex justify-between items-center font-medium tabular-nums">
                            <span>{v.name[language]}</span>
                            <span className="text-[var(--soma-amber-ink)] shrink-0 ml-2">
                              {v.delta === 0 ? '±$0' : '-$8 USD'}
                            </span>
                          </div>
                          <p className="text-[11px] text-[var(--soma-dim)] leading-snug">
                            {v.description[language]}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activos declarados */}
                  <div className="space-y-2">
                    <span className="text-xs font-medium text-[var(--soma-amber-ink)] block">
                      {language === 'es' ? 'Principios activos declarados' : 'Declared biochemical actives'}
                    </span>
                    <div className="border border-[var(--soma-border)] monolith-hairline divide-y divide-[var(--soma-border)] text-xs">
                      {product.actives.map((act, i) => (
                        <div key={i} className="px-3.5 py-2.5 flex justify-between items-center bg-[var(--soma-surface)]/50">
                          <div>
                            <span className="font-medium text-[var(--soma-fg)] block">{act.name}</span>
                            <span className="text-[11px] text-[var(--soma-muted)]">{act.function[language]}</span>
                          </div>
                          <span className="text-[var(--soma-amber-ink)] font-semibold tabular-nums shrink-0 ml-3">
                            {act.concentration}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Origen y sensorialidad */}
                  <div className="border border-[var(--soma-border)] monolith-hairline divide-y divide-[var(--soma-border)] text-xs">
                    <div className="px-3.5 py-2 flex justify-between gap-4">
                      <span className="text-[var(--soma-muted)]">{language === 'es' ? 'Textura' : 'Texture'}</span>
                      <span className="text-[var(--soma-fg)] text-right">{product.sensory.texture[language]}</span>
                    </div>
                    <div className="px-3.5 py-2 flex justify-between gap-4">
                      <span className="text-[var(--soma-muted)]">{language === 'es' ? 'Perfil aromático' : 'Aroma profile'}</span>
                      <span className="text-[var(--soma-fg)] text-right">{product.sensory.aroma[language]}</span>
                    </div>
                    <div className="px-3.5 py-2 flex justify-between gap-4">
                      <span className="text-[var(--soma-muted)]">{language === 'es' ? 'Origen de cosecha' : 'Harvest provenance'}</span>
                      <span className="text-[var(--soma-amber-ink)] text-right font-medium">{product.sensory.origin[language]}</span>
                    </div>
                  </div>

                  {/* Añadir al albarán */}
                  <div className="pt-2 flex items-stretch gap-3">
                    <div className="inline-flex items-center border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] text-xs tabular-nums rounded-none">
                      <button
                        type="button"
                        onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2.5 text-[var(--soma-muted)] hover:text-[var(--soma-fg)]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="px-3 font-medium border-x border-[var(--soma-border)] monolith-hairline">
                        {modalQuantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setModalQuantity((q) => q + 1)}
                        className="px-3 py-2.5 text-[var(--soma-muted)] hover:text-[var(--soma-fg)]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        addSomaCartItem(
                          product,
                          selectedSize,
                          selectedVessel,
                          modalQuantity,
                          product.title[language]
                        );
                        onClose();
                        openSomaCart();
                      }}
                      className="flex-grow py-3 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium tracking-wide transition-colors flex items-center justify-center space-x-2 rounded-none"
                    >
                      <ShoppingBag size={13} />
                      <span>{language === 'es' ? 'Añadir al albarán' : 'Add to laboratory slip'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  }
);

SomaProductInspectorModal.displayName = 'SomaProductInspectorModal';
