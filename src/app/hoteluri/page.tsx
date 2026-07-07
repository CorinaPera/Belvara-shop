import { CategoryHero } from "@/components/category/category-hero";
import { Button } from "@/components/ui/button";

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

const stats = [
  { value: "120+", label: "Hoteluri și pensiuni partenere" },
  { value: "15 ani", label: "Experiență în echiparea unităților de cazare" },
  { value: "3", label: "Curieri parteneri pentru livrări la scară" },
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

      <section className="bg-forest">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-6 py-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-cream/15 p-6">
              <p className="font-display text-3xl font-medium text-gold">{s.value}</p>
              <p className="mt-2 font-sans text-sm text-cream/80">{s.label}</p>
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

          <form className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="font-sans text-sm font-medium text-forest">
                  Nume companie
                </label>
                <input
                  id="company"
                  type="text"
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-person" className="font-sans text-sm font-medium text-forest">
                  Persoană de contact
                </label>
                <input
                  id="contact-person"
                  type="text"
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="b2b-email" className="font-sans text-sm font-medium text-forest">
                  Email
                </label>
                <input
                  id="b2b-email"
                  type="email"
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rooms" className="font-sans text-sm font-medium text-forest">
                  Număr estimat de camere
                </label>
                <input
                  id="rooms"
                  type="number"
                  min={1}
                  className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="b2b-message" className="font-sans text-sm font-medium text-forest">
                Mesaj
              </label>
              <textarea
                id="b2b-message"
                rows={4}
                className="rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest"
              />
            </div>
            <Button type="button" variant="gold" className="self-start">
              Trimite cererea
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
