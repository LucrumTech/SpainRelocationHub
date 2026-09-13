import { listLeads } from "@/lib/leads/store";
import { getAdminLocale, getAdminDictionary } from "@/lib/admin/i18n";
import { createAdminT } from "@/lib/admin/dict";

// Must always read the DB fresh — a statically-cached leads table would
// silently freeze at whatever existed at build time.
export const dynamic = "force-dynamic";

function formatServices(json: string | null): string {
  if (!json) return "—";
  try {
    const arr = JSON.parse(json) as string[];
    return arr.join(", ");
  } catch {
    return json;
  }
}

export default async function AdminLeadsPage() {
  const leads = listLeads();
  const locale = await getAdminLocale();
  const t = createAdminT(await getAdminDictionary(locale));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-navy">{t("leads.title")}</h1>
          <p className="mt-1 text-sm text-muted">{t("leads.countLabel", { count: leads.length })}</p>
        </div>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- file download, not a page; Link's prefetch would fetch the CSV on hover */}
        <a
          href="/admin/leads/export"
          className="rounded-md bg-gold px-4 py-2 text-sm font-medium text-navy hover:bg-gold-hover"
        >
          {t("leads.exportCsv")}
        </a>
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-surface">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="border-b border-border bg-surface-alt text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">{t("leads.received")}</th>
              <th className="px-4 py-3">{t("leads.name")}</th>
              <th className="px-4 py-3">{t("leads.contact")}</th>
              <th className="px-4 py-3">{t("leads.services")}</th>
              <th className="px-4 py-3">{t("leads.locale")}</th>
              <th className="px-4 py-3">{t("leads.qualification")}</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-muted">{lead.created_at}</td>
                <td className="px-4 py-3 font-medium text-ink">{lead.name}</td>
                <td className="px-4 py-3 text-ink">
                  <div>{lead.email}</div>
                  {lead.phone ? <div className="text-muted">{lead.phone}</div> : null}
                </td>
                <td className="px-4 py-3 text-ink">{formatServices(lead.services)}</td>
                <td className="px-4 py-3 uppercase text-muted">{lead.locale ?? "—"}</td>
                <td className="px-4 py-3 text-ink">
                  {lead.qualified_at ? (
                    <div className="space-y-0.5 text-xs text-muted">
                      {lead.country_of_residence ? (
                        <div>
                          {t("leads.country")}: {lead.country_of_residence}
                        </div>
                      ) : null}
                      {lead.timeline ? (
                        <div>
                          {t("leads.timeline")}: {lead.timeline}
                        </div>
                      ) : null}
                      {lead.party_size ? (
                        <div>
                          {t("leads.partySize")}: {lead.party_size}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <span className="text-muted">{t("leads.step1Only")}</span>
                  )}
                </td>
              </tr>
            ))}
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  {t("leads.noLeads")}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
