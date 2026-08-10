export type ProductCategory =
  | "saltele"
  | "topere"
  | "perne"
  | "lenjerii"
  | "paturi";

export interface ProductVariant {
  id: string;
  label: string; // ex: "140x200 cm"
  priceRon: number;
  compareAtRon?: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  variants: ProductVariant[];
  imageAlt: string;
}

export interface CartLine {
  lineId: string; // productId + variantId, unique per line
  productId: string;
  productSlug: string;
  productName: string;
  variantId: string;
  variantLabel: string;
  priceRon: number;
  quantity: number;
  imageAlt: string;
}
