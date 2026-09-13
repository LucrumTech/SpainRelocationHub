"use server";

import { cookies } from "next/headers";
import { isLocale } from "@/lib/locale/config";
import { ADMIN_UI_LOCALE_COOKIE } from "@/lib/admin/i18n";

export async function setAdminUiLocaleAction(formData: FormData): Promise<void> {
  const locale = formData.get("locale");
  if (typeof locale !== "string" || !isLocale(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_UI_LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
