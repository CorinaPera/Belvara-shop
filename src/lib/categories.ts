export type CategorySlug =
  | "saltele"
  | "paturi"
  | "toppere"
  | "perne"
  | "lenjerii"
  | "pilote"
  | "textile-casa"
  | "accesorii"
  | "mobilier";

export type CategoryMeta = {
  slug: CategorySlug;
  label: string;
  heroSubtitle: string;
  /** Poza afișată pe pătrățelul categoriei de pe homepage. Înlocuiește link-ul cu orice altă poză vrei. */
  image: string;
  /**
   * true = categoria apare în meniu, footer și pe homepage.
   * false = categoria e "în standby": pagina tot există și tot funcționează, doar că nu mai e promovată nicăieri.
   * Ca s-o repui în circulație mai târziu, schimbă doar true/false aici — nu trebuie umblat în alt fișier.
   */
  live: boolean;
};

export const categories: CategoryMeta[] = [
  {
    slug: "saltele",
    label: "Saltele",
    heroSubtitle:
      "Structuri memory, arcuri individuale și soluții ortopedice — inclusiv variante cu certificare medicală CE — alese pentru sprijin și durabilitate.",
    image: "https://eudorm.ro/wp-content/uploads/2020/08/Saltea-Alternotti-Biorest-Posture-80-_01.jpg",
    live: true,
  },
  {
    slug: "perne",
    label: "Perne",
    heroSubtitle:
      "Perne memory, din bambus, latex natural sau microfibră, pentru un somn odihnitor.",
    image: "https://eudorm.ro/wp-content/uploads/2024/06/Perne-memory-cu-uleiuri-esentiale-10-buc.jpg",
    live: true,
  },
  {
    slug: "paturi",
    label: "Paturi",
    heroSubtitle:
      "Cadre de pat tapițate, din lemn masiv sau metalice, potrivite pentru orice dormitor.",
    image: "https://eudorm.ro/wp-content/uploads/2023/09/Pat-din-metal-pentru-muncitori-–-produs-configurabil.jpg",
    live: false,
  },
  {
    slug: "toppere",
    label: "Toppere",
    heroSubtitle:
      "Straturi suplimentare de confort, pentru a personaliza senzația saltelei existente.",
    image: "https://salteleitalia.ro/wp-content/uploads/2025/06/Copy-of-Copy-of-Untitled-Design-19.png",
    live: false,
  },
  {
    slug: "lenjerii",
    label: "Lenjerii",
    heroSubtitle:
      "Lenjerii din bumbac, in natural sau micropuf, pentru un pat îngrijit.",
    image: "https://salteleitalia.ro/wp-content/uploads/2025/06/126.png",
    live: false,
  },
  {
    slug: "pilote",
    label: "Pilote",
    heroSubtitle:
      "Pilote cu umplutură naturală sau sintetică, pentru toate anotimpurile.",
    image: "https://eudorm.ro/wp-content/uploads/2020/07/Pilota-Mosen-Premium-cu-puf-natural.jpg",
    live: false,
  },
  {
    slug: "textile-casa",
    label: "Textile pentru casă",
    heroSubtitle:
      "Prosoape, fețe de masă, pături și covoare, pentru dormitor și restul casei.",
    image: "https://salteleitalia.ro/wp-content/uploads/2025/06/187.png",
    live: false,
  },
  {
    slug: "accesorii",
    label: "Accesorii",
    heroSubtitle:
      "Huse de protecție, suporturi și accesorii complementare pentru saltea și pat.",
    image: "https://eudorm.ro/wp-content/uploads/2026/04/Protectie-de-saltea-antiplosnite-Velfont.jpg",
    live: false,
  },
  {
    slug: "mobilier",
    label: "Mobilier",
    heroSubtitle:
      "Scaune, fotolii, mese, canapele și comode, pentru dormitor și zonele de zi.",
    image: "https://eudorm.ro/wp-content/uploads/2020/10/Scaun-Remy-Mosen-gri-lemn-natur.jpg",
    live: false,
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
