import Link from "next/link";

interface FooterProps {
  locale: string;
  messages: {
    tagline: string;
    cities: string;
    moments: string;
    about: string;
    rights: string;
  };
}

export function Footer({ locale, messages }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-[var(--color-ink)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <p className="font-display text-5xl font-light text-[var(--color-parchment)] mb-4">
              間
            </p>
            <p className="text-[var(--color-muted)] text-sm leading-relaxed">
              {messages.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-caption mb-6">{messages.cities}</p>
            <nav className="flex flex-col gap-3">
              {["tokyo", "kyoto", "osaka"].map((city) => (
                <Link
                  key={city}
                  href={`/${locale}/cities/${city}`}
                  className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)] transition-colors duration-300 capitalize"
                >
                  {city}
                </Link>
              ))}
            </nav>
          </div>

          {/* Pages */}
          <div>
            <p className="text-caption mb-6">{messages.moments}</p>
            <nav className="flex flex-col gap-3">
              <Link
                href={`/${locale}/moments`}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)] transition-colors duration-300"
              >
                {messages.moments}
              </Link>
              <Link
                href={`/${locale}/about`}
                className="text-sm text-[var(--color-muted)] hover:text-[var(--color-sand)] transition-colors duration-300"
              >
                {messages.about}
              </Link>
            </nav>
          </div>
        </div>

        <div className="hr-sand mb-8" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-caption">
            © {year} MA (間). {messages.rights}
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-caption hover:text-[var(--color-sand)] transition-colors duration-300"
            >
              EN
            </Link>
            <Link
              href="/ja"
              className="text-caption hover:text-[var(--color-sand)] transition-colors duration-300"
            >
              日本語
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
