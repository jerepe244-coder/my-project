'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Check,
  X,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import {
  useSomaCartState,
  closeSomaCart,
  openSomaCheckout,
  closeSomaCheckout,
  updateSomaCartQty,
  removeSomaCartItem,
  clearSomaCart,
} from './somaCartStore';

interface SomaCartOverlayProps {
  language: 'es' | 'en';
}

export const SomaCartOverlay: React.FC<SomaCartOverlayProps> = React.memo(({ language }) => {
  const { items: cart, totalCount: totalCartItems, isCartOpen, checkoutOpen, addedNotice } = useSomaCartState();

  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);
  const [buyerName, setBuyerName] = useState('Clara Oswald');
  const [buyerEmail, setBuyerEmail] = useState('oswald@soma-atelier.com');
  const [buyerAddress, setBuyerAddress] = useState('Calle de los Aromas 412, Piso 4');
  const [buyerCity, setBuyerCity] = useState('San Carlos de Bariloche');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [orderRefCode, setOrderRefCode] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSomaCart();
        closeSomaCheckout();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const freeShippingThreshold = 120;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = cart.length === 0 ? 0 : isFreeShipping ? 0 : 12;
  const discountAmount = discountApplied ? Math.round(cartSubtotal * 0.1) : 0;
  const cartTotal = Math.max(0, cartSubtotal + shippingCost - discountAmount);

  const handleApplyDiscount = (e: React.FormEvent) => {
    e.preventDefault();
    const code = discountCode.trim().toUpperCase();
    if (code === 'ZYRVAE10' || code === 'SOMA10') {
      setDiscountApplied(true);
    }
  };

  const handleProceedToCheckout = () => {
    setCheckoutStep(1);
    openSomaCheckout();
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderCode = `SOMA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRefCode(orderCode);
    setCheckoutStep(3);
    clearSomaCart();
  };

  return (
    <>
      {/* Notificación discreta de adición (0px, retícula 0.5px) */}
      <AnimatePresence>
        {addedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="fixed top-[72px] right-4 sm:right-12 z-40 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] px-4 py-2.5 border border-[var(--soma-border)] monolith-hairline flex items-center space-x-2.5 text-xs font-swiss font-medium rounded-none"
          >
            <span className="w-1.5 h-1.5 bg-[var(--soma-amber)] inline-block shrink-0" />
            <span>
              {language === 'es' ? `Añadido al albarán: ${addedNotice}` : `Added to slip: ${addedNotice}`}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DRAWER LATERAL DE LA BOLSA — ALBARÁN DE DISPENSARIO */}
      <AnimatePresence>
        {isCartOpen && (
          <div
            className="fixed inset-0 z-50 overflow-hidden font-swiss"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'es' ? 'Albarán de Dispensario' : 'Dispensary Bag'}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSomaCart}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-8 sm:pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                className="w-screen max-w-md bg-[var(--soma-bg)] border-l border-[var(--soma-border)] monolith-hairline flex flex-col justify-between text-[var(--soma-fg)] rounded-none"
              >
                {/* Cabecera del Albarán */}
                <div className="p-5 sm:p-6 border-b border-[var(--soma-border)] monolith-hairline flex items-center justify-between bg-[var(--soma-surface)]">
                  <div className="space-y-0.5">
                    <span className="block text-[11px] font-medium text-[var(--soma-amber-ink)]">
                      {language === 'es' ? 'Albarán de dispensario' : 'Dispensary slip'}
                    </span>
                    <div className="flex items-baseline space-x-2">
                      <h3 className="font-swiss font-semibold text-base tracking-tight text-[var(--soma-fg)]">
                        {language === 'es' ? 'Selección de fórmulas' : 'Formulation selection'}
                      </h3>
                      <span className="text-xs font-medium text-[var(--soma-muted)] tabular-nums">
                        ({totalCartItems})
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={closeSomaCart}
                    className="p-2 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-bg)] hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] text-[var(--soma-fg)] transition-colors rounded-none"
                    aria-label="Close dispensary bag"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Progreso de Envío Neutro en Carbono */}
                <div className="px-5 sm:px-6 py-3.5 bg-[var(--soma-bg)] border-b border-[var(--soma-border)] monolith-hairline text-xs font-swiss space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--soma-muted)] flex items-center space-x-1.5 font-medium">
                      <Truck size={12} className="text-[var(--soma-amber-ink)]" />
                      <span>{language === 'es' ? 'Envío neutro en carbono' : 'Carbon-neutral dispatch'}</span>
                    </span>
                    <span className="font-medium text-[var(--soma-fg)] tabular-nums">
                      {isFreeShipping
                        ? language === 'es'
                          ? 'Bonificado ($0)'
                          : 'Qualified ($0)'
                        : language === 'es'
                          ? `Faltan $${freeShippingThreshold - cartSubtotal} USD`
                          : `$${freeShippingThreshold - cartSubtotal} USD away`}
                    </span>
                  </div>

                  <div className="w-full h-[2px] bg-[var(--soma-border)] overflow-hidden rounded-none">
                    <div
                      className="h-full bg-[var(--soma-amber)] transition-all duration-300"
                      style={{ width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Lista de Fórmulas en Celdas de Albarán */}
                <div className="flex-grow overflow-y-auto divide-y divide-[var(--soma-border)]">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 px-6 space-y-4">
                      <ShoppingBag size={28} className="mx-auto text-[var(--soma-dim)]" strokeWidth={1.25} />
                      <p className="font-swiss text-sm text-[var(--soma-muted)]">
                        {language === 'es'
                          ? 'El albarán se encuentra vacío.'
                          : 'Your dispensary slip is currently empty.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          closeSomaCart();
                          const catEl = document.getElementById('soma-catalog');
                          if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-4 py-2 border border-[var(--soma-border-strong)] text-xs font-swiss font-medium hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] transition-colors rounded-none"
                      >
                        {language === 'es' ? 'Explorar dispensario' : 'Explore dispensary'}
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="p-5 sm:p-6 flex items-start space-x-4 bg-[var(--soma-bg)]">
                        <div className="relative w-16 h-16 border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] flex-shrink-0 overflow-hidden rounded-none">
                          <Image
                            src={item.image}
                            alt={item.title[language]}
                            fill
                            loading="lazy"
                            decoding="async"
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-grow space-y-1.5 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-swiss font-medium text-sm text-[var(--soma-fg)] leading-snug">
                              {item.title[language]}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeSomaCartItem(item.id)}
                              className="text-[var(--soma-dim)] hover:text-[var(--soma-amber-ink)] transition-colors p-0.5 shrink-0"
                              aria-label={`Remove ${item.title[language]}`}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>

                          <div className="text-[11px] font-swiss font-medium text-[var(--soma-muted)] flex items-center space-x-2 tabular-nums">
                            <span>{item.size}</span>
                            <span>·</span>
                            <span className={item.vesselId === 'refill' ? 'text-[var(--soma-amber-ink)]' : ''}>
                              {item.vesselId === 'refill'
                                ? language === 'es'
                                  ? 'Recarga Eco-Pouch (-$8)'
                                  : 'Eco-Pouch Refill (-$8)'
                                : language === 'es'
                                  ? 'Vidrio Biofotónico Miron'
                                  : 'Miron Biophotonic Glass'}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="inline-flex items-center border border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] text-xs font-swiss tabular-nums rounded-none">
                              <button
                                type="button"
                                onClick={() => updateSomaCartQty(item.id, -1)}
                                className="px-2 py-1 text-[var(--soma-muted)] hover:text-[var(--soma-fg)] hover:bg-[var(--soma-card)] transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={11} />
                              </button>
                              <span className="px-2.5 py-0.5 font-medium border-x border-[var(--soma-border)] monolith-hairline">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateSomaCartQty(item.id, 1)}
                                className="px-2 py-1 text-[var(--soma-muted)] hover:text-[var(--soma-fg)] hover:bg-[var(--soma-card)] transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus size={11} />
                              </button>
                            </div>

                            <span className="font-swiss text-xs font-semibold text-[var(--soma-fg)] tabular-nums">
                              ${item.unitPrice * item.quantity} USD
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Pie de Albarán */}
                {cart.length > 0 && (
                  <div className="p-5 sm:p-6 border-t border-[var(--soma-border)] monolith-hairline bg-[var(--soma-surface)] space-y-4">
                    <div className="space-y-1.5 text-xs font-swiss tabular-nums">
                      <div className="flex justify-between text-[var(--soma-muted)]">
                        <span>{language === 'es' ? 'Subtotal de fórmulas' : 'Formulation subtotal'}</span>
                        <span className="text-[var(--soma-fg)] font-medium">${cartSubtotal} USD</span>
                      </div>

                      <div className="flex justify-between text-[var(--soma-muted)]">
                        <span>{language === 'es' ? 'Transporte neutro en carbono' : 'Carbon-neutral freight'}</span>
                        <span className="text-[var(--soma-fg)] font-medium">
                          {isFreeShipping ? (
                            <span className="text-[var(--soma-amber-ink)]">
                              {language === 'es' ? 'Sin cargo' : 'Complimentary'}
                            </span>
                          ) : (
                            `$${shippingCost} USD`
                          )}
                        </span>
                      </div>

                      {discountApplied && (
                        <div className="flex justify-between text-[var(--soma-amber-ink)] font-medium">
                          <span>{language === 'es' ? 'Bonificación estudio (10%)' : 'Atelier credit (10%)'}</span>
                          <span>-${discountAmount} USD</span>
                        </div>
                      )}

                      <div className="pt-2.5 border-t border-[var(--soma-border)] monolith-hairline flex justify-between items-baseline text-sm font-semibold text-[var(--soma-fg)]">
                        <span>{language === 'es' ? 'Total estimado' : 'Estimated total'}</span>
                        <span className="text-base text-[var(--soma-fg)] tabular-nums">${cartTotal} USD</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleProceedToCheckout}
                      className="w-full py-3.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] font-swiss text-xs font-medium tracking-wide transition-colors flex items-center justify-center space-x-2 rounded-none"
                    >
                      <span>{language === 'es' ? 'Tramitar albarán (Demo)' : 'Process laboratory slip (Demo)'}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL DE CHECKOUT EN 2 PASOS — ALBARÁN DE LABORATORIO */}
      <AnimatePresence>
        {checkoutOpen && (
          <div
            className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 font-swiss"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'es' ? 'Albarán de Laboratorio' : 'Laboratory Checkout Slip'}
          >
            <motion.div
              initial={{ scale: 0.98, y: 10, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.98, y: 8, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[var(--soma-bg)] border border-[var(--soma-border-strong)] monolith-hairline max-w-2xl w-full overflow-hidden text-[var(--soma-fg)] rounded-none"
            >
              {/* Barra Superior de Documento de Albarán */}
              <div className="px-6 py-3 bg-[var(--soma-surface)] border-b border-[var(--soma-border)] monolith-hairline flex items-center justify-between text-[11px] font-medium text-[var(--soma-muted)] tabular-nums">
                <span>
                  {language === 'es'
                    ? 'Sōma Formulations · Registro de Albarán Molecular'
                    : 'Sōma Formulations · Molecular Dispatch Slip'}
                </span>
                <span>Lote N° 08 / ISO-16128</span>
              </div>

              <div className="p-6 sm:p-8">
                {checkoutStep === 1 && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCheckoutStep(2);
                    }}
                    className="space-y-6"
                  >
                    <div className="flex items-start justify-between border-b border-[var(--soma-border)] monolith-hairline pb-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
                          {language === 'es'
                            ? 'Paso 1 de 2 · Datos de entrega y despacho'
                            : 'Step 1 of 2 · Delivery and dispatch details'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-swiss font-semibold tracking-tight">
                          {language === 'es' ? 'Albarán de envío' : 'Dispatch slip'}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={closeSomaCheckout}
                        className="p-2 border border-[var(--soma-border)] monolith-hairline hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] transition-colors rounded-none"
                        aria-label="Close checkout"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                          {language === 'es' ? 'Nombre completo' : 'Full name'}
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerName}
                          onChange={(e) => setBuyerName(e.target.value)}
                          placeholder="Clara Oswald"
                          className="soma-line-input font-swiss"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                          {language === 'es' ? 'Correo electrónico' : 'Email address'}
                        </label>
                        <input
                          type="email"
                          required
                          value={buyerEmail}
                          onChange={(e) => setBuyerEmail(e.target.value)}
                          placeholder="oswald@soma-atelier.com"
                          className="soma-line-input font-swiss"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                        {language === 'es' ? 'Dirección postal de entrega' : 'Street address'}
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerAddress}
                        onChange={(e) => setBuyerAddress(e.target.value)}
                        placeholder="Calle de los Aromas 412, Piso 4"
                        className="soma-line-input font-swiss"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                          {language === 'es' ? 'Ciudad / Localidad' : 'City / Province'}
                        </label>
                        <input
                          type="text"
                          required
                          value={buyerCity}
                          onChange={(e) => setBuyerCity(e.target.value)}
                          placeholder="San Carlos de Bariloche"
                          className="soma-line-input font-swiss"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                          {language === 'es' ? 'País de destino' : 'Destination country'}
                        </label>
                        <select className="soma-line-input font-swiss cursor-pointer" aria-label="Shipping country">
                          <option value="Argentina" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">Argentina</option>
                          <option value="Chile" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">Chile</option>
                          <option value="Uruguay" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">Uruguay</option>
                          <option value="España" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">España</option>
                          <option value="Switzerland" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">Switzerland</option>
                          <option value="United States" className="bg-[var(--soma-bg)] text-[var(--soma-fg)]">United States</option>
                        </select>
                      </div>
                    </div>

                    {/* Fila Resumen del Albarán */}
                    <div className="p-3.5 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline text-xs flex justify-between items-center tabular-nums">
                      <span className="text-[var(--soma-muted)] font-medium">
                        {language === 'es' ? 'Importe total del albarán' : 'Total slip amount'}
                      </span>
                      <span className="font-semibold text-[var(--soma-fg)] text-sm">${cartTotal} USD</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium tracking-wide transition-colors flex items-center justify-center space-x-2 rounded-none"
                    >
                      <span>{language === 'es' ? 'Continuar a liquidación simulada' : 'Continue to mock settlement'}</span>
                      <ArrowRight size={13} />
                    </button>
                  </form>
                )}

                {checkoutStep === 2 && (
                  <form onSubmit={handleCompleteOrder} className="space-y-6">
                    <div className="flex items-start justify-between border-b border-[var(--soma-border)] monolith-hairline pb-4">
                      <div className="space-y-1">
                        <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
                          {language === 'es'
                            ? 'Paso 2 de 2 · Liquidación y código de laboratorio'
                            : 'Step 2 of 2 · Settlement and atelier credit'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-swiss font-semibold tracking-tight">
                          {language === 'es' ? 'Confirmación de albarán' : 'Slip confirmation'}
                        </h3>
                      </div>

                      <button
                        type="button"
                        onClick={() => setCheckoutStep(1)}
                        className="text-xs font-medium text-[var(--soma-amber-ink)] hover:underline underline-offset-4"
                      >
                        {language === 'es' ? '← Volver' : '← Back'}
                      </button>
                    </div>

                    {/* Código promocional sobre línea continua */}
                    <div className="p-4 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline space-y-2">
                      <label className="block text-[11px] font-medium text-[var(--soma-muted)]">
                        {language === 'es' ? 'Código de cortesía o estudio (ej. ZYRVAE10)' : 'Atelier credit code (e.g. ZYRVAE10)'}
                      </label>
                      <div className="flex items-end gap-4">
                        <input
                          type="text"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                          placeholder="ZYRVAE10"
                          className="soma-line-input font-swiss tabular-nums uppercase flex-grow"
                        />
                        <button
                          type="button"
                          onClick={handleApplyDiscount}
                          className="px-4 py-2 border border-[var(--soma-border-strong)] hover:bg-[var(--soma-btn-bg)] hover:text-[var(--soma-btn-fg)] text-xs font-medium transition-colors rounded-none shrink-0"
                        >
                          {language === 'es' ? 'Aplicar' : 'Apply'}
                        </button>
                      </div>
                      {discountApplied && (
                        <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block pt-1">
                          {language === 'es' ? '✓ Bonificación del 10% aplicada al albarán' : '✓ 10% credit applied to slip'}
                        </span>
                      )}
                    </div>

                    {/* Método demostrativo */}
                    <div className="p-4 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline space-y-2.5 text-xs">
                      <span className="text-[11px] font-medium text-[var(--soma-muted)] block">
                        {language === 'es' ? 'Instrumento de ensayo demostrativo' : 'Demonstration payment instrument'}
                      </span>
                      <div className="p-3 bg-[var(--soma-bg)] border border-[var(--soma-border)] monolith-hairline flex justify-between items-center text-[var(--soma-fg)] tabular-nums">
                        <span>•••• •••• •••• 4242</span>
                        <span>Exp. 12/28</span>
                      </div>
                      <p className="text-[11px] text-[var(--soma-dim)] leading-relaxed">
                        {language === 'es'
                          ? 'Entorno aislado de pruebas. No se procesará ningún cargo financiero real.'
                          : 'Isolated sandbox environment. Zero real financial charges will be processed.'}
                      </p>
                    </div>

                    {/* Tabla de Desglose */}
                    <div className="border border-[var(--soma-border)] monolith-hairline divide-y divide-[var(--soma-border)] text-xs tabular-nums">
                      <div className="px-4 py-2.5 flex justify-between text-[var(--soma-muted)]">
                        <span>{language === 'es' ? 'Subtotal de fórmulas' : 'Subtotal'}</span>
                        <span>${cartSubtotal} USD</span>
                      </div>
                      <div className="px-4 py-2.5 flex justify-between text-[var(--soma-muted)]">
                        <span>{language === 'es' ? 'Envío neutro en carbono' : 'Carbon-neutral shipping'}</span>
                        <span>{isFreeShipping ? (language === 'es' ? 'Sin cargo' : 'Free') : `$${shippingCost} USD`}</span>
                      </div>
                      {discountApplied && (
                        <div className="px-4 py-2.5 flex justify-between text-[var(--soma-amber-ink)] font-medium">
                          <span>{language === 'es' ? 'Bonificación 10%' : 'Atelier credit 10%'}</span>
                          <span>-${discountAmount} USD</span>
                        </div>
                      )}
                      <div className="px-4 py-3 bg-[var(--soma-surface)] flex justify-between font-semibold text-sm text-[var(--soma-fg)]">
                        <span>{language === 'es' ? 'Total final del albarán' : 'Final slip total'}</span>
                        <span className="text-[var(--soma-amber-ink)] text-base">${cartTotal} USD</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium tracking-wide transition-colors rounded-none"
                    >
                      {language === 'es' ? 'Emitir albarán demostrativo' : 'Issue demonstration slip'}
                    </button>
                  </form>
                )}

                {checkoutStep === 3 && (
                  <div className="text-center py-4 space-y-6">
                    <div className="w-12 h-12 mx-auto border border-[var(--soma-amber)] bg-[var(--soma-surface)] flex items-center justify-center text-[var(--soma-amber-ink)] rounded-none">
                      <Check size={22} />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[11px] font-medium text-[var(--soma-amber-ink)] block">
                        {language === 'es' ? 'Albarán de laboratorio emitido' : 'Laboratory slip confirmed'}
                      </span>
                      <h3 className="text-2xl font-swiss font-semibold text-[var(--soma-fg)]">
                        {language === 'es' ? 'Registro completado' : 'Dispatch recorded'}
                      </h3>
                      <p className="text-xs text-[var(--soma-muted)] tabular-nums">
                        {language === 'es' ? 'Código de expediente: ' : 'Dossier reference: '}
                        <span className="text-[var(--soma-fg)] font-semibold">{orderRefCode}</span>
                      </p>
                    </div>

                    <div className="p-4 bg-[var(--soma-surface)] border border-[var(--soma-border)] monolith-hairline text-xs text-[var(--soma-muted)] space-y-2 text-left">
                      <div className="flex items-center space-x-2 text-[var(--soma-fg)] font-medium">
                        <ShieldCheck size={14} className="text-[var(--soma-amber-ink)]" />
                        <span>{language === 'es' ? 'Nota del estudio Zyrvae' : 'Zyrvae Studio notice'}</span>
                      </div>
                      <p className="leading-relaxed">
                        {language === 'es'
                          ? 'Esta simulación valida el flujo de albarán molecular de extremo a extremo: selección de volúmenes, envase biofotónico, umbral de envío y emisión de comprobante sin cobros reales.'
                          : 'This simulation validates the end-to-end molecular dispensary flow: volume selection, biophotonic vessel options, freight threshold, and slip confirmation without real charges.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        closeSomaCheckout();
                        setCheckoutStep(1);
                      }}
                      className="px-6 py-3 bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-medium transition-colors rounded-none"
                    >
                      {language === 'es' ? 'Continuar explorando' : 'Continue exploring'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

SomaCartOverlay.displayName = 'SomaCartOverlay';
