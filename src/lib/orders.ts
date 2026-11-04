import { sql } from "@/lib/db";

export type OrderItemInput = {
  slug: string;
  category: string;
  name: string;
  size: string;
  unitPrice: number;
  quantity: number;
};

export type NewOrderInput = {
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  county: string;
  postalCode?: string;
  note?: string;
  paymentMethod: "ramburs" | "transfer";
  items: OrderItemInput[];
  // Facturare pe firmă (opțional)
  isCompany: boolean;
  companyName?: string;
  companyCui?: string;
  companyRegCom?: string;
  // Adresă de facturare, dacă diferă de adresa de livrare
  billingSameAsDelivery: boolean;
  billingAddress?: string;
  billingCity?: string;
  billingCounty?: string;
  billingPostalCode?: string;
};

/**
 * Creează tabela de comenzi dacă nu există deja. Se rulează automat la fiecare
 * comandă nouă, ca să nu fie nevoie de o comandă separată de migrare.
 */
async function ensureOrdersTable() {
  const db = sql();
  await db`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      customer_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      county TEXT NOT NULL,
      postal_code TEXT,
      note TEXT,
      payment_method TEXT NOT NULL DEFAULT 'ramburs',
      items JSONB NOT NULL,
      total_lei INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'nouă'
    )
  `;

  // Adăugăm coloanele de facturare pe firmă / adresă de facturare separat,
  // ca să funcționeze și pentru tabela creată deja înainte de acest cod.
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_company BOOLEAN NOT NULL DEFAULT false`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS company_name TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS company_cui TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS company_reg_com TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_same_as_delivery BOOLEAN NOT NULL DEFAULT true`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_address TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_city TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_county TEXT`;
  await db`ALTER TABLE orders ADD COLUMN IF NOT EXISTS billing_postal_code TEXT`;
}

export type Order = {
  id: number;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  county: string;
  postalCode: string | null;
  note: string | null;
  paymentMethod: string;
  items: OrderItemInput[];
  totalLei: number;
  status: string;
  isCompany: boolean;
  companyName: string | null;
  companyCui: string | null;
  companyRegCom: string | null;
  billingSameAsDelivery: boolean;
  billingAddress: string | null;
  billingCity: string | null;
  billingCounty: string | null;
  billingPostalCode: string | null;
};

export const ORDER_STATUSES = ["nouă", "confirmată", "expediată", "finalizată", "anulată"] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export async function createOrder(input: NewOrderInput): Promise<number> {
  if (!input.items || input.items.length === 0) {
    throw new Error("Comanda nu are niciun produs.");
  }

  await ensureOrdersTable();
  const db = sql();
  const totalLei = input.items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

  const rows = (await db`
    INSERT INTO orders (
      customer_name, phone, email, address, city, county, postal_code,
      note, payment_method, items, total_lei,
      is_company, company_name, company_cui, company_reg_com,
      billing_same_as_delivery, billing_address, billing_city, billing_county, billing_postal_code
    ) VALUES (
      ${input.customerName}, ${input.phone}, ${input.email ?? null}, ${input.address},
      ${input.city}, ${input.county}, ${input.postalCode ?? null}, ${input.note ?? null},
      ${input.paymentMethod}, ${JSON.stringify(input.items)}, ${totalLei},
      ${input.isCompany}, ${input.companyName ?? null}, ${input.companyCui ?? null}, ${input.companyRegCom ?? null},
      ${input.billingSameAsDelivery}, ${input.billingAddress ?? null}, ${input.billingCity ?? null},
      ${input.billingCounty ?? null}, ${input.billingPostalCode ?? null}
    )
    RETURNING id
  `) as { id: number }[];

  return rows[0].id;
}

export async function listOrders(): Promise<Order[]> {
  await ensureOrdersTable();
  const db = sql();

  type Row = {
    id: number;
    created_at: string;
    customer_name: string;
    phone: string;
    email: string | null;
    address: string;
    city: string;
    county: string;
    postal_code: string | null;
    note: string | null;
    payment_method: string;
    items: OrderItemInput[];
    total_lei: number;
    status: string;
    is_company: boolean;
    company_name: string | null;
    company_cui: string | null;
    company_reg_com: string | null;
    billing_same_as_delivery: boolean;
    billing_address: string | null;
    billing_city: string | null;
    billing_county: string | null;
    billing_postal_code: string | null;
  };

  const rows = (await db`SELECT * FROM orders ORDER BY created_at DESC`) as Row[];

  return rows.map((r) => ({
    id: r.id,
    createdAt: r.created_at,
    customerName: r.customer_name,
    phone: r.phone,
    email: r.email,
    address: r.address,
    city: r.city,
    county: r.county,
    postalCode: r.postal_code,
    note: r.note,
    paymentMethod: r.payment_method,
    items: r.items,
    totalLei: r.total_lei,
    status: r.status,
    isCompany: r.is_company,
    companyName: r.company_name,
    companyCui: r.company_cui,
    companyRegCom: r.company_reg_com,
    billingSameAsDelivery: r.billing_same_as_delivery,
    billingAddress: r.billing_address,
    billingCity: r.billing_city,
    billingCounty: r.billing_county,
    billingPostalCode: r.billing_postal_code,
  }));
}

export async function updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
  await ensureOrdersTable();
  const db = sql();
  await db`UPDATE orders SET status = ${status} WHERE id = ${id}`;
}
