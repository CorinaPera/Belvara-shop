import { CategoryHero } from "@/components/category/category-hero";
import { B2BForm } from "@/components/site/b2b-form";

const benefits = [
  {
    icon: "ti-headset",
    title: "Consultanță dedicată",
    text: "Un consultant Belvara te ajută să alegi structurile potrivite pentru profilul unității tale.",
  },
  {
    icon: "ti-discount-2",
    title: "Prețuri per volum",
    text: "Prețuri ajustate în funcție de numărul de camere și de volumul comenzii.",
  },
  {
    icon: "ti-calendar-time",
    title: "Livrare programată",
    text: "Coordonăm livrarea pe etape, potrivit calendarului de renovare sau deschidere.",
  },
];

export default function HoteluriPage() {
  return (
    <>
      <CategoryHero
        title="Belvara pentru hoteluri și pensiuni"
        subtitle="Consultanță dedicată, prețuri per volum și livrare programată pentru proiecte de echipare la scară."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-line bg-white p-6">
              <i className={`ti ${b.icon} text-2xl text-wood`} />
              <p className="mt-3 font-sans text-sm font-medium text-forest">{b.title}</p>
              <p className="mt-1 font-sans text-sm text-ink-soft">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl">Cere o ofertă B2B</h2>
          <p className="mt-3 font-sans text-sm text-ink-soft">
            Completează formularul și revenim cu o propunere adaptată numărului de camere și
            structurilor dorite.
          </p>

          <B2BForm />
        </div>
      </section>
    </>
  );
}
