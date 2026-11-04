import { sql } from "@/lib/db";

export type NewWithdrawalInput = {
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  products?: string;
  reason?: string;
};

export type Withdrawal = {
  id: number;
  createdAt: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email: string | null;
  products: string | null;
  reason: string | null;
  status: string;
};

/** Creează tabela de retrageri dacă nu există deja (rulează automat). */
async function ensureWithdrawalsTable() {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS withdrawals (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      order_number TEXT NOT NULL,
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      products TEXT,
      reason TEXT,
      status TEXT NOT NULL DEFAULT 'nouă'
    )
  `;
}

export async function createWithdrawal(
  input: NewWithdrawalInput
): Promise<{ id: number; createdAt: string }> {
  await ensureWithdrawalsTable();
  const db = sql();
  const rows = (await db`
    INSERT INTO withdrawals (order_number, customer_name, phone, email, products, reason)
    VALUES (
      ${input.orderNumber}, ${input.customerName}, ${input.phone},
      ${input.email ?? null}, ${input.products ?? null}, ${input.reason ?? null}
    )
    RETURNING id, created_at
  `) as { id: number; created_at: string }[];

  return { id: rows[0].id, createdAt: new Date(rows[0].created_at).toISOString() };
}

export async function listWithdrawals(): Promise<Withdrawal[]> {
  await ensureWithdrawalsTable();
  const db = sql();

  type Row = {
    id: number;
    created_at: string;
    order_number: string;
    customer_name: string;
    phone: string;
    email: string | null;
    products: string | null;
    reason: string | null;
    status: string;
  };

  const rows = (await db`SELECT * FROM withdrawals ORDER BY created_at DESC`) as Row[];

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    orderNumber: r.order_number,
    customerName: r.customer_name,
    phone: r.phone,
    email: r.email,
    products: r.products,
    reason: r.reason,
    status: r.status,
  }));
}
