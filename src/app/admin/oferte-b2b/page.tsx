import Link from "next/link";
import { cookies } from "next/headers";
import { PageHero } from "@/components/site/page-hero";
import { listB2BRequests } from "@/lib/b2b";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminOferteB2BPage() {
  const store = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAuthed = Boolean(adminPassword) && store.get("belvara_admin")?.value === adminPassword;

  if (!isAuthed) {
    return (
      <>
        <PageHero title="Administrare oferte B2B" subtitle="Autentifică-te mai întâi din pagina de comenzi." />
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <Link href="/admin/comenzi" className="font-sans text-sm text-forest underline underline-offset-4">
            Mergi la autentificare
          </Link>
        </section>
      </>
    );
  }

  const items = await listB2BRequests();

  return (
    <>
      <PageHero title="Administrare oferte B2B" subtitle="Cererile de ofertă primite de la hoteluri și pensiuni." />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="mb-6 flex items-center justify-between">
          <p className="font-sans text-sm text-ink-soft">
            {items.length} {items.length === 1 ? "cerere" : "cereri"}
          </p>
          <Link href="/admin/comenzi" className="font-sans text-sm text-forest underline underline-offset-4">
            Înapoi la comenzi
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="font-sans text-sm text-ink-soft">Nu ai nicio cerere B2B.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((r) => (
              <div key={r.id} className="rounded-xl border border-line bg-white p-4 font-sans text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-lg font-medium text-forest">
                    #{r.id} · {r.company}
                  </span>
                  <span className="text-ink-soft">
                    {formatDate(r.createdAt)} · {r.emailSent ? "trimis pe e-mail" : "doar în baza de date"}
                  </span>
                </div>
                <dl className="mt-3 grid gap-1 text-ink-soft sm:grid-cols-[10rem_1fr]">
                  <dt>Persoană de contact</dt>
                  <dd className="text-ink">{r.contactPerson}</dd>
                  <dt>Email</dt>
                  <dd className="text-ink">
                    <a href={`mailto:${r.email}`} className="text-forest underline underline-offset-4">
                      {r.email}
                    </a>
                  </dd>
                  <dt>Telefon</dt>
                  <dd className="text-ink">{r.phone ?? "—"}</dd>
                  <dt>Camere</dt>
                  <dd className="text-ink">{r.rooms ?? "—"}</dd>
                  <dt>Mesaj</dt>
                  <dd className="whitespace-pre-wrap text-ink">{r.message ?? "—"}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
