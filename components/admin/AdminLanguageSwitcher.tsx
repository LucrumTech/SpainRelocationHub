"use client";

import { localeOrder, localeMeta } from "@/lib/locale/config";
import { useAdminLocale, useAdminT } from "@/components/admin/AdminLocaleProvider";
import { setAdminUiLocaleAction } from "@/components/admin/set-locale-action";

/**
 * Switches the admin UI's own display language — separate from which
 * language a visitor sees the public site in, and separate from which
 * content locale is open in the Content editor's tabs.
 *
 * Deliberately a plain <form action={fn}> per button (matching every other
 * mutation in the admin panel, e.g. SectionImageCard's "Remove" button)
 * rather than calling the action directly from a client event handler —
 * this exact codebase hit a real production hang from an unusual Server
 * Action invocation pattern (bound closure args) before, so sticking to
 * the one proven shape everywhere is deliberate, not an oversight.
 */
export function AdminLanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const active = useAdminLocale();
  const t = useAdminT();

  return (
    <div className="flex items-center gap-1" aria-label={t("language.label")}>
      {localeOrder.map((locale) => (
        <form key={locale} action={setAdminUiLocaleAction}>
          <input type="hidden" name="locale" value={locale} />
          <button
            type="submit"
            disabled={locale === active}
            aria-current={locale === active}
            className={
              locale === active
                ? "rounded px-2 py-1 text-xs font-semibold text-gold"
                : dark
                  ? "rounded px-2 py-1 text-xs font-medium text-surface/70 hover:text-white"
                  : "rounded px-2 py-1 text-xs font-medium text-muted hover:text-navy"
            }
          >
            {localeMeta[locale].short}
          </button>
        </form>
      ))}
    </div>
  );
}
