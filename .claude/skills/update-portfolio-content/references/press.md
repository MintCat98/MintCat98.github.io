# Press / Talks / Lectures

File: `src/components/sections/press-section.tsx` → `pressItemsData: PressItem[]`

## Schema

```ts
interface PressItem {
  id: number
  title: string
  source: string                  // outlet / host org, e.g. "DGIST", "DGIST and Notion"
  description: React.ReactNode     // JSX fragment (multi-sentence allowed)
  type: "press" | "talk" | "lecture"
  startYear: number
  startMonth: number              // 1-12
  endYear?: number                // omit if single date or ongoing
  endMonth?: number               // omit if single date or ongoing
  ongoing?: boolean               // true → shows "Present"
  selected: boolean
  link?: string                   // single primary link
  links?: LinkButtonItem[]        // optional multiple buttons (same type system as publications)
  image: string                   // "/presstalks/<file>"
}
```

## Date rules

- **Single date:** set only `startYear`/`startMonth`; omit `endYear`/`endMonth`.
- **Range:** set both `start*` and `end*`.
- **Ongoing:** set `start*`, omit `end*`, and set `ongoing: true` (renders "Present").

## Conventions

- `description` is JSX (`<>…</>`), unlike awards/news which use plain strings. Multi-sentence is fine.
- `type` controls the icon/treatment: `press` (media coverage), `talk` (presentation), `lecture` (workshop/teaching). Icons used in the file: `Mic`, `Newspaper`, `GraduationCap`.
- `link` is the single primary URL. For several buttons, use `links` with the same `LinkButtonItem` types as publications (see `references/publications.md` → Links).
- Image goes under `public/presstalks/` (note: folder is `presstalks`, no slash). Extensions vary (`.png`, `.jpg`).

## Steps

1. New `id = max + 1`.
2. Add image to `public/presstalks/`.
3. Set the date fields per the range/ongoing rules above.
4. Pick `type`; write `description` as a JSX fragment.
5. `npm run dev` → open `/work/press`, confirm card, date label, image, links.
