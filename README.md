# Applaudo Products

The Applaudo landing page. Built with React (via Next.js) and Tailwind CSS.

```bash
npm install
npm run dev        # work on it            → http://localhost:3000
npm run preview    # see the finished site → http://localhost:4000
```

`npm run preview` builds the site first, so what you see is always current.
(`npm run serve` skips the build and just serves whatever is already in `out/`.)

### Looking at it inside VS Code

Cmd+Shift+P → **Tasks: Run Task** → pick one:

| Task | What it does |
|---|---|
| **Look at the site** | Starts the dev server. Edits appear as you save. |
| **Look at the finished site** | Builds, then serves the real output on port 4000. |

Then Cmd+Shift+P → **Simple Browser: Show** and paste the address. Simple Browser
opens as an editor tab, so the page sits beside your code.

### Two things that will not work

**Double-clicking `out/index.html` in Finder.** The page asks for `/assets/…` and
`/_next/…` — addresses that only mean anything when a server is treating `out/` as
the top of the website. Opened straight off the disk they point at the root of your
hard drive, so no styling, no images, no code arrive. React also refuses to start on
a `file://` page. Nothing to fix here: those absolute addresses are what a real web
host needs. Use `npm run preview`.

**"Go Live" / Live Preview straight after a build.** `npm run build` deletes `out/`
and makes a new one. Any preview server that was already running is still pointed at
the old folder, which no longer exists, so it answers "not found" to every request —
a blank page, same as above. Reload the window (Cmd+Shift+P → **Developer: Reload
Window**) and it works again. The tasks above avoid this, because they serve over an
address rather than latching onto a folder.

## The design system

`/kitchensink` is the single source of truth for design in this project. Every
token on it is parsed from `styles/tokens.css` when the site is built, and every
component is the real one, rendered live with real content — so the page cannot
disagree with what ships. It replaced an earlier gallery that hardcoded its own
copy of the 52 colour values and had quietly gone stale.

`reference/legacy/kitchensink.html` is the pre-React gallery. It still holds ~20
patterns that were never ported to React; the "Not yet in React" section at the
bottom of `/kitchensink` lists them. Open it directly in a browser to see them.

## The project

```
app/
  page.tsx           The home page
  layout.tsx         The page title and <head> tags
  kitchensink/            The design system. Every token and component, live
components/
  landing/           The home page's sections
  ui/                Reusable pieces: buttons, cards, section headings
  kitchensink.tsx    The design-system gallery
content/landing.ts   ALL THE TEXT ON THE PAGE. Edit copy here
public/assets/       Images, logos, video. Replace pictures here
styles/
  tokens.css         The design system: 52 colors, text sizes, spacing
  globals.css        Base styles and the button/card effects
lib/                 Small shared helpers
reference/legacy/    The original hand-written version, kept for reference
```

## Making changes

| To change... | Edit |
|---|---|
| Any text on the page | `content/landing.ts` |
| A photo or logo | drop the new file into `public/assets/` |
| A color or text size | `styles/tokens.css` |
| How a section is arranged | `components/landing/Landing.tsx` |

Run `npm run dev` and the preview updates as you save.

## The typeface

Avenir Next ships **with** the site now, so every visitor sees it — Windows and
Android included. Before, only Mac and iPhone saw it (macOS bundles the font);
everyone else silently got Arial.

Two files, in `public/assets/fonts/`:

| | |
|---|---|
| `AvenirNext-400.woff2` | body text |
| `AvenirNext-600.woff2` | headings |

Those are the only two weights the design uses. They were converted from the
licensed `.ttf` originals — same outlines, 83% smaller (881 KB → 175 KB). The
originals are kept in `reference/fonts-original/`, outside `public/`, so they
are not uploaded with the site.

To swap a weight: convert the new `.ttf` to `.woff2`, drop it in, and update the
matching `@font-face` block at the top of `styles/globals.css`.

## Publishing it

```bash
npm run build
```

That creates an `out/` folder containing the finished website:

```
out/index.html     the home page
out/assets/        the images
out/_next/         the styling and scripts
out/404.html       the "page not found" page (every website has one)
```

Upload `out/` to any web server. Nothing needs to be installed there.

`out/` and `node_modules/` are generated — they rebuild every time, so they are
not part of the project you edit. VS Code hides them (`.vscode/settings.json`).

---

## The color system

52 values: 10 neutrals + 6 chromatic ramps of 7 steps. **Every color's main is
the 400.** Declared once, in `styles/tokens.css`, inside Tailwind v4's
`@theme` block — so each one is simultaneously a CSS custom property and a
Tailwind utility:

