import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { DailyNudge } from "@/components/ui/DailyNudge";
import { AnchorMoment } from "@/components/ui/AnchorMoment";
import { getTokyoWeather } from "@/lib/weather";
import { tokyoHour, computeAtmosphere } from "@/lib/atmosphere";

interface WorldPortalProps {
  numeral: string;
  title: string;
  tagline: string;
  href: string;
  imageUrl: string;
  enterLabel: string;
  imageFilter: string;
  tint: string;
  accentColor: string;
}

function WorldPortal({
  numeral, title, tagline, href, imageUrl, enterLabel,
  imageFilter, tint, accentColor,
}: WorldPortalProps) {
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
        style={{ filter: imageFilter }}
      />
      {/* World-specific tint */}
      <div className="absolute inset-0" style={{ background: tint }} />
      {/* Bottom gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 95%, transparent), color-mix(in srgb, var(--color-ink) 15%, transparent), transparent)" }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span
          className="font-mono mb-4 block"
          style={{ fontSize: "9px", letterSpacing: "0.3em", color: accentColor, opacity: 0.5 }}
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
          style={{ fontSize: "10px", letterSpacing: "0.18em", color: accentColor, opacity: 0.75 }}
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

  const weather = await getTokyoWeather();
  const hour = tokyoHour();
  const { period } = computeAtmosphere(hour, weather.condition, weather.feeling);

  const portals: WorldPortalProps[] = [
    {
      numeral:     t("worlds.tonight.numeral"),
      title:       t("worlds.tonight.title"),
      tagline:     t("worlds.tonight.tagline"),
      enterLabel:  t("worlds.tonight.enter"),
      href:        `${prefix}/today`,
      imageUrl:    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=1600&q=75",
      imageFilter: "saturate(0.28) brightness(0.22) contrast(1.2)",
      tint:        "rgba(18, 28, 52, 0.28)",
      accentColor: "#7B8DB3",
    },
    {
      numeral:     t("worlds.wander.numeral"),
      title:       t("worlds.wander.title"),
      tagline:     t("worlds.wander.tagline"),
      enterLabel:  t("worlds.wander.enter"),
      href:        `${prefix}/map`,
      imageUrl:    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1600&q=75",
      imageFilter: "saturate(0.48) brightness(0.3) contrast(1.06)",
      tint:        "rgba(14, 32, 22, 0.18)",
      accentColor: "#7A9E7E",
    },
    {
      numeral:     t("worlds.stories.numeral"),
      title:       t("worlds.stories.title"),
      tagline:     t("worlds.stories.tagline"),
      enterLabel:  t("worlds.stories.enter"),
      href:        `${prefix}/moments`,
      imageUrl:    "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1600&q=75",
      imageFilter: "saturate(0.22) brightness(0.24) contrast(1.14) sepia(0.3)",
      tint:        "rgba(48, 32, 12, 0.22)",
      accentColor: "#C9A96E",
    },
    {
      numeral:     t("worlds.living.numeral"),
      title:       t("worlds.living.title"),
      tagline:     t("worlds.living.tagline"),
      enterLabel:  t("worlds.living.enter"),
      href:        `${prefix}/living`,
      imageUrl:    "https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=75",
      imageFilter: "saturate(0.52) brightness(0.34) contrast(1.04)",
      tint:        "rgba(12, 18, 38, 0.14)",
      accentColor: "#A8B5A0",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      {/* ── Intro ─────────────────────────────────── */}
      {/* min-height reserves space so AnchorMoment never pushes portals */}
      <div
        className="relative flex flex-col items-center justify-center pt-40 pb-20 px-6 text-center overflow-hidden"
        style={{ minHeight: "22rem" }}
      >
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

        {/* Anchor moment — appears quietly on second session, absolute so it
            doesn't affect layout flow */}
        <AnchorMoment />
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

      {/* ── Daily nudge — chapter-aware, client-rendered ──── */}
      <div className="py-16 flex justify-center px-6">
        <DailyNudge period={period} condition={weather.condition} />
      </div>
    </div>
  );
}
