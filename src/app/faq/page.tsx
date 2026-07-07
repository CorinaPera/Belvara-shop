import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";

const faqs = [
  {
    question: "Ce metode de plată acceptați?",
    answer: "Plata online se procesează securizat prin Netopia Payments.",
  },
  {
    question: "Cu ce curieri livrați?",
    answer:
      "Livrăm prin Cargus, Fan Courier sau Sameday. Costul și termenul de livrare sunt afișate la finalizarea comenzii, în funcție de dimensiunea produsului și de localitate.",
  },
  {
    question: "Pot returna un produs?",
    answer:
      "Da, conform politicii de retur Belvara. Condițiile exacte pentru comanda ta sunt comunicate la finalizarea acesteia.",
  },
  {
    question: "Saltelele au garanție?",
    answer:
      "Fiecare produs are o perioadă de garanție producător, specificată în secțiunea de specificații a paginii produsului.",
  },
  {
    question: "Oferiți prețuri speciale pentru hoteluri sau pensiuni?",
    answer:
      "Da, pentru comenzi la volum din secțiunea Hoteluri (B2B) oferim consultanță dedicată și prețuri per volum.",
  },
  {
    question: "Cum aleg dimensiunea potrivită?",
    answer:
      "Fiecare pagină de produs are un selector de dimensiuni cu prețul aferent fiecărei variante disponibile.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="Întrebări frecvente"
        subtitle="Răspunsuri la cele mai comune întrebări despre comenzi, livrare și produsele Belvara."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <FaqAccordion items={faqs} />
        </div>
      </section>
    </>
  );
}
