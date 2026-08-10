import { prisma } from "@/lib/prisma";
import type { Product, ProductCategory } from "@/lib/types";
import type {
  Product as PrismaProduct,
  ProductVariant as PrismaVariant,
} from "@prisma/client";

type ProductWithVariants = PrismaProduct & { variants: PrismaVariant[] };

function toProductDTO(row: ProductWithVariants): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as ProductCategory,
    shortDescription: row.shortDescription,
    imageAlt: row.imageAlt,
    variants: row.variants.map((v) => ({
      id: v.id,
      label: v.label,
      priceRon: v.priceRon,
      compareAtRon: v.compareAtRon ?? undefined,
      inStock: v.inStock,
    })),
  };
}

export async function getAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true },
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toProductDTO);
}

export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { isActive: true, category },
    include: { variants: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toProductDTO);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const row = await prisma.product.findUnique({
    where: { slug },
    include: { variants: true },
  });
  if (!row || !row.isActive) return null;
  return toProductDTO(row);
}
