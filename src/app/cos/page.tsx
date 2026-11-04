"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";

export default function CosPage() {
  const { items, removeItem, setQuantity, totalLei } = useCart();

  if (items.length === 0) {
    return (
      <>
        <PageHero title="Coșul tău" subtitle="Momentan nu ai niciun produs în coș." />
        <section className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
          <Link href="/saltele">
            <Button>Vezi produsele</Button>
          </Link>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Coșul tău"
        subtitle={`${items.length} ${items.length === 1 ? "produs" : "produse"} în coș.`}
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="flex max-w-4xl flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.key}
              className="flex flex-wrap items-center gap-4 rounded-xl border border-line bg-white p-4"
            >
              <div
                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg ${
                  item.imageUrl ? "bg-cream" : "bg-wood-slats"
                }`}
              >
                {item.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              <div className="min-w-[10rem] flex-1">
                <Link href={`/${item.category}/${item.slug}`} className="hover:text-forest">
                  <p className="font-medium">{item.name}</p>
                </Link>
                <p className="font-sans text-sm text-ink-soft">Dimensiune: {item.size}</p>
                <p className="font-sans text-sm text-ink-soft">
                  {formatPrice(item.unitPrice)} / bucată
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(item.key, item.quantity - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line hover:border-forest"
                  aria-label="Scade cantitatea"
                >
                  −
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => setQuantity(item.key, item.quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line hover:border-forest"
                  aria-label="Crește cantitatea"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-sans text-xs uppercase tracking-wide text-ink-soft">Subtotal</p>
                <p className="font-display font-medium text-forest whitespace-nowrap">
                  {formatPrice(item.unitPrice)} × {item.quantity} = {formatPrice(item.unitPrice * item.quantity)}
                </p>
              </div>

              <button
                onClick={() => removeItem(item.key)}
                className="text-ink-soft hover:text-forest"
                aria-label="Elimină produsul"
              >
                <i className="ti ti-trash text-lg" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex max-w-4xl flex-col items-end gap-4 border-t border-line pt-6">
          <p className="font-display text-xl">
            Total: <span className="text-forest">{formatPrice(totalLei)}</span>
          </p>
          <Link href="/finalizare-comanda">
            <Button>Finalizează comanda</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
