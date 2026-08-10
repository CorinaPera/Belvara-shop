"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore, selectCartCount } from "@/lib/store/cart-store";

export function CartButton() {
  const count = useCartStore(selectCartCount);
  const toggleCart = useCartStore((s) => s.toggleCart);

  return (
    <button
      type="button"
      onClick={toggleCart}
      aria-label={`Deschide coșul${count > 0 ? ` — ${count} produse` : ""}`}
      className="relative flex items-center justify-center w-10 h-10 rounded-full text-primary hover:bg-primary/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eyebrow"
    >
      <ShoppingBag size={22} strokeWidth={1.5} />
      {count > 0 && (
        <span
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-cta text-primary text-[11px] font-semibold leading-none"
          aria-hidden="true"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
