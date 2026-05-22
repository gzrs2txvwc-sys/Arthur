import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arthur — Tonight in Tokyo",
    short_name: "Arthur",
    description: "A nightly companion for living in Tokyo.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#100c07",
    theme_color: "#100c07",
    categories: ["lifestyle"],
    lang: "ja",
    dir: "ltr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
