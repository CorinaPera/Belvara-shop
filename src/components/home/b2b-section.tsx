import Link from "next/link";
import { Button } from "@/components/ui/button";

export function B2BSection() {
  return (
    <section className="bg-forest">
      <div className="mx-auto max-w-7xl px-6 py-16">
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
      </div>
    </section>
  );
}
