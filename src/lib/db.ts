import { neon } from "@neondatabase/serverless";

/**
 * Conexiunea la baza de date Postgres (Neon).
 * DATABASE_URL vine din .env.local — vezi .env.example pentru cum îl completezi.
 */
export function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL nu este setat. Copiază .env.example în .env.local și completează connection string-ul de la Neon."
    );
  }
  return neon(url);
}
