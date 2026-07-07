export type CategorySlug =
  | "saltele"
  | "paturi"
  | "toppere"
  | "perne"
  | "lenjerii"
  | "accesorii";

export type CategoryMeta = {
  slug: CategorySlug;
  label: string;
  heroSubtitle: string;
};

export const categories: CategoryMeta[] = [
  {
    slug: "saltele",
    label: "Saltele",
    heroSubtitle:
      "Structuri memory, arcuri individuale și soluții ortopedice, alese pentru sprijin și durabilitate.",
  },
  {
    slug: "paturi",
    label: "Paturi",
    heroSubtitle:
      "Cadre de pat tapițate, din lemn masiv sau metalice, potrivite pentru orice dormitor.",
  },
  {
    slug: "toppere",
    label: "Toppere",
    heroSubtitle:
      "Straturi suplimentare de confort, pentru a personaliza senzația saltelei existente.",
  },
  {
    slug: "perne",
    label: "Perne",
    heroSubtitle:
      "Perne memory, din bambus, latex natural sau microfibră, pentru un somn odihnitor.",
  },
  {
    slug: "lenjerii",
    label: "Lenjerii",
    heroSubtitle:
      "Lenjerii din bumbac, in natural sau micropuf, pentru un pat îngrijit.",
  },
  {
    slug: "accesorii",
    label: "Accesorii",
    heroSubtitle:
      "Huse de protecție, suporturi și accesorii complementare pentru saltea și pat.",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
