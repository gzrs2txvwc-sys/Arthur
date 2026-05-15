import Link from "next/link";
import type { LifeCategory } from "@/lib/types";

const iconMap: Record<string, string> = {
  "briefcase": "💼",
  "graduation-cap": "🎓",
  "languages": "🗣",
  "utensils": "🍜",
  "home": "🏠",
  "sun": "☀️",
  "map-pin": "📍",
  "compass": "🧭",
};

interface CategoryGridProps {
  categories: LifeCategory[];
  locale: string;
}

export function CategoryGrid({ categories, locale }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/${locale}/living#${cat.slug}`}
          className="group block p-5 border border-white/8 bg-white/[0.02]
            hover:border-[var(--color-sand)]/30 hover:bg-white/[0.05]
            transition-all duration-300 rounded-sm"
        >
          <span className="text-2xl mb-3 block">{iconMap[cat.icon] ?? "✦"}</span>
          <p className="text-sm font-medium text-[var(--color-parchment)] mb-1 leading-snug">
            {cat.label}
          </p>
          <p className="text-caption text-[var(--color-muted)] leading-relaxed line-clamp-2">
            {cat.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
