# CLAUDE.md

Personal academic portfolio of Mincheol Kang. Static site built with **Astro 5 + React 19 islands + Tailwind v4 + shadcn/ui (Radix)**. Pushing to `main` triggers a GitHub Actions build that deploys to GitHub Pages.

> **Always write Markdown docs (this file, skills, references) and code comments in skills in English.** Korean inline comments inside the app source are fine and may be kept.

## Commands

| Command | Action |
| --- | --- |
| `npm run dev` | Dev server at `http://localhost:4321` |
| `npm run build` | Build to `./dist/` |
| `npm run preview` | Preview the production build |

## Architecture (map only — procedures live in skills)

- **Routing → island → content:** `src/pages/*.astro` renders an `*-app.tsx` island with `client:load` → which renders an `*-page.tsx` content component → which renders `components/sections/*-section.tsx`.
  - Work pages are a single dynamic route `src/pages/work/[tab].astro` with static paths `publications | projects | press | awards`.
- **Content is hardcoded, not a CMS.** Each content type lives as a typed array inside its own `components/sections/*-section.tsx`. The only external data file is `src/data/tech-stacks.json` (tech name → color + SVG icon, used by `TechBadge`).
- **Images:** stored under `public/<section>/` and referenced by absolute path (e.g. `/publications/foo.png`). `public/` maps to the site root.
- **Cross-linking:** items have numeric `id`s. Other places link to them via `/work/<tab>?highlight=<id>` (e.g. a news item linking to award id 9 → `/work/awards?highlight=9`).
- **Conventions:** `@/` path alias → `src/`. shadcn/ui primitives in `components/ui/`. Conventional Commits (`feat:`, `style:`, `chore:`, `docs:`). Default working branch is `dev`; merging/pushing to `main` deploys — do not push to `main` without being asked.

## Adding or updating portfolio content

Adding a publication, news item, award/honor, press & talk, or project follows strict per-type schemas and formatting rules. **Use the `update-portfolio-content` skill** — do not hand-edit the section arrays from memory.

## Maintenance & self-update (run at the end of every task)

Before finishing a task, evaluate whether the project's shared knowledge has drifted, and **propose** updates (describe the change and ask for confirmation — never silently rewrite this file or skills, and never auto-create skills):

1. **Structural / design changes →** If a task changed the architecture (e.g. a design overhaul, moving content out of section arrays into data files or a CMS, renaming/restructuring the `app → page → section` flow, changing routing, or changing how images/links work), proactively propose:
   - updating the **Architecture** section of this file, and
   - updating any affected skill `SKILL.md` / `references/*.md` so their schemas and steps still match reality.
   Treat "the structure described here no longer matches the code" as a bug to surface immediately, even if the user did not ask.
2. **New repeatable procedure →** If a repeatable, rule-heavy workflow emerged that no existing skill covers, propose a new skill (or a new reference file under an existing skill).
3. **New global fact →** If a command, convention, or always-true fact changed or was newly discovered, propose a concise update here.

Keep this file short and high-signal. Push procedural detail into skills, not into this file.
