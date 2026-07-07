import { PageHero } from "@/components/site/page-hero";

const policies = [
  {
    id: "livrare",
    title: "Politica de livrare",
    text: "Livrăm prin Cargus, Fan Courier sau Sameday. Costul și termenul de livrare depind de dimensiunea produsului și de localitate și sunt comunicate explicit la finalizarea fiecărei comenzi.",
  },
  {
    id: "retur",
    title: "Politica de retur",
    text: "Condițiile de retur sunt comunicate la finalizarea comenzii și vor fi publicate integral în această secțiune.",
  },
  {
    id: "confidentialitate",
    title: "Politica de confidențialitate",
    text: "Datele personale colectate la plasarea unei comenzi sunt folosite exclusiv pentru procesarea și livrarea comenzii. Documentul complet privind prelucrarea datelor cu caracter personal va fi publicat în această secțiune.",
  },
  {
    id: "termeni",
    title: "Termeni și condiții",
    text: "Termenii și condițiile de utilizare a site-ului Belvara și de plasare a comenzilor vor fi publicate integral în această secțiune.",
  },
  {
    id: "cookie-uri",
    title: "Politica de cookie-uri",
    text: "Site-ul folosește cookie-uri strict necesare funcționării sale. Detaliile complete despre tipurile de cookie-uri folosite vor fi publicate în această secțiune.",
  },
];

export default function PoliticiPage() {
  return (
    <>
      <PageHero
        title="Politici"
        subtitle="Politicile Belvara privind livrarea, returul și protecția datelor."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-10">
          {policies.map((p) => (
            <div key={p.id} id={p.id}>
              <h2 className="text-2xl">{p.title}</h2>
              <p className="mt-3 font-sans text-sm text-ink-soft">{p.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
