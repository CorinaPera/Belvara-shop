import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { updateOrderStatus, ORDER_STATUSES, type OrderStatus } from "@/lib/orders";

async function isAuthed() {
  const store = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;
  return Boolean(adminPassword) && store.get("belvara_admin")?.value === adminPassword;
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: "Neautorizat." }, { status: 401 });
  }

  const { id } = await params;
  const orderId = Number(id);
  if (!Number.isInteger(orderId)) {
    return NextResponse.json({ error: "ID comandă invalid." }, { status: 400 });
  }

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (!body.status || !ORDER_STATUSES.includes(body.status as OrderStatus)) {
    return NextResponse.json({ error: "Status invalid." }, { status: 400 });
  }

  await updateOrderStatus(orderId, body.status as OrderStatus);
  return NextResponse.json({ ok: true });
}
