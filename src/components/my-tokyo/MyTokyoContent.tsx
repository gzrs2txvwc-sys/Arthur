"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getLocaleGroup } from "@/lib/tonightSignals";
import { readRelationshipStore } from "@/lib/tokyoRelationship";
import type { TokyoChapter } from "@/lib/tokyoRelationship";
import {
  getTasteProfile,
  getTasteStatement,
  getTasteLabel,
  getHourLabel,
  type TasteProfile,
  type TokyoTasteId,
} from "@/lib/tokyoTaste";
import {
  getNeighborhoodById,
  getNeighborhoodName,
  getNeighborhoodForWhom,
} from "@/lib/tokyoNeighborhoods";
import type { HourBand } from "@/lib/tokyoMemory";
import { getWeekNote } from "@/lib/tokyoWeeks";
import type { AnchorAnswer } from "@/lib/tokyoRelationship";

// Reads hourBand from behavioral memory store
function readHourBand(): HourBand {
  if (typeof window === "undefined") return "any";
  try {
    const raw = localStorage.getItem("arthur_bm");
    if (!raw) return "any";
    const store = JSON.parse(raw) as { visitHours?: number[] };
    const hours = store.visitHours ?? [];
    if (hours.length === 0) return "any";
    const wrapped = hours.map((h) => (h < 5 ? h + 24 : h));
    const avg = wrapped.reduce((a, b) => a + b, 0) / wrapped.length;
    if (avg >= 23 || avg <= 5) return "midnight";
    if (avg >= 21)             return "late";
    if (avg >= 17)             return "evening";
    if (avg >= 5 && avg <= 11) return "early";
    return "any";
  } catch { return "any"; }
}

interface ProfileState {
  taste: TasteProfile;
  chapter: TokyoChapter;
  sessionCount: number;
  firstSeenAt: number;
  anchorAnswer: AnchorAnswer | null;
  hourBand: HourBand;
  loaded: boolean;
}

const CHAPTER_NOTE: Record<TokyoChapter, { en: string; ja: string; zh: string }> = {
  arriving:  { en: "Just getting started.", ja: "始まったばかり。", zh: "剛剛開始。" },
  adjusting: { en: "You're finding your way.", ja: "慣れてきた。", zh: "你正在摸索。" },
  feeling:   { en: "You're starting to feel at home.", ja: "馴染んできた。", zh: "你開始感到自在。" },
  belonging: { en: "You know this city.", ja: "この街を知っている。", zh: "你了解這個城市。" },
  home:      { en: "This is yours.", ja: "ここはあなたの場所。", zh: "這是你的地方。" },
};

function daysSince(ts: number): number {
  return Math.floor((Date.now() - ts) / 86_400_000);
}

