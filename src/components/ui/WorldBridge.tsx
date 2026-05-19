import Link from "next/link";
import { getMoodConnector, getDriftLine } from "@/lib/moodThread";
import type { FragmentMood } from "@/lib/postcards";

type WorldKey = "tonight" | "wander" | "stories" | "living";

interface WorldConfig {
  key:   WorldKey;
  href:  string;
  color: string;
}

const WORLD_CONFIG: WorldConfig[] = [
  { key: "tonight", href: "/today",    color: "#7B8DB3" },
  { key: "wander",  href: "/map",      color: "#7A9E7E" },
  { key: "stories", href: "/moments",  color: "#C9A96E" },
  { key: "living",  href: "/living",   color: "#A8B5A0" },
];

type LocaleStr = "en" | "ja" | "zh-TW" | "ko";

interface WorldText { label: string; hint: string; }

const WORLD_TEXT: Record<WorldKey, Record<LocaleStr, WorldText>> = {
  tonight: {
    en:      { label: "Tonight in Tokyo",  hint: "What the city has prepared for today" },
    ja:      { label: "今夜の東京",          hint: "今日、街が用意しているもの" },
    "zh-TW": { label: "今夜的東京",          hint: "城市今天為你準備的" },
    ko:      { label: "오늘 밤의 도쿄",      hint: "도시가 오늘을 위해 준비한 것" },
  },
  wander: {
    en:      { label: "Wander",            hint: "Fragments hidden across the city" },
    ja:      { label: "さまよう",            hint: "街の隅に潜む断片" },
    "zh-TW": { label: "漫遊",               hint: "藏在城市各處的片段" },
    ko:      { label: "거닐다",              hint: "도시 곳곳에 숨겨진 단편들" },
  },
  stories: {
    en:      { label: "Stories",           hint: "Voices from people who actually live here" },
    ja:      { label: "声と記憶",            hint: "実際にここに住む人々の声" },
    "zh-TW": { label: "故事與記憶",          hint: "真正住在這裡的人的聲音" },
    ko:      { label: "이야기",              hint: "실제로 여기 사는 사람들의 목소리" },
  },
  living: {
    en:      { label: "Daily Life",        hint: "The ordinary traces of a life here" },
    ja:      { label: "ここで生きる",        hint: "生活の、ふつうの痕跡" },
    "zh-TW": { label: "住在這裡",           hint: "生活在這裡的日常痕跡" },
    ko:      { label: "생활",               hint: "여기서 사는 일상의 흔적" },
  },
};

const FALLBACK_CONNECTOR: Record<LocaleStr, string> = {
  en:      "Tokyo has more rooms than you've seen.",
  ja:      "東京にはまだ見ていない部屋がある。",
  "zh-TW": "東京還有你沒發現的房間。",
  ko:      "도쿄엔 아직 보지 못한 방이 있어.",
};

const ENTER_LABEL: Record<LocaleStr, string> = {
  en:      "Enter →",
  ja:      "入る →",
  "zh-TW": "進入 →",
  ko:      "들어가다 →",
};

interface WorldBridgeProps {
  exclude?: WorldKey;
  locale:   string;
  mood?:    FragmentMood;
  seed?:    number;
}

export function WorldBridge({ exclude, locale, mood, seed = 0 }: WorldBridgeProps) {
  const prefix  = locale === "en" ? "" : `/${locale}`;
  const loc     = (locale in FALLBACK_CONNECTOR ? locale : "en") as LocaleStr;
  const visible = WORLD_CONFIG.filter((w) => w.key !== exclude);

  const connectorText = mood
    ? getDriftLine(mood, seed, locale)
    : FALLBACK_CONNECTOR[loc];

  const enterLabel = ENTER_LABEL[loc];

  return (
    <div className="mt-16" style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}>
      <div className="pt-10 pb-2">
        <p
          className="text-sm italic mb-7 max-w-sm"
          style={{ color: "var(--color-muted)", opacity: 0.38, fontStyle: "italic" }}
        >
          {connectorText}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(200,184,154,0.04)]">
          {visible.map((w) => {
            const text = WORLD_TEXT[w.key][loc] ?? WORLD_TEXT[w.key].en;
            return (
              <Link
                key={w.key}
                href={`${prefix}${w.href}`}
                className="group flex flex-col gap-2 px-5 py-5 hover:bg-white/[0.02] transition-colors duration-200"
                style={{ background: "rgba(255,255,255,0.01)" }}
              >
                <span
                  className="font-mono"
                  style={{ fontSize: "9px", letterSpacing: "0.22em", color: w.color, opacity: 0.65 }}
                >
                  {text.label.toUpperCase()}
                </span>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--color-muted)", opacity: 0.5 }}
                >
                  {text.hint}
                </p>
                <span
                  className="font-mono mt-1 group-hover:gap-2 transition-all duration-200 flex items-center gap-1.5"
                  style={{ fontSize: "9px", letterSpacing: "0.15em", color: w.color, opacity: 0.5 }}
                >
                  {enterLabel}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
