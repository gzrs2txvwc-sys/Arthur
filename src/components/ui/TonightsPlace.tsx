import Link from "next/link";
import {
  getTonightsPlace,
  getPlaceName,
  getPlaceShort,
  getPlaceForWhom,
  getCategoryLabel,
} from "@/lib/tokyoPlaces";
import { getNeighborhoodById, getNeighborhoodName } from "@/lib/tokyoNeighborhoods";
import { getLocaleGroup } from "@/lib/tonightSignals";

interface Props {
  period: string;
  locale: string;
}

export function TonightsPlace({ period, locale }: Props) {
  const place = getTonightsPlace(period);
  if (!place) return null;

  const g      = getLocaleGroup(locale);
  const prefix = locale === "en" ? "" : `/${locale}`;

  const neighborhood = getNeighborhoodById(place.neighborhoodId);
  if (!neighborhood) return null;

  const name             = getPlaceName(place, g);
  const short            = getPlaceShort(place, g);
  const forWhom          = getPlaceForWhom(place, g);
  const categoryLabel    = getCategoryLabel(place.category, g);
  const neighborhoodName = getNeighborhoodName(neighborhood, g);

  const sectionLabel =
    g === "ja" ? `今夜は${neighborhoodName}で` :
    g === "zh" ? `今晚在${neighborhoodName}` :
    `TONIGHT IN ${neighborhoodName.toUpperCase()}`;

  return (
    <div className="max-w-lg mx-auto w-full">

      {/* Section label */}
      <p
        className="font-mono mb-8"
        style={{
          fontSize: "9px",
          letterSpacing: "0.28em",
          color: "rgba(210,152,38,0.55)",
          textTransform: g === "en" ? "uppercase" : "none",
        }}
      >
        {sectionLabel}
      </p>

      <Link
        href={`${prefix}/neighborhoods/${place.neighborhoodId}`}
        className="group block"
        style={{ textDecoration: "none" }}
      >
        {/* Category */}
        <p
          className="font-mono mb-3"
          style={{
            fontSize: "8px",
            letterSpacing: "0.24em",
            color: "rgba(210,152,38,0.45)",
            textTransform: "uppercase",
          }}
        >
          {categoryLabel}
        </p>

        {/* Name */}
        <p
          className="font-display font-light mb-4 group-hover:opacity-90 transition-opacity"
          style={{
            fontSize: "clamp(1.4rem, 4.5vw, 1.9rem)",
            color: "rgba(242,232,215,0.92)",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {name}
        </p>

        {/* Short description */}
        <p
          className="mb-5"
          style={{
            fontSize: "14px",
            color: "rgba(220,205,182,0.60)",
            fontStyle: "italic",
            lineHeight: 1.85,
            maxWidth: "400px",
          }}
        >
          {short}
        </p>

        {/* For whom */}
        <p
          style={{
            fontSize: "12px",
            color: "rgba(200,184,154,0.36)",
            lineHeight: 1.65,
          }}
        >
          {forWhom}
        </p>
      </Link>
    </div>
  );
}
