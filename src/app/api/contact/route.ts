import { NextResponse } from "next/server";
import { createMessage, markMessageEmailed } from "@/lib/messages";
import { sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string; website?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  // Câmp ascuns pentru roboți: un om nu îl completează. Răspundem "ok" fără să salvăm.
  if (body.website) return NextResponse.json({ ok: true });

  const name = body.name?.trim().slice(0, 200);
  const email = body.email?.trim().slice(0, 200);
  const message = body.message?.trim().slice(0, 5000);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Completează numele, e-mailul și mesajul." }, { status: 400 });
  }

  try {
    const id = await createMessage({ name, email, message });

    const sent = await sendEmail({
      subject: `Mesaj nou de pe belvara.ro de la ${name}`,
      text: `Nume: ${name}\nE-mail: ${email}\n\nMesaj:\n${message}`,
      replyTo: email,
    });
    if (sent) await markMessageEmailed(id);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mesaj nesalvat:", err);
    return NextResponse.json(
      { error: "Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne la office@belvara.ro." },
      { status: 500 }
    );
  }
}
