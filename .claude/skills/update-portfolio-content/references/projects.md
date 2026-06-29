# Projects

File: `src/components/sections/projects-section.tsx` → `projectsData: ProjectItem[]`

## Schema

```ts
interface ProjectItem {
  id: number
  title: string
  description: React.ReactNode   // JSX fragment
  tags: string[]                 // tech names — MUST exist as keys in data/tech-stacks.json
  selected: boolean
  startYear: number
  startMonth: number             // 1-12
  endYear?: number               // omit if ongoing
  endMonth?: number              // omit if ongoing
  link?: string                  // single primary link
  links?: LinkButtonItem[]       // optional multiple buttons (same type system as publications)
  image: string                  // "/projects/<file>.png"
}
```

## Tags ↔ tech-stacks.json (important)

`tags` are rendered by `TechBadge`, which looks each tag up in `src/data/tech-stacks.json` to get its color and SVG icon.

- Every tag string **must exactly match a key** in `tech-stacks.json` (case/spacing sensitive, e.g. `"Tailwind CSS"`, `"Next.js"`, `"PyTorch"`).
- If a project uses a tech not yet in the file, **add it to `tech-stacks.json` first**: `"<Name>": { "color": "#RRGGBB", "icon": "<svg …>…</svg>" }`. Use the brand color and a Simple Icons-style single-path SVG with `fill="currentColor"` (match existing entries).

## Date rules

- Range: set both `start*` and `end*`.
- Ongoing: set `start*`, omit `end*`.

## Conventions

- `description` is a JSX fragment (`<>…</>`).
- `link` is the single primary URL (e.g. GitHub PR list); `links` for multiple buttons (same `LinkButtonItem` types as publications).
- Image goes under `public/projects/`.

## Steps

1. New `id = max + 1`.
2. Verify each tag exists in `data/tech-stacks.json`; add missing ones first.
3. Add image to `public/projects/`.
4. Set date fields; `selected: true` only for highlights.
5. `npm run dev` → open `/work/projects`, confirm card, tag badges render with icons, image, links.
