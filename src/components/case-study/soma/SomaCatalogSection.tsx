'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Plus, Search, Sparkles, X } from 'lucide-react';
import { SOMA_PRODUCTS, SomaProduct } from '@/data/commerce';
import { addSomaCartItem } from './somaCartStore';
import { SomaProductInspectorModal } from './SomaProductInspectorModal';

interface SomaCatalogSectionProps {
  language: 'es' | 'en';
}

export const SomaCatalogSection: React.FC<SomaCatalogSectionProps> = React.memo(({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [inspectProduct, setInspectProduct] = useState<SomaProduct | null>(null);

  const handleCloseInspector = useCallback(() => {
    setInspectProduct(null);
  }, []);

  const filteredProducts = useMemo(() => {
    return SOMA_PRODUCTS.filter((prod) => {
      if (activeCategory !== 'all' && prod.category !== activeCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = prod.title[language].toLowerCase().includes(q);
        const matchTagline = prod.tagline[language].toLowerCase().includes(q);
        const matchCode = prod.code.toLowerCase().includes(q);
        const matchActives = prod.actives.some((a) => a.name.toLowerCase().includes(q));
        if (!matchTitle && !matchTagline && !matchCode && !matchActives) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      return 0;
    });
  }, [activeCategory, searchQuery, sortBy, language]);

  const categories = useMemo(
    () => [
      { id: 'all', label: language === 'es' ? 'Todas (06)' : 'All (06)' },
      { id: 'serums', label: language === 'es' ? 'Sueros & Aceites' : 'Serums & Oils' },
      { id: 'balms', label: language === 'es' ? 'Bálsamos' : 'Balms' },
      { id: 'mists', label: language === 'es' ? 'Brumas' : 'Mists' },
      { id: 'eye', label: language === 'es' ? 'Contorno' : 'Eye Care' },
      { id: 'cleansers', label: language === 'es' ? 'Limpieza' : 'Cleansers' },
    ],
    [language]
  );

  return (
    <>
      <div className="space-y-8">
        {/* Cabecera del Dispensario */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[var(--soma-border)] monolith-hairline pb-8">
          <div className="space-y-2">
            <span className="text-xs font-swiss font-medium text-[var(--soma-amber-ink)] block">
              {language === 'es' ? 'Dispensario celular' : 'Cellular dispensary'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-swiss font-semibold tracking-tight text-[var(--soma-fg)]">
              {language === 'es' ? 'Catálogo de fórmulas.' : 'Formulation catalog.'}
            </h2>
            <p className="text-sm sm:text-base text-[var(--soma-muted)] font-swiss max-w-xl leading-relaxed">
              {language === 'es'
                ? 'Explore cada formulación por categoría o principio activo. Envase primario en vidrio biofotónico Miron con opción de recarga compostable.'
                : 'Explore each formulation by category or bioactive compound. Preserved in Miron biophotonic glass with compostable eco-refill options.'}
            </p>
          </div>

          {/* Selector de Ordenamiento (Sin monospace, Sentence case) */}
          <div className="flex items-center space-x-3 text-xs font-swiss shrink-0">
            <span className="text-[var(--soma-muted)] font-medium">
              {language === 'es' ? 'Ordenar por' : 'Sort by'}
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
              className="bg-transparent border-b border-[var(--soma-border-strong)] py-1.5 pr-4 text-[var(--soma-fg)] text-xs font-swiss font-medium focus-visible:outline-none focus-visible:border-[var(--soma-amber)] rounded-none cursor-pointer"
              aria-label="Sort product catalog"
            >
              <option value="featured" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">
                {language === 'es' ? 'Destacados' : 'Featured'}
              </option>
              <option value="price-asc" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">
                {language === 'es' ? 'Precio: Menor a mayor' : 'Price: Low to high'}
              </option>
              <option value="price-desc" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">
                {language === 'es' ? 'Precio: Mayor a menor' : 'Price: High to low'}
              </option>
            </select>
          </div>
        </div>

        {/* Barra Tipográfica Continua de Filtros con Separadores Verticales + Búsqueda Subrayada */}
        <div className="flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-6 border-y border-[var(--soma-border)] monolith-hairline py-3.5">
          {/* Barra Tipográfica Continua (Todas | Sueros & Aceites | Bálsamos | Brumas...) */}
          <div
            role="tablist"
            aria-label="Filter catalog by category"
            className="flex flex-wrap items-center font-swiss text-xs"
          >
            {categories.map((cat, idx) => {
              const isSelected = activeCategory === cat.id;
              return (
                <React.Fragment key={cat.id}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`py-1.5 px-2.5 sm:px-3 transition-colors outline-none rounded-none tabular-nums font-medium ${
                      idx === 0 ? 'pl-0' : ''
                    } ${
                      isSelected
                        ? 'text-[var(--soma-fg)] border-b-2 border-[var(--soma-amber)]'
                        : 'text-[var(--soma-muted)] hover:text-[var(--soma-fg)] border-b-2 border-transparent'
                    }`}
                  >
                    {cat.label}
                  </button>
                  {idx < categories.length - 1 && (
                    <span className="text-[var(--soma-border)] select-none px-0.5" aria-hidden="true">
                      |
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Buscador sobre línea continua */}
          <div className="relative min-w-[260px] sm:min-w-[300px]">
            <Search size={13} className="absolute left-0 top-1/2 -translate-y-1/2 text-[var(--soma-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'es'
                  ? 'Buscar por principio activo o fórmula...'
                  : 'Search active compound or formula...'
              }
              className="soma-line-input pl-5 pr-6 text-xs font-swiss"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--soma-muted)] hover:text-[var(--soma-fg)]"
                aria-label="Clear search"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Grilla Continua 0.5px de Etiquetas Farmacéuticas Suizas */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] space-y-4 rounded-none">
            <Sparkles size={22} className="mx-auto text-[var(--soma-amber-ink)]" strokeWidth={1.25} />
            <p className="font-swiss text-sm text-[var(--soma-muted)]">
              {language === 'es'
                ? 'No se encontraron fórmulas que coincidan con el filtro aplicado.'
                : 'No botanical formulations match your current filter.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 border border-[var(--soma-border-strong)] bg-[var(--soma-bg)] text-xs font-swiss font-medium hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] transition-colors rounded-none"
            >
              {language === 'es' ? 'Restablecer filtros' : 'Reset filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-[var(--soma-border)] monolith-hairline">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((prod) => (
                <motion.article
                  layout
                  key={prod.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="group border-r border-b border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] hover:bg-[var(--soma-surface)]/45 transition-colors flex flex-col justify-between rounded-none"
                >
                  {/* Fotografía limpia sin badges flotantes, con lazy loading y decodificación asíncrona */}
                  <div className="relative aspect-[4/3] bg-[var(--soma-surface)] overflow-hidden">
                    <Image
                      src={prod.images.primary}
                      alt={prod.title[language]}
                      fill
                      loading="lazy"
                      decoding="async"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
                    />
                  </div>

                  {/* Etiqueta Farmacéutica Suiza Dividida en Filas de 0.5px */}
                  <div className="flex flex-col flex-grow justify-between border-t border-[var(--soma-border)] monolith-hairline">
                    {/* Fila 1: Código de Lote & Precio Tabular */}
                    <div className="px-5 py-2.5 border-b border-[var(--soma-border)] monolith-hairline flex items-center justify-between text-[11px] font-swiss font-medium tabular-nums">
                      <span className="text-[var(--soma-muted)]">{prod.code}</span>
                      <span className="text-[var(--soma-fg)] font-semibold">${prod.basePrice} USD</span>
                    </div>

                    {/* Fila 2: Identidad de Fórmula */}
                    <div className="p-5 space-y-2 flex-grow">
                      <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
                        {prod.categoryLabel[language]}
                      </span>
                      <h3 className="text-lg font-swiss font-semibold text-[var(--soma-fg)] tracking-tight leading-snug">
                        {prod.title[language]}
                      </h3>
                      <p className="text-xs text-[var(--soma-muted)] font-swiss line-clamp-2 leading-relaxed">
                        {prod.tagline[language]}
                      </p>
                    </div>

                    {/* Fila 3: Perfil Bioactivo Tabular & Nota de Recarga Discreta */}
                    <div className="px-5 py-3.5 border-t border-[var(--soma-border)] monolith-hairline space-y-2 text-[11px] font-swiss">
                      <div className="flex items-center justify-between text-[var(--soma-dim)] font-medium">
                        <span>{language === 'es' ? 'Concentración bioactiva' : 'Bioactive concentration'}</span>
                        <span className="text-[var(--soma-amber-ink)] tabular-nums">
                          {language === 'es' ? 'Recarga -$8' : 'Refill -$8'}
                        </span>
                      </div>

                      <div className="space-y-1">
                        {prod.actives.slice(0, 2).map((act, i) => (
                          <div
                            key={i}
                            className="flex items-baseline justify-between gap-2 text-[var(--soma-fg)]"
                          >
                            <span className="truncate font-normal text-[var(--soma-muted)]">{act.name}</span>
                            <span className="font-medium tabular-nums shrink-0">{act.concentration}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fila 4: Acciones en Celda Dividida 50/50 */}
                    <div className="grid grid-cols-2 border-t border-[var(--soma-border)] monolith-hairline text-xs font-swiss font-medium">
                      <button
                        type="button"
                        onClick={() => setInspectProduct(prod)}
                        className="py-3 px-4 border-r border-[var(--soma-border)] monolith-hairline text-left text-[var(--soma-muted)] hover:text-[var(--soma-fg)] hover:bg-[var(--soma-surface)] transition-colors flex items-center justify-between rounded-none"
                      >
                        <span>{language === 'es' ? 'Ficha técnica' : 'Clinical specs'}</span>
                        <ChevronRight size={13} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          addSomaCartItem(prod, prod.sizes[0], prod.vessels[0], 1, prod.title[language])
                        }
                        className="py-3 px-4 bg-[var(--soma-surface)] hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] text-[var(--soma-fg)] transition-colors flex items-center justify-center space-x-1.5 rounded-none"
                        aria-label={`Add ${prod.title[language]} to shopping bag`}
                      >
                        <Plus size={12} />
                        <span>{language === 'es' ? 'Añadir' : 'Add'}</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modal aislado para inspección de fórmula sin re-renderizar secciones estáticas */}
      <SomaProductInspectorModal
        product={inspectProduct}
        language={language}
        onClose={handleCloseInspector}
      />
    </>
  );
});

SomaCatalogSection.displayName = 'SomaCatalogSection';
