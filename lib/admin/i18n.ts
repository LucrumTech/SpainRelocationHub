import { cookies } from "next/headers";
import { locales, defaultLocale, isLocale, type Locale } from "@/lib/locale/config";

// Deliberately a different cookie from the public site's NEXT_LOCALE and
// from the content editor's own ?locale= query param — three unrelated
// concepts share the same 4 language codes: which language a visitor sees
// the public site in, which language Olga is editing content for, and
// which language the admin UI chrome itself (buttons, labels, errors) is
// displayed in. This cookie controls only the third one.
export const ADMIN_UI_LOCALE_COOKIE = "srh_admin_ui_locale";

export type AdminDictionary = typeof import("../../messages/admin/en.json");

export async function getAdminLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_UI_LOCALE_COOKIE)?.value;
  return value && isLocale(value) ? value : defaultLocale;
}

export async function getAdminDictionary(locale: Locale): Promise<AdminDictionary> {
  const mod = await import(`../../messages/admin/${locale}.json`);
  return mod.default as AdminDictionary;
}

export { locales as adminLocales };
