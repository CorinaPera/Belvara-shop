"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useCartStore, selectCartSubtotal } from "@/lib/store/cart-store";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { formatRon } from "@/lib/format";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore(selectCartSubtotal);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape, lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-primary/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Coșul de cumpărături"
        tabIndex={-1}
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-cream shadow-2xl flex flex-col transition-transform duration-300 ease-out focus:outline-none ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10">
          <h2 className="font-display text-xl text-primary">
            Coșul tău {lines.length > 0 && `(${lines.length})`}
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Închide coșul"
            className="text-primary/60 hover:text-primary transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-primary/60 mb-4">Coșul tău este momentan gol.</p>
            <Link
              href="/"
              onClick={closeCart}
              className="text-eyebrow underline underline-offset-4 text-sm"
            >
              Vezi produsele Belvara
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((line) => (
                <CartLineItem key={line.lineId} line={line} />
              ))}
            </ul>

            <div className="px-6 py-5 border-t border-primary/10 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-primary/70">Subtotal</span>
                <span className="font-medium tabular-nums">{formatRon(subtotal)}</span>
              </div>
              <p className="text-xs text-primary/50">
                Transport calculat la finalizarea comenzii.
              </p>
              <Link
                href="/cos"
                onClick={closeCart}
                className="block w-full text-center bg-cta text-primary font-medium py-3 rounded-full hover:opacity-90 transition-opacity"
              >
                Finalizează comanda
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
