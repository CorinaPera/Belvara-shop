import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { SiteHeader } from "@/components/layout/site-header";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Belvara — Saltele și lenjerii pentru un somn desăvârșit",
  description:
    "Saltele, topere, perne și lenjerii Belvara. Calitate premium, garanție 10 ani.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ro"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-primary font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
