import Link from "next/link";
import { cookies } from "next/headers";
import { PageHero } from "@/components/site/page-hero";
import { listWithdrawals } from "@/lib/withdrawals";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminRetragerePage() {
  const store = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAuthed = Boolean(adminPassword) && store.get("belvara_admin")?.value === adminPassword;

  if (!isAuthed) {
    return (
      <>
        <PageHero title="Administrare retrageri" subtitle="Autentifică-te mai întâi din pagina de comenzi." />
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <Link href="/admin/comenzi" className="font-sans text-sm text-forest underline underline-offset-4">
            Mergi la autentificare
          </Link>
        </section>
      </>
    );
  }

  const items = await listWithdrawals();

  return (
    <>
      <PageHero title="Administrare retrageri" subtitle="Cererile de retragere din contract primite pe site." />
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
          <p className="font-sans text-sm text-ink-soft">Nu ai nicio cerere de retragere.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {items.map((w) => (
              <div key={w.id} className="rounded-xl border border-line bg-white p-4 font-sans text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-display text-lg font-medium text-forest">
                    Cerere #{w.id} · Comanda #{w.orderNumber}
                  </span>
                  <span className="text-ink-soft">{formatDate(w.createdAt)}</span>
                </div>
                <dl className="mt-3 grid gap-1 text-ink-soft sm:grid-cols-[9rem_1fr]">
                  <dt>Nume</dt>
                  <dd className="text-ink">{w.customerName}</dd>
                  <dt>Telefon</dt>
                  <dd className="text-ink">{w.phone}</dd>
                  <dt>Email</dt>
                  <dd className="text-ink">{w.email ?? "—"}</dd>
                  <dt>Produse</dt>
                  <dd className="text-ink">{w.products ?? "Toată comanda"}</dd>
                  <dt>Motiv</dt>
                  <dd className="text-ink">{w.reason ?? "—"}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
