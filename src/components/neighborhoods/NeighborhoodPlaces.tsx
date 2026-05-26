import {
  getPlacesByNeighborhood,
  getPlaceName,
  getPlaceShort,
  getPlaceForWhom,
  getCategoryLabel,
} from "@/lib/tokyoPlaces";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface Props {
  neighborhoodId: string;
  period: string;
  locale: string;
}

const SECTION_LABEL = {
  en: "PLACES TO FIND",
  ja: "見つける場所",
  zh: "值得找的地方",
};

export function NeighborhoodPlaces({ neighborhoodId, period, locale }: Props) {
  const g      = getLocaleGroup(locale);
  const places = getPlacesByNeighborhood(neighborhoodId, period);

  if (places.length === 0) return null;

  const heading = g === "ja" ? SECTION_LABEL.ja : g === "zh" ? SECTION_LABEL.zh : SECTION_LABEL.en;

  return (
    <div className="mb-14">
      <p
        className="font-mono mb-8"
        style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(210,152,38,0.60)",
          textTransform: "uppercase",
        }}
      >
        {heading}
      </p>

      <div className="flex flex-col gap-0">
        {places.map((p) => {
          const name    = getPlaceName(p, g);
          const short   = getPlaceShort(p, g);
          const forWhom = getPlaceForWhom(p, g);
          const label   = getCategoryLabel(p.category, g);

          return (
            <div
              key={p.id}
              className="py-6"
              style={{ borderTop: "1px solid rgba(200,184,154,0.06)" }}
            >
              {/* Category label */}
              <p
                className="font-mono mb-2"
                style={{
                  fontSize: "8px",
                  letterSpacing: "0.24em",
                  color: "rgba(210,152,38,0.50)",
                  textTransform: "uppercase",
                }}
              >
                {label}
              </p>

              {/* Name */}
              <p
                className="font-display font-light mb-2"
                style={{
                  fontSize: "16px",
                  color: "rgba(242,232,215,0.88)",
                }}
              >
                {name}
              </p>

              {/* Short description */}
              <p
                className="mb-3"
                style={{
                  fontSize: "13px",
                  color: "rgba(220,205,182,0.65)",
                  fontStyle: "italic",
                  lineHeight: 1.75,
                }}
              >
                {short}
              </p>

              {/* For whom */}
              <p
                style={{
                  fontSize: "11px",
                  color: "rgba(200,184,154,0.38)",
                  lineHeight: 1.6,
                }}
              >
                {forWhom}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
