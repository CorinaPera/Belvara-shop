import { sql } from "@/lib/db";

export type NewMessageInput = {
  name: string;
  email: string;
  message: string;
};

export type ContactMessage = {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  emailSent: boolean;
};

async function ensureMessagesTable() {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      email_sent BOOLEAN NOT NULL DEFAULT false
    )
  `;
}

export async function createMessage(input: NewMessageInput): Promise<number> {
  await ensureMessagesTable();
  const db = sql();
  const rows = (await db`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${input.name}, ${input.email}, ${input.message})
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function markMessageEmailed(id: number): Promise<void> {
  const db = sql();
  await db`UPDATE contact_messages SET email_sent = true WHERE id = ${id}`;
}

export async function listMessages(): Promise<ContactMessage[]> {
  await ensureMessagesTable();
  const db = sql();

  type Row = {
    id: number;
    created_at: string;
    name: string;
    email: string;
    message: string;
    email_sent: boolean;
  };

  const rows = (await db`SELECT * FROM contact_messages ORDER BY created_at DESC`) as Row[];
  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    name: r.name,
    email: r.email,
    message: r.message,
    emailSent: r.email_sent,
  }));
}
