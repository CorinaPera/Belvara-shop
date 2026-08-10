"use client";

import Link from "next/link";
import { useCartStore, selectCartSubtotal } from "@/lib/store/cart-store";
import { CartLineItem } from "@/components/cart/cart-line-item";
import { formatRon } from "@/lib/format";

export default function CartPage() {
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore(selectCartSubtotal);

  if (lines.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl text-primary mb-3">
          Coșul tău este gol
        </h1>
        <p className="text-primary/60 mb-8">
          Adaugă produse din catalogul Belvara pentru a continua.
        </p>
        <Link
          href="/"
          className="inline-block bg-cta text-primary font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
        >
          Vezi produsele
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl text-primary mb-8">
        Coșul tău ({lines.length})
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <ul className="md:col-span-2">
          {lines.map((line) => (
            <CartLineItem key={line.lineId} line={line} />
          ))}
        </ul>

        <div className="bg-primary/5 rounded-lg p-6 h-fit space-y-4">
          <h2 className="font-display text-lg text-primary">Sumar comandă</h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary/70">Subtotal</span>
            <span className="font-medium tabular-nums">{formatRon(subtotal)}</span>
          </div>
          <p className="text-xs text-primary/50">
            Transport calculat la pasul următor, în funcție de curier și
            localitate.
          </p>
          <button
            type="button"
            disabled
            title="Disponibil după conectarea plăților Netopia"
            className="w-full bg-cta text-primary font-medium py-3.5 rounded-full opacity-50 cursor-not-allowed"
          >
            Continuă spre plată
          </button>
          <p className="text-xs text-primary/40 text-center">
            Plățile vor fi activate după finalizarea înregistrării BELVARA S.R.L.
          </p>
        </div>
      </div>
    </div>
  );
}
