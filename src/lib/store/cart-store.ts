import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartLine, Product, ProductVariant } from "@/lib/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeLine: (lineId: string) => void;
  setQuantity: (lineId: string, quantity: number) => void;
  incrementLine: (lineId: string) => void;
  decrementLine: (lineId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const MAX_QTY_PER_LINE = 20;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        const lineId = `${product.id}__${variant.id}`;
        const existing = get().lines.find((l) => l.lineId === lineId);

        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.lineId === lineId
                ? {
                    ...l,
                    quantity: Math.min(l.quantity + quantity, MAX_QTY_PER_LINE),
                  }
                : l
            ),
          });
        } else {
          const newLine: CartLine = {
            lineId,
            productId: product.id,
            productSlug: product.slug,
            productName: product.name,
            variantId: variant.id,
            variantLabel: variant.label,
            priceRon: variant.priceRon,
            quantity: Math.min(quantity, MAX_QTY_PER_LINE),
            imageAlt: product.imageAlt,
          };
          set({ lines: [...get().lines, newLine] });
        }
        set({ isOpen: true });
      },

      removeLine: (lineId) =>
        set({ lines: get().lines.filter((l) => l.lineId !== lineId) }),

      setQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          get().removeLine(lineId);
          return;
        }
        set({
          lines: get().lines.map((l) =>
            l.lineId === lineId
              ? { ...l, quantity: Math.min(quantity, MAX_QTY_PER_LINE) }
              : l
          ),
        });
      },

      incrementLine: (lineId) => {
        const line = get().lines.find((l) => l.lineId === lineId);
        if (line) get().setQuantity(lineId, line.quantity + 1);
      },

      decrementLine: (lineId) => {
        const line = get().lines.find((l) => l.lineId === lineId);
        if (line) get().setQuantity(lineId, line.quantity - 1);
      },

      clearCart: () => set({ lines: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
    }),
    {
      name: "belvara-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
    }
  )
);

// Derived selectors — use these in components to avoid recalculating everywhere
export const selectCartCount = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.priceRon * l.quantity, 0);
