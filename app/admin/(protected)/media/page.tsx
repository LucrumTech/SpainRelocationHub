import { getSetting } from "@/lib/settings/store";
import { SECTION_KEYS, sectionImageSettingKey } from "@/lib/settings/keys";
import { getAdminLocale, getAdminDictionary } from "@/lib/admin/i18n";
import { createAdminT } from "@/lib/admin/dict";
import { SectionImageCard } from "./SectionImageCard";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const locale = await getAdminLocale();
  const t = createAdminT(await getAdminDictionary(locale));

  return (
    <div>
      <h1 className="font-heading text-2xl text-navy">{t("media.title")}</h1>
      <p className="mt-1 text-sm text-muted">{t("media.subtitle")}</p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {SECTION_KEYS.map((section) => (
          <SectionImageCard
            key={section}
            section={section}
            label={t(`sections.${section}`)}
            imageUrl={getSetting(sectionImageSettingKey(section))}
          />
        ))}
      </div>
    </div>
  );
}
