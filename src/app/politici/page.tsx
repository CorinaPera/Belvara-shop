import { PageHero } from "@/components/site/page-hero";

/**
 * Datele firmei apar în toate textele de mai jos. Completează-le o singură dată aici
 * (după ce primești certificatul de înregistrare) și se actualizează peste tot.
 * Ce e scris între [paranteze drepte] e de completat.
 */
const COMPANY = {
  name: "BELVARA S.R.L.",
  cui: "[CUI — de completat după înregistrare]",
  regCom: "[nr. Reg. Com. — de completat după înregistrare]",
  address: "str. Feredeului nr. 49A, Geoagiu, jud. Hunedoara",
  email: "office@belvara.ro",
  phone: "0743 773 871",
};

const LAST_UPDATE = "4 noiembrie 2026";

type Section = {
  heading?: string;
  paragraphs?: string[];
  list?: string[];
};

type Policy = {
  id: string;
  title: string;
  sections: Section[];
};

const policies: Policy[] = [
  {
    id: "termeni",
    title: "Termeni și condiții",
    sections: [
      {
        heading: "1. Cine suntem",
        paragraphs: [
          `Acest site este operat de ${COMPANY.name}, cu sediul în ${COMPANY.address}, CUI ${COMPANY.cui}, înregistrată la Registrul Comerțului sub nr. ${COMPANY.regCom} (denumită în continuare „Belvara” sau „vânzătorul”). Ne poți contacta la ${COMPANY.email} sau la telefon ${COMPANY.phone}.`,
          "Prin plasarea unei comenzi pe site, cumpărătorul declară că a citit și a acceptat acești termeni și condiții, precum și politicile de livrare, retur, garanție și confidențialitate.",
        ],
      },
      {
        heading: "2. Produse și prețuri",
        paragraphs: [
          "Belvara comercializează saltele, perne și alte produse pentru somn. Imaginile de pe site au caracter informativ; aspectul produsului primit poate diferi ușor de cel din fotografii (nuanță, ambalaj).",
          "Prețurile sunt afișate în lei. Prețul final, inclusiv eventualul cost de livrare, este comunicat cumpărătorului înainte de confirmarea comenzii. Ne rezervăm dreptul de a corecta eventualele erori evidente de afișare a prețului; în acest caz, cumpărătorul este informat și poate decide dacă menține sau anulează comanda.",
        ],
      },
      {
        heading: "3. Plasarea și confirmarea comenzii",
        paragraphs: [
          "Cumpărătorul alege produsele, completează datele de livrare (și, la cerere, datele pentru factură pe firmă sau o adresă de facturare diferită) și trimite comanda. Trimiterea comenzii reprezintă o ofertă de cumpărare.",
          "Contractul se consideră încheiat în momentul în care Belvara confirmă comanda, de regulă telefonic sau prin e-mail. Ne rezervăm dreptul de a nu onora o comandă (de exemplu, produs indisponibil sau date de contact incorecte), caz în care cumpărătorul este informat în cel mai scurt timp.",
        ],
      },
      {
        heading: "4. Plata",
        paragraphs: [
          "Plata se poate face ramburs, la livrare, către curier, sau prin transfer bancar, conform instrucțiunilor comunicate la confirmarea comenzii. În cazul transferului bancar, comanda este pregătită pentru expediere după confirmarea încasării.",
        ],
      },
      {
        heading: "5. Livrare, retragere și garanție",
        paragraphs: [
          "Condițiile de livrare, dreptul de retragere din contract (14 zile) și garanția produselor sunt detaliate în secțiunile Politica de livrare, Politica de retur și Garanție de pe această pagină, care fac parte din acești termeni.",
        ],
      },
      {
        heading: "6. Răspundere",
        paragraphs: [
          "Belvara răspunde pentru conformitatea produselor livrate, în condițiile legii. Nu răspundem pentru întârzieri sau imposibilități de executare cauzate de situații de forță majoră sau de fapte ale unor terți (de exemplu, întârzieri ale curierului în afara controlului nostru), în măsura permisă de lege. Nimic din acești termeni nu limitează drepturile pe care legea le acordă consumatorilor.",
        ],
      },
      {
        heading: "7. Proprietate intelectuală",
        paragraphs: [
          "Conținutul acestui site (texte, denumiri, grafică, logo) aparține Belvara sau este folosit cu acordul titularilor și nu poate fi copiat sau reutilizat fără acordul nostru prealabil.",
        ],
      },
      {
        heading: "8. Reclamații și soluționarea litigiilor",
        paragraphs: [
          `Orice reclamație poate fi trimisă la ${COMPANY.email}. Ne angajăm să o analizăm și să răspundem în cel mai scurt timp.`,
          "Consumatorii se pot adresa Autorității Naționale pentru Protecția Consumatorilor (anpc.ro) și pot recurge la entitățile de soluționare alternativă a litigiilor (SAL), a căror listă este publicată de ANPC. Rămâne deschisă oricând și calea instanțelor judecătorești competente.",
        ],
      },
      {
        heading: "9. Legea aplicabilă și modificări",
        paragraphs: [
          "Acești termeni sunt guvernați de legea română. Putem actualiza termenii și condițiile; versiunea aplicabilă unei comenzi este cea în vigoare la data plasării ei.",
          `Ultima actualizare: ${LAST_UPDATE}.`,
        ],
      },
    ],
  },
  {
    id: "livrare",
    title: "Politica de livrare",
    sections: [
      {
        paragraphs: [
          "Livrăm prin Cargus, Fan Courier sau Sameday, în funcție de dimensiunea produsului și de localitatea de destinație. Costul și termenul estimat de livrare depind de dimensiunea produsului și de localitate și sunt comunicate explicit cumpărătorului înainte de confirmarea comenzii.",
        ],
      },
      {
        heading: "Verificarea coletului",
        paragraphs: [
          "Te rugăm să verifici coletul în momentul primirii. Dacă ambalajul este deteriorat vizibil, menționează acest lucru pe documentul curierului sau refuză coletul și anunță-ne imediat, ca să putem rezolva situația cu firma de curierat.",
        ],
      },
      {
        heading: "Date de contact",
        paragraphs: [
          "Curierul te va contacta la numărul de telefon indicat în comandă. Te rugăm să ne dai un număr la care ești disponibil și o adresă completă și corectă, pentru a evita întârzierile sau returnarea coletului.",
        ],
      },
    ],
  },
  {
    id: "retur",
    title: "Politica de retur și dreptul de retragere",
    sections: [
      {
        heading: "Dreptul de retragere în 14 zile",
        paragraphs: [
          "Dacă ești consumator (persoană fizică), ai dreptul să te retragi din contractul la distanță, fără a-ți justifica decizia și fără penalități, în termen de 14 zile calendaristice de la data la care tu sau o persoană desemnată de tine (alta decât curierul) ai intrat în posesia fizică a produselor. Dacă ai comandat mai multe produse livrate separat, termenul curge de la primirea ultimului produs.",
        ],
      },
      {
        heading: "Cum te retragi",
        paragraphs: [
          `Ne poți anunța decizia cel mai simplu completând formularul de pe pagina „Retragere din contract” (/retragere, link în subsolul site-ului), sau printr-o declarație clară trimisă prin e-mail la ${COMPANY.email}. Indică numărul comenzii și produsele pentru care te retragi. Imediat după trimiterea formularului primești o confirmare de primire, pe care o poți salva sau printa; pentru e-mail îți confirmăm primirea în scris. Termenul se consideră respectat dacă ne trimiți comunicarea înainte de expirarea celor 14 zile.`,
        ],
      },
      {
        heading: "Returnarea produsului",
        paragraphs: [
          "Produsele trebuie trimise înapoi în cel mult 14 zile de la data la care ne-ai comunicat retragerea. Costul direct al returnării produselor este suportat de cumpărător, cu excepția cazului în care convenim altfel. Te rugăm să returnezi produsul în ambalajul original, cu toate accesoriile, fără urme de utilizare. Răspunzi doar pentru diminuarea valorii produsului rezultată din manipularea lui într-un alt mod decât cel necesar pentru a-i stabili natura, caracteristicile și funcționarea.",
        ],
      },
      {
        heading: "Rambursarea banilor",
        paragraphs: [
          "Îți rambursăm toate sumele primite, inclusiv costul livrării standard inițiale, în cel mult 14 zile de la data la care am fost informați despre decizia ta de retragere, folosind aceeași metodă de plată ca la comandă, fără costuri suplimentare pentru tine. Nu rambursăm costurile suplimentare apărute dacă ai ales o metodă de livrare mai scumpă decât cea standard oferită de noi. Putem amâna rambursarea până la primirea produselor înapoi sau până la dovada expedierii lor, oricare survine prima.",
        ],
      },
      {
        heading: "Excepții",
        paragraphs: [
          "Conform legii, dreptul de retragere nu se aplică produselor confecționate după specificațiile cumpărătorului sau personalizate în mod clar și, în cazul produselor livrate sigilate care nu pot fi returnate din motive de protecție a sănătății sau de igienă, dacă au fost desigilate după livrare. Dacă un produs se încadrează în una dintre aceste excepții, îți vom spune acest lucru înainte de comandă.",
        ],
      },
      {
        heading: "Produs neconform sau deteriorat",
        paragraphs: [
          "Dacă produsul primit este deteriorat sau nu corespunde comenzii, contactează-ne cât mai repede. Drepturile tale legate de neconformitate sunt cele din secțiunea Garanție de mai jos și se aplică independent de dreptul de retragere.",
        ],
      },
    ],
  },
  {
    id: "garantie",
    title: "Garanție",
    sections: [
      {
        paragraphs: [
          "Produsele noi comercializate de Belvara beneficiază de garanția legală de conformitate de 2 ani, conform legii. În această perioadă, dacă produsul nu este conform contractului, cumpărătorul are dreptul, în condițiile legii, la aducerea produsului în conformitate (reparare sau înlocuire), la reducerea proporțională a prețului sau la încetarea contractului și rambursarea prețului.",
          "Unele produse pot beneficia, în plus, de o garanție comercială oferită de producător. Durata și condițiile acesteia, atunci când există, sunt indicate în descrierea produsului.",
          `Pentru a invoca garanția, ne poți scrie la ${COMPANY.email}, indicând numărul comenzii și descriind problema, eventual cu fotografii. Păstrează factura și documentele care însoțesc produsul.`,
        ],
      },
    ],
  },
  {
    id: "confidentialitate",
    title: "Politica de confidențialitate",
    sections: [
      {
        heading: "Cine prelucrează datele tale",
        paragraphs: [
          `Operatorul datelor cu caracter personal este ${COMPANY.name}, cu sediul în ${COMPANY.address}, CUI ${COMPANY.cui}. Contact pentru orice întrebare privind datele tale: ${COMPANY.email}. Prelucrăm datele în conformitate cu Regulamentul (UE) 2016/679 (GDPR) și legislația română aplicabilă.`,
        ],
      },
      {
        heading: "Ce date colectăm",
        list: [
          "Date de identificare și contact: nume, număr de telefon, adresă de e-mail (opțional).",
          "Date de livrare și facturare: adresa de livrare, adresa de facturare dacă este diferită, iar pentru facturare pe firmă: denumirea firmei, CUI, nr. de înregistrare la Registrul Comerțului.",
          "Date despre comandă: produsele comandate, valoarea, metoda de plată, observațiile pe care le adaugi.",
          "Mesajele trimise prin formularul de contact sau prin formularul de retragere din contract: nume, e-mail, telefon (unde este cazul) și conținutul mesajului.",
        ],
      },
      {
        heading: "De ce folosim datele și pe ce bază",
        list: [
          "Pentru a prelua, confirma, livra și factura comanda ta (executarea contractului).",
          "Pentru a ne îndeplini obligațiile legale, în special cele fiscale și contabile (emiterea și arhivarea facturilor).",
          "Pentru a răspunde solicitărilor și reclamațiilor tale, inclusiv exercitării dreptului de retragere și garanției.",
          "Pentru prevenirea fraudei și protejarea intereselor noastre legitime, în cazuri justificate.",
        ],
        paragraphs: [
          "Nu îți trimitem mesaje comerciale (newsletter, promoții) fără acordul tău expres și nu vindem datele tale.",
        ],
      },
      {
        heading: "Cui le transmitem",
        paragraphs: [
          "Datele sunt transmise doar în măsura necesară: firmelor de curierat (pentru livrare), furnizorilor de servicii contabile și de facturare, furnizorilor de găzduire, bază de date și trimitere de e-mailuri care ne ajută să operăm site-ul și, la cerere, autorităților publice, atunci când legea ne obligă.",
          "Unii dintre furnizorii noștri tehnici pot avea servere în afara Spațiului Economic European. În acest caz, transferul se face doar cu garanții adecvate prevăzute de GDPR (de exemplu, clauze contractuale standard sau decizii de adecvare).",
        ],
      },
      {
        heading: "Cât păstrăm datele",
        paragraphs: [
          "Păstrăm datele comenzilor și ale facturilor pe perioada impusă de legislația fiscală și contabilă, iar celelalte date doar cât este necesar scopului pentru care au fost colectate, după care sunt șterse sau anonimizate.",
        ],
      },
      {
        heading: "Drepturile tale",
        list: [
          "dreptul de acces la datele tale;",
          "dreptul la rectificarea datelor inexacte;",
          "dreptul la ștergerea datelor („dreptul de a fi uitat”), în condițiile legii;",
          "dreptul la restricționarea prelucrării;",
          "dreptul la portabilitatea datelor;",
          "dreptul de opoziție, pentru prelucrările bazate pe interesul nostru legitim;",
          "dreptul de a retrage consimțământul, acolo unde prelucrarea se bazează pe acesta.",
        ],
        paragraphs: [
          `Pentru a-ți exercita drepturile, scrie-ne la ${COMPANY.email}. Ai și dreptul de a depune o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP, dataprotection.ro).`,
          `Ultima actualizare: ${LAST_UPDATE}.`,
        ],
      },
    ],
  },
  {
    id: "cookie-uri",
    title: "Politica de cookie-uri",
    sections: [
      {
        paragraphs: [
          "Site-ul Belvara folosește doar mecanisme strict necesare funcționării lui și nu folosește cookie-uri de analiză, de publicitate sau de urmărire.",
        ],
      },
      {
        heading: "Ce se salvează în browserul tău",
        list: [
          "Coșul de cumpărături: produsele adăugate în coș sunt păstrate în memoria locală a browserului tău (localStorage), ca să nu le pierzi dacă închizi pagina. Rămân doar pe dispozitivul tău și se șterg la finalizarea comenzii sau când ștergi datele site-ului din browser.",
          "Autentificarea administratorului: doar pentru persoana care administrează site-ul, un cookie tehnic păstrează sesiunea de autentificare.",
        ],
      },
      {
        heading: "Ce se întâmplă dacă le blochezi",
        paragraphs: [
          "Poți șterge sau bloca oricând datele salvate de site din setările browserului. Dacă o faci, coșul de cumpărături nu va mai fi reținut între vizite.",
          "Dacă în viitor vom adăuga instrumente care folosesc cookie-uri non-esențiale (de exemplu, statistici de vizitare), vom actualiza această politică și îți vom cere acordul înainte de a le activa.",
        ],
      },
    ],
  },
];

