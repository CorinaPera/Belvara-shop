/**
 * Trimite un e-mail prin Resend (https://resend.com). Dacă RESEND_API_KEY nu e setat,
 * nu face nimic și returnează false — formularele continuă să salveze în baza de date.
 */
export async function sendEmail(opts: {
  subject: string;
  text: string;
  replyTo?: string;
}): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return false;

  const to = process.env.NOTIFY_EMAIL || "office@belvara.ro";
  const from = process.env.EMAIL_FROM || "Belvara <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: opts.subject,
        text: opts.text,
        ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("Trimiterea e-mailului a eșuat:", res.status, await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error("Trimiterea e-mailului a eșuat:", err);
    return false;
  }
}
