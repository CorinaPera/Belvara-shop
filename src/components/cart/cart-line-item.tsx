"use client";

import { Minus, Plus, X } from "lucide-react";
import type { CartLine } from "@/lib/types";
import { useCartStore } from "@/lib/store/cart-store";
import { formatRon } from "@/lib/format";

export function CartLineItem({ line }: { line: CartLine }) {
  const incrementLine = useCartStore((s) => s.incrementLine);
  const decrementLine = useCartStore((s) => s.decrementLine);
  const removeLine = useCartStore((s) => s.removeLine);

  return (
    <li className="flex gap-4 py-4 border-b border-primary/10">
      <div
        className="wood-slat-placeholder w-20 h-20 rounded-md flex-shrink-0"
        role="img"
        aria-label={line.imageAlt}
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-display text-[15px] leading-tight text-primary">
              {line.productName}
            </p>
            <p className="text-sm text-primary/60 mt-0.5">{line.variantLabel}</p>
          </div>
          <button
            type="button"
            onClick={() => removeLine(line.lineId)}
            aria-label={`Elimină ${line.productName} din coș`}
            className="text-primary/40 hover:text-primary transition-colors flex-shrink-0"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-primary/15 rounded-full">
            <button
              type="button"
              onClick={() => decrementLine(line.lineId)}
              aria-label="Scade cantitatea"
              className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <Minus size={13} />
            </button>
            <span className="w-6 text-center text-sm tabular-nums" aria-live="polite">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => incrementLine(line.lineId)}
              aria-label="Crește cantitatea"
              className="w-7 h-7 flex items-center justify-center text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              <Plus size={13} />
            </button>
          </div>

          <p className="font-medium text-sm tabular-nums">
            {formatRon(line.priceRon * line.quantity)}
          </p>
        </div>
      </div>
    </li>
  );
}
