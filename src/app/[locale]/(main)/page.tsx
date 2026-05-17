import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FilmGrain } from "@/components/ui/FilmGrain";

interface WorldPortalProps {
  numeral: string;
  title: string;
  tagline: string;
  href: string;
  imageUrl: string;
  enterLabel: string;
}

function WorldPortal({ numeral, title, tagline, href, imageUrl, enterLabel }: WorldPortalProps) {
  return (
    <Link
      href={href}
      className="relative overflow-hidden group block"
      style={{ minHeight: "clamp(280px, 44vh, 520px)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{ filter: "saturate(0.4) brightness(0.28) contrast(1.1)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/95 via-[#0a0a0a]/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span
          className="font-mono mb-4 block"
          style={{ fontSize: "9px", letterSpacing: "0.3em", color: "var(--color-muted)", opacity: 0.4 }}
        >
          {numeral}
        </span>
        <h2
          className="font-display font-light leading-tight mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--color-parchment)" }}
        >
          {title}
        </h2>
        <p
          className="text-sm leading-relaxed mb-5 max-w-xs"
          style={{ color: "var(--color-muted)", opacity: 0.65 }}
        >
          {tagline}
        </p>
        <span
          className="font-mono flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
          style={{ fontSize: "10px", letterSpacing: "0.18em", color: "var(--color-sand)", opacity: 0.7 }}
        >
          {enterLabel} <span>→</span>
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const prefix = locale === "en" ? "" : `/${locale}`;

  const portals: WorldPortalProps[] = [
    {
      numeral:    t("worlds.tonight.numeral"),
      title:      t("worlds.tonight.title"),
      tagline:    t("worlds.tonight.tagline"),
      enterLabel: t("worlds.tonight.enter"),
      href:       `${prefix}/today`,
      imageUrl:   "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=75",
    },
    {
      numeral:    t("worlds.wander.numeral"),
      title:      t("worlds.wander.title"),
      tagline:    t("worlds.wander.tagline"),
      enterLabel: t("worlds.wander.enter"),
      href:       `${prefix}/map`,
      imageUrl:   "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=75",
    },
    {
      numeral:    t("worlds.stories.numeral"),
      title:      t("worlds.stories.title"),
      tagline:    t("worlds.stories.tagline"),
      enterLabel: t("worlds.stories.enter"),
      href:       `${prefix}/moments`,
      imageUrl:   "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75",
    },
    {
      numeral:    t("worlds.living.numeral"),
      title:      t("worlds.living.title"),
      tagline:    t("worlds.living.tagline"),
      enterLabel: t("worlds.living.enter"),
      href:       `${prefix}/living`,
      imageUrl:   "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=75",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      {/* ── Intro ─────────────────────────────────── */}
      <div className="relative flex flex-col items-center justify-center pt-40 pb-16 px-6 text-center overflow-hidden">
        <span
          className="font-display font-light select-none pointer-events-none absolute"
          style={{
            fontSize: "clamp(10rem, 28vw, 22rem)",
            color: "var(--color-sand)",
            opacity: 0.04,
            lineHeight: 1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -40%)",
          }}
          aria-hidden="true"
        >
          間
        </span>
        <p
          className="relative text-sm leading-loose whitespace-pre-line max-w-[22rem]"
          style={{ color: "var(--color-muted)", opacity: 0.55, fontStyle: "italic" }}
        >
          {t("tagline")}
        </p>
      </div>

      {/* ── World Portals ─────────────────────────── */}
      <div className="flex flex-col gap-px">
        {/* Row 1: Tonight (wide) | Wander (narrow) */}
        <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-px">
          <WorldPortal {...portals[0]} />
          <WorldPortal {...portals[1]} />
        </div>
        {/* Row 2: Stories (narrow) | Living (wide) */}
        <div className="grid grid-cols-1 md:grid-cols-[42fr_58fr] gap-px">
          <WorldPortal {...portals[2]} />
          <WorldPortal {...portals[3]} />
        </div>
      </div>
    </div>
  );
}
