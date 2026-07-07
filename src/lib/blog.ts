export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tag: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cum-alegi-fermitatea-potrivita",
    title: "Cum alegi fermitatea potrivită pentru saltea",
    excerpt:
      "Fermitatea potrivită depinde de poziția de somn și de greutatea corporală. Iată cum orientezi alegerea.",
    date: "2026-01-12",
    readTime: "4 min",
    tag: "Ghid saltele",
    content: [
      "Fermitatea unei saltele influențează direct modul în care coloana vertebrală este susținută pe timpul nopții. Nu există o singură variantă „corectă” — alegerea depinde de poziția în care dormi cel mai des și de greutatea corporală.",
      "Persoanele care dorm pe o parte au nevoie, în general, de o saltea ceva mai moale, care să permită umărului și șoldului să se afunde ușor, menținând coloana aliniată. Cei care dorm pe spate sau pe burtă se simt de obicei mai bine pe o structură medie spre fermă, care oferă un sprijin mai uniform.",
      "Greutatea corporală schimbă și ea percepția de fermitate — aceeași saltea poate părea mai moale pentru o persoană mai grea și mai fermă pentru una mai ușoară. Din acest motiv, în paginile de produs indicăm nivelul de fermitate pentru fiecare structură, ca punct de plecare în alegere.",
      "Dacă ești la limită între două niveluri de fermitate, o variantă medie-fermă este, de regulă, cea mai versatilă alegere pentru un pat folosit de două persoane cu preferințe diferite.",
    ],
  },
  {
    slug: "diferenta-memory-latex-arcuri",
    title: "Diferența dintre memory foam, latex natural și arcuri individuale",
    excerpt:
      "Trei structuri de saltea, trei senzații diferite. Explicăm pe scurt cum se comportă fiecare.",
    date: "2026-01-28",
    readTime: "5 min",
    tag: "Materiale",
    content: [
      "Memory foam-ul este o spumă viscoelastică ce reacționează la temperatura și greutatea corpului, mulându-se treptat pe formele acestuia. Oferă o senzație de „îmbrățișare” și reduce punctele de presiune, dar revine mai lent la forma inițială după ce te ridici.",
      "Latexul natural are o elasticitate mai mare și revine aproape instant la forma inițială. Senzația este mai „elastică” decât la memory foam, cu un sprijin uniform și o circulație bună a aerului datorită structurii poroase.",
      "Arcurile individuale, înfundate separat în buzunare textile, se comprimă independent unele de altele. Această construcție oferă un sprijin punctual precis și reduce transferul de mișcare între cele două laturi ale saltelei — un avantaj important pentru cuplurile cu programe de somn diferite.",
      "Multe dintre saltelele noastre combină aceste structuri — de exemplu, un strat de arcuri individuale pentru sprijin, completat cu un topper memory sau climatizat pentru confort suplimentar la suprafață.",
    ],
  },
  {
    slug: "intretinerea-saltelei",
    title: "Cât de des ar trebui să întorci sau rotești salteaua",
    excerpt:
      "Câteva reguli simple de întreținere care prelungesc durata de viață a unei saltele.",
    date: "2026-02-09",
    readTime: "3 min",
    tag: "Întreținere",
    content: [
      "Rotirea periodică a saltelei (la 180°, de la cap la picioare) ajută la distribuirea uniformă a uzurii, mai ales în primele luni de utilizare. Recomandarea generală este o dată la 2-3 luni.",
      "Dacă saltea este reversibilă — cum este cazul colecției Argento — poți alterna și cele două fețe, nu doar capătul, pentru o uzură și mai echilibrată.",
      "Un husă de protecție impermeabilă reduce riscul de pete și prelungește aspectul îngrijit al saltelei, fără să îi modifice senzația de confort dacă este una respirabilă.",
      "Aerisirea dormitorului dimineața și evitarea așezării saltelei direct pe o suprafață fără circulație de aer (de exemplu, un fund de pat plin, fără fante) ajută la menținerea unui mediu mai uscat.",
    ],
  },
  {
    slug: "ghid-dimensiuni-saltea",
    title: "Ghid de dimensiuni: ce saltea se potrivește camerei tale",
    excerpt:
      "De la saltele single la dimensiuni king-size — cum alegi în funcție de spațiu și de numărul de persoane.",
    date: "2026-02-20",
    readTime: "4 min",
    tag: "Ghid saltele",
    content: [
      "Dimensiunea 90x200 cm este alegerea clasică pentru o cameră single sau pentru copii mai mari. Este suficient de compactă pentru dormitoare mici, fără să sacrifice confortul pentru o singură persoană.",
      "140x200 cm este un compromis popular pentru dormitoare de dimensiuni medii — oferă spațiu suplimentar față de o saltea single, fără să ocupe la fel de mult loc ca o saltea dublă completă.",
      "160x200 cm și 180x200 cm sunt dimensiunile standard pentru cupluri, cu diferența că 180 cm oferă un spațiu individual considerabil mai mare pe fiecare parte a patului.",
      "200x200 cm este alegerea potrivită pentru dormitoare spațioase sau pentru cei care preferă un maximum de spațiu personal pe timpul nopții. Toate saltelele din gama Belvara sunt disponibile în aceste dimensiuni standard.",
    ],
  },
  {
    slug: "cum-alegi-perna-potrivita",
    title: "Cum alegi perna potrivită în funcție de poziția de somn",
    excerpt:
      "Înălțimea și fermitatea pernei ar trebui să urmeze poziția în care dormi cel mai des.",
    date: "2026-03-03",
    readTime: "3 min",
    tag: "Perne",
    content: [
      "Cei care dorm pe spate au nevoie, în general, de o pernă cu înălțime medie, care să susțină curbura naturală a gâtului fără să împingă capul prea sus.",
      "Persoanele care dorm pe o parte au nevoie de o pernă ceva mai înaltă și mai fermă, care să umple spațiul dintre umăr și cap și să mențină coloana cervicală aliniată cu restul coloanei.",
      "Pentru cei care dorm pe burtă, o pernă mai joasă și mai moale reduce tensiunea asupra gâtului — sau, în unele cazuri, dormitul fără pernă este chiar mai confortabil.",
      "Pernele ergonomice, cu zone de înălțime diferită, sunt gândite să acopere mai multe poziții de somn și pot fi o alegere bună dacă îți schimbi frecvent poziția pe timpul nopții.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
