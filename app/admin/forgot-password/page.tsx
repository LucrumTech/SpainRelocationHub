"use client";

import { useActionState } from "react";
import Link from "next/link";
import { forgotPasswordAction, type ForgotPasswordState } from "./actions";
import { useAdminT } from "@/components/admin/AdminLocaleProvider";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";

export default function ForgotPasswordPage() {
  const [state, formAction, pending] = useActionState<ForgotPasswordState | undefined, FormData>(
    forgotPasswordAction,
    undefined,
  );
  const t = useAdminT();

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-sm">
        <div className="mb-1 flex justify-end">
          <AdminLanguageSwitcher />
        </div>
        <h1 className="font-heading text-xl text-navy">{t("forgotPassword.title")}</h1>

        {state?.submitted ? (
          <>
            <p className="mt-3 text-sm text-ink">{t("forgotPassword.submittedText")}</p>
            <Link href="/admin/login" className="mt-6 block text-center text-sm text-gold-hover hover:text-navy">
              {t("forgotPassword.backToSignIn")}
            </Link>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">{t("forgotPassword.subtitle")}</p>

            <form action={formAction}>
              <label htmlFor="email" className="mt-6 block text-sm font-medium text-ink">
                {t("forgotPassword.email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoFocus
                autoComplete="username"
                className="mt-1 w-full rounded-md border border-border-input px-3 py-2 text-ink outline-none focus-visible:border-navy"
              />

              <button
                type="submit"
                disabled={pending}
                className="mt-6 w-full rounded-md bg-gold px-4 py-2 font-medium text-navy transition-colors hover:bg-gold-hover disabled:opacity-60"
              >
                {pending ? t("forgotPassword.sending") : t("forgotPassword.send")}
              </button>
            </form>

            <Link href="/admin/login" className="mt-4 block text-center text-sm text-muted hover:text-navy">
              {t("forgotPassword.backToSignIn")}
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
