/**
 * Comutator de lansare.
 *
 * Cât timp NU e setat NEXT_PUBLIC_ORDERS_OPEN="true" (în Vercel), pe site-ul publicat:
 *  - comenzile sunt oprite (pagina de finalizare arată „în curând", iar API-ul refuză comenzi);
 *  - Google este rugat să nu indexeze site-ul.
 *
 * Local (npm run dev) totul e deschis automat, ca să poți testa.
 * Pentru lansare: Vercel → Settings → Environment Variables → adaugă
 * NEXT_PUBLIC_ORDERS_OPEN = true, apoi Redeploy.
 */
export const ORDERS_OPEN =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_ORDERS_OPEN === "true";
