import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-sans text-sm font-medium uppercase tracking-wide text-wood">Eroare 404</p>
      <h1 className="text-4xl">Pagina nu a fost găsită</h1>
      <p className="max-w-md font-sans text-base text-ink-soft">
        Pagina pe care o cauți nu există sau a fost mutată.
      </p>
      <Link href="/">
        <Button variant="gold">Înapoi la pagina principală</Button>
      </Link>
    </div>
  );
}
