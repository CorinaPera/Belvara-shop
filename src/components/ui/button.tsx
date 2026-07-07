import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/**
 * "gold" is the only variant allowed for primary purchase actions
 * (e.g. "Adaugă în coș") — per brand rule it must always render solid,
 * never white/transparent, so it's visible without needing hover.
 */
type Variant = "gold" | "forest" | "outline" | "ghost";
type Size = "default" | "lg" | "icon";

const variantClasses: Record<Variant, string> = {
  gold: "bg-gold text-forest hover:bg-gold-hover",
  forest: "bg-forest text-cream hover:bg-forest-secondary",
  outline: "border border-line text-forest bg-transparent hover:bg-forest/5",
  ghost: "text-forest bg-transparent hover:bg-forest/5",
};

const sizeClasses: Record<Size, string> = {
  default: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base w-full",
  icon: "h-10 w-10",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "gold",
  size = "default",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
