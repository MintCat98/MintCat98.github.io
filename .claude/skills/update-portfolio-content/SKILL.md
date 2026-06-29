---
name: update-portfolio-content
description: Add or update content on the mintcat portfolio — a publication/paper, news item, award/honor, press & talk, or project. Use whenever editing the hardcoded item arrays in src/components/sections/*-section.tsx, adding a card, or placing a related image under public/.
---

# Update portfolio content

Each content type is a typed array hardcoded inside its own section component. There is no CMS. Adding an item = editing one array (and usually adding one image). Follow the per-type reference for the exact schema and formatting rules — the schemas differ in subtle, easy-to-break ways (JSX authors, link button types, date ranges, icons, tech tags).

## Pick the type, then read its reference

| Type | File to edit | Reference |
| --- | --- | --- |
| Publication / paper | `src/components/sections/publications-section.tsx` | `references/publications.md` |
| News (homepage feed) | `src/components/sections/news-section.tsx` | `references/news.md` |
| Award / honor | `src/components/sections/awards-section.tsx` | `references/awards.md` |
| Press / talk / lecture | `src/components/sections/press-section.tsx` | `references/press.md` |
| Project | `src/components/sections/projects-section.tsx` | `references/projects.md` |

**Read the matching reference file before editing.** Do not infer the schema from memory.

## Shared workflow (every type)

1. **Image first (if any).** Put it under `public/<section>/` (`publications/`, `awards/`, `presstalks/`, `projects/`). Reference it by absolute path from the site root, e.g. `image: "/publications/my-paper.png"`. Image is optional for awards/news links; an empty string `""` is allowed where the schema says so.
2. **Add the array item.** Open the section file, copy the shape of an existing entry, and fill the fields per the reference. Match the surrounding style (indentation, trailing commas, Korean comments left intact).
3. **`id` (where the type has one):** use `max(existing id) + 1`. Do not renumber existing items — other pages cross-link to them by id.
4. **Ordering / dates:** items carry `year` + `month` (1–12), or a `start*/end*` range. These drive sorting and the displayed date — set them correctly even when not visible. See the reference for range/ongoing rules.
5. **`selected` flag:** `true` marks an item as featured/highlighted on summary views. Default to `false` unless the user says it's a highlight.
6. **Cross-links:** to link to another item, use `/work/<tab>?highlight=<id>` (e.g. `/work/awards?highlight=9`). For news that announces a paper/award, link to that item.
7. **Verify in the browser.** Run `npm run dev` (port 4321), open the relevant page, and confirm the new card renders, the image loads, links work, and ordering is right. Check both light and dark themes if styling changed.
8. **Commit** with Conventional Commits, e.g. `docs: add CHI26 publication` or `feat: add KOI award`. Stay on `dev`; do not push to `main` (that deploys) unless asked.

## After the task

Per the Maintenance section in `CLAUDE.md`: if the content structure itself changed (e.g. a redesign moves these arrays into data files, or the schema/fields change), propose updating the affected reference files here and the Architecture map in `CLAUDE.md`, so this skill stays accurate.
