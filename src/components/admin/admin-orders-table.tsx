"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/products";
import { ORDER_STATUSES, type Order, type OrderStatus } from "@/lib/orders";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusColors: Record<string, string> = {
  "nouă": "bg-gold/20 text-forest",
  "confirmată": "bg-forest/10 text-forest",
  "expediată": "bg-forest/10 text-forest",
  "finalizată": "bg-forest text-cream",
  "anulată": "bg-red-100 text-red-700",
};

function OrderRow({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [saving, setSaving] = useState(false);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    const prev = status;
    setStatus(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/comenzi/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setStatus(prev);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="rounded-xl border border-line bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-lg font-medium text-forest">#{order.id}</span>
          <span className="font-sans text-sm text-ink-soft">{formatDate(order.createdAt)}</span>
        </div>
        <div className="flex flex-1 flex-wrap items-center gap-3 sm:justify-end">
          <span className="font-sans text-sm">{order.customerName}</span>
          <span className="font-sans text-sm text-ink-soft">{order.phone}</span>
          <span className="font-display font-medium text-forest">{formatPrice(order.totalLei)}</span>
          <span
            className={`rounded-full px-3 py-1 font-sans text-xs font-medium ${
              statusColors[status] ?? "bg-cream text-ink-soft"
            }`}
          >
            {status}
          </span>
          <i className={`ti ${open ? "ti-chevron-up" : "ti-chevron-down"} text-lg text-ink-soft`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-line p-4">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
                Contact
              </p>
              <p className="mt-1 font-sans text-sm text-ink">{order.customerName}</p>
              <p className="font-sans text-sm text-ink-soft">{order.phone}</p>
              {order.email && <p className="font-sans text-sm text-ink-soft">{order.email}</p>}
            </div>

            <div>
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
                Livrare
              </p>
              <p className="mt-1 font-sans text-sm text-ink">{order.address}</p>
              <p className="font-sans text-sm text-ink-soft">
                {order.city}, {order.county}
                {order.postalCode ? `, ${order.postalCode}` : ""}
              </p>
              <p className="mt-1 font-sans text-sm text-ink-soft">
                Plată: {order.paymentMethod === "transfer" ? "Transfer bancar" : "Ramburs la curier"}
              </p>
            </div>

            {order.isCompany && (
              <div>
                <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
                  Factură pe firmă
                </p>
                <p className="mt-1 font-sans text-sm text-ink">{order.companyName}</p>
                <p className="font-sans text-sm text-ink-soft">CUI: {order.companyCui}</p>
                {order.companyRegCom && (
                  <p className="font-sans text-sm text-ink-soft">Reg. Com.: {order.companyRegCom}</p>
                )}
              </div>
            )}

            {!order.billingSameAsDelivery && (
              <div>
                <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
                  Adresă de facturare
                </p>
                <p className="mt-1 font-sans text-sm text-ink">{order.billingAddress}</p>
                <p className="font-sans text-sm text-ink-soft">
                  {order.billingCity}, {order.billingCounty}
                  {order.billingPostalCode ? `, ${order.billingPostalCode}` : ""}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6">
            <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
              Produse
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2 font-sans text-sm"
                >
                  <span>
                    {item.name} — {item.size} × {item.quantity}
                  </span>
                  <span className="text-ink-soft">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>
          </div>

          {order.note && (
            <div className="mt-4">
              <p className="font-sans text-xs font-medium uppercase tracking-wide text-wood">
                Observații
              </p>
              <p className="mt-1 font-sans text-sm text-ink-soft">{order.note}</p>
            </div>
          )}

          <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
            <label className="font-sans text-sm font-medium text-forest" htmlFor={`status-${order.id}`}>
              Status:
            </label>
            <select
              id={`status-${order.id}`}
              value={status}
              onChange={handleStatusChange}
              disabled={saving}
              className="rounded-lg border border-line bg-white px-3 py-1.5 font-sans text-sm text-ink focus:border-forest focus:outline-none"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="font-sans text-sm text-ink-soft hover:text-forest"
          >
            Deconectare
          </button>
        </div>
        <p className="font-sans text-sm text-ink-soft">Nu ai încă nicio comandă.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-sans text-sm text-ink-soft">
          {orders.length} {orders.length === 1 ? "comandă" : "comenzi"}
        </p>
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="font-sans text-sm text-ink-soft hover:text-forest"
        >
          Deconectare
        </button>
      </div>

      {orders.map((order) => (
        <OrderRow key={order.id} order={order} />
      ))}
    </div>
  );
}