```tsx
<div className="bg-red-400 text-neutral-900" />
<div style={{ background: "var(--color-red-400)" }} />
```

**Tailwind's stock palette is cleared** (`--color-*: initial`). `bg-slate-700`
does not compile. Delete that one line in `tokens.css` to get the defaults back.

Only the values you actually use are emitted into the built CSS — that is
Tailwind tree-shaking the theme, not a missing token.

### Four decisions worth knowing

**1. Applaudo White `#F7F7F7` is the page ground; pure white lifts on top.**
`--color-surface` is `#F7F7F7`, `--color-surface-lift` is `#FFFFFF`. This
inverts the old rhythm, where white was the page and `#F7F7F7` the alternating
band. Pure white is not one of the 52 — it survives only as the raised band and
card fill. In the legacy stylesheet every section background was reclassified
accordingly (page grounds → base, cards/inputs → lift).

**2. Storm Gray is retired.** `#535862` → `neutral-600` `#5E5E5E`, per the
System Caveats in `reference/legacy/DESIGN.md` §5. One pure-neutral ramp, no
blue cast, still 6.05 against Applaudo White.

**3. `--ink` `#181d27` is gone too** — the blue-black was not in the new system.
It now resolves to `neutral-900` `#121212`.

**4. `--red-dark` `#a82222` → `red-500` `#A12828`.**

### Naming: radius

The design system's radius names would silently redefine Tailwind's own
`rounded-xs` / `rounded-sm` / `rounded-xl`, so they are namespaced instead.
Tailwind's scale is left intact alongside them.

| Use it | Legacy name | Value |
|---|---|---|
| `rounded-tag` | `--radius-xs` | 6px — pills, inline labels |
| `rounded-inner` | `--radius-sm` | 18px — icon boxes, nav items, chips |
| `rounded-card` | `--radius` | 32px — standalone cards |
| `rounded-shell` | `--radius-xl` | 32px — outer shells of nested cards |
| `rounded-pill` | — | 999px |

### Naming: text

`--color-ink` / `--color-ink-muted` / `--color-on-dark` carry Applaudo's text
colors, because shadcn/ui already claims `muted` for a *surface* and
`muted-foreground` for the text on it. The spec's own `--color-text*` names are
also defined (in plain `:root`) so anything copied straight out of the color
system spec (`reference/legacy/DESIGN.md` §5) resolves.

---

## Radix / shadcn

`components.json` is configured for Tailwind v4 and points at `styles/globals.css`. The shadcn semantic layer (`background`, `foreground`,
`primary`, `border`, `ring`, …) is mapped onto Applaudo tokens in `tokens.css`,
so generated components land on-brand:

```bash
npx shadcn@latest add dialog dropdown-menu accordion
```

`src/components/ui/button.tsx` is the hand-written reference for the pattern —
cva variants plus Radix `Slot` for `asChild`.

**Two-Button Rule:** a button row carries exactly one `black` (the action) and
one `white` (the deferral). Never two primaries.

The landing page's hero follows it (`black` + `white`). Two places do not, and
both are deliberate: the nav CTA stands alone because a nav bar is not a button
row, and the closing "Start here" CTA lost its `white` deferral on the client's
instruction — that button pointed at `/work`, a route that does not exist yet, so
it was removed rather than shipped as a dead link. Restore the pair there when the
destination exists.

**Icons: RemixIcon, not lucide.** `components.json` still declares
`"iconLibrary": "lucide"` because shadcn offers no RemixIcon option — so anything
pulled in with `npx shadcn@latest add …` arrives importing `lucide-react`. Swap
those imports to `@remixicon/react` before committing; lucide is not a dependency
and must not become one.

---

## Known gaps

- **`script.js` exists and is fully implemented.** It drives the mega-menus,
  solve tabs, testimonial carousel, story filters, scroll reveals, stat
  count-up, pointer/tilt effects, and video scrubbing referenced throughout
  the legacy kitchensink. It's still vanilla JS — equivalent behavior becomes
  React state during the port, not a verbatim restore.
- **Two off-system colors remain, deliberately.** `#FF9900` and `#3399FF` on
  `.partner-card-aws` / `.partner-card-gcp` are AWS and Google Cloud brand
  marks, not Applaudo colors.
- **The button glint effect keeps its spectral gradients.** The
  `::before`/`::after` iridescence in the legacy buttons uses cyan/magenta/amber
  stops that are optical, not brand values. Replacing them with system colors
  would flatten the effect.
- **Pink `#F03875` is dropped.** It has no equivalent in the new system.
