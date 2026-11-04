import Link from "next/link";
import { categories } from "@/lib/categories";

export function CategoryGrid() {
  const live = categories.filter((c) => c.live);

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16">
      <h2 className="text-3xl">Alege categoria</h2>
      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
        {live.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className="group relative block h-72 overflow-hidden rounded-2xl bg-cream sm:h-80 lg:h-[26rem]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="block font-display text-3xl font-medium text-cream">
                {c.label}
              </span>
              <span className="mt-1 block font-sans text-sm text-cream/90 transition-transform group-hover:translate-x-1">
                Vezi produsele →
              </span>
            </div>
          </Link>
        ))}

        <Link
          href="/hoteluri"
          className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl bg-forest p-6 sm:h-80 lg:h-[26rem]"
        >
          <p className="font-sans text-sm font-medium uppercase tracking-wide text-gold">
            Pentru afaceri
          </p>
          <span className="mt-2 block font-display text-3xl font-medium text-cream">
            Hoteluri (B2B)
          </span>
          <p className="mt-2 font-sans text-sm text-cream/80">
            Echipare pentru hoteluri și pensiuni, cu ofertă personalizată.
          </p>
          <span className="mt-4 inline-block font-sans text-sm font-medium text-gold transition-transform group-hover:translate-x-1">
            Cere ofertă →
          </span>
        </Link>
      </div>
    </section>
  );
}
