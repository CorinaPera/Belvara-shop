import { Hero } from "@/components/home/hero";
import { BenefitsBar } from "@/components/home/benefits-bar";
import { CategoryGrid } from "@/components/home/category-grid";
import { B2BSection } from "@/components/home/b2b-section";

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsBar />
      <CategoryGrid />
      <B2BSection />
    </>
  );
}
