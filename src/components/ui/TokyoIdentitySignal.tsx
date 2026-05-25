"use client";

import { motion } from "framer-motion";

interface Props {
  statement: string | null;
}

// Quiet line that tells the user who they're becoming in Tokyo.
// Only renders when there's something to say (chapter > arriving).
export function TokyoIdentitySignal({ statement }: Props) {
  if (!statement) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 1.0 }}
      className="flex justify-center px-6"
    >
      <p
        className="font-mono text-center"
        style={{
          fontSize: "10px",
          letterSpacing: "0.10em",
          color: "rgba(200,184,154,0.38)",
          maxWidth: 320,
          lineHeight: 1.7,
        }}
      >
        {statement}
      </p>
    </motion.div>
  );
}
