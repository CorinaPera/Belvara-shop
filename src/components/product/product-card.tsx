"use client";

import Link from "next/link";
import { Product, formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const discountedMin = product.discountPercent
    ? Math.round((product.priceMin * (1 - product.discountPercent / 100)) / 10) * 10
    : null;
  const hasRange = product.priceMax > product.priceMin;
  const priceLabel = (value: number) => (hasRange ? `de la ${formatPrice(value)}` : formatPrice(value));
  const href = `/${product.category}/${product.slug}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-line bg-white">
      <Link href={href} className="block">
        <div
          className={`relative aspect-square ${product.imageUrl ? "bg-cream" : "bg-wood-slats"}`}
        >
          {product.imageUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.imageUrl}
              alt={product.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          )}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.discountPercent && (
              <span className="rounded-full bg-forest px-3 py-1 font-sans text-xs font-medium text-cream">
                -{product.discountPercent}%
              </span>
            )}
            {product.eco && (
              <span className="flex items-center gap-1 rounded-full bg-cream px-3 py-1 font-sans text-xs font-medium text-forest">
                <i className="ti ti-leaf text-sm" /> Eco
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
          {product.collection}
        </p>
        <Link href={href}>
          <h3 className="text-lg leading-snug hover:text-forest-secondary">{product.name}</h3>
        </Link>
        <p className="font-sans text-sm text-ink-soft">{product.shortDescription}</p>

        {product.rating != null && (
          <div className="flex items-center gap-1 font-sans text-sm text-ink-soft">
            <i className="ti ti-star text-wood" />
            <span className="font-medium text-ink">{product.rating}</span>
            <span>({product.reviewCount} recenzii)</span>
          </div>
        )}

        <div className="mt-1 flex items-baseline gap-2">
          {discountedMin ? (
            <>
              <span className="font-sans text-sm text-ink-soft line-through">
                {formatPrice(product.priceMin)}
              </span>
              <span className="font-display text-lg font-medium text-forest">
                {priceLabel(discountedMin)}
              </span>
            </>
          ) : (
            <span className="font-display text-lg font-medium text-forest">
              {priceLabel(product.priceMin)}
            </span>
          )}
        </div>

        <Button
          variant="gold"
          className="mt-2 w-full"
          onClick={() =>
            addItem({
              slug: product.slug,
              category: product.category,
              name: product.name,
              size: product.sizes[0],
              unitPrice: discountedMin ?? product.priceMin,
              imageUrl: product.imageUrl,
            })
          }
        >
          Adaugă în coș
        </Button>
      </div>
    </div>
  );
}
