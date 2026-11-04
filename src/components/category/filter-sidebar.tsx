import { Firmness, formatPrice } from "@/lib/products";

const firmnessLabels: Record<Firmness, string> = {
  moale: "Moale",
  "mediu-moale": "Mediu-moale",
  mediu: "Mediu",
  "mediu-ferm": "Mediu-ferm",
  ferm: "Ferm",
};

type Props = {
  firmnessOptions: Firmness[];
  activeFirmness: Set<Firmness>;
  onToggleFirmness: (value: Firmness) => void;
  sizeOptions: string[];
  activeSizes: Set<string>;
  onToggleSize: (value: string) => void;
  tagOptions: { value: string; label: string }[];
  activeTags: Set<string>;
  onToggleTag: (value: string) => void;
  maxPrice: number;
  priceBounds: { min: number; max: number };
  onMaxPriceChange: (value: number) => void;
};

export function FilterSidebar({
  firmnessOptions,
  activeFirmness,
  onToggleFirmness,
  sizeOptions,
  activeSizes,
  onToggleSize,
  tagOptions,
  activeTags,
  onToggleTag,
  maxPrice,
  priceBounds,
  onMaxPriceChange,
}: Props) {
  return (
    <aside className="flex w-full flex-col gap-8 lg:w-64">
      {firmnessOptions.length > 0 && (
        <div>
          <p className="font-sans text-sm font-medium text-forest">Fermitate</p>
          <div className="mt-3 flex flex-col gap-2">
            {firmnessOptions.map((value) => (
              <label key={value} className="flex items-center gap-2 font-sans text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={activeFirmness.has(value)}
                  onChange={() => onToggleFirmness(value)}
                  className="h-4 w-4 rounded border-line accent-forest"
                />
                {firmnessLabels[value]}
              </label>
            ))}
          </div>
        </div>
      )}

      {sizeOptions.length > 0 && (
        <div>
          <p className="font-sans text-sm font-medium text-forest">Dimensiune</p>
          <div className="mt-3 flex flex-col gap-2">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-2 font-sans text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={activeSizes.has(size)}
                  onChange={() => onToggleSize(size)}
                  className="h-4 w-4 rounded border-line accent-forest"
                />
                {size}
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="font-sans text-sm font-medium text-forest">Preț</p>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          step={10}
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="mt-3 w-full accent-forest"
        />
        <p className="mt-1 font-sans text-sm text-ink-soft">
          până la {formatPrice(maxPrice)}
        </p>
      </div>

      {tagOptions.length > 0 && (
        <div>
          <p className="font-sans text-sm font-medium text-forest">Beneficii</p>
          <div className="mt-3 flex flex-col gap-2">
            {tagOptions.map((tag) => (
              <label key={tag.value} className="flex items-center gap-2 font-sans text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={activeTags.has(tag.value)}
                  onChange={() => onToggleTag(tag.value)}
                  className="h-4 w-4 rounded border-line accent-forest"
                />
                {tag.label}
              </label>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
