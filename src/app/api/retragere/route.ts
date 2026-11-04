import { NextResponse } from "next/server";
import { createWithdrawal, NewWithdrawalInput } from "@/lib/withdrawals";

export async function POST(request: Request) {
  let body: Partial<NewWithdrawalInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (!body.orderNumber?.trim() || !body.customerName?.trim() || !body.phone?.trim()) {
    return NextResponse.json(
      { error: "Completează numărul comenzii, numele și telefonul." },
      { status: 400 }
    );
  }

  try {
    const { id, createdAt } = await createWithdrawal({
      orderNumber: body.orderNumber.trim().slice(0, 50),
      customerName: body.customerName.trim().slice(0, 200),
      phone: body.phone.trim().slice(0, 50),
      email: body.email?.trim().slice(0, 200) || undefined,
      products: body.products?.trim().slice(0, 2000) || undefined,
      reason: body.reason?.trim().slice(0, 2000) || undefined,
    });
    return NextResponse.json({ id, createdAt });
  } catch (err) {
    console.error("Retragere nesalvată:", err);
    return NextResponse.json(
      {
        error:
          "Cererea nu a putut fi înregistrată. Încearcă din nou sau scrie-ne la office@belvara.ro.",
      },
      { status: 500 }
    );
  }
}
