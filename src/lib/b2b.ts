import { sql } from "@/lib/db";

export type NewB2BInput = {
  company: string;
  contactPerson: string;
  email: string;
  phone?: string;
  rooms?: number;
  message?: string;
};

export type B2BRequest = {
  id: number;
  createdAt: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  rooms: number | null;
  message: string | null;
  emailSent: boolean;
};

async function ensureB2BTable() {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS b2b_requests (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      company TEXT NOT NULL,
      contact_person TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      rooms INTEGER,
      message TEXT,
      email_sent BOOLEAN NOT NULL DEFAULT false
    )
  `;
}

export async function createB2BRequest(input: NewB2BInput): Promise<number> {
  await ensureB2BTable();
  const db = sql();
  const rows = (await db`
    INSERT INTO b2b_requests (company, contact_person, email, phone, rooms, message)
    VALUES (
      ${input.company}, ${input.contactPerson}, ${input.email},
      ${input.phone ?? null}, ${input.rooms ?? null}, ${input.message ?? null}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function markB2BEmailed(id: number): Promise<void> {
  const db = sql();
  await db`UPDATE b2b_requests SET email_sent = true WHERE id = ${id}`;
}

export async function listB2BRequests(): Promise<B2BRequest[]> {
  await ensureB2BTable();
  const db = sql();

  type Row = {
    id: number;
    created_at: string;
    company: string;
    contact_person: string;
    email: string;
    phone: string | null;
    rooms: number | null;
    message: string | null;
    email_sent: boolean;
  };

  const rows = (await db`SELECT * FROM b2b_requests ORDER BY created_at DESC`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    company: r.company,
    contactPerson: r.contact_person,
    email: r.email,
    phone: r.phone,
    rooms: r.rooms,
    message: r.message,
    emailSent: r.email_sent,
  }));
}
