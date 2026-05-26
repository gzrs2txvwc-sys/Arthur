import Link from "next/link";
import type { TokyoPlace } from "@/lib/tokyoPlaces";
import {
  getPlaceName,
  getPlaceShort,
  getPlaceForWhom,
  getCategoryLabel,
  getTonightContext,
} from "@/lib/tokyoPlaces";
import { getNeighborhoodById, getNeighborhoodName } from "@/lib/tokyoNeighborhoods";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface Props {
  places:    TokyoPlace[];
  condition: string;
  locale:    string;
}

const PRODUCT_STATEMENT = {
  en: "A companion for people slowly entering Tokyo life.",
  ja: "ゆっくり東京に入っていく人のための companion。",
  zh: "為慢慢進入東京生活的人而設的 companion。",
};

const TONIGHT_LABEL = {
  en: "TONIGHT IN TOKYO",
  ja: "今夜の東京",
  zh: "今晚的東京",
};

export function TonightSection({ places, condition, locale }: Props) {
  const g      = getLocaleGroup(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const statement    = g === "ja" ? PRODUCT_STATEMENT.ja : g === "zh" ? PRODUCT_STATEMENT.zh : PRODUCT_STATEMENT.en;
  const tonightLabel = g === "ja" ? TONIGHT_LABEL.ja : g === "zh" ? TONIGHT_LABEL.zh : TONIGHT_LABEL.en;

  if (places.length === 0) return null;

  return (
    <div className="max-w-xl mx-auto px-6 md:px-8 pt-20 pb-16">

      {/* Product statement */}
      <p
        className="font-mono mb-14 text-center"
        style={{
          fontSize: "10px",
          letterSpacing: "0.18em",
          color: "rgba(200,184,154,0.38)",
          lineHeight: 1.7,
        }}
      >
        {statement}
      </p>

      {/* Section label */}
      <p
        className="font-mono mb-10"
        style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(210,152,38,0.65)",
          textTransform: g === "en" ? "uppercase" : "none",
        }}
      >
        {tonightLabel}
      </p>

      {/* Place cards */}
      <div className="flex flex-col">
        {places.map((place) => {
          const neighborhood = getNeighborhoodById(place.neighborhoodId);
          if (!neighborhood) return null;

          const name          = getPlaceName(place, g);
          const short         = getPlaceShort(place, g);
          const forWhom       = getPlaceForWhom(place, g);
          const categoryLabel = getCategoryLabel(place.category, g);
          const nbName        = getNeighborhoodName(neighborhood, g);
          const context       = getTonightContext(place, condition, g);

          return (
            <Link
              key={place.id}
              href={`${prefix}/neighborhoods/${place.neighborhoodId}`}
              className="group block"
              style={{ textDecoration: "none" }}
            >
              <div
                className="py-9"
                style={{ borderTop: "1px solid rgba(200,184,154,0.07)" }}
              >
                {/* Meta row — category · neighborhood */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.26em",
                      color: "rgba(210,152,38,0.55)",
                      textTransform: "uppercase",
                    }}
                  >
                    {categoryLabel}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-block",
                      width: "1px",
                      height: "9px",
                      background: "rgba(200,184,154,0.18)",
                    }}
                  />
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "8px",
                      letterSpacing: "0.18em",
                      color: "rgba(200,184,154,0.35)",
                    }}
                  >
                    {nbName}
                  </span>
                </div>

                {/* Name */}
                <p
                  className="font-display font-light mb-3 group-hover:opacity-90 transition-opacity"
                  style={{
                    fontSize: "clamp(1.25rem, 4.5vw, 1.6rem)",
                    color: "rgba(242,232,215,0.91)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                  }}
                >
                  {name}
                </p>

                {/* Tonight context — weather-aware, amber */}
                {context && (
                  <p
                    className="mb-3"
                    style={{
                      fontSize: "12px",
                      color: "rgba(210,152,38,0.60)",
                      fontStyle: "italic",
                      lineHeight: 1.65,
                    }}
                  >
                    {context}
                  </p>
                )}

                {/* Short description */}
                <p
                  className="mb-4"
                  style={{
                    fontSize: "13px",
                    color: "rgba(220,205,182,0.56)",
                    fontStyle: "italic",
                    lineHeight: 1.85,
                  }}
                >
                  {short}
                </p>

                {/* For whom */}
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(200,184,154,0.33)",
                    lineHeight: 1.65,
                  }}
                >
                  {forWhom}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
