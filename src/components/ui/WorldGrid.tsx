import Image from "next/image";
import Link from "next/link";
import type { World } from "@/lib/worlds";

interface WorldGridProps {
  worlds: World[];
  locale: string;
}

function WorldCard({ world, locale }: { world: World; locale: string }) {
  const href = locale === "en" ? world.path : `/${locale}${world.path}`;

  return (
    <Link
      href={href}
      className={`relative overflow-hidden block group ${
        world.size === "lg" ? "lg:col-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className="relative h-[200px] md:h-[260px] overflow-hidden">
        <Image
          src={world.imageUrl}
          alt={world.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: "saturate(0.6) brightness(0.42) contrast(1.06)" }}
        />

        {/* Gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.3) 50%, transparent 100%)",
          }}
        />

        {/* Category tag */}
        <div className="absolute top-4 left-4">
          <span
            className="font-mono uppercase text-[var(--color-sand)]"
            style={{
              fontSize: "8px",
              letterSpacing: "0.14em",
              padding: "3px 8px",
              border: "1px solid rgba(200,184,154,0.2)",
              background: "rgba(10,10,10,0.7)",
              backdropFilter: "blur(8px)",
            }}
          >
            {world.category}
          </span>
        </div>

        {/* Text content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3
            className="font-display font-light text-[var(--color-parchment)] leading-snug mb-1.5
              group-hover:text-[var(--color-sand-light)] transition-colors duration-300"
            style={{ fontSize: world.size === "lg" ? "1.25rem" : "1.05rem" }}
          >
            {world.title}
          </h3>
          <p
            className="text-[var(--color-muted)] leading-snug line-clamp-2"
            style={{ fontSize: "0.75rem" }}
          >
            {world.subtitle}
          </p>
        </div>

        {/* Hover border glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
          style={{ border: "1px solid rgba(200,184,154,0.18)", boxShadow: "inset 0 0 40px rgba(200,184,154,0.04)" }}
        />
      </div>
    </Link>
  );
}

export function WorldGrid({ worlds, locale }: WorldGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-[3px]">
      {worlds.map((world) => (
        <WorldCard key={world.id} world={world} locale={locale} />
      ))}
    </div>
  );
}
