"use client";

import { useState } from "react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col divide-y divide-line rounded-xl border border-line bg-white">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-sans text-sm font-medium text-forest">{item.question}</span>
              <i className={`ti ${isOpen ? "ti-minus" : "ti-plus"} text-wood`} />
            </button>
            {isOpen && (
              <p className="px-5 pb-4 font-sans text-sm text-ink-soft">{item.answer}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
