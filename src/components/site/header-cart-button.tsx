"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export function HeaderCartButton() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cos"
      aria-label="Coș"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-forest transition-colors hover:bg-forest/5"
    >
      <i className="ti ti-shopping-cart text-lg" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 font-sans text-[11px] font-medium text-forest">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
