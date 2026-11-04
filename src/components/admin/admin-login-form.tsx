"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Parolă greșită.");
        setSubmitting(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Nu am putut verifica parola. Încearcă din nou.");
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex max-w-sm flex-col gap-4">
      <label className="flex flex-col gap-1">
        <span className="font-sans text-sm font-medium text-forest">Parolă administrator</span>
        <input
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-line bg-white px-4 py-2 font-sans text-sm text-ink focus:border-forest focus:outline-none"
        />
      </label>

      {error && <p className="font-sans text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex h-11 items-center justify-center rounded-full bg-gold px-6 font-sans text-sm font-medium text-forest transition-colors hover:bg-gold-hover disabled:pointer-events-none disabled:opacity-50"
      >
        {submitting ? "Se verifică..." : "Intră"}
      </button>
    </form>
  );
}