export function MyTokyoContent({ locale }: { locale: string }) {
  const g      = getLocaleGroup(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const [state, setState] = useState<ProfileState>({
    taste: { dominant: null, counts: { quiet: 0, cafe: 0, residential: 0, latenight: 0, creative: 0 }, uniqueNeighborhoods: [], totalUniqueCount: 0 },
    chapter: "arriving",
    sessionCount: 0,
    firstSeenAt: Date.now(),
    anchorAnswer: null,
    hourBand: "any",
    loaded: false,
  });

  useEffect(() => {
    const rel      = readRelationshipStore();
    const taste    = getTasteProfile();
    const hourBand = readHourBand();
    setState({
      taste,
      chapter:      rel.chapter ?? "arriving",
      sessionCount: rel.sessionCount ?? 0,
      firstSeenAt:  rel.firstSeenAt ?? Date.now(),
      anchorAnswer: rel.anchorAnswer ?? null,
      hourBand,
      loaded: true,
    });
  }, []);

  const { taste, chapter, firstSeenAt, anchorAnswer, hourBand, loaded } = state;

  const heading =
    g === "ja" ? "あなたの東京"
    : g === "zh" ? "你的東京"
    : "Your Tokyo";

  const backLabel = g === "ja" ? "← 戻る" : g === "zh" ? "← 返回" : "← Back";

  const identityStatement =
    (taste.dominant && taste.totalUniqueCount >= 2)
      ? getTasteStatement(taste.dominant, g)
      : null;

  const tasteLabel =
    taste.dominant && taste.totalUniqueCount >= 2
      ? getTasteLabel(taste.dominant as TokyoTasteId, g)
      : null;

  const hourLabel  = getHourLabel(hourBand, g);
  const chapterNote = CHAPTER_NOTE[chapter];
  const chapterStr = g === "ja" ? chapterNote.ja : g === "zh" ? chapterNote.zh : chapterNote.en;

  const days = daysSince(firstSeenAt);
  const weekNote = loaded ? getWeekNote(anchorAnswer, firstSeenAt, g) : null;

  const privacyNote =
    g === "ja" ? "ここにあるものは、あなたのブラウザにだけある。"
    : g === "zh" ? "這裡的一切只存在於你的瀏覽器中。"
    : "This lives in your browser. It's only yours.";

  const emptyLabel =
    g === "ja" ? "街を探索すると、ここに現れる。"
    : g === "zh" ? "探索街區，它們會出現在這裡。"
    : "Explore neighborhoods and they'll appear here.";

  // Visited neighborhoods — sorted by visit count, max 6 shown
  const visitedNeighborhoods = taste.uniqueNeighborhoods.slice(0, 6).map((slug) => {
    const n = getNeighborhoodById(slug);
    if (!n) return null;
    return {
      slug,
      name:    getNeighborhoodName(n, g),
      forWhom: getNeighborhoodForWhom(n, g),
    };
  }).filter(Boolean);

  const neighborhoodsHeading =
    g === "ja" ? "見つけた街"
    : g === "zh" ? "你找到的地方"
    : "Neighborhoods you've found";

  const daysLabel =
    days <= 0 ? null
    : days === 1
      ? (g === "ja" ? "今日から。" : g === "zh" ? "從今天開始。" : "Started today.")
      : (g === "ja" ? `${days} 日間。` : g === "zh" ? `${days} 天了。` : `${days} days in.`);

  return (
    <div className="max-w-xl mx-auto px-6 md:px-8 pt-20 pb-32">

      {/* Back */}
      <div className="mb-12">
        <Link
          href={`${prefix}/`}
          className="font-mono transition-opacity hover:opacity-100"
          style={{ fontSize: "9px", letterSpacing: "0.18em", color: "rgba(200,184,154,0.45)" }}
        >
          {backLabel}
        </Link>
      </div>

      {/* Heading */}
      <div className="mb-10">
        {tasteLabel && (
          <p
            className="font-mono mb-4"
            style={{
              fontSize: "9px",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "rgba(210,152,38,0.75)",
            }}
          >
            {tasteLabel}
          </p>
        )}

        <h1
          className="font-display font-light leading-tight mb-4"
          style={{ fontSize: "clamp(2.2rem, 6vw, 3.2rem)", color: "var(--color-parchment)" }}
        >
          {heading}
        </h1>

        {/* Identity or chapter statement */}
        {loaded && (
          <p
            style={{
              fontSize: "15px",
              color: "rgba(220,205,182,0.72)",
              lineHeight: 1.8,
              fontStyle: "italic",
            }}
          >
            {identityStatement ?? chapterStr}
          </p>
        )}
      </div>

      {/* Seam */}
      <div className="mb-12" style={{ height: "1px", background: "linear-gradient(to right, rgba(200,148,40,0.22), transparent)" }} />

      {/* Neighborhoods */}
      <div className="mb-14">
        <p
          className="font-mono mb-8"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "rgba(210,152,38,0.60)", textTransform: "uppercase" }}
        >
          {neighborhoodsHeading}
        </p>

        {visitedNeighborhoods.length === 0 ? (
          <p style={{ fontSize: "13px", color: "rgba(200,184,154,0.40)", fontStyle: "italic" }}>
            {emptyLabel}
          </p>
        ) : (
          <div>
            {visitedNeighborhoods.map((n) => n && (
              <Link
                key={n.slug}
                href={`${prefix}/neighborhoods/${n.slug}`}
                className="block group"
              >
                <div
                  className="py-5"
                  style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}
                >
                  <p
                    className="font-display font-light mb-1 group-hover:opacity-90 transition-opacity"
                    style={{ fontSize: "16px", color: "rgba(242,232,215,0.92)" }}
                  >
                    {n.name}
                  </p>
                  <p
                    style={{ fontSize: "12px", color: "rgba(200,184,154,0.50)", fontStyle: "italic" }}
                  >
                    {n.forWhom}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Seam */}
      <div className="mb-12" style={{ height: "1px", background: "rgba(200,184,154,0.06)" }} />

      {/* When + how long */}
      <div className="mb-14 flex flex-col gap-5">
        <div>
          <p style={{ fontSize: "13px", color: "rgba(200,184,154,0.55)", lineHeight: 1.7 }}>
            {hourLabel}
          </p>
        </div>
        {daysLabel && (
          <p style={{ fontSize: "13px", color: "rgba(200,184,154,0.40)", lineHeight: 1.7 }}>
            {daysLabel}
          </p>
        )}
      </div>

      {/* Week note */}
      {weekNote && (
        <>
          <div className="mb-10" style={{ height: "1px", background: "rgba(200,184,154,0.04)" }} />
          <p
            className="font-mono mb-14"
            style={{ fontSize: "9px", letterSpacing: "0.14em", color: "rgba(200,184,154,0.30)", lineHeight: 1.7 }}
          >
            {weekNote}
          </p>
        </>
      )}

      {/* Seam */}
      <div className="mb-10" style={{ height: "1px", background: "rgba(200,184,154,0.04)" }} />

      {/* Privacy */}
      <p
        className="font-mono"
        style={{ fontSize: "9px", letterSpacing: "0.12em", color: "rgba(200,184,154,0.22)" }}
      >
        {privacyNote}
      </p>
    </div>
  );
}
