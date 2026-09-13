"use server";

import { redirect } from "next/navigation";
import { consumeResetToken, markResetTokenUsed } from "@/lib/admin/reset";
import { updateAdminPassword } from "@/lib/admin/users";
import { hashPassword } from "@/lib/admin/password";

// `error` is a key into messages/admin/*.json — see the same note on
// LoginState in ../login/actions.ts.
export type ResetPasswordState = { error?: string };

export async function resetPasswordAction(
  _prevState: ResetPasswordState | undefined,
  formData: FormData,
): Promise<ResetPasswordState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    return { error: "errors.passwordTooShort" };
  }
  if (password !== confirm) {
    return { error: "errors.passwordMismatch" };
  }

  const consumed = consumeResetToken(token);
  if (!consumed) {
    return { error: "errors.resetLinkInvalid" };
  }

  updateAdminPassword(consumed.adminUserId, hashPassword(password));
  markResetTokenUsed(consumed.resetId);

  redirect("/admin/login");
}
