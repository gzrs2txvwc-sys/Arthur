"use client";

interface FilmGrainProps {
  opacity?: number;
  className?: string;
}

export function FilmGrain({ opacity = 0.055, className = "" }: FilmGrainProps) {
  return (
    <div
      className={`grain-overlay absolute inset-0 pointer-events-none select-none ${className}`}
      style={{ "--grain-opacity": opacity } as React.CSSProperties}
    />
  );
}
