import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MapExperience } from "@/components/map/MapExperience";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  await params;
  const t = await getTranslations("map");
  return {
    title: `${t("title")} — ${t("subtitle")}`,
    description: "An emotional map of Japan. Real memories, honest stories, and hidden places from foreigners who live here.",
  };
}

export default async function MapPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ pin?: string }>;
}) {
  await params;
  const { pin } = await searchParams;
  return <MapExperience initialPinId={pin} />;
}
