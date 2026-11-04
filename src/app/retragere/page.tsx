"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";

const inputClass =
  "w-full rounded-lg border border-line bg-white px-4 py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-sans text-sm font-medium text-forest">{label}</span>
      {children}
    </label>
  );
}

type Confirmation = {
  id: number;
  createdAt: string;
  orderNumber: string;
  customerName: string;
  products: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RetragerePage() {
  const [form, setForm] = useState({
    orderNumber: "",
    customerName: "",
    phone: "",
    email: "",
    products: "",
    reason: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/retragere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          orderNumber: form.orderNumber.replace("#", ""),
          customerName: form.customerName.toUpperCase(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Cererea nu a putut fi trimisă.");
        setSubmitting(false);
        return;
      }
      setConfirmation({
        id: data.id,
        createdAt: data.createdAt,
        orderNumber: form.orderNumber.replace("#", ""),
        customerName: form.customerName.toUpperCase(),
        products: form.products,
      });
    } catch {
      setError("Cererea nu a putut fi trimisă. Verifică conexiunea la internet și încearcă din nou.");
      setSubmitting(false);
    }
  };

  if (confirmation) {
    return (
      <>
        <PageHero
          title="Retragere înregistrată"
          subtitle="Am primit declarația ta de retragere din contract."
        />
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-2xl rounded-xl border border-line bg-white p-6">
            <p className="font-sans text-sm font-medium text-forest">Confirmare de primire</p>
            <dl className="mt-4 grid gap-2 font-sans text-sm text-ink-soft sm:grid-cols-[10rem_1fr]">
              <dt>Număr cerere</dt>
              <dd className="text-ink">#{confirmation.id}</dd>
              <dt>Data și ora</dt>
              <dd className="text-ink">{formatDate(confirmation.createdAt)}</dd>
              <dt>Comanda</dt>
              <dd className="text-ink">#{confirmation.orderNumber}</dd>
              <dt>Nume</dt>
              <dd className="text-ink">{confirmation.customerName}</dd>
              <dt>Produse</dt>
              <dd className="text-ink">{confirmation.products || "Toate produsele din comandă"}</dd>
            </dl>
            <p className="mt-6 font-sans text-sm text-ink-soft">
              Păstrează această confirmare (o poți printa sau salva ca PDF din browser). Te vom
              contacta pentru detaliile returnării produselor. Termenul pentru rambursare este de
              14 zile de la data acestei cereri, conform Politicii de retur.
            </p>
            <div className="mt-6 print:hidden">
              <Button type="button" onClick={() => window.print()}>
                Printează confirmarea
              </Button>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Retragere din contract"
        subtitle="Ai 14 zile de la primirea produselor să te retragi din comandă, fără să ne spui motivul."
      />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Număr comandă *">
              <input
                required
                value={form.orderNumber}
                onChange={update("orderNumber")}
                placeholder="ex. 12"
                className={inputClass}
              />
            </Field>
            <Field label="Nume complet *">
              <input
                required
                value={form.customerName}
                onChange={update("customerName")}
                className={inputClass}
              />
            </Field>
            <Field label="Telefon *">
              <input required value={form.phone} onChange={update("phone")} className={inputClass} />
            </Field>
            <Field label="Email">
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                className={inputClass}
              />
            </Field>
          </div>

          <Field label="Produsele pentru care te retragi (lasă gol dacă te retragi din toată comanda)">
            <textarea
              value={form.products}
              onChange={update("products")}
              rows={2}
              className={inputClass}
            />
          </Field>

          <Field label="Motiv (opțional)">
            <textarea
              value={form.reason}
              onChange={update("reason")}
              rows={2}
              className={inputClass}
            />
          </Field>

          <p className="font-sans text-sm text-ink-soft">
            Prin apăsarea butonului declari că te retragi din contractul de vânzare pentru produsele
            indicate. Detalii despre returnare și rambursare găsești în{" "}
            <a href="/politici#retur" className="text-forest underline underline-offset-4">
              Politica de retur
            </a>
            .
          </p>

          {error && <p className="font-sans text-sm text-red-600">{error}</p>}

          <div className="mt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Se trimite..." : "Confirmă retragerea din contract"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
