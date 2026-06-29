# Publications

File: `src/components/sections/publications-section.tsx` → `publications: PublicationItem[]`

## Schema

```ts
interface PublicationItem {
  id: number
  title: string
  authors: React.ReactNode   // JSX, NOT a plain string — see rules
  venue: string              // e.g. "CHI26 Submitted", "CVPR 2026 Findings"
  year: number
  month: number              // 1-12, sorting only (not displayed directly)
  selected: boolean          // featured publication
  links?: LinkButtonItem[]   // bottom-of-card buttons
  image: string              // "/publications/<file>.png"
}
```

## Authors (the tricky part)

`authors` is JSX, not a string. Rules:

- Wrap the author list in a fragment `<>…</>`.
- Bold **Mincheol Kang** with `<b>Mincheol Kang</b>` (this is how the owner is highlighted in the list).
- Equal/co-first authors: superscript asterisk `<sup>*</sup>` right after the name. If Mincheol is co-first: `<b>Mincheol Kang<sup>*</sup></b>`.
- Corresponding author: superscript dagger `<sup>†</sup>` after the name.

Example:
```tsx
authors: (
  <>
  Sihyeong Lee<sup>*</sup>, <b>Mincheol Kang<sup>*</sup></b>, and Daehee Park<sup>†</sup>
  </>
),
```

## Links

`links` is an array of `LinkButtonItem` (defined in `src/components/ui/link-buttons.tsx`). Icon + default label come from the `type`; just pass `type` + `url`:

| type | use | label |
| --- | --- | --- |
| `project` | project page | "Project Page" |
| `venue` | conference/journal page (AAAI, CVPR…) | **set `label` yourself** (e.g. `label: "AAAI"`) — the name changes each time |
| `paper` | paper PDF / arXiv | "Paper" |
| `slides` | talk slides | "Slides" |
| `video` | talk/demo video | "Video" |
| `code` | code repo | "Code" |
| `custom` | anything else | **set `label` + `url` yourself** |

```tsx
links: [
  { type: "paper", url: "https://arxiv.org/abs/..." },
  { type: "venue", url: "https://...", label: "CVPR" },
  { type: "code", url: "https://github.com/..." },
],
```

`links` is optional — omit it entirely if there are none (do not pass an empty array unless matching nearby style).

## Steps

1. Add image to `public/publications/`.
2. New `id = max + 1`.
3. Set `year`/`month` to the real (or expected) date for correct ordering.
4. `selected: false` unless it's a highlight.
5. `npm run dev` → open `/work/publications`, confirm card, image, author formatting, links.
