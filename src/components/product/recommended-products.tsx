import { Product, products } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";

export function RecommendedProducts({ current }: { current: Product }) {
  const others = products.filter((p) => p.slug !== current.slug);
  const sameCategoryAndType = others.filter(
    (p) => p.category === current.category && p.type === current.type
  );
  const sameCategory = others.filter(
    (p) => p.category === current.category && p.type !== current.type
  );
  const rest = others.filter((p) => p.category !== current.category);
  const recommended = [...sameCategoryAndType, ...sameCategory, ...rest].slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 pb-16">
      <h2 className="text-2xl">Produse recomandate</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
