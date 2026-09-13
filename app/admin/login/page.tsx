"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type LoginState } from "./actions";
import { useAdminT } from "@/components/admin/AdminLocaleProvider";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState<LoginState | undefined, FormData>(loginAction, undefined);
  const t = useAdminT();

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-sm"
      >
        <div className="mb-1 flex justify-end">
          <AdminLanguageSwitcher />
        </div>
        <h1 className="font-heading text-xl text-navy">{t("login.title")}</h1>
        <p className="mt-1 text-sm text-muted">{t("login.subtitle")}</p>

        <label htmlFor="email" className="mt-6 block text-sm font-medium text-ink">
          {t("login.email")}
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

        <label htmlFor="password" className="mt-4 block text-sm font-medium text-ink">
          {t("login.password")}
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-border-input px-3 py-2 text-ink outline-none focus-visible:border-navy"
        />

        {state?.error ? (
          <p role="alert" className="mt-3 text-sm text-error">
            {t(state.error)}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-md bg-gold px-4 py-2 font-medium text-navy transition-colors hover:bg-gold-hover disabled:opacity-60"
        >
          {pending ? t("login.signingIn") : t("login.signIn")}
        </button>

        <Link
          href="/admin/forgot-password"
          className="mt-4 block text-center text-sm text-muted hover:text-navy"
        >
          {t("login.forgotPassword")}
        </Link>
      </form>
    </main>
  );
}
