import type { AdminDictionary } from "@/lib/admin/i18n";

type Primitive = string | number;
export type AdminT = (path: string, params?: Record<string, Primitive>) => string;

function resolvePath(dict: AdminDictionary, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, dict);
  return typeof value === "string" ? value : path;
}

function interpolate(template: string, params?: Record<string, Primitive>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in params ? String(params[key]) : match,
  );
}

// Shared by the client context (AdminLocaleProvider.tsx) and any Server
// Component that needs strings directly — same dot-path + {placeholder}
// lookup either way, no full ICU/pluralization needed for this dictionary.
export function createAdminT(dict: AdminDictionary): AdminT {
  return (path, params) => interpolate(resolvePath(dict, path), params);
}
