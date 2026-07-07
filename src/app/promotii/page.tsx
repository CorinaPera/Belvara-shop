import { CategoryHero } from "@/components/category/category-hero";
import { ProductCatalog } from "@/components/category/product-catalog";
import { products } from "@/lib/products";

export default function PromotiiPage() {
  const discounted = products.filter((p) => p.discountPercent);

  return (
    <>
      <CategoryHero
        title="Promoții"
        subtitle="Produse cu preț redus, din toate categoriile — disponibile în limita stocului."
      />
      <ProductCatalog products={discounted} />
    </>
  );
}
