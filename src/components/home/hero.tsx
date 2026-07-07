import Link from "next/link";
import { Button } from "@/components/ui/button";

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

      <div className="h-64 w-full rounded-2xl bg-wood-slats sm:h-80 lg:h-[26rem]" />
    </section>
  );
}
