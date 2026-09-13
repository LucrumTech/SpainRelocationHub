import type { ReactNode } from "react";
import Link from "next/link";
import { logoutAction } from "../actions";
import { getAdminLocale, getAdminDictionary } from "@/lib/admin/i18n";
import { createAdminT } from "@/lib/admin/dict";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const locale = await getAdminLocale();
  const t = createAdminT(await getAdminDictionary(locale));

  return (
    <div className="min-h-screen bg-surface-alt">
      <header className="border-b border-border bg-navy">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/admin/leads" className="font-heading text-lg text-surface">
            {t("nav.brand")}
          </Link>
          <nav className="flex items-center gap-5 text-sm text-surface/90">
            <Link href="/admin/leads" className="hover:text-gold">
              {t("nav.leads")}
            </Link>
            <Link href="/admin/content" className="hover:text-gold">
              {t("nav.content")}
            </Link>
            <Link href="/admin/media" className="hover:text-gold">
              {t("nav.media")}
            </Link>
            <form action={logoutAction}>
              <button type="submit" className="hover:text-gold">
                {t("nav.signOut")}
              </button>
            </form>
            <AdminLanguageSwitcher dark />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
