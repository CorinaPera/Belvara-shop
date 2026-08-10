import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Ștergere date existente...");
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  console.log("Populare catalog demo...");

  await prisma.product.create({
    data: {
      slug: "salteata-memory-foam",
      name: "Saltea Belvara Memory Foam",
      category: "saltele",
      shortDescription:
        "Saltea ortopedică cu spumă cu memorie, fermitate medie, garanție 10 ani.",
      imageAlt: "Saltea Belvara Memory Foam pe pat cu lenjerie albă",
      variants: {
        create: [
          { label: "140 x 200 cm", priceRon: 2190, compareAtRon: 2590, inStock: true },
          { label: "160 x 200 cm", priceRon: 2490, compareAtRon: 2890, inStock: true },
          { label: "180 x 200 cm", priceRon: 2790, inStock: true },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "toper-lattice-7cm",
      name: "Toper Belvara Lattice 7cm",
      category: "topere",
      shortDescription: "Toper de confort pentru saltele existente, husă lavabilă.",
      imageAlt: "Toper Belvara așezat peste o saltea",
      variants: {
        create: [
          { label: "140 x 200 cm", priceRon: 690, inStock: true },
          { label: "160 x 200 cm", priceRon: 790, inStock: false },
        ],
      },
    },
  });

  await prisma.product.create({
    data: {
      slug: "perna-cervicala",
      name: "Pernă Belvara Cervicală",
      category: "perne",
      shortDescription: "Pernă ergonomică cu suport cervical, husă din bumbac.",
      imageAlt: "Pernă cervicală Belvara pe un pat aranjat",
      variants: {
        create: [{ label: "50 x 30 cm", priceRon: 249, inStock: true }],
      },
    },
  });

  console.log("Gata. Catalog populat cu 3 produse demo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
