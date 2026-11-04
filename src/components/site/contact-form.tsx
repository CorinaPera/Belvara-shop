"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const inputClass =
  "rounded-lg border border-line bg-cream px-3 py-2 font-sans text-sm text-ink outline-none focus:border-forest";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Mesajul nu a putut fi trimis.");
        setSubmitting(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Mesajul nu a putut fi trimis. Verifică conexiunea la internet și încearcă din nou.");
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-xl border border-line bg-white p-6">
        <p className="font-sans text-sm font-medium text-forest">Mesaj trimis</p>
        <p className="mt-2 font-sans text-sm text-ink-soft">
          Mulțumim! Am primit mesajul tău și îți răspundem în cel mai scurt timp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="font-sans text-sm font-medium text-forest">
            Nume *
          </label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-sans text-sm font-medium text-forest">
            Email *
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            className={inputClass}
          />
        </div>
      </div>

      {/* Câmp-capcană pentru roboți, ascuns oamenilor */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={update("website")}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="font-sans text-sm font-medium text-forest">
          Mesaj *
        </label>
        <textarea
          id="message"
          rows={5}
          required
          value={form.message}
          onChange={update("message")}
          className={inputClass}
        />
      </div>

      <p className="font-sans text-xs text-ink-soft">
        Folosim datele doar pentru a-ți răspunde. Detalii în{" "}
        <a href="/politici#confidentialitate" className="text-forest underline underline-offset-4">
          Politica de confidențialitate
        </a>
        .
      </p>

      {error && <p className="font-sans text-sm text-red-600">{error}</p>}

      <Button type="submit" variant="gold" className="self-start" disabled={submitting}>
        {submitting ? "Se trimite..." : "Trimite mesajul"}
      </Button>
    </form>
  );
}
