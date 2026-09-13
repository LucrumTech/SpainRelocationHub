import { ResetPasswordForm } from "./ResetPasswordForm";
import { getAdminLocale, getAdminDictionary } from "@/lib/admin/i18n";
import { createAdminT } from "@/lib/admin/dict";
import { AdminLanguageSwitcher } from "@/components/admin/AdminLanguageSwitcher";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const locale = await getAdminLocale();
  const t = createAdminT(await getAdminDictionary(locale));

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface-alt px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-surface p-8 shadow-sm">
        <div className="mb-1 flex justify-end">
          <AdminLanguageSwitcher />
        </div>
        <h1 className="font-heading text-xl text-navy">{t("resetPassword.title")}</h1>

        {token ? (
          <ResetPasswordForm token={token} />
        ) : (
          <p className="mt-3 text-sm text-error">{t("resetPassword.missingLink")}</p>
        )}
      </div>
    </main>
  );
}
