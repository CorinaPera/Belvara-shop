import Image from "next/image";
import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { Button } from "@/components/ui/button";
import { HeaderCartButton } from "@/components/site/header-cart-button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" aria-label="Belvara - prima pagină" className="flex items-center">
          <Image
            src="/logo-horizontal.png"
            alt="Belvara"
            width={1724}
            height={520}
            priority
            className="h-12 w-auto sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-lg font-semibold text-ink transition-colors hover:text-forest"
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

      <nav className="border-t border-line lg:hidden" aria-label="Categorii">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 overflow-x-auto px-4 py-2">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-1.5 font-sans text-base font-semibold text-ink hover:bg-white hover:text-forest"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
