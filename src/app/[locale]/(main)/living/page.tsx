import { getTranslations } from "next-intl/server";
import { FilmGrain } from "@/components/ui/FilmGrain";
import { WorldBridge } from "@/components/ui/WorldBridge";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "living" });
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

interface Trace {
  id: string;
  timestamp: string;
  title: string;
  body: string;
  accentColor: string;
  wide?: boolean;
}

const traces: Trace[] = [
  {
    id: "konbini-ritual",
    timestamp: "23:12 · Shinjuku",
    title: "The Konbini Run",
    body: "You learn your local konbini the way you learn your apartment — which shelves have shifted, which onigiri is always left at 11pm, the face of the person at the register who never says more than necessary. It becomes an anchor. You stop in when you don't need anything.",
    accentColor: "#A8B5A0",
  },
  {
    id: "solo-dinner",
    timestamp: "19:30 · Shimokitazawa",
    title: "Solo Dinner",
    body: "Eating alone in Japan is not lonely. The counter seats face the wall or the kitchen — you are expected here, given the same attention. You stop apologizing for one person. You start to prefer it.",
    accentColor: "#7B8DB3",
  },
  {
    id: "rain-evening",
    timestamp: "18:40 · Harajuku",
    title: "Rainy Evenings",
    body: "Rain in Tokyo sounds different than anywhere else — the umbrella density, the train delay announcements, the particular smell of the entrance to a konbini when twenty wet umbrellas drip in the stand. You start to love it before you realize you do.",
    accentColor: "#5B7FA6",
    wide: true,
  },
  {
    id: "coin-laundry",
    timestamp: "00:14 · Nakameguro",
    title: "Coin Laundry at Midnight",
    body: "The laundromat near your station is empty at midnight except for the machine noise and the vending machine hum. You sit and look at nothing. This is one of the few places in Tokyo where time actually passes slowly.",
    accentColor: "#8B7E9E",
  },
  {
    id: "first-grocery",
    timestamp: "Tuesday · Koenji",
    title: "First Real Grocery Run",
    body: "You will spend thirty minutes in the vegetable aisle not recognizing things. You will buy something thinking you know what it is. It will be something else entirely. This is how your Japanese cooking vocabulary actually starts.",
    accentColor: "#7A9E7E",
  },
  {
    id: "last-train",
    timestamp: "23:48 · Chuo Line",
    title: "Last Train",
    body: "There is something about standing in a train car at 11:48pm, surrounded by other exhausted people all going home to their one-person apartments, that makes you feel both completely alone and completely belonging to the city.",
    accentColor: "#C9A96E",
    wide: true,
  },
  {
    id: "month-three",
    timestamp: "Various",
    title: "Month Three",
    body: "The novelty ends around then. You know the routes, you can order food, but you still don't belong anywhere. You call home for the first time in weeks. It passes. Most people who stay talk about it later like a doorway they had to walk through.",
    accentColor: "#C87D6B",
  },
  {
    id: "slowly-belonging",
    timestamp: "Gradually",
    title: "The Day You Forget You're Foreign",
    body: "It happens in a small moment — you give someone directions without thinking, you laugh at the right moment in a conversation, you walk through your neighborhood without looking at the map. Then you remember. Then it happens again.",
    accentColor: "#6B9E8A",
  },
];

function TraceCard({ trace }: { trace: Trace }) {
  return (
    <div
      className={`relative p-8 md:p-10 flex flex-col gap-4 ${trace.wide ? "md:col-span-2" : ""}`}
      style={{
        background: "rgba(255,255,255,0.015)",
        borderLeft: `1px solid ${trace.accentColor}22`,
        borderBottom: "1px solid rgba(200,184,154,0.04)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
          style={{ background: trace.accentColor, opacity: 0.7 }}
        />
        <span
          className="font-mono text-right flex-shrink-0"
          style={{ fontSize: "9px", letterSpacing: "0.12em", color: "var(--color-muted)", opacity: 0.35 }}
        >
          {trace.timestamp}
        </span>
      </div>
      <h3
        className="font-display font-light leading-snug"
        style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--color-parchment)" }}
      >
        {trace.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "var(--color-muted)", opacity: 0.7 }}
      >
        {trace.body}
      </p>
    </div>
  );
}

