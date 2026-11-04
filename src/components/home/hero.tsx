import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/** Poza mare din dreapta, pe homepage. Fișierul e în folderul public (hero.jpg). */
const HERO_IMAGE = "/hero.jpg";

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

      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-cream sm:h-96 lg:h-[32rem]">
        <Image
          src={HERO_IMAGE}
          alt="Dormitor luminos cu pat confortabil"
          fill
          priority
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-[50%_65%]"
        />
      </div>
    </section>
  );
}
