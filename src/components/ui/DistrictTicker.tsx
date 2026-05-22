import type { TickerItem } from "@/lib/districtTicker";

interface DistrictTickerProps {
  items: TickerItem[];
}

// Server component — CSS-only scroll, no JS after render.
export function DistrictTicker({ items }: DistrictTickerProps) {
  if (items.length === 0) return null;

  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div
      style={{
        overflow: "hidden",
        position: "relative",
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes district-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .district-track {
          animation: district-scroll 58s linear infinite;
          will-change: transform;
        }
      `}</style>

      <div className="district-track" style={{ display: "flex", whiteSpace: "nowrap" }}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-mono"
            style={{
              fontSize: "9px",
              letterSpacing: "0.12em",
              color: "rgba(200,178,148,0.48)",
              padding: "0 20px",
              flexShrink: 0,
            }}
          >
            <span style={{ color: "rgba(210,152,38,0.58)", letterSpacing: "0.06em" }}>
              {item.districtJa}
            </span>
            <span style={{ margin: "0 7px", opacity: 0.35 }}>·</span>
            {item.note}
          </span>
        ))}
      </div>
    </div>
  );
}
