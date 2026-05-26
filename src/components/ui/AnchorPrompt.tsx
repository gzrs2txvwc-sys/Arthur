"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { getLocaleGroup } from "@/lib/tonightSignals";
import {
  shouldShowAnchor,
  setAnchorAnswer,
  dismissAnchor,
} from "@/lib/tokyoRelationship";
import type { AnchorAnswer } from "@/lib/tokyoRelationship";

interface Option {
  value: AnchorAnswer;
  en: string;
  ja: string;
  zh: string;
}

const OPTIONS: Option[] = [
  { value: "just-arrived",      en: "Just arrived.",          ja: "着いたばかり。",       zh: "剛到。" },
  { value: "finding-way",       en: "Finding my way.",        ja: "慣れている途中。",     zh: "正在摸索。" },
  { value: "starting-to-feel",  en: "Starting to feel home.", ja: "馴染んできた。",       zh: "開始感到自在。" },
  { value: "already-home",      en: "This is already mine.",  ja: "もうここは自分の場所。", zh: "這裡已經是我的了。" },
];

const QUESTION = {
  en: "Where are you in your Tokyo?",
  ja: "今の東京での自分は？",
  zh: "你現在在東京的哪個階段？",
};

const SKIP = {
  en: "skip",
  ja: "スキップ",
  zh: "略過",
};

export function AnchorPrompt() {
  const locale = useLocale();
  const g      = getLocaleGroup(locale);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldShowAnchor()) {
      // Delay so it doesn't compete with page-load animations
      const t = setTimeout(() => setVisible(true), 3200);
      return () => clearTimeout(t);
    }
  }, []);

  function handleAnswer(value: AnchorAnswer) {
    setAnchorAnswer(value);
    setVisible(false);
  }

  function handleDismiss() {
    dismissAnchor();
    setVisible(false);
  }

  const question = g === "ja" ? QUESTION.ja : g === "zh" ? QUESTION.zh : QUESTION.en;
  const skip     = g === "ja" ? SKIP.ja : g === "zh" ? SKIP.zh : SKIP.en;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="anchor"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="flex justify-center px-6"
        >
          <div
            style={{
              maxWidth: 320,
              width: "100%",
              padding: "20px 0",
            }}
          >
            {/* Question */}
            <p
              className="font-mono mb-5"
              style={{
                fontSize: "9px",
                letterSpacing: "0.20em",
                color: "rgba(210,152,38,0.65)",
                textTransform: "uppercase",
              }}
            >
              {question}
            </p>

            {/* Options */}
            <div className="flex flex-col gap-3">
              {OPTIONS.map((o) => {
                const label = g === "ja" ? o.ja : g === "zh" ? o.zh : o.en;
                return (
                  <button
                    key={o.value}
                    onClick={() => handleAnswer(o.value)}
                    style={{
                      textAlign: "left",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      fontSize: "13px",
                      color: "rgba(220,205,182,0.60)",
                      lineHeight: 1.6,
                      fontStyle: "italic",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(220,205,182,0.90)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.color = "rgba(220,205,182,0.60)";
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Skip */}
            <button
              onClick={handleDismiss}
              className="font-mono mt-6"
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                fontSize: "9px",
                letterSpacing: "0.16em",
                color: "rgba(200,184,154,0.22)",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(200,184,154,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(200,184,154,0.22)";
              }}
            >
              {skip}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
