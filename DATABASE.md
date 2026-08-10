# Bază de date — ghid de pornire

## 1. Creează o bază de date PostgreSQL gratuită (Neon)

1. Mergi pe **neon.tech** și creează cont gratuit (poți cu GitHub).
2. Creează un proiect nou — alege regiunea cea mai apropiată (Frankfurt).
3. Din dashboard, copiază **Connection String** (arată cam așa:
   `postgresql://user:parola@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require`).

Neon are un tier gratuit generos (suficient pentru un magazin la început de
drum) și se integrează nativ cu Vercel.

## 2. Configurează local

1. Copiază `.env.example` ca `.env`.
2. Lipește connection string-ul de la Neon în `DATABASE_URL=""`.
3. Rulează:
   ```
   npm install
   npm run db:migrate
   npm run db:seed
   ```
4. `npm run dev` — pe homepage ar trebui să vezi cele 3 produse demo,
   acum citite din baza de date reală, nu din fișier static.

## 3. Configurează pe Vercel (pentru site-ul live)

**IMPORTANT — nu urca niciodată fișierul `.env` pe GitHub.** El e deja
inclus în `.gitignore`, dar dacă încarci fișierele manual prin interfața
web GitHub (drag & drop), acel fișier ignorat NU se exclude automat —
verifică tu manual să nu-l incluzi în upload.

Adresa bazei de date se pune direct în Vercel, nu într-un fișier urcat:

1. În proiectul tău din dashboard Vercel → **Settings** → **Environment
   Variables**.
2. Adaugi: Key = `DATABASE_URL`, Value = connection string-ul de la Neon.
3. Salvezi, apoi faci un redeploy (sau pur și simplu următorul push
   declanșează unul automat).

## Comenzi utile

| Comandă | Ce face |
|---|---|
| `npm run db:migrate` | Aplică schema din `prisma/schema.prisma` în baza de date |
| `npm run db:seed` | Populează cu cele 3 produse demo |
| `npm run db:studio` | Deschide o interfață vizuală (Prisma Studio) ca să vezi/editezi datele din browser |

## Cum adaugi produse reale

Cel mai simplu, pentru moment: `npm run db:studio` deschide o interfață
tip Excel în browser unde poți adăuga produse și variante direct, fără
cod. Mai târziu, la pasul de admin dashboard, vei avea o interfață
dedicată în site.
