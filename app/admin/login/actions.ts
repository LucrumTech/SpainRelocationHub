"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSessionToken, SESSION_COOKIE, verifyCredentials } from "@/lib/admin/auth";

// `error`, when set, is a key into messages/admin/*.json (e.g.
// "errors.incorrectCredentials"), not display text — the server action
// doesn't know the admin's chosen UI language, so translation happens at
// render time via useAdminT() in the page.
export type LoginState = { error?: string };

export async function loginAction(_prevState: LoginState | undefined, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password || !verifyCredentials(email, password)) {
    return { error: "errors.incorrectCredentials" };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  redirect("/admin/leads");
}
