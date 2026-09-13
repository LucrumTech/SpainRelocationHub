// Kept separate from the "use server" actions module — a "use server" file
// may only export async functions, not plain constants.

// Matches the SAD's page section registry / PDD 5.1 section map exactly —
// every block that can carry its own background photo.
export const SECTION_KEYS = [
  "hero",
  "property",
  "residency",
  "vehicles",
  "business",
  "insurance",
  "adaptation",
  "why",
  "how",
  "faq",
  "contact",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

// Display labels for these keys now live in messages/admin/*.json
// ("sections.*") so the media manager can show them in the admin's chosen
// UI language, not just English.

export function sectionImageSettingKey(section: SectionKey): string {
  return `section_image:${section}`;
}
