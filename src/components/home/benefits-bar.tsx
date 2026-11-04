const benefits = [
  { icon: "ti-leaf", label: "Materiale naturale" },
  { icon: "ti-lock", label: "Plată la livrare sau prin transfer bancar" },
  { icon: "ti-truck", label: "Livrare prin Cargus, Fan Courier, Sameday" },
  { icon: "ti-certificate", label: "Garanție producător" },
];

export function BenefitsBar() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {benefits.map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-2 text-center">
            <i className={`ti ${b.icon} text-2xl text-wood`} />
            <p className="font-sans text-sm text-ink-soft">{b.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
