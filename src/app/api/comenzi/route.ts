import { NextResponse } from "next/server";
import { createOrder, NewOrderInput } from "@/lib/orders";

export async function POST(request: Request) {
  let body: Partial<NewOrderInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (
    !body.customerName?.trim() ||
    !body.phone?.trim() ||
    !body.address?.trim() ||
    !body.city?.trim() ||
    !body.county?.trim() ||
    !body.items?.length
  ) {
    return NextResponse.json(
      { error: "Completează numele, telefonul, adresa, orașul, județul și coșul." },
      { status: 400 }
    );
  }

  if (body.isCompany && (!body.companyName?.trim() || !body.companyCui?.trim())) {
    return NextResponse.json(
      { error: "Pentru factură pe firmă, completează denumirea firmei și CUI-ul." },
      { status: 400 }
    );
  }

  if (
    body.billingSameAsDelivery === false &&
    (!body.billingAddress?.trim() || !body.billingCity?.trim() || !body.billingCounty?.trim())
  ) {
    return NextResponse.json(
      { error: "Completează adresa de facturare (adresă, oraș, județ)." },
      { status: 400 }
    );
  }

  try {
    const id = await createOrder({
      customerName: body.customerName.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || undefined,
      address: body.address.trim(),
      city: body.city.trim(),
      county: body.county.trim(),
      postalCode: body.postalCode?.trim() || undefined,
      note: body.note?.trim() || undefined,
      paymentMethod: body.paymentMethod === "transfer" ? "transfer" : "ramburs",
      items: body.items,
      isCompany: Boolean(body.isCompany),
      companyName: body.isCompany ? body.companyName?.trim() || undefined : undefined,
      companyCui: body.isCompany ? body.companyCui?.trim() || undefined : undefined,
      companyRegCom: body.isCompany ? body.companyRegCom?.trim() || undefined : undefined,
      billingSameAsDelivery: body.billingSameAsDelivery !== false,
      billingAddress: body.billingSameAsDelivery === false ? body.billingAddress?.trim() : undefined,
      billingCity: body.billingSameAsDelivery === false ? body.billingCity?.trim() : undefined,
      billingCounty: body.billingSameAsDelivery === false ? body.billingCounty?.trim() : undefined,
      billingPostalCode:
        body.billingSameAsDelivery === false ? body.billingPostalCode?.trim() || undefined : undefined,
    });

    return NextResponse.json({ id });
  } catch (err) {
    console.error("Eroare la salvarea comenzii:", err);
    return NextResponse.json(
      { error: "Comanda nu a putut fi salvată. Încearcă din nou sau sună-ne direct." },
      { status: 500 }
    );
  }
}
