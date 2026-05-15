import Link from "next/link";

interface FooterProps {
  locale: string;
  messages: {
    tagline: string;
    living: string;
    cities: string;
    stories: string;
    community: string;
    about: string;
    rights: string;
  };
}

export function Footer({ locale, messages }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--color-ink)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-5xl font-light text-[var(--color-parchment)] mb-4">
              間
            </p>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              {messages.tagline}
            </p>
          </div>

          {/* Living */}
          <div>
            <p className="text-caption mb-6">{messages.living}</p>
            <nav className="flex flex-col gap-3">
              {[
                ["work", "Working in Japan"],
                ["study", "Student Life"],
                ["housing", "Finding Housing"],
                ["daily-life", "Daily Life"],
              ].map(([slug, label]) => (
                <Link
                  key={slug}
                  href={`/${locale}/living#${slug}`}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)]
                    transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Cities */}
          <div>
            <p className="text-caption mb-6">{messages.cities}</p>
            <nav className="flex flex-col gap-3">
              {["tokyo", "kyoto", "osaka"].map((city) => (
                <Link
                  key={city}
                  href={`/${locale}/cities/${city}`}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)]
                    transition-colors duration-300 capitalize"
                >
                  {city}
                </Link>
              ))}
            </nav>
          </div>

          {/* Platform */}
          <div>
            <p className="text-caption mb-6">Platform</p>
            <nav className="flex flex-col gap-3">
              {[
                [`/${locale}/moments`, messages.stories],
                [`/${locale}/community`, messages.community],
                [`/${locale}/about`, messages.about],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)]
                    transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="hr-sand mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-caption">
            © {year} MA (間). {messages.rights}
          </p>
          <div className="flex gap-6">
            <Link href="/" className="text-caption hover:text-[var(--color-sand)] transition-colors duration-300">
              EN
            </Link>
            <Link href="/ja" className="text-caption hover:text-[var(--color-sand)] transition-colors duration-300">
              日本語
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
