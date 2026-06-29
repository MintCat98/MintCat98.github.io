# News (homepage recent-news feed)

File: `src/components/sections/news-section.tsx` → `newsData: NewsItem[]`

## Schema

```ts
type NewsType = "publication" | "talk" | "project" | "award" | "collaboration" | "press" | "notice"

interface NewsItem {
  year: number
  month: number   // 1-12
  content: string // plain string, usually starts with an emoji
  type: NewsType  // drives the colored badge
  link?: string   // optional; internal cross-link or external URL
}
```

No `id`, no image. Items are ordered by date (newest first) — put new items in the right chronological position and set `year`/`month` correctly.

## Conventions

- `content` starts with an emoji matching the event, then the sentence. Existing examples: 🏅 award, 🎤 talk/presentation, 🥈 placement, 🍾 acceptance. Reuse the established emoji for the category.
- Korean parenthetical is sometimes appended for Korean-specific items, e.g. `... Scholarship (정몽구 과학기술 스칼러십(대학원))!`. Keep that pattern when the user provides a Korean name.
- `type` picks the badge color (see `typeColors` in the file). Choose the closest category.
- `link`:
  - To point at a publication/award/etc. detail, use an internal cross-link: `/work/<tab>?highlight=<id>` (e.g. `/work/awards?highlight=9`, `/work/publications?highlight=3`).
  - External URLs (LinkedIn post, news article) are fine too.
  - Omit or leave commented (`// link: "",`) when there's nothing to link.

## Steps

1. Decide `type` and matching emoji.
2. Insert in correct date order; set `year`/`month`.
3. Add a `link` if there's a related item or external source.
4. `npm run dev` → open `/` (homepage), confirm the news entry, badge color, and link.
