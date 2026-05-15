import Link from "next/link";
import Image from "next/image";
import type { Experience } from "@/lib/types";
import { formatDate } from "@/lib/content";

interface ExperienceCardProps {
  experience: Experience;
  locale: string;
}

export function ExperienceCard({ experience, locale }: ExperienceCardProps) {
  const { person } = experience;

  const cityAccentMap: Record<string, string> = {
    tokyo: "var(--color-tokyo-accent)",
    kyoto: "var(--color-kyoto-accent)",
    osaka: "var(--color-osaka-accent)",
  };

  return (
    <Link
      href={`/${locale}/experiences/${experience.slug}`}
      className="group block card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden rounded-sm mb-5">
        <Image
          src={experience.imageUrl}
          alt={experience.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover img-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span className="text-caption bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-sm capitalize">
            {experience.category.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Person avatar row */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px]
            font-mono font-medium text-[var(--color-ink)] shrink-0"
          style={{
            background: `linear-gradient(135deg, var(--color-${person.city}-from), var(--color-${person.city}-to))`,
          }}
        >
          {person.avatarInitials}
        </div>
        <div>
          <p className="text-xs text-[var(--color-parchment)] font-medium leading-none mb-1">
            {person.name}
          </p>
          <p className="text-caption text-[var(--color-muted)]">
            {person.role} · {person.yearsInJapan}y in Japan
          </p>
        </div>
        <span
          className="ml-auto text-caption"
          style={{ color: cityAccentMap[experience.city] ?? "var(--color-sand)" }}
        >
          {experience.city.charAt(0).toUpperCase() + experience.city.slice(1)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl font-light text-[var(--color-parchment)]
          group-hover:text-[var(--color-sand)] transition-colors duration-300 mb-2 leading-snug"
      >
        {experience.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed">
        {experience.excerpt}
      </p>

      {/* Footer */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-caption text-[var(--color-muted)]">
          {experience.readingTime} min read
        </span>
        <span className="text-caption text-[var(--color-muted)]">·</span>
        <span className="text-caption text-[var(--color-muted)]">
          {formatDate(experience.date, locale)}
        </span>
      </div>
    </Link>
  );
}
