export function CategoryHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <h1 className="text-4xl text-cream">{title}</h1>
        <p className="mt-3 max-w-xl font-sans text-base text-cream/80">{subtitle}</p>
      </div>
    </section>
  );
}
