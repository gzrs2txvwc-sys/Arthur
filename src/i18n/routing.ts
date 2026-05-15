import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ja", "zh-TW", "zh-CN", "ko", "vi", "id", "th", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
