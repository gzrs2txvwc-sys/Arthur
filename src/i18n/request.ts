import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

function deepMerge(base: Record<string, unknown>, override: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(override)) {
    const b = base[key];
    const o = override[key];
    if (b && o && typeof b === "object" && typeof o === "object" && !Array.isArray(b) && !Array.isArray(o)) {
      result[key] = deepMerge(b as Record<string, unknown>, o as Record<string, unknown>);
    } else {
      result[key] = o;
    }
  }
  return result;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }

  const localeMessages = (await import(`../../messages/${locale}.json`)).default;
  const messages =
    locale === "en"
      ? localeMessages
      : deepMerge(
          (await import(`../../messages/en.json`)).default,
          localeMessages,
        );

  return { locale, messages };
});
