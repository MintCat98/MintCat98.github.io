# Awards / Honors

File: `src/components/sections/awards-section.tsx` → `awardsData: AwardItem[]`

## Schema

```ts
interface AwardItem {
  id: number
  title: string
  organization: string      // granting body; Korean name in parens is OK
  description: string        // 1-2 sentences; plain string
  year: number
  month: number              // 1-12
  selected: boolean          // featured award
  link?: string              // optional
  icon: LucideIcon           // Trophy | Star | Medal | Award (imported at top of file)
  image: string              // "/awards/<file>.png" OR "" (empty allowed)
}
```

## Conventions

- `icon` must be one of the lucide icons already imported in the file: `Trophy`, `Star`, `Medal`, `Award`. Pick by prestige/kind (scholarships → `Medal`, dean's list/general honors → `Award`, competition wins → `Trophy`). It is a JS reference, not a string: `icon: Medal`.
- `image: ""` is valid when there's no image — the card handles an empty path. Otherwise place the file under `public/awards/`.
- `organization` and `title` often include the Korean name in parentheses — keep what the user gives.
- Escaped apostrophes appear in existing strings (`Dean\'s List`); match the surrounding style.

## Steps

1. New `id = max + 1` (news and other items may cross-link to it via `/work/awards?highlight=<id>`).
2. Choose `icon` from the imported set.
3. Add image to `public/awards/` or use `""`.
4. Set `year`/`month`; `selected: false` unless featured.
5. `npm run dev` → open `/work/awards`, confirm card, icon, image/empty handling.