export default async function LivingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <FilmGrain opacity={0.04} className="z-0 pointer-events-none" />

      {/* ── Cinematic header ──────────────────────────── */}
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(320px, 52vh, 580px)" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=1600&q=75"
          alt="Daily life in Tokyo"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "saturate(0.52) brightness(0.3) contrast(1.06)" }}
        />
        {/* Fluorescent ambient wash — konbini light */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(12, 18, 38, 0.18)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--color-ink) 100%, transparent), color-mix(in srgb, var(--color-ink) 30%, transparent), transparent)" }}
        />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-12">
          <span
            className="font-mono block mb-5"
            style={{ fontSize: "9px", letterSpacing: "0.3em", color: "#A8B5A0", opacity: 0.5 }}
          >
            IV · DAILY LIFE IN TOKYO
          </span>
          <h1
            className="font-display font-light leading-tight"
            style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "var(--color-parchment)" }}
          >
            Not how to visit.<br />How to stay.
          </h1>
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 pt-16 pb-12">
        <p
          className="text-sm leading-loose"
          style={{ color: "var(--color-muted)", opacity: 0.6 }}
        >
          These are not tips. They are things that happen when Tokyo stops being a destination
          and starts being where you live. Small rituals. Small realizations. The ordinary
          texture of a life being quietly built here.
        </p>
      </div>

      {/* ── Traces grid ───────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 pb-24">
        <div
          className="mb-8"
          style={{ height: "1px", background: "rgba(200,184,154,0.06)" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(200,184,154,0.04)]">
          {traces.map((trace) => (
            <TraceCard key={trace.id} trace={trace} />
          ))}
        </div>
        <div
          className="mt-px"
          style={{ background: "rgba(200,184,154,0.04)", height: "1px" }}
        />
      </div>

      {/* ── After the traces ──────────────────────────── */}
      <div className="max-w-2xl mx-auto px-6 md:px-8 pb-32">
        <div
          className="mb-12"
          style={{ height: "1px", background: "linear-gradient(to right, rgba(200,184,154,0.12), transparent)" }}
        />
        <span
          className="font-mono block mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.28em", color: "var(--color-muted)", opacity: 0.35 }}
        >
          THINGS YOU WILL FIGURE OUT
        </span>
        <div className="flex flex-col gap-6">
          {[
            {
              truth: "The address circle must be done in exact order.",
              detail: "City Hall first. Residence card. Then bank account. Everything else is locked behind it.",
              color: "#C9A96E",
            },
            {
              truth: "Month three is when most people break.",
              detail: "The novelty runs out. The loneliness arrives. It's survivable. The people who stay are the ones who knew it was coming.",
              color: "#C87D6B",
            },
            {
              truth: "Silence is not disapproval.",
              detail: "They're thinking. Not rejecting you. This will take months to actually feel true rather than just know.",
              color: "#7B8DB3",
            },
            {
              truth: "You will become a regular somewhere without trying.",
              detail: "A specific konbini cashier will start nodding before you pay. A ramen counter will remember what you always order. This is Tokyo's version of friendship.",
              color: "#6B9E8A",
            },
          ].map(({ truth, detail, color }) => (
            <div
              key={truth}
              className="flex flex-col gap-2 py-5"
              style={{ borderTop: `1px solid ${color}18` }}
            >
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-parchment)", opacity: 0.85 }}
              >
                {truth}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--color-muted)", opacity: 0.55 }}
              >
                {detail}
              </p>
            </div>
          ))}
        </div>

        {/* ── World bridge ──────────────────── */}
        <WorldBridge exclude="living" locale={locale} />
      </div>
    </div>
  );
}
