import Link from "next/link";
import { getTranslations } from "next-intl/server";

const localeLinks = [
  { code: "en",    label: "EN" },
  { code: "ja",    label: "JA" },
  { code: "zh-TW", label: "繁中" },
  { code: "zh-CN", label: "简中" },
  { code: "ko",    label: "KO" },
  { code: "vi",    label: "VI" },
  { code: "id",    label: "ID" },
  { code: "th",    label: "TH" },
  { code: "es",    label: "ES" },
] as const;

function localeHref(code: string): string {
  return code === "en" ? "/" : `/${code}`;
}

interface FooterProps {
  locale: string;
}

export async function Footer({ locale }: FooterProps) {
  const t = await getTranslations("footer");
  const tCat = await getTranslations("categories");
  const year = new Date().getFullYear();

  const livingLinks: [string, string][] = [
    ["work",       tCat("work.label")],
    ["study",      tCat("study.label")],
    ["housing",    tCat("housing.label")],
    ["daily-life", tCat("daily-life.label")],
  ];

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
              {t("tagline")}
            </p>
          </div>

          {/* Living */}
          <div>
            <p className="text-caption mb-6">{t("living")}</p>
            <nav className="flex flex-col gap-3">
              {livingLinks.map(([slug, label]) => (
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
            <p className="text-caption mb-6">{t("cities")}</p>
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
            <p className="text-caption mb-6">{t("platform")}</p>
            <nav className="flex flex-col gap-3">
              {[
                [`/${locale}/moments`, t("stories")],
                [`/${locale}/community`, t("community")],
                [`/${locale}/about`, t("about")],
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
            © {year} MA (間). {t("rights")}
          </p>
          <div className="flex flex-wrap gap-3">
            {localeLinks.map(({ code, label }) => (
              <Link
                key={code}
                href={localeHref(code)}
                className="text-caption transition-colors duration-300"
                style={{
                  color: code === locale ? "var(--color-sand)" : undefined,
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
