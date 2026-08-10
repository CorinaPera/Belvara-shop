import Link from "next/link";
import { CartButton } from "@/components/cart/cart-button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur border-b border-primary/10">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl text-primary tracking-tight">
          Belvara
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/saltele" className="hover:text-eyebrow transition-colors">
            Saltele
          </Link>
          <Link href="/topere" className="hover:text-eyebrow transition-colors">
            Topere
          </Link>
          <Link href="/perne" className="hover:text-eyebrow transition-colors">
            Perne
          </Link>
          <Link href="/lenjerii" className="hover:text-eyebrow transition-colors">
            Lenjerii
          </Link>
        </nav>

        <CartButton />
      </div>
    </header>
  );
}
