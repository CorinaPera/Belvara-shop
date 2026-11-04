"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/page-hero";
import { JUDETE } from "@/lib/judete";
import { ORDERS_OPEN } from "@/lib/launch";
import Link from "next/link";

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

export default function FinalizareComandaPage() {
  const { items, totalLei, clearCart } = useCart();
  const router = useRouter();

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    county: "",
    postalCode: "",
    note: "",
    paymentMethod: "ramburs" as "ramburs" | "transfer",
    isCompany: false,
    companyName: "",
    companyCui: "",
    companyRegCom: "",
    billingSameAsDelivery: true,
    billingAddress: "",
    billingCity: "",
    billingCounty: "",
    billingPostalCode: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  type TextField =
    | "customerName"
    | "phone"
    | "email"
    | "address"
    | "city"
    | "county"
    | "postalCode"
    | "note"
    | "companyName"
    | "companyCui"
    | "companyRegCom"
    | "billingAddress"
    | "billingCity"
    | "billingCounty"
    | "billingPostalCode";

  const update =
    (field: TextField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // La fel ca update(), dar transformă automat în majuscule — pentru câmpurile
  // care ajung pe eticheta de livrare (nume, adresă, oraș, firmă).
  const updateUpper =
    (field: TextField) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value.toUpperCase() }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/comenzi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map(({ slug, category, name, size, unitPrice, quantity }) => ({
            slug,
            category,
            name,
            size,
            unitPrice,
            quantity,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Comanda nu a putut fi trimisă.");
        setSubmitting(false);
        return;
      }

      clearCart();
      router.push(`/comanda-confirmata?id=${data.id}`);
    } catch {
      setError(
        "Comanda nu a putut fi trimisă. Verifică conexiunea la internet și încearcă din nou."
      );
      setSubmitting(false);
    }
  };

  if (!ORDERS_OPEN) {
    return (
      <>
        <PageHero
          title="Comenzile se deschid în curând"
          subtitle="Magazinul Belvara se pregătește de lansare."
        />
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <div className="max-w-2xl font-sans text-sm text-ink-soft">
            <p>
              Momentan nu putem prelua comenzi online. Dacă vrei să afli când deschidem sau ai o
              întrebare, scrie-ne la office@belvara.ro sau sună-ne la 0743 773 871.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-forest underline underline-offset-4">
              Mergi la Contact
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (items.length === 0) {
    return <PageHero title="Finalizare comandă" subtitle="Coșul tău este gol." />;
  }

  return (
    <>
      <PageHero title="Finalizare comandă" subtitle="Completează datele de livrare." />
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nume complet *">
              <input
                required
                value={form.customerName}
                onChange={updateUpper("customerName")}
                className={inputClass}
              />
            </Field>
            <Field label="Telefon *">
              <input required value={form.phone} onChange={update("phone")} className={inputClass} />
            </Field>
          </div>

          <Field label="Email">
            <input type="email" value={form.email} onChange={update("email")} className={inputClass} />
          </Field>

          <Field label="Adresă *">
            <input
              required
              value={form.address}
              onChange={updateUpper("address")}
              className={inputClass}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Localitate *">
              <input required value={form.city} onChange={updateUpper("city")} className={inputClass} />
            </Field>
            <Field label="Județ *">
              <select
                required
                value={form.county}
                onChange={update("county")}
                className={inputClass}
              >
                <option value="">Alege județul</option>
                {JUDETE.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Cod poștal">
              <input value={form.postalCode} onChange={update("postalCode")} className={inputClass} />
            </Field>
          </div>

          <div className="rounded-lg border border-line bg-white p-4">
            <label className="flex items-center gap-2 font-sans text-sm font-medium text-forest">
              <input
                type="checkbox"
                checked={form.isCompany}
                onChange={(e) => setForm((prev) => ({ ...prev, isCompany: e.target.checked }))}
              />
              Vreau factură pe firmă
            </label>

            {form.isCompany && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label="Denumire firmă *">
                  <input
                    required
                    value={form.companyName}
                    onChange={updateUpper("companyName")}
                    className={inputClass}
                  />
                </Field>
                <Field label="CUI *">
                  <input
                    required
                    value={form.companyCui}
                    onChange={updateUpper("companyCui")}
                    className={inputClass}
                  />
                </Field>
                <Field label="Nr. Reg. Com. (opțional)">
                  <input
                    value={form.companyRegCom}
                    onChange={updateUpper("companyRegCom")}
                    className={inputClass}
                  />
                </Field>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-line bg-white p-4">
            <label className="flex items-center gap-2 font-sans text-sm font-medium text-forest">
              <input
                type="checkbox"
                checked={!form.billingSameAsDelivery}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, billingSameAsDelivery: !e.target.checked }))
                }
              />
              Adresa de facturare este diferită de adresa de livrare
            </label>

            {!form.billingSameAsDelivery && (
              <div className="mt-4 flex flex-col gap-4">
                <Field label="Adresă de facturare *">
                  <input
                    required
                    value={form.billingAddress}
                    onChange={updateUpper("billingAddress")}
                    className={inputClass}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Localitate *">
                    <input
                      required
                      value={form.billingCity}
                      onChange={updateUpper("billingCity")}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Județ *">
                    <select
                      required
                      value={form.billingCounty}
                      onChange={update("billingCounty")}
                      className={inputClass}
                    >
                      <option value="">Alege județul</option>
                      {JUDETE.map((j) => (
                        <option key={j} value={j}>
                          {j}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Cod poștal">
                    <input
                      value={form.billingPostalCode}
                      onChange={update("billingPostalCode")}
                      className={inputClass}
                    />
                  </Field>
                </div>
              </div>
            )}
          </div>

          <Field label="Observații">
            <textarea value={form.note} onChange={update("note")} rows={3} className={inputClass} />
          </Field>

          <fieldset>
            <legend className="font-sans text-sm font-medium text-forest">Metodă de plată</legend>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2 font-sans text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "ramburs"}
                  onChange={() => setForm((prev) => ({ ...prev, paymentMethod: "ramburs" }))}
                />
                Ramburs la curier
              </label>
              <label className="flex items-center gap-2 font-sans text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={form.paymentMethod === "transfer"}
                  onChange={() => setForm((prev) => ({ ...prev, paymentMethod: "transfer" }))}
                />
                Transfer bancar
              </label>
            </div>
          </fieldset>

          {error && <p className="font-sans text-sm text-red-600">{error}</p>}

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="font-display text-xl">
              Total: <span className="text-forest">{formatPrice(totalLei)}</span>
            </p>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Se trimite..." : "Trimite comanda"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
