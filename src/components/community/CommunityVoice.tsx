import { getTranslations } from "next-intl/server";
import type { CommunityVoice as CommunityVoiceType } from "@/lib/types";

interface CommunityVoiceProps {
  voice: CommunityVoiceType;
  accent?: boolean;
}

export async function CommunityVoice({ voice, accent = false }: CommunityVoiceProps) {
  const { person, quote } = voice;
  const tV = await getTranslations("voices");
  const tC = await getTranslations("common");

  const voiceId = voice.id as "sarah-tokyo";
  const localizedQuote = tV(`${voiceId}.quote`);
  const localizedRole = tV(`${voiceId}.role`);
  const yearsLabel = tC("years_japan", { n: person.yearsInJapan });

  const cityAccentMap = {
    tokyo: "border-[var(--color-tokyo-accent)]",
    kyoto: "border-[var(--color-kyoto-accent)]",
    osaka: "border-[var(--color-osaka-accent)]",
  };

  const cityTextMap = {
    tokyo: "text-[var(--color-tokyo-accent)]",
    kyoto: "text-[var(--color-kyoto-accent)]",
    osaka: "text-[var(--color-osaka-accent)]",
  };

  void quote; // raw quote still on the object, component uses localized version

  return (
    <figure
      className={`flex flex-col gap-6 p-6 border-t ${cityAccentMap[person.city]} border-t-2
        border-l border-r border-b border-white/5 bg-white/[0.02]
        ${accent ? "bg-white/[0.04]" : ""}`}
    >
      <blockquote>
        <p className="font-display text-xl md:text-2xl font-light italic text-[var(--color-parchment)] leading-snug">
          &ldquo;{localizedQuote}&rdquo;
        </p>
      </blockquote>

      <figcaption className="flex items-center gap-4 mt-auto">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-mono
            font-medium text-[var(--color-ink)] shrink-0`}
          style={{
            background: `linear-gradient(135deg, var(--color-${person.city}-from), var(--color-${person.city}-to))`,
          }}
        >
          {person.avatarInitials}
        </div>

        <div>
          <p className="text-sm text-[var(--color-parchment)] font-medium">{person.name}</p>
          <p className="text-caption text-[var(--color-muted)]">
            {localizedRole} ·{" "}
            <span className={cityTextMap[person.city]}>
              {person.city.charAt(0).toUpperCase() + person.city.slice(1)}
            </span>{" "}
            · {yearsLabel}
          </p>
        </div>

        <p className="ml-auto text-caption text-[var(--color-muted)] italic">
          {person.nationality}
        </p>
      </figcaption>
    </figure>
  );
}
