'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { openSomaCart, useSomaCartCount } from './somaCartStore';

interface SomaBagHeaderButtonProps {
  language: 'es' | 'en';
}

export const SomaBagHeaderButton: React.FC<SomaBagHeaderButtonProps> = React.memo(({ language }) => {
  const totalCartItems = useSomaCartCount();

  return (
    <button
      type="button"
      onClick={openSomaCart}
      className="inline-flex items-center space-x-2 px-4 sm:px-5 h-full bg-[var(--soma-btn-bg)] text-[var(--soma-btn-fg)] hover:bg-[var(--soma-amber)] hover:text-[#0A0A0C] text-xs font-swiss font-medium transition-colors border-l border-[var(--soma-border)] monolith-hairline whitespace-nowrap shrink-0 rounded-none outline-none focus-visible:ring-1 focus-visible:ring-[var(--soma-amber)]"
      aria-label={
        language === 'es'
          ? `Abrir bolsa del dispensario (${totalCartItems})`
          : `Open dispensary bag (${totalCartItems})`
      }
    >
      <ShoppingBag size={13} />
      <span className="tabular-nums">
        {language === 'es' ? `Bolsa (${totalCartItems})` : `Bag (${totalCartItems})`}
      </span>
    </button>
  );
});

SomaBagHeaderButton.displayName = 'SomaBagHeaderButton';
