'use client';

import { useSyncExternalStore } from 'react';
import { SomaCartItem, SomaProduct } from '@/data/commerce';

const INITIAL_CART_ITEMS: SomaCartItem[] = [
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
];

export interface SomaCartStoreState {
  items: SomaCartItem[];
  totalCount: number;
  isCartOpen: boolean;
  checkoutOpen: boolean;
  addedNotice: string | null;
}

const INITIAL_STATE: SomaCartStoreState = {
  items: INITIAL_CART_ITEMS,
  totalCount: 1,
  isCartOpen: false,
  checkoutOpen: false,
  addedNotice: null,
};

let storeState: SomaCartStoreState = INITIAL_STATE;
const listeners = new Set<() => void>();
let noticeTimeout: ReturnType<typeof setTimeout> | null = null;

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function calcTotalCount(items: SomaCartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

const getSnapshot = (): SomaCartStoreState => storeState;
const getServerSnapshot = (): SomaCartStoreState => INITIAL_STATE;
const getCountSnapshot = (): number => storeState.totalCount;
const getServerCountSnapshot = (): number => INITIAL_STATE.totalCount;

export function useSomaCartState(): SomaCartStoreState {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useSomaCartCount(): number {
  return useSyncExternalStore(subscribe, getCountSnapshot, getServerCountSnapshot);
}

export function openSomaCart(): void {
  storeState = { ...storeState, isCartOpen: true };
  emitChange();
}

export function closeSomaCart(): void {
  if (!storeState.isCartOpen) return;
  storeState = { ...storeState, isCartOpen: false };
  emitChange();
}

export function openSomaCheckout(): void {
  storeState = { ...storeState, isCartOpen: false, checkoutOpen: true };
  emitChange();
}

export function closeSomaCheckout(): void {
  if (!storeState.checkoutOpen) return;
  storeState = { ...storeState, checkoutOpen: false };
  emitChange();
}

export function addSomaCartItem(
  product: SomaProduct,
  sizeStr: string,
  vesselObj: SomaProduct['vessels'][0],
  qty: number = 1,
  noticeLabel: string
): void {
  const sizeDelta = product.sizeDelta[sizeStr] ?? 0;
  const unitPrice = product.basePrice + sizeDelta + vesselObj.delta;
  const itemKey = `${product.id}-${sizeStr}-${vesselObj.id}`;

  const existing = storeState.items.find((i) => i.id === itemKey);
  const nextItems = existing
    ? storeState.items.map((i) => (i.id === itemKey ? { ...i, quantity: i.quantity + qty } : i))
    : [
        ...storeState.items,
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

  storeState = {
    ...storeState,
    items: nextItems,
    totalCount: calcTotalCount(nextItems),
    addedNotice: noticeLabel,
  };
  emitChange();

  if (noticeTimeout) {
    clearTimeout(noticeTimeout);
  }
  noticeTimeout = setTimeout(() => {
    storeState = { ...storeState, addedNotice: null };
    emitChange();
  }, 2600);
}

export function updateSomaCartQty(itemId: string, delta: number): void {
  const nextItems = storeState.items
    .map((item) => {
      if (item.id === itemId) {
        const nextQty = item.quantity + delta;
        return nextQty > 0 ? { ...item, quantity: nextQty } : null;
      }
      return item;
    })
    .filter(Boolean) as SomaCartItem[];

  storeState = {
    ...storeState,
    items: nextItems,
    totalCount: calcTotalCount(nextItems),
  };
  emitChange();
}

export function removeSomaCartItem(itemId: string): void {
  const nextItems = storeState.items.filter((item) => item.id !== itemId);
  storeState = {
    ...storeState,
    items: nextItems,
    totalCount: calcTotalCount(nextItems),
  };
  emitChange();
}

export function clearSomaCart(): void {
  storeState = {
    ...storeState,
    items: [],
    totalCount: 0,
  };
  emitChange();
}