export default function PoliticiPage() {
  return (
    <>
      <PageHero
        title="Politici"
        subtitle="Termenii și condițiile Belvara, politicile de livrare, retur, garanție, confidențialitate și cookie-uri."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <nav className="mb-12 flex max-w-2xl flex-wrap gap-x-6 gap-y-2 font-sans text-sm">
          {policies.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="text-forest underline-offset-4 hover:underline">
              {p.title}
            </a>
          ))}
        </nav>

        <div className="flex max-w-2xl flex-col gap-14">
          {policies.map((p) => (
            <article key={p.id} id={p.id} className="scroll-mt-24">
              <h2 className="text-2xl">{p.title}</h2>
              <div className="mt-4 flex flex-col gap-6">
                {p.sections.map((s, i) => (
                  <div key={i}>
                    {s.heading && (
                      <h3 className="font-sans text-base font-medium text-forest">{s.heading}</h3>
                    )}
                    <div
                      className={`flex flex-col gap-3 font-sans text-sm text-ink-soft ${s.heading ? "mt-2" : ""}`}
                    >
                      {s.list && (
                        <ul className="list-disc space-y-1 pl-5">
                          {s.list.map((item, j) => (
                            <li key={j}>{item}</li>
                          ))}
                        </ul>
                      )}
                      {s.paragraphs?.map((para, j) => (
                        <p key={j}>{para}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
