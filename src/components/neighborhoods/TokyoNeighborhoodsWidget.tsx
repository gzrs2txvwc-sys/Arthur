"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import type { TokyoNeighborhood } from "@/lib/tokyoNeighborhoods";
import {
  getNeighborhoodName,
  getNeighborhoodCharacter,
  getNeighborhoodSignalText,
} from "@/lib/tokyoNeighborhoods";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface Props {
  neighborhoods: TokyoNeighborhood[];
  condition: string;
  period: string;
  dayType: string;
}

function NeighborhoodCard({
  neighborhood, g, index, condition, period, dayType, href,
}: {
  neighborhood: TokyoNeighborhood;
  g: string;
  index: number;
  condition: string;
  period: string;
  dayType: string;
  href: string;
}) {
  const name      = getNeighborhoodName(neighborhood, g);
  const character = getNeighborhoodCharacter(neighborhood, g);
  const signal    = getNeighborhoodSignalText(neighborhood, period, condition, dayType, g);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.14 }}
    >
      <Link href={href} className="block group">
        <div
          style={{
            borderTop: "1px solid rgba(200,148,40,0.20)",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          {/* Signal — why tonight */}
          <p
            className="font-mono mb-2"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(210,152,38,0.72)",
            }}
          >
            {signal}
          </p>

          {/* Neighborhood name */}
          <h3
            className="font-display font-light leading-tight mb-2 group-hover:opacity-90 transition-opacity"
            style={{
              fontSize: "19px",
              color: "rgba(242,232,215,0.97)",
              letterSpacing: "0.01em",
            }}
          >
            {name}
          </h3>

          {/* Character */}
          <p
            style={{
              fontSize: "13px",
              color: "rgba(220,205,182,0.65)",
              lineHeight: 1.65,
              fontStyle: "italic",
            }}
          >
            {character}
          </p>

          {/* Enter hint */}
          <p
            className="mt-3 font-mono transition-all group-hover:opacity-80"
            style={{
              fontSize: "9px",
              letterSpacing: "0.18em",
              color: "rgba(200,148,40,0.40)",
            }}
          >
            {g === "ja" ? "もっと →" : g === "zh" ? "深入 →" : "explore →"}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export function TokyoNeighborhoodsWidget({ neighborhoods, condition, period, dayType }: Props) {
  const locale = useLocale();
  const g      = getLocaleGroup(locale);

  if (neighborhoods.length === 0) return null;

  const prefix        = locale === "en" ? "" : `/${locale}`;
  const sectionLabel  =
    g === "ja" ? "今夜の街"
    : g === "zh" ? "今晚的地方"
    : "THE CITY TONIGHT";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
      style={{ maxWidth: 340 }}
    >
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="live-dot" />
        <p
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(210,152,38,0.82)",
          }}
        >
          {sectionLabel}
        </p>
      </div>

      {neighborhoods.map((n, i) => (
        <NeighborhoodCard
          key={n.id}
          neighborhood={n}
          g={g}
          index={i}
          condition={condition}
          period={period}
          dayType={dayType}
          href={`${prefix}/neighborhoods/${n.id}`}
        />
      ))}
    </motion.section>
  );
}
