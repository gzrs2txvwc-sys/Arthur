import Link from "next/link";
import { getNeighborhoodById, getNeighborhoodName } from "@/lib/tokyoNeighborhoods";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface TasteGroup {
  id:    string;
  en:    string;
  ja:    string;
  zh:    string;
  slugs: string[];
}

const TASTE_GROUPS: TasteGroup[] = [
  {
    id:    "quiet",
    en:    "Quiet Tokyo",
    ja:    "静かな東京",
    zh:    "安靜的東京",
    slugs: ["daikanyama", "yanaka", "kiyosumi-shirakawa", "aoyama"],
  },
  {
    id:    "latenight",
    en:    "Late-night Tokyo",
    ja:    "夜更けの東京",
    zh:    "深夜東京",
    slugs: ["shimokitazawa", "koenji", "nakameguro", "sangenjaya"],
  },
  {
    id:    "residential",
    en:    "Residential Tokyo",
    ja:    "住む東京",
    zh:    "生活東京",
    slugs: ["nishi-ogikubo", "sangenjaya", "yanaka", "gakugeidaigaku"],
  },
];

const SECTION_LABEL = {
  en: "FIND YOUR TOKYO",
  ja: "あなたの東京を見つける",
  zh: "找到你的東京",
};

const SECTION_SUB = {
  en: "Everyone's Tokyo is different. These are the entry points.",
  ja: "それぞれの東京がある。これが入り口だ。",
  zh: "每個人的東京都不同。這些是入口。",
};

interface Props {
  locale: string;
}

export function NeighborhoodsByTaste({ locale }: Props) {
  const g      = getLocaleGroup(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const heading = g === "ja" ? SECTION_LABEL.ja : g === "zh" ? SECTION_LABEL.zh : SECTION_LABEL.en;
  const sub     = g === "ja" ? SECTION_SUB.ja : g === "zh" ? SECTION_SUB.zh : SECTION_SUB.en;

  return (
    <div className="max-w-xl mx-auto px-6 md:px-8 pt-0 pb-16">

      {/* Heading */}
      <p
        className="font-mono mb-3"
        style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(210,152,38,0.72)",
          textTransform: g === "en" ? "uppercase" : "none",
        }}
      >
        {heading}
      </p>

      <p
        className="mb-14"
        style={{
          fontSize: "13px",
          color: "rgba(204,185,148,0.62)",
          fontStyle: "italic",
          lineHeight: 1.7,
        }}
      >
        {sub}
      </p>

      {/* Taste columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
        {TASTE_GROUPS.map((group) => {
          const groupName = g === "ja" ? group.ja : g === "zh" ? group.zh : group.en;

          return (
            <div key={group.id}>
              {/* Group label */}
              <p
                className="font-mono mb-5"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.22em",
                  color: "rgba(210,152,38,0.60)",
                  textTransform: "uppercase",
                  borderBottom: "1px solid rgba(200,155,65,0.15)",
                  paddingBottom: "10px",
                }}
              >
                {groupName}
              </p>

              {/* Neighborhood links */}
              <div className="flex flex-col gap-3">
                {group.slugs.map((slug) => {
                  const n = getNeighborhoodById(slug);
                  if (!n) return null;
                  const name = getNeighborhoodName(n, g);

                  return (
                    <Link
                      key={slug}
                      href={`${prefix}/neighborhoods/${slug}`}
                      className="group"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="font-display font-light group-hover:opacity-90 transition-opacity"
                        style={{
                          fontSize: "15px",
                          color: "rgba(222,208,180,0.86)",
                          lineHeight: 1.4,
                        }}
                      >
                        {name}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
