export function PageHero({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-14">
        <h1 className="text-4xl">{title}</h1>
        <p className="mt-3 max-w-xl font-sans text-base text-ink-soft">{subtitle}</p>
      </div>
    </section>
  );
}
