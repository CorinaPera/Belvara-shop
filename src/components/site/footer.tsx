import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "@/lib/nav";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image src="/logo.png" alt="Belvara" width={900} height={768} className="h-28 w-auto" />
          <p className="mt-3 max-w-xs font-sans text-sm text-ink-soft">
            Saltele, paturi și accesorii de somn, gândite pentru confort și sprijin
            ortopedic de zi cu zi.
          </p>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="font-sans text-sm font-medium text-forest">{col.title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-ink-soft transition-colors hover:text-forest"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line px-6 py-6">
        <p className="mx-auto max-w-7xl font-sans text-xs text-ink-soft">
          © {new Date().getFullYear()} Belvara. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
}
