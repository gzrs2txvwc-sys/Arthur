import type { Metadata } from "next";
import { MapExperience } from "@/components/map/MapExperience";

export const metadata: Metadata = {
  title: "Memory Map — Japan through emotion",
  description:
    "An emotional map of Japan. Real memories, honest stories, and hidden places from foreigners who live here.",
};

export default async function MapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // locale available for future i18n of pin content
  await params;

  return (
    <MapExperience
      title="Memory Map"
      subtitle="Japan through emotion"
    />
  );
}
