import { notFound } from "next/navigation";
import { getCategory } from "@/lib/categories";
import { getProductBySlug } from "@/lib/products";
import { ProductDetail } from "@/components/product/product-detail";
import { RecommendedProducts } from "@/components/product/recommended-products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const meta = getCategory(category);
  const product = getProductBySlug(slug);

  if (!meta || !product || product.category !== meta.slug) {
    notFound();
  }

  return (
    <>
      <ProductDetail product={product} />
      <RecommendedProducts current={product} />
    </>
  );
}
