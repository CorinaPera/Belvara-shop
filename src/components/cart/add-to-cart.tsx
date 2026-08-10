"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart-store";
import { formatRon } from "@/lib/format";

export function AddToCart({ product }: { product: Product }) {
  const [variantId, setVariantId] = useState(product.variants[0]?.id);
  const [justAdded, setJustAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const selectedVariant = product.variants.find((v) => v.id === variantId);
  if (!selectedVariant) return null;

  function handleAdd() {
    if (!selectedVariant || !selectedVariant.inStock) return;
    addItem(product, selectedVariant);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="space-y-5">
      {product.variants.length > 1 && (
        <fieldset>
          <legend className="text-sm text-primary/70 mb-2">Dimensiune</legend>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                disabled={!variant.inStock}
                onClick={() => setVariantId(variant.id)}
                aria-pressed={variant.id === variantId}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  variant.id === variantId
                    ? "border-primary bg-primary text-cream"
                    : "border-primary/20 text-primary hover:border-primary/50"
                } ${!variant.inStock ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                {variant.label}
                {!variant.inStock && " · stoc epuizat"}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex items-baseline gap-2">
        <span className="font-display text-2xl text-primary">
          {formatRon(selectedVariant.priceRon)}
        </span>
        {selectedVariant.compareAtRon && (
          <span className="text-sm text-primary/40 line-through">
            {formatRon(selectedVariant.compareAtRon)}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleAdd}
        disabled={!selectedVariant.inStock}
        className="w-full bg-cta text-primary font-medium py-3.5 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {!selectedVariant.inStock
          ? "Stoc epuizat"
          : justAdded
          ? "Adăugat în coș ✓"
          : "Adaugă în coș"}
      </button>
    </div>
  );
}
