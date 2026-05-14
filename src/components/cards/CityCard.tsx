import Link from "next/link";
import Image from "next/image";
import type { City } from "@/lib/types";

interface CityCardProps {
  city: City;
  locale: string;
  exploreLabel: string;
}

export function CityCard({ city, locale, exploreLabel }: CityCardProps) {
  const gradientClass = `gradient-${city.slug}`;

  return (
    <Link
      href={`/${locale}/cities/${city.slug}`}
      className="group relative block overflow-hidden rounded-sm card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={city.imageUrl}
          alt={city.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover img-cinematic"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

        {/* City-tinted top overlay */}
        <div
          className={`absolute inset-0 opacity-30 z-10 ${gradientClass}`}
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        {/* Japanese name */}
        <p className="font-japanese text-xs text-[var(--color-sand)] opacity-70 mb-1 tracking-wider">
          {city.nameJa}
        </p>

        {/* City name */}
        <h3 className="text-display-md text-[var(--color-parchment)] mb-2">
          {city.name}
        </h3>

        {/* Tagline */}
        <p
          className="text-sm text-[var(--color-sand-light)] italic mb-4 opacity-0
            group-hover:opacity-100 transition-opacity duration-500"
        >
          {city.tagline}
        </p>

        {/* CTA */}
        <div
          className="flex items-center gap-2 text-caption text-[var(--color-sand)]
            translate-y-2 group-hover:translate-y-0 transition-transform duration-400"
        >
          <span>{exploreLabel}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
