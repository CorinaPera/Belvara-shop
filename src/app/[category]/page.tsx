import { notFound } from "next/navigation";
import { getCategory } from "@/lib/categories";
import { products } from "@/lib/products";
import { CategoryHero } from "@/components/category/category-hero";
import { ProductCatalog } from "@/components/category/product-catalog";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategory(category);

  if (!meta) {
    notFound();
  }

  const categoryProducts = products.filter((p) => p.category === meta.slug);

  return (
    <>
      <CategoryHero title={meta.label} subtitle={meta.heroSubtitle} />
      <ProductCatalog products={categoryProducts} />
    </>
  );
}
