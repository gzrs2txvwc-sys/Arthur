interface InsiderTipProps {
  tip: string;
  context: string;
  variant?: "default" | "highlighted";
}

export function InsiderTip({ tip, context, variant = "default" }: InsiderTipProps) {
  return (
    <div
      className={`relative pl-5 py-4 border-l-2 ${
        variant === "highlighted"
          ? "border-[var(--color-sand)] bg-[var(--color-sand)]/5"
          : "border-white/20"
      }`}
    >
      {/* Indicator dot */}
      <div
        className={`absolute -left-[5px] top-5 w-2 h-2 rounded-full ${
          variant === "highlighted"
            ? "bg-[var(--color-sand)]"
            : "bg-white/30"
        }`}
      />

      <p className="text-[var(--color-parchment-warm)] text-sm leading-relaxed mb-2">
        {tip}
      </p>
      <p className="text-caption text-[var(--color-muted)] italic">{context}</p>
    </div>
  );
}
