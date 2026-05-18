"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  shouldShowAnchor,
  setAnchorAnswer,
  dismissAnchor,
  touchSession,
  type AnchorAnswer,
} from "@/lib/tokyoRelationship";

const OPTIONS: { value: AnchorAnswer; label: string }[] = [
  { value: "just-arrived",      label: "I just arrived" },
  { value: "finding-way",       label: "Still finding my way" },
  { value: "starting-to-feel",  label: "Starting to feel it" },
  { value: "already-home",      label: "It's already home" },
];

// One-time atmospheric anchor question.
// Appears quietly on the homepage after the second session.
// Tap once — it disappears forever. Ignored after 22 seconds — dismissed.
export function AnchorMoment() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Ensure session is counted before checking whether to show the anchor.
    // touchSession is idempotent within a session window, so this is safe.
    touchSession();

    const timer = setTimeout(() => {
      if (shouldShowAnchor()) setVisible(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  // Auto-dismiss after 22 seconds of no interaction
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      dismissAnchor();
      setVisible(false);
    }, 22_000);
    return () => clearTimeout(timer);
  }, [visible]);

  function handleSelect(answer: AnchorAnswer) {
    setAnchorAnswer(answer);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="absolute left-0 right-0 flex flex-col items-center gap-4 pointer-events-auto"
          style={{ bottom: "2rem", zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          {/* Question */}
          <p
            className="font-mono text-center"
            style={{
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: "var(--color-muted)",
              opacity: 0.45,
              fontStyle: "italic",
            }}
          >
            Where are you right now?
          </p>

          {/* Options — plain text, no button styling */}
          <div className="flex flex-col items-center gap-2">
            {OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleSelect(value)}
                className="font-mono transition-opacity duration-200 bg-transparent border-none cursor-pointer"
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.16em",
                  color: "var(--color-muted)",
                  opacity: 0.35,
                  padding: "2px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.35")}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
