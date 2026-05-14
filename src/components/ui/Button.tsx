import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "ghost" | "outline" | "solid";
  className?: string;
}

export function Button({
  href,
  onClick,
  children,
  variant = "ghost",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 text-caption transition-all duration-300 cursor-pointer";
  const variants = {
    ghost:
      "text-[var(--color-sand)] hover:text-[var(--color-parchment)] group",
    outline:
      "border border-[var(--color-sand)]/40 px-5 py-2.5 text-[var(--color-parchment)] hover:border-[var(--color-sand)] hover:bg-[var(--color-sand)]/5",
    solid:
      "bg-[var(--color-sand)] text-[var(--color-ink)] px-5 py-2.5 hover:bg-[var(--color-parchment)]",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {variant === "ghost" && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
