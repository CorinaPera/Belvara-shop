import { NextResponse } from "next/server";
import { createB2BRequest, markB2BEmailed } from "@/lib/b2b";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: {
    company?: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    rooms?: string | number;
    message?: string;
    website?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  // Câmp-capcană pentru roboți
  if (body.website) return NextResponse.json({ ok: true });

  const company = body.company?.trim().slice(0, 200);
  const contactPerson = body.contactPerson?.trim().slice(0, 200);
  const email = body.email?.trim().slice(0, 200);
  const phone = body.phone?.trim().slice(0, 50) || undefined;
  const message = body.message?.trim().slice(0, 5000) || undefined;
  const roomsNum = Number(body.rooms);
  const rooms = Number.isFinite(roomsNum) && roomsNum > 0 ? Math.round(roomsNum) : undefined;

  if (!company || !contactPerson || !email) {
    return NextResponse.json(
      { error: "Completează numele companiei, persoana de contact și e-mailul." },
      { status: 400 }
    );
  }

  try {
    const id = await createB2BRequest({ company, contactPerson, email, phone, rooms, message });

    const sent = await sendEmail({
      subject: `Cerere ofertă B2B de la ${company}`,
      text: [
        `Companie: ${company}`,
        `Persoană de contact: ${contactPerson}`,
        `E-mail: ${email}`,
        `Telefon: ${phone ?? "-"}`,
        `Număr estimat de camere: ${rooms ?? "-"}`,
        "",
        "Mesaj:",
        message ?? "-",
      ].join("\n"),
      replyTo: email,
    });
    if (sent) await markB2BEmailed(id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Cerere B2B nesalvată:", err);
    return NextResponse.json(
      { error: "Cererea nu a putut fi trimisă. Încearcă din nou sau scrie-ne la office@belvara.ro." },
      { status: 500 }
    );
  }
}
