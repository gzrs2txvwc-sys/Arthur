interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-block text-[10px] tracking-[0.14em] uppercase font-mono
        px-2.5 py-1 rounded-sm border border-white/10 text-[var(--color-muted)]
        bg-white/[0.03] ${className}`}
    >
      {children}
    </span>
  );
}
