"use client";

import { createContext, useContext, useMemo } from "react";
import type { Locale } from "@/lib/locale/config";
import type { AdminDictionary } from "@/lib/admin/i18n";
import { createAdminT, type AdminT } from "@/lib/admin/dict";

const AdminLocaleContext = createContext<{ locale: Locale; t: AdminT } | null>(null);

export function AdminLocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: AdminDictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ locale, t: createAdminT(dict) }), [locale, dict]);
  return <AdminLocaleContext.Provider value={value}>{children}</AdminLocaleContext.Provider>;
}

/** Client-side equivalent of the public site's useTranslations(). */
export function useAdminT(): AdminT {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx) {
    throw new Error("useAdminT must be used within AdminLocaleProvider");
  }
  return ctx.t;
}

export function useAdminLocale(): Locale {
  const ctx = useContext(AdminLocaleContext);
  if (!ctx) {
    throw new Error("useAdminLocale must be used within AdminLocaleProvider");
  }
  return ctx.locale;
}
