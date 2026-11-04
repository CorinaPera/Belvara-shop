"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const inputClass =
  "rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest";

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-sans text-sm font-medium text-forest">
        {label}
      </label>
      {children}
    </div>
  );
}

export function B2BForm() {
  const [form, setForm] = useState({
    company: "",
    contactPerson: "",
    email: "",
    phone: "",
    rooms: "",
    message: "",
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/b2b", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Cererea nu a putut fi trimisă.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Cererea nu a putut fi trimisă. Verifică conexiunea la internet și încearcă din nou.");
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mt-8 rounded-xl border border-line bg-white p-6">
        <p className="font-sans text-sm font-medium text-forest">Cerere trimisă</p>
        <p className="mt-2 font-sans text-sm text-ink-soft">
          Mulțumim! Am primit cererea ta și revenim cu o propunere în cel mai scurt timp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 flex flex-col gap-4 rounded-xl border border-line bg-white p-6"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="company" label="Nume companie *">
          <input
            id="company"
            type="text"
            required
            value={form.company}
            onChange={update("company")}
            className={inputClass}
          />
        </Field>
        <Field id="contact-person" label="Persoană de contact *">
          <input
            id="contact-person"
            type="text"
            required
            value={form.contactPerson}
            onChange={update("contactPerson")}
            className={inputClass}
          />
        </Field>
        <Field id="b2b-email" label="Email *">
          <input
            id="b2b-email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </Field>
        <Field id="b2b-phone" label="Telefon">
          <input
            id="b2b-phone"
            type="tel"
            value={form.phone}
            onChange={update("phone")}
            className={inputClass}
          />
        </Field>
        <Field id="rooms" label="Număr estimat de camere">
          <input
            id="rooms"
            type="number"
            min={1}
            value={form.rooms}
            onChange={update("rooms")}
            className={inputClass}
          />
        </Field>
      </div>

      {/* Câmp-capcană pentru roboți, ascuns oamenilor */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="b2b-website">Website</label>
        <input
          id="b2b-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <Field id="b2b-message" label="Mesaj">
        <textarea
          id="b2b-message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          className={inputClass}
        />
      </Field>

      <p className="font-sans text-xs text-ink-soft">
        Folosim datele doar pentru a-ți răspunde. Detalii în{" "}
        <a href="/politici#confidentialitate" className="text-forest underline underline-offset-4">
          Politica de confidențialitate
        </a>
        .
      </p>

      {error && <p className="font-sans text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="gold" className="self-start" disabled={submitting}>
        {submitting ? "Se trimite..." : "Trimite cererea"}
      </Button>
    </form>
  );
}
