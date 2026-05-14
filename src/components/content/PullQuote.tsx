interface PullQuoteProps {
  children: React.ReactNode;
}

export function PullQuote({ children }: PullQuoteProps) {
  return (
    <blockquote
      className="relative my-12 pl-8 border-l-2 border-[var(--color-sand)]"
    >
      <p className="font-display text-2xl md:text-3xl font-light italic text-[var(--color-parchment)] leading-snug">
        {children}
      </p>
    </blockquote>
  );
}
