import Link from "next/link";
import { cookies } from "next/headers";
import { PageHero } from "@/components/site/page-hero";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { AdminOrdersTable } from "@/components/admin/admin-orders-table";
import { listOrders } from "@/lib/orders";

export default async function AdminComenziPage() {
  const store = await cookies();
  const adminPassword = process.env.ADMIN_PASSWORD;
  const isAuthed = Boolean(adminPassword) && store.get("belvara_admin")?.value === adminPassword;

  if (!isAuthed) {
    return (
      <>
        <PageHero
          title="Administrare comenzi"
          subtitle="Introdu parola pentru a vedea comenzile primite."
        />
        <section className="mx-auto w-full max-w-3xl px-6 py-16">
          <AdminLoginForm />
        </section>
      </>
    );
  }

  const orders = await listOrders();

  return (
    <>
      <PageHero title="Administrare comenzi" subtitle="Toate comenzile primite pe site." />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <p className="mb-6 font-sans text-sm">
          <Link href="/admin/retrageri" className="text-forest underline underline-offset-4">
            Vezi cererile de retragere
          </Link>
          {" · "}
          <Link href="/admin/mesaje" className="text-forest underline underline-offset-4">
            Vezi mesajele de contact
          </Link>
          {" · "}
          <Link href="/admin/oferte-b2b" className="text-forest underline underline-offset-4">
            Vezi cererile B2B
          </Link>
        </p>
        <AdminOrdersTable orders={orders} />
      </section>
    </>
  );
}
