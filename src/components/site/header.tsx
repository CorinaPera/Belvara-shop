import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { HeaderCartButton } from "@/components/site/header-cart-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="font-display text-2xl font-medium tracking-wide text-forest">
          BELVARA
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-sm font-medium text-ink-soft transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Căutare">
            <i className="ti ti-search text-lg" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Favorite">
            <i className="ti ti-heart text-lg" />
          </Button>
          <HeaderCartButton />
        </div>
      </div>
    </header>
  );
}
