"use client";

import { useMemo, useState } from "react";
import { Product, formatPrice, getSizePricing } from "@/lib/products";
import { getCategory } from "@/lib/categories";
import { Button } from "@/components/ui/button";

const tabs = ["Descriere", "Specificații", "Recenzii"] as const;
type Tab = (typeof tabs)[number];

export function ProductDetail({ product }: { product: Product }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeSize, setActiveSize] = useState<string>(product.sizes[0]);
  const [activeTab, setActiveTab] = useState<Tab>("Descriere");

  const categoryMeta = getCategory(product.category);

  const sizePricing = useMemo(() => getSizePricing(product), [product]);

  const basePrice = sizePricing.find((s) => s.size === activeSize)?.price ?? product.priceMin;
  const finalPrice = product.discountPercent
    ? Math.round((basePrice * (1 - product.discountPercent / 100)) / 10) * 10
    : basePrice;

  const warranty = product.specs.find((s) => s.label === "Garanție producător")?.value;

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      <nav className="font-sans text-sm text-ink-soft">
        <a href="/" className="hover:text-forest">Home</a>
        <span className="mx-2">/</span>
        <a href={`/${product.category}`} className="hover:text-forest">
          {categoryMeta?.label ?? product.category}
        </a>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square w-full rounded-2xl bg-wood-slats" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                className={`aspect-square rounded-lg bg-wood-slats ${
                  activeThumb === i ? "ring-2 ring-forest" : "opacity-70"
                }`}
                aria-label={`Imagine ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-sm font-medium uppercase tracking-wide text-wood">
            {product.collection}
          </p>
          <h1 className="mt-2 text-3xl">{product.name}</h1>

          <div className="mt-2 flex items-center gap-1 font-sans text-sm text-ink-soft">
            <i className="ti ti-star text-wood" />
            <span className="font-medium text-ink">{product.rating}</span>
            <span>({product.reviewCount} recenzii)</span>
          </div>

          <div className="mt-4 flex flex-col gap-3 font-sans text-sm text-ink-soft">
            {product.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-6">
            <p className="font-sans text-sm font-medium text-forest">Dimensiune</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setActiveSize(size)}
                  className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                    activeSize === size
                      ? "border-forest bg-forest text-cream"
                      : "border-line bg-white text-ink-soft hover:border-forest"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            {product.discountPercent && (
              <span className="font-sans text-base text-ink-soft line-through">
                {formatPrice(basePrice)}
              </span>
            )}
            <span className="font-display text-2xl font-medium text-forest">
              {formatPrice(finalPrice)}
            </span>
          </div>

          <Button variant="gold" size="lg" className="mt-4">
            Adaugă în coș — {formatPrice(finalPrice)}
          </Button>

          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-line bg-white p-5 font-sans text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <i className="ti ti-truck text-wood" />
              Livrare prin Cargus, Fan Courier sau Sameday — cost și termen afișate la finalizarea comenzii.
            </div>
            <div className="flex items-center gap-2">
              <i className="ti ti-rotate text-wood" />
              Retur conform politicii de retur Belvara.
            </div>
            {warranty && (
              <div className="flex items-center gap-2">
                <i className="ti ti-certificate text-wood" />
                Garanție producător: {warranty}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex gap-6 border-b border-line">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`border-b-2 px-1 pb-3 font-sans text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-forest text-forest"
                  : "border-transparent text-ink-soft hover:text-forest"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-6 font-sans text-sm text-ink-soft">
          {activeTab === "Descriere" && (
            <div className="flex flex-col gap-3 max-w-2xl">
              {product.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}

          {activeTab === "Specificații" && (
            <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div key={spec.label} className="flex justify-between gap-4 border-b border-line pb-2">
                  <dt className="text-ink">{spec.label}</dt>
                  <dd className="text-right">{spec.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {activeTab === "Recenzii" && (
            <p className="max-w-xl">
              Nota medie este {product.rating} din 5, pe baza a {product.reviewCount} recenzii.
              Recenziile detaliate vor fi disponibile în această secțiune.
            </p>
          )}
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-2xl">Beneficii cheie</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {product.keyBenefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-line bg-white p-6">
              <i className={`ti ${b.icon} text-2xl text-wood`} />
              <p className="mt-3 font-sans text-sm font-medium text-forest">{b.title}</p>
              <p className="mt-1 font-sans text-sm text-ink-soft">{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
