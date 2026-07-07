import Link from "next/link";

const categories = [
  { label: "Saltele", href: "/saltele" },
  { label: "Paturi", href: "/paturi" },
  { label: "Toppere", href: "/toppere" },
  { label: "Perne", href: "/perne" },
];

export function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <h2 className="text-3xl">Categorii</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative block h-48 overflow-hidden rounded-xl bg-wood-slats"
          >
            <div className="absolute inset-0 bg-forest/30 transition-colors group-hover:bg-forest/10" />
            <span className="absolute bottom-4 left-4 font-display text-xl font-medium text-cream">
              {c.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
