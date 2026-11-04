import Link from "next/link";
import { cookies } from "next/headers";
import { PageHero } from "@/components/site/page-hero";
import { listMessages } from "@/lib/messages";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminMesajePage() {
  const store = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAuthed = Boolean(adminPassword) && store.get("belvara_admin")?.value === adminPassword;

  if (!isAuthed) {
    return (
      <>
        <PageHero title="Administrare mesaje" subtitle="Autentifică-te mai întâi din pagina de comenzi." />
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <Link href="/admin/comenzi" className="font-sans text-sm text-forest underline underline-offset-4">
            Mergi la autentificare
          </Link>
        </section>
      </>
    );
  }

  const items = await listMessages();

  return (
    <>
      <PageHero title="Administrare mesaje" subtitle="Mesajele primite prin formularul de contact." />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-sans text-sm text-ink-soft">
            {items.length} {items.length === 1 ? "mesaj" : "mesaje"}
          </p>
          <Link href="/admin/comenzi" className="font-sans text-sm text-forest underline underline-offset-4">
            Înapoi la comenzi
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="font-sans text-sm text-ink-soft">Nu ai niciun mesaj.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((m) => (
              <div key={m.id} className="rounded-xl border border-line bg-white p-4 font-sans text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-lg font-medium text-forest">
                    #{m.id} · {m.name}
                  </span>
                  <span className="text-ink-soft">
                    {formatDate(m.createdAt)} · {m.emailSent ? "trimis pe e-mail" : "doar în baza de date"}
                  </span>
                </div>
                <p className="mt-2 text-ink-soft">
                  <a href={`mailto:${m.email}`} className="text-forest underline underline-offset-4">
                    {m.email}
                  </a>
                </p>
                <p className="mt-3 whitespace-pre-wrap text-ink">{m.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
