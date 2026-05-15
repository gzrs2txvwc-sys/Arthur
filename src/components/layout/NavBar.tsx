"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface NavBarProps {
  locale: string;
  messages: {
    living: string;
    cities: string;
    stories: string;
    community: string;
    about: string;
    language: string;
  };
}

const localeConfig = [
  { code: "en",    native: "English",           group: "EN" },
  { code: "ja",    native: "日本語",              group: "JA" },
  { code: "zh-TW", native: "繁體中文",            group: "ZH" },
  { code: "zh-CN", native: "简体中文",            group: "ZH" },
  { code: "ko",    native: "한국어",              group: "KO" },
  { code: "vi",    native: "Tiếng Việt",         group: "VI" },
  { code: "id",    native: "Bahasa Indonesia",   group: "ID" },
  { code: "th",    native: "ภาษาไทย",            group: "TH" },
  { code: "es",    native: "Español",            group: "ES" },
] as const;

function localeHref(code: string): string {
  return code === "en" ? "/" : `/${code}`;
}

function LanguageDropdown({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = localeConfig.find((l) => l.code === locale) ?? localeConfig[0];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-caption text-[var(--color-muted)]
          hover:text-[var(--color-sand)] transition-colors duration-300
          border-l border-white/10 pl-4 ml-4"
      >
        <Globe size={11} />
        <span style={{ fontSize: "10px", letterSpacing: "0.1em" }}>{current.native}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-3 z-50 min-w-[180px]"
            style={{
              background: "rgba(10,10,10,0.97)",
              border: "1px solid rgba(200,184,154,0.1)",
              backdropFilter: "blur(24px)",
              borderRadius: "2px",
            }}
          >
            {localeConfig.map((l) => (
              <Link
                key={l.code}
                href={localeHref(l.code)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between px-4 py-2.5
                  transition-colors duration-150 group"
                style={{
                  borderLeft: l.code === locale ? "2px solid var(--color-sand)" : "2px solid transparent",
                  background: l.code === locale ? "rgba(200,184,154,0.06)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (l.code !== locale) {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.04)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (l.code !== locale) {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }
                }}
              >
                <span
                  className="text-[var(--color-parchment-warm)]"
                  style={{ fontSize: "12px" }}
                >
                  {l.native}
                </span>
                <span
                  className="font-mono text-[var(--color-muted)]"
                  style={{ fontSize: "9px", letterSpacing: "0.1em" }}
                >
                  {l.group}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function NavBar({ locale, messages }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = locale === "en" ? "" : `/${locale}`;

  const links = [
    { href: `${prefix}/map`, label: "Map" },
    { href: `${prefix}/living`, label: messages.living },
    { href: `${prefix}/cities/tokyo`, label: messages.cities },
    { href: `${prefix}/community`, label: messages.community },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "nav-glass" : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={locale === "en" ? "/" : `/${locale}`}
            className="font-display text-2xl font-light tracking-tight
              text-[var(--color-parchment)] hover:text-[var(--color-sand)] transition-colors duration-300"
          >
            間
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-caption text-[var(--color-muted)] hover:text-[var(--color-parchment)]
                  transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            <LanguageDropdown locale={locale} />
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-[var(--color-parchment)] p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 nav-glass flex flex-col items-center justify-center gap-8"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-display-md text-[var(--color-parchment)]
                  hover:text-[var(--color-sand)] transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile language list */}
            <div className="mt-4 border-t border-white/8 pt-6 flex flex-wrap justify-center gap-3">
              {localeConfig.map((l) => (
                <Link
                  key={l.code}
                  href={localeHref(l.code)}
                  onClick={() => { setMenuOpen(false); setLangOpen(false); }}
                  className="text-caption transition-colors duration-200"
                  style={{
                    color: l.code === locale ? "var(--color-sand)" : "var(--color-muted)",
                    fontSize: "11px",
                  }}
                >
                  {l.native}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
