import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: "ti-leaf",
    title: "Materiale alese cu grijă",
    text: "Lucrăm cu memory foam, latex natural, lână merinos și fibră de bambus, alese pentru confort și durabilitate.",
  },
  {
    icon: "ti-ruler-2",
    title: "Structuri ortopedice",
    text: "O parte din gama noastră include certificări medicale CE, pentru un sprijin verificat al coloanei.",
  },
  {
    icon: "ti-building-store",
    title: "Pentru case și hoteluri",
    text: "Echipăm atât dormitoare individuale, cât și proiecte de amenajare pentru hoteluri și pensiuni.",
  },
];

export default function DespreNoiPage() {
  return (
    <>
      <PageHero
        title="Despre Belvara"
        subtitle="Saltele, paturi și accesorii de somn, gândite pentru confort și sprijin ortopedic de zi cu zi."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-4 font-sans text-base text-ink-soft">
            <p>
              Belvara este un brand dedicat produselor pentru somn — saltele, paturi, toppere,
              perne, lenjerii și accesorii — construit în jurul unei idei simple: un somn bun
              începe cu materiale bune și o structură potrivită corpului.
            </p>
            <p>
              Selectăm fiecare colecție pe baza compoziției reale a materialelor, nu doar a
              denumirii de marketing, și ne adresăm atât clienților individuali, cât și hotelurilor
              și pensiunilor care au nevoie de echipare la scară.
            </p>
          </div>
          <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-cream sm:h-96 lg:h-full lg:min-h-[28rem]">
            <Image
              src="/despre-noi.jpg"
              alt="Țesături naturale din in, împăturite, cu frunze de eucalipt"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover object-[50%_75%]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-6 py-16">
          <h2 className="text-3xl">Ce ne diferențiază</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-line bg-cream p-6">
                <i className={`ti ${v.icon} text-2xl text-wood`} />
                <p className="mt-3 font-sans text-sm font-medium text-forest">{v.title}</p>
                <p className="mt-1 font-sans text-sm text-ink-soft">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-16 text-center">
        <h2 className="text-3xl">Descoperă gama Belvara</h2>
        <p className="mx-auto mt-3 max-w-md font-sans text-base text-ink-soft">
          Explorează saltelele, paturile și accesoriile disponibile în acest moment.
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/saltele">
            <Button variant="gold">Vezi saltelele</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
