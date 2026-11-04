import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Poza mare din dreapta, pe homepage. Înlocuiește link-ul cu orice altă poză vrei. */
const HERO_IMAGE =
  "https://eudorm.ro/wp-content/uploads/2020/08/Saltea-Alternotti-Biorest-Posture-80-_01.jpg";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-7xl grid gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
      <div>
        <p className="font-sans text-sm font-medium uppercase tracking-wide text-wood">
          Somn. Sprijin. Natural.
        </p>
        <h1 className="mt-3 text-4xl leading-tight sm:text-5xl">
          Saltele gândite pentru un somn cu adevărat odihnitor
        </h1>
        <p className="mt-5 max-w-md font-sans text-base text-ink-soft">
          Materiale naturale, structuri ortopedice și finisaje durabile —
          pentru fiecare noapte, an de an.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/saltele">
            <Button variant="gold">Vezi saltelele</Button>
          </Link>
          <Link href="/despre-noi">
            <Button variant="outline">Despre noi</Button>
          </Link>
        </div>
      </div>

      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-cream sm:h-80 lg:h-[26rem]">
        {HERO_IMAGE && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={HERO_IMAGE}
            alt="Saltea Belvara"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>
    </section>
  );
}
