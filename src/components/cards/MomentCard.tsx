import Link from "next/link";
import Image from "next/image";
import type { Moment } from "@/lib/types";
import { formatDate } from "@/lib/content";
import { Tag } from "@/components/ui/Tag";

interface MomentCardProps {
  moment: Moment;
  locale: string;
  readTimeLabel: string;
}

export function MomentCard({ moment, locale, readTimeLabel }: MomentCardProps) {
  return (
    <Link
      href={`/${locale}/moments/${moment.slug}`}
      className="group block card-lift"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm mb-4">
        <Image
          src={moment.imageUrl}
          alt={moment.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover img-cinematic"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-caption capitalize text-[var(--color-sand)]">
          {moment.city}
        </span>
        <span className="text-[var(--color-muted)] text-caption">·</span>
        <span className="text-caption text-[var(--color-muted)]">
          {readTimeLabel.replace("{min}", String(moment.readingTime))}
        </span>
        <span className="text-[var(--color-muted)] text-caption">·</span>
        <span className="text-caption text-[var(--color-muted)]">
          {formatDate(moment.date, locale)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="font-display text-xl font-light text-[var(--color-parchment)]
          group-hover:text-[var(--color-sand)] transition-colors duration-300 mb-2"
      >
        {moment.title}
      </h3>

      {/* Excerpt */}
      <p className="text-sm text-[var(--color-muted)] line-clamp-2 leading-relaxed">
        {moment.excerpt}
      </p>

      {/* Tags */}
      {moment.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {moment.tags.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      )}
    </Link>
  );
}
