import Link from "next/link";

interface WorldDef {
  key: "tonight" | "wander" | "stories" | "living";
  label: string;
  hint: string;
  href: string;
  color: string;
}

const WORLDS: WorldDef[] = [
  {
    key:   "tonight",
    label: "Tonight in Tokyo",
    hint:  "What the city has prepared for today",
    href:  "/today",
    color: "#7B8DB3",
  },
  {
    key:   "wander",
    label: "Wander",
    hint:  "Fragments hidden across the city",
    href:  "/map",
    color: "#7A9E7E",
  },
  {
    key:   "stories",
    label: "Stories",
    hint:  "Voices from people who actually live here",
    href:  "/moments",
    color: "#C9A96E",
  },
  {
    key:   "living",
    label: "Daily Life",
    hint:  "The ordinary traces of a life here",
    href:  "/living",
    color: "#A8B5A0",
  },
];

interface WorldBridgeProps {
  exclude?: WorldDef["key"];
  locale: string;
}

export function WorldBridge({ exclude, locale }: WorldBridgeProps) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  const visible = WORLDS.filter((w) => w.key !== exclude);

  return (
    <div className="mt-16" style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}>
      <div className="pt-10 pb-2">
        <p
          className="font-mono mb-6"
          style={{ fontSize: "9px", letterSpacing: "0.32em", color: "var(--color-muted)", opacity: 0.3 }}
        >
          OR WANDER DEEPER
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[rgba(200,184,154,0.04)]">
          {visible.map((w) => (
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
                {w.label.toUpperCase()}
              </span>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--color-muted)", opacity: 0.5 }}
              >
                {w.hint}
              </p>
              <span
                className="font-mono mt-1 group-hover:gap-2 transition-all duration-200 flex items-center gap-1.5"
                style={{ fontSize: "9px", letterSpacing: "0.15em", color: w.color, opacity: 0.5 }}
              >
                Enter →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
