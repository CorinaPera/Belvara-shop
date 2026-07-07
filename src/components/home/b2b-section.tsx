import Link from "next/link";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "120+", label: "Hoteluri și pensiuni partenere" },
  { value: "15 ani", label: "Experiență în echiparea unităților de cazare" },
];

export function B2BSection() {
  return (
    <section className="bg-forest">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="font-sans text-sm font-medium uppercase tracking-wide text-gold">
            Belvara pentru hoteluri
          </p>
          <h2 className="mt-3 text-3xl text-cream">
            Soluții de echipare pentru hoteluri și pensiuni
          </h2>
          <p className="mt-4 max-w-md font-sans text-base text-cream/80">
            Consultanță dedicată, prețuri per volum și livrare programată
            pentru proiecte de echipare la scară.
          </p>
          <div className="mt-8">
            <Link href="/hoteluri">
              <Button variant="gold">Cere ofertă B2B</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-cream/15 p-6">
              <p className="font-display text-3xl font-medium text-gold">{s.value}</p>
              <p className="mt-2 font-sans text-sm text-cream/80">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
