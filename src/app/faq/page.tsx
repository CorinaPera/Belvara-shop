import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion } from "@/components/site/faq-accordion";

const faqs = [
  {
    question: "Ce metode de plată acceptați?",
    answer: "Poți plăti ramburs, la livrare, direct curierului, sau prin transfer bancar. Alegi metoda la finalizarea comenzii.",
  },
  {
    question: "Cu ce curieri livrați?",
    answer:
      "Livrăm prin Cargus, Fan Courier sau Sameday. Costul și termenul de livrare depind de dimensiunea produsului și de localitate și ți le comunicăm înainte de confirmarea comenzii.",
  },
  {
    question: "Pot returna un produs?",
    answer:
      "Da. Ai dreptul să te retragi din comandă în 14 zile de la primirea produselor, fără să ne spui motivul. Poți face asta din pagina Retragere din contract, iar detaliile despre returnare și rambursare sunt în Politici.",
  },
  {
    question: "Saltelele au garanție?",
    answer:
      "Da. Produsele noi beneficiază de garanția legală de conformitate de 2 ani, iar unele au și o garanție comercială oferită de producător, indicată în descrierea produsului.",
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
