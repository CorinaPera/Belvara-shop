import { categories } from "@/lib/categories";

// Legăturile către categorii se generează automat din categories.ts (doar cele cu live: true).
// Nu le mai edita aici — schimbă live: true/false în categories.ts.
const categoryLinks = categories
  .filter((c) => c.live)
  .map((c) => ({ label: c.label, href: `/${c.slug}` }));

export const primaryNav = [
  ...categoryLinks,
  { label: "Hoteluri (B2B)", href: "/hoteluri" },
  { label: "Promoții", href: "/promotii" },
];

export const footerColumns = [
  {
    title: "Produse",
    links: categoryLinks,
  },
  {
    title: "Companie",
    links: [
      { label: "Despre noi", href: "/despre-noi" },
      { label: "Hoteluri (B2B)", href: "/hoteluri" },
      { label: "Blog", href: "/blog" },
      { label: "Promoții", href: "/promotii" },
    ],
  },
  {
    title: "Suport",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Politici", href: "/politici" },
      { label: "Retragere din contract", href: "/retragere" },
    ],
  },
];
