"use client";

import { useMemo, useState } from "react";
import { Firmness, Product, tagLabels, typeLabels } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { FilterSidebar } from "@/components/category/filter-sidebar";
import { Button } from "@/components/ui/button";

const PAGE_SIZE = 6;

function uniqueInOrder<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function ProductCatalog({ products }: { products: Product[] }) {
  const priceBounds = useMemo(
    () => ({
      min: Math.min(...products.map((p) => p.priceMin)),
      max: Math.max(...products.map((p) => p.priceMax)),
    }),
    [products]
  );

  const subcategories = useMemo(
    () =>
      uniqueInOrder(products.map((p) => p.type)).map((value) => ({
        value,
        label: typeLabels[value] ?? value,
      })),
    [products]
  );

  const [activeType, setActiveType] = useState<string>("toate");
  const [activeFirmness, setActiveFirmness] = useState<Set<Firmness>>(new Set());
  const [activeSizes, setActiveSizes] = useState<Set<string>>(new Set());
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const scopedProducts = useMemo(
    () => (activeType === "toate" ? products : products.filter((p) => p.type === activeType)),
    [products, activeType]
  );

  const firmnessOptions = useMemo(
    () => uniqueInOrder(scopedProducts.map((p) => p.firmness).filter((f): f is Firmness => !!f)),
    [scopedProducts]
  );

  const sizeOptions = useMemo(
    () => uniqueInOrder(scopedProducts.flatMap((p) => p.sizes)),
    [scopedProducts]
  );

  const tagOptions = useMemo(
    () =>
      uniqueInOrder(scopedProducts.flatMap((p) => p.tags)).map((value) => ({
        value,
        label: tagLabels[value] ?? value,
      })),
    [scopedProducts]
  );

  function toggleInSet<T>(set: Set<T>, value: T, setter: (s: Set<T>) => void) {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  }

  const filtered = useMemo(() => {
    return scopedProducts.filter((p) => {
      if (activeFirmness.size > 0 && (!p.firmness || !activeFirmness.has(p.firmness))) return false;
      if (p.priceMin > maxPrice) return false;
      if (activeTags.size > 0 && ![...activeTags].every((t) => p.tags.includes(t))) return false;
      return true;
    });
  }, [scopedProducts, activeFirmness, maxPrice, activeTags]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12">
      {subcategories.length > 1 && (
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              setActiveType("toate");
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
              activeType === "toate"
                ? "border-forest bg-forest text-cream"
                : "border-line bg-white text-ink-soft hover:border-forest"
            }`}
          >
            Toate
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub.value}
              onClick={() => {
                setActiveType(sub.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full border px-4 py-2 font-sans text-sm font-medium transition-colors ${
                activeType === sub.value
                  ? "border-forest bg-forest text-cream"
                  : "border-line bg-white text-ink-soft hover:border-forest"
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 flex flex-col gap-10 lg:flex-row">
        <FilterSidebar
          firmnessOptions={firmnessOptions}
          activeFirmness={activeFirmness}
          onToggleFirmness={(v) => toggleInSet(activeFirmness, v, setActiveFirmness)}
          sizeOptions={sizeOptions}
          activeSizes={activeSizes}
          onToggleSize={(v) => toggleInSet(activeSizes, v, setActiveSizes)}
          tagOptions={tagOptions}
          activeTags={activeTags}
          onToggleTag={(v) => toggleInSet(activeTags, v, setActiveTags)}
          maxPrice={maxPrice}
          priceBounds={priceBounds}
          onMaxPriceChange={setMaxPrice}
        />

        <div className="flex-1">
          {visible.length === 0 ? (
            <p className="font-sans text-sm text-ink-soft">
              Niciun produs nu corespunde filtrelor selectate.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}

          {visibleCount < filtered.length && (
            <div className="mt-10 flex justify-center">
              <Button variant="outline" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                Încarcă mai multe
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
