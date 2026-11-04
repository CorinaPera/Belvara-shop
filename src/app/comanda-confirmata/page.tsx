import Link from "next/link";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";

export default async function ComandaConfirmataPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <PageHero
        title="Comandă înregistrată"
        subtitle={
          id ? `Comanda ta cu numărul #${id} a fost înregistrată.` : "Comanda ta a fost înregistrată."
        }
      />
      <section className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
        <p className="font-sans text-sm text-ink-soft">
          Te vom contacta telefonic în cel mai scurt timp pentru confirmarea comenzii și detaliile
          de livrare.
        </p>
        <Link href="/" className="mt-6 inline-block">
          <Button>Înapoi la magazin</Button>
        </Link>
      </section>
    </>
  );
}
