"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
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

export function NavBar({ locale, messages }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const altLocale = locale === "en" ? "ja" : "en";

  const links = [
    { href: `/${locale}/map`, label: "Map" },
    { href: `/${locale}/living`, label: messages.living },
    { href: `/${locale}/cities/tokyo`, label: messages.cities },
    { href: `/${locale}/community`, label: messages.community },
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
            href={`/${locale}`}
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

            {/* Language switcher */}
            <Link
              href={altLocale === "en" ? "/" : "/ja"}
              className="text-caption text-[var(--color-muted)] hover:text-[var(--color-sand)]
                transition-colors duration-300 ml-4 border-l border-white/10 pl-4"
            >
              {messages.language}
            </Link>
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
            <Link
              href={altLocale === "en" ? "/" : "/ja"}
              onClick={() => setMenuOpen(false)}
              className="text-caption text-[var(--color-muted)] mt-4"
            >
              {messages.language}
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
