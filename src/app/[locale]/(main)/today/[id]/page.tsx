import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPickById, getAllPickIds } from "@/lib/dailyPicks";
import { PickDetail } from "@/components/today/PickDetail";

export function generateStaticParams() {
  return getAllPickIds().map((id) => ({ id }));
}

type DetailMessages = Record<string, {
  title: string;
  hook: string;
  body: string;
  navigation?: string;
  atmosphere?: string;
  food?: string;
  bestTime?: string;
}>;

export default async function TodayDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const pick = getPickById(id);
  if (!pick) notFound();

  const t = await getTranslations("today");
  const messages = await getMessages();
  const pickMessages = (
    (messages as Record<string, unknown>).today as Record<string, unknown>
  )?.picks as DetailMessages | undefined ?? {} as DetailMessages;

  const copy = pickMessages[id] ?? {
    title: id,
    hook: "",
    body: "",
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 pb-24">
      <div className="max-w-xl mx-auto px-5 md:px-8">

        {/* Back link */}
        <div className="mb-10">
          <Link
            href="/today"
            className="text-[9px] font-mono tracking-[0.2em] uppercase transition-opacity hover:opacity-100"
            style={{ color: "var(--color-muted)", opacity: 0.5 }}
          >
            ← {t("back_to_today")}
          </Link>
        </div>

        <PickDetail
          pick={pick}
          typeLabel={pick.type === "event" ? t("event_label") : t("task_label")}
          title={copy.title}
          hook={copy.hook}
          body={copy.body}
          navigation={copy.navigation}
          atmosphere={copy.atmosphere}
          food={copy.food}
          bestTime={copy.bestTime}
        />

      </div>
    </div>
  );
}
