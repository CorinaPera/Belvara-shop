import Link from "next/link";
import { categories } from "@/lib/categories";

export function CategoryGrid() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <h2 className="text-3xl">Categorii</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {categories.filter((c) => c.live).map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group relative block h-48 overflow-hidden rounded-xl bg-cream"
          >
            {c.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.image}
                alt={c.label}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            )}
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
