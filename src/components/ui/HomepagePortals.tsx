"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface PortalData {
  numeral:     string;
  title:       string;
  tagline:     string;
  href:        string;
  imageUrl:    string;
  enterLabel:  string;
  imageFilter: string;
  tint:        string;
  accentColor: string;
}

function WorldPortal({
  numeral, title, tagline, href, imageUrl, enterLabel,
  imageFilter, tint, accentColor,
}: PortalData) {
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
      <div className="absolute inset-0" style={{ background: tint }} />
      {/* Warm amber-black gradient — lighter than before, keeps text legible */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(14,7,1,0.88) 0%, rgba(10,5,0,0.52) 30%, rgba(6,3,0,0.16) 58%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span
          className="font-mono mb-4 block"
          style={{ fontSize: "9px", letterSpacing: "0.3em", color: accentColor, opacity: 0.78 }}
        >
          {numeral}
        </span>
        <h2
          className="font-display font-light leading-tight mb-3"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", color: "var(--color-parchment)", opacity: 0.96 }}
        >
          {title}
        </h2>
        <p
          className="text-sm font-light leading-relaxed mb-5 max-w-xs"
          style={{ color: "var(--color-parchment)", opacity: 0.62 }}
        >
          {tagline}
        </p>
        <span
          className="font-mono flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
          style={{ fontSize: "10px", letterSpacing: "0.18em", color: accentColor, opacity: 0.90 }}
        >
          {enterLabel} <span>→</span>
        </span>
      </div>
    </Link>
  );
}

// Portals are hidden on mount and revealed after a delay — the opening
// observation occupies the first few seconds; portals surface slowly after,
// like eyes adjusting to the dark.
export function HomepagePortals({ portals }: { portals: PortalData[] }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Shorter delay on return visits within the same session so the
    // experience doesn't feel punishing after navigation.
    const isReturn = sessionStorage.getItem("hp_seen") === "1";
    sessionStorage.setItem("hp_seen", "1");
    const delay = isReturn ? 700 : 3500;
    const timer = setTimeout(() => setRevealed(true), delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-px">
      <div className="grid grid-cols-1 md:grid-cols-[58fr_42fr] gap-px">
        {portals.slice(0, 2).map((p, i) => (
          <motion.div
            key={p.href}
            initial={{ opacity: 0, y: 32 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 1.8, delay: i * 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorldPortal {...p} />
          </motion.div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[42fr_58fr] gap-px">
        {portals.slice(2, 4).map((p, i) => (
          <motion.div
            key={p.href}
            initial={{ opacity: 0, y: 32 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 1.8, delay: (i + 2) * 0.22 + 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <WorldPortal {...p} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
