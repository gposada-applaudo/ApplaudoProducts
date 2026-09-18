---
name: Applaudo
description: Enterprise AI engineering consultancy built for serious buyers.
colors:
  # Full 52-value system + usage rules: see §5 (Colors) below.
  # Only the values actually used by components are listed here.
  neutral-50:  "#f7f7f7"   # Applaudo White — page surface (was "cool-linen")
  neutral-600: "#5e5e5e"   # secondary text on light, 6.05 (was "storm-gray" #535862, retired per system §6)
  neutral-900: "#121212"   # Applaudo Black — default text, primary button fill (was "press-ink"; "blue-black" #181d27 also retired, no equivalent in the system)
  surface-lift: "#ffffff"  # raised band + card fill — NOT one of the 52 values (was "clean-page"; the page base is now neutral-50, not this)
  red-400: "#ff4040"       # Applaudo Red — brand primary, Digital Transformation (was "applaudo-red"; unchanged)
  red-500: "#a12828"       # red text on light, 6.88 (was "applaudo-red-dark" #a82222)
  purple-400: "#a044e8"    # Secondary — Knewton Ecosystem
  orange-400: "#ff8833"    # Secondary — Partner Products
  yellow-400: "#fcba14"    # Secondary — Live Systems
  blue-400: "#406cff"      # Tertiary / semantic: information
  green-400: "#21c759"     # Tertiary / semantic: success
typography:
  display:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(3.5rem, 6.6vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(2.125rem, 4vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "normal"
  feature:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "clamp(2rem, 3.3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "normal"
  title:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "normal"
  body:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: '"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif'
    fontSize: "0.8125rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  pill: "999px"
  surface: "32px"
  item: "22px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "22px"
  lg: "38px"
  xl: "54px"
components:
  button-primary:
    backgroundColor: "{colors.neutral-900}"
    textColor: "{colors.neutral-50}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.neutral-900}"
    textColor: "{colors.neutral-50}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
  button-glass:
    backgroundColor: "rgba(255,255,255,0.64)"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
    typography: "{typography.label}"
  button-glass-hover:
    backgroundColor: "rgba(255,255,255,0.82)"
    textColor: "{colors.neutral-900}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "44px"
---

# Design System: Applaudo

> **This file is the single source of truth for the 52-value Applaudo Color
> System** (formerly split out into a separate `applaudo-color-system.md`;
> merged into §5 below) **and** for the pre-React reference build (vanilla
> HTML/CSS/JS) whose styles were ported and recolored in this same folder —
> see `styles.css` and `kitchensink.html`.
> Two rules in §11/§12 below (One Voice, Monochrome Field) directly
> contradicted the color system, which defines four portfolio colors and two
> semantic colors; they have been rescoped rather than deleted — see the note
> at each.
## 1. Project at a Glance

This folder holds three source files from the pre-React build: **`styles.css`**, **`script.js`**, and **`kitchensink.html`** — a component gallery that renders every pattern below live, in a browser, with real class names. No pages (`index.html`, `services.html`, …) or `components/nav.html` are part of this reference bundle. The included script drives the gallery interactions; equivalent interactions should be implemented as React state when components are ported into the app.

**External dependency:** RemixIcon 4.6 via CDN (`https://cdn.jsdelivr.net/npm/remixicon@4.6.0/fonts/remixicon.css`), linked from `kitchensink.html`. No other external CSS or JS.

---

## 2. Creative Intent

**North Star: "The Glass Brief"**

Engineering precision delivered with transparent confidence. Every element earns its place the way words in a project spec do: nothing decorates, everything signals.

**The physical scene:** A VP of Engineering on a large monitor, mid-morning, evaluating whether to send an email or close the tab. Skepticism is high. The design should feel like opening a well-made pitch deck from someone you already half-respect and having that intuition confirmed.

**What success looks like:** The visitor finishes a scroll feeling that Applaudo understands their problem — not that Applaudo has a nice website.

**Three things this site explicitly is not:**
- AI hype marketing (floating orbs, neon grid textures, "The future of AI is here")
- Big 4 consulting (institutional navy, conservative serif headers, stock handshake photography)
- Agency portfolio (pastel gradients, colorful case grids, "We craft digital experiences")

---

## 3. Design Tokens

All tokens are defined on `:root` in `styles.css` (lines 7–142 in this reference build). Use these variables — never hardcode hex values in new CSS. **Full palette, contrast figures, and usage rules:** see §5 (Colors) below.

### Colors

**52 values total: 10 neutrals + 6 chromatic ramps of 7 steps each.** Every ramp's main is the `400` step. This replaces the old 8-value monochrome-plus-red palette entirely.

#### Neutrals

| Token | Value | Role |
|---|---|---|
| `--neutral-50` | `#f7f7f7` | **Applaudo White.** Page surface — was `--soft`/`--white`; the base/lift relationship inverted (see below) |
| `--neutral-600` | `#5e5e5e` | Secondary text on light, 6.05 contrast — was `--muted` (Storm Gray `#535862`, retired) |
| `--neutral-900` | `#121212` | **Applaudo Black.** Default text, primary button fill — was `--black` |
| `--color-surface-lift` | `#ffffff` | Raised band + card fill. **Not one of the 52 values** — a utility exception, not a system color |
| `--line` | `rgba(18,18,18,0.08)` | Borders, dividers; structural not decorative — unchanged |

Eight more neutral steps (`100`–`800`) exist for finer tonal control — see the full range under §5.

> **The surface flip.** The pre-React site put pure `#ffffff` as the page and `#f7f7f7` as the alternating band. In the ported build, Applaudo White (`#f7f7f7`) is the page ground and pure white is now the *lift* — the raised band and card fill. This was a deliberate call made when porting to React: it puts the actual page surface inside the 52-value system, leaving `#ffffff` as what it now is by definition — a utility, not a brand color.

#### Chromatic — brand primary

| Token | Value | Role |
|---|---|---|
| `--red-400` | `#ff4040` | **Applaudo Red.** Unchanged. Scroll bar + CTA glint. |
| `--red-500` | `#a12828` | Red text on light, 6.88 contrast — was `--red-dark` (`#a82222`) |

#### Chromatic — secondary (portfolio identities)

| Token | Value | Portfolio |
|---|---|---|
| `--purple-400` | `#a044e8` | Knewton Ecosystem |
| `--orange-400` | `#ff8833` | Partner Products |
| `--yellow-400` | `#fcba14` | Live Systems / Operate and Protect |

New in this system. The old site had no secondary palette; these three did not exist before.

#### Chromatic — tertiary (semantic state)

| Token | Value | Meaning |
|---|---|---|
| `--blue-400` | `#406cff` | Information |
| `--green-400` | `#21c759` | Success |

Also new. Reserved strictly for state, never decoration — see §5.

### Typography Scale

| Token | Value | Use |
|---|---|---|
| `--text-label` | `0.8125rem` (13px) | Eyebrow kickers, chip labels, meta; letter-spacing 0.04em |
| `--text-ui` | `0.875rem` (14px) | Nav links, button labels |
| `--text-body-sm` | `1rem` (16px) | Compact body contexts |
| `--text-body` | `1.0625rem` (17px) | All body copy; default |
| `--text-title-sm` | `1.5rem` | Card headings, subcategory labels |
| `--text-feature` | `clamp(2rem, 3.3vw, 3rem)` | Pull-quotes, case study headlines |
| `--text-title-md` | `clamp(2.125rem, 4vw, 3.75rem)` | Section headings |
| `--text-title-lg` | `clamp(3.5rem, 6.6vw, 5.75rem)` | Hero display headlines only |

Font weight is always `--demi` (600) for headings and labels; `400` for body. Never introduce weight 500.

| Token | Value |
|---|---|
| `--demi` | `600` |

### Geometry

| Token | Value | Use |
|---|---|---|
| `--radius` | `32px` | Glass cards, surface containers, mega-menu |
| `--radius-xl` | `32px` | Same as --radius; reserved for future override |
| `--radius-sm` | `18px` | Inner frames, icon boxes, chips, nav items |
| `--radius-xs` | `6px` | Pills, tags, inline labels |
| `--shadow` | `0 28px 70px rgba(18,18,18,0.08), 0 8px 24px rgba(18,18,18,0.04)` | Ambient lift; glass cards at rest |
| `--glass` | `rgba(255,255,255,0.66)` | Glass fill shorthand |

### JS-Driven Tokens (do not set these in CSS)

These are set exclusively by `script.js` at runtime. CSS uses them for reactive effects.

| Token | Set by | Use |
|---|---|---|
| `--mx` | `setPointerVars()` | Pointer X position as % of viewport (0–100%) |
| `--my` | `setPointerVars()` | Pointer Y position as % of viewport (0–100%) |
| `--shine-x` | `setPointerVars()` | Pointer X relative to the hovered element |
| `--shine-y` | `setPointerVars()` | Pointer Y relative to the hovered element |
| `--tilt-x` | `setPointerVars()` | Normalized pointer X for 3D tilt (−1 to +1) |
| `--tilt-y` | `setPointerVars()` | Normalized pointer Y for 3D tilt (−1 to +1) |
| `--scroll` | `updateScrollProgress()` | Scroll progress as % (0%–100%); drives `.site-progress` width |

---

## 4. Spacing & Layout

### Spacing Scale

| Name | Value | Use |
|---|---|---|
| xs | `8px` | Icon gaps, chip padding, tight inline spacing |
| sm | `16px` | Component internal gaps |
| md | `22px` | Card padding, nav gap, standard component spacing |
| lg | `38px` | Section internal padding |
| xl | `54px` | Section vertical spacing between major blocks |

### Responsive Breakpoints

| Name | Value | Behavior |
|---|---|---|
| mobile | `640px` | Single column; nav collapses to hamburger |
| tablet | `768px` | Two-column grids unlock |
| desktop | `1024px` | Full layout with mega-menu |
| wide | `1280px` | Maximum content width; site container caps here |

> The actual media-query breakpoints in `styles.css` are `640px` and `980px` (nav collapse), not `768px`/`1024px` — see §13.

### Containers

- **Site container:** `min(1280px, calc(100% - 32px))` centered, 16px gutters on mobile
- **Mega-menu:** `min(1080px, calc(100vw - 32px))`, centered from nav bar
- **Body copy max-width:** `65ch`–`75ch` enforced by container constraint, never by `max-width` on the `<p>` itself

---

## 5. Colors

### Palette

| Name | Hex | CSS Token | Role |
|---|---|---|---|
| Applaudo White | `#f7f7f7` | `--neutral-50` | Page surface. The site lives on Applaudo White — was `--soft` |
| Surface Lift | `#ffffff` | `--color-surface-lift` | Raised band + card fill. Not one of the 52 values — was `--white` |
| Applaudo Black | `#121212` | `--neutral-900` | Default text, primary button fill. Nearly black, fractionally warm. Never `#000` — was `--black` |
| Applaudo Red | `#ff4040` | `--red-400` | Brand primary. Digital Transformation portfolio. Scroll bar + CTA glint on core surfaces — was `--red`, unchanged |
| Purple | `#a044e8` | `--purple-400` | Secondary. Knewton Ecosystem portfolio surfaces only |
| Orange | `#ff8833` | `--orange-400` | Secondary. Partner Products portfolio surfaces only |
| Yellow | `#fcba14` | `--yellow-400` | Secondary. Live Systems portfolio surfaces only |
| Blue | `#406cff` | `--blue-400` | Semantic: information. Never decorative |
| Green | `#21c759` | `--green-400` | Semantic: success. Never decorative |
| Divider Line | `rgba(18,18,18,0.08)` | `--line` | Borders, structural dividers. Structural, never decorative — unchanged |

The table above is the quick-reference subset actually wired into components today. The full 52-value system — all ten neutral steps and all seven steps of each chromatic ramp — is documented below and is live and available for use on demand: tints for backgrounds and badges, mid steps for borders and hover/active states, deep steps for text or dark-mode surfaces. Picking a step is about which visual role you need, not permission — the Usage Rules further down cover the one constraint that does matter (contrast), not which steps exist to use.

### Neutrals — Full Range

| Token | Hex | okL | vs White | vs Black |
|---|---|---|---|---|
| `neutral-50` | `#F7F7F7` | 0.976 | 1.00 | 17.49 |
| `neutral-100` | `#DEDEDE` | 0.901 | 1.26 | 13.92 |
| `neutral-200` | `#C4C4C4` | 0.820 | 1.63 | 10.74 |
| `neutral-300` | `#ABABAB` | 0.741 | 2.14 | 8.16 |
| `neutral-400` | `#919191` | 0.657 | 2.94 | 5.94 |
| `neutral-500` | `#787878` | 0.573 | 4.12 | 4.24 |
| `neutral-600` | `#5E5E5E` | 0.482 | 6.05 | 2.89 |
| `neutral-700` | `#454545` | 0.390 | 8.95 | 1.95 |
| `neutral-800` | `#2B2B2B` | 0.289 | 13.22 | 1.32 |
| `neutral-900` | `#121212` | 0.182 | 17.49 | 1.00 |

Secondary text on light: `neutral-600` (6.05). Secondary text on dark: `neutral-300` (8.16). No single gray clears AA on both grounds — `neutral-500` gives 4.12/4.24 and clears neither.

### Chromatic Ramps — Full Range

Each table gives contrast against both brand backgrounds and against pure white (for icons/type placed directly on the color itself). **Main is always the `400` step.** Values are computed on the definitive hex, in OKLCH (`okL`/`okC`/Hue), from the final brand SVGs.

#### Red — brand primary · Digital Transformation

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `red-100` | `#FFEFEF` | 0.965 | 0.017 | 17.5° | 1.04 | 16.81 | 1.11 |
| `red-200` | `#FFC8C8` | 0.881 | 0.063 | 18.4° | 1.37 | 12.80 | 1.46 |
| `red-300` | `#FF8D8D` | 0.767 | 0.138 | 20.8° | 2.08 | 8.43 | 2.22 |
| **`red-400`** | **`#FF4040`** | 0.660 | 0.227 | 26.0° | 3.24 | 5.41 | 3.47 |
| `red-500` | `#A12828` | 0.471 | 0.158 | 25.6° | 6.88 | 2.54 | 7.37 |
| `red-600` | `#751D1D` | 0.377 | 0.122 | 25.2° | 10.05 | 1.74 | 10.77 |
| `red-700` | `#521414` | 0.297 | 0.092 | 24.7° | 13.34 | 1.31 | 14.30 |

#### Purple — Knewton Ecosystem

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `purple-100` | `#F7F0FD` | 0.964 | 0.019 | 309.8° | 1.04 | 16.80 | 1.11 |
| `purple-200` | `#E4C8F9` | 0.872 | 0.073 | 310.6° | 1.41 | 12.43 | 1.51 |
| `purple-300` | `#C68EF3` | 0.739 | 0.152 | 308.6° | 2.29 | 7.64 | 2.45 |
| **`purple-400`** | **`#A044E8`** | 0.588 | 0.236 | 305.9° | 4.37 | 4.00 | 4.68 |
| `purple-500` | `#652A93` | 0.423 | 0.165 | 306.2° | 8.50 | 2.06 | 9.11 |
| `purple-600` | `#491E6A` | 0.339 | 0.128 | 306.7° | 11.69 | 1.50 | 12.52 |
| `purple-700` | `#33154B` | 0.271 | 0.097 | 306.5° | 14.52 | 1.20 | 15.56 |

#### Orange — Partner Products

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `orange-100` | `#FFF5EE` | 0.976 | 0.014 | 57.6° | 1.00 | 17.44 | 1.07 |
| `orange-200` | `#FFDDC4` | 0.919 | 0.050 | 58.4° | 1.20 | 14.62 | 1.28 |
| `orange-300` | `#FFB885` | 0.838 | 0.106 | 56.4° | 1.57 | 11.10 | 1.69 |
| **`orange-400`** | **`#FF8833`** | 0.746 | 0.171 | 51.6° | 2.22 | 7.87 | 2.38 |
| `orange-500` | `#A15520` | 0.532 | 0.119 | 51.5° | 5.11 | 3.42 | 5.47 |
| `orange-600` | `#753D17` | 0.424 | 0.093 | 51.3° | 8.05 | 2.17 | 8.62 |
| `orange-700` | `#522B10` | 0.335 | 0.070 | 52.4° | 11.45 | 1.53 | 12.27 |

#### Yellow — Live Systems

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `yellow-100` | `#FFF9EC` | 0.983 | 0.018 | 86.1° | 1.02 | 17.85 | 1.05 |
| `yellow-200` | `#FFEBBB` | 0.944 | 0.066 | 88.1° | 1.10 | 15.93 | 1.18 |
| `yellow-300` | `#FFD771` | 0.893 | 0.129 | 88.3° | 1.29 | 13.57 | 1.38 |
| **`yellow-400`** | **`#FCBA14`** | 0.828 | 0.168 | 82.2° | 1.61 | 10.86 | 1.73 |
| `yellow-500` | `#9F750D` | 0.589 | 0.118 | 82.6° | 3.90 | 4.48 | 4.18 |
| `yellow-600` | `#74550A` | 0.470 | 0.093 | 82.8° | 6.43 | 2.72 | 6.89 |
| `yellow-700` | `#513B08` | 0.367 | 0.070 | 82.9° | 9.91 | 1.77 | 10.61 |

#### Blue — semantic: information

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `blue-100` | `#EFF3FF` | 0.965 | 0.017 | 271.2° | 1.04 | 16.89 | 1.11 |
| `blue-200` | `#C8D5FF` | 0.877 | 0.060 | 271.6° | 1.36 | 12.86 | 1.46 |
| `blue-300` | `#8DA7FF` | 0.745 | 0.131 | 270.5° | 2.15 | 8.12 | 2.31 |
| **`blue-400`** | **`#406CFF`** | 0.588 | 0.224 | 266.6° | 4.08 | 4.29 | 4.37 |
| `blue-500` | `#2844A1` | 0.424 | 0.154 | 266.8° | 8.06 | 2.17 | 8.64 |
| `blue-600` | `#1D3075` | 0.339 | 0.121 | 267.7° | 11.32 | 1.54 | 12.13 |
| `blue-700` | `#142152` | 0.269 | 0.091 | 268.4° | 14.32 | 1.22 | 15.34 |

#### Green — semantic: success

| Token | Hex | okL | okC | Hue | vs White | vs Black | On pure white |
|---|---|---|---|---|---|---|---|
| `green-100` | `#EDFAF1` | 0.973 | 0.018 | 155.8° | 1.00 | 17.44 | 1.07 |
| `green-200` | `#BEF0CF` | 0.911 | 0.068 | 155.9° | 1.18 | 14.77 | 1.27 |
| `green-300` | `#79E09B` | 0.826 | 0.138 | 153.0° | 1.51 | 11.55 | 1.62 |
| **`green-400`** | **`#21C759`** | 0.727 | 0.199 | 148.5° | 2.09 | 8.37 | 2.24 |
| `green-500` | `#157D38` | 0.518 | 0.138 | 149.0° | 4.87 | 3.59 | 5.22 |
| `green-600` | `#0F5B28` | 0.415 | 0.108 | 149.1° | 7.70 | 2.27 | 8.24 |
| `green-700` | `#0B401B` | 0.328 | 0.083 | 148.9° | 11.12 | 1.57 | 11.91 |

### Portfolio Mapping

> **Pending replacement — portfolio → outcome color mapping.** Portfolios are staying as a category, but the plan is to stop coloring them: colors will map to *outcomes* instead, a new categorization not yet defined (no names, count, or color assignments decided — this is still being worked out). Until that's decided, the mapping below is the live, accurate one — don't remove it, and don't invent outcome names or reassign these colors ahead of the decision. **When it's decided, replace this table (and the Portfolio Surface Rule under Named Design Rules, §11) with the outcome mapping.**

| Portfolio | Color | Main |
|---|---|---|
| Digital Transformation | Red | `#FF4040` |
| Knewton Ecosystem | Purple | `#A044E8` |
| Partner Products | Orange | `#FF8833` |
| Live Systems / Operate and Protect | Yellow | `#FCBA14` |

Portfolio colors live on portfolio surfaces: service pages, proposal decks, architecture diagrams. The corporate brand remains Applaudo Red on neutral.

### Usage Rules

These govern **contrast for text and thin strokes** — they don't restrict which steps you can reach for elsewhere. Fills, tints, badges, borders, and hover/active states can use any step in a ramp; these four rules are what to check whenever a step is carrying text or a hairline.

**Colored text on light backgrounds:** use step `500`. Exception: yellow uses `600` (`yellow-500` gives 3.90 and misses AA).

| | Token | Hex | Contrast |
|---|---|---|---|
| Red | `red-500` | `#A12828` | 6.88 |
| Purple | `purple-500` | `#652A93` | 8.50 |
| Orange | `orange-500` | `#A15520` | 5.11 |
| Yellow | `yellow-600` | `#74550A` | 6.43 |
| Blue | `blue-500` | `#2844A1` | 8.06 |
| Green | `green-500` | `#157D38` | 4.87 |

**Colored text on dark backgrounds:** use step `300`. The `400` steps of purple (4.00) and blue (4.29) fall short of AA on Applaudo Black.

**Icons or text placed on a main color:** Applaudo Black works on all four portfolio colors with a floor of 4.00 — the only rule with no exception. White on `400`: purple 4.68, blue 4.37, red 3.47, orange 2.38, green 2.24, **yellow 1.73** — yellow never carries white; use Applaudo Black.

**Surface vs. type:** the `400` steps of orange, yellow, and green are field colors, not ink — 1.61 to 2.22 contrast on Applaudo White. For text and hairline borders, always use the step from the table above, not the main.

See the Kicker Exception in §11 for the one deliberate departure from the light-background rule.

### System Caveats

- **The token number does not predict contrast.** Step `400` ranges from okL 0.588 (purple, blue) to 0.828 (yellow) — on Applaudo White that's 4.37 vs. 1.61. Steps `100`, `600`, and `700` are aligned across ramps; `400` and `500` are not. Never assume two tokens with the same number behave the same way across ramps.
- **Purple and Blue sit at okL 0.588 exactly**, 39° of hue apart, OKLab distance 0.155 — the closest pair in the system, and it crosses categories (one is a portfolio identity, the other a system state). Separate them by more than color in small chips or badges.
- **Orange and Yellow are 0.121 apart** — the tightest portfolio pair. Partner Products and Live Systems need their own icon and label wherever they appear as a small chip.
- **Color vision deficiency:** all four portfolio colors hold up across the three CVD conditions; purple is what carries the palette. Two pairs fail, both semantic rather than brand: Green-400 ↔ Red-400 under deuteranopia (0.045) and Blue-400 ↔ Purple-400 under protanopia (0.044) — never encode state by color alone.
- **Storm Gray** (the pre-system `#535862`) has no place in the neutral ramp — resolved, not open: `neutral-600` (`#5E5E5E`) replaced it as a pure neutral without the blue cast.

### Color Rules

> **These two rules are rewritten from the pre-system version of this document, which described a monochrome-plus-one-red-accent palette.** That palette no longer exists — the system now defines four portfolio colors and two semantic colors. The rules below preserve the underlying intent (restraint; accent colors are structural, not decorative) rescoped to the actual system, rather than being deleted.

**The One Voice Rule — rescoped to core surfaces.** On core/corporate surfaces — home, services, footer, nav, any generic CTA — Applaudo Red is still the only accent color that appears. If you're considering a second color on these surfaces, cut the first use instead.

**The Portfolio Surface Rule — replaces the old Monochrome Field Rule.** Purple, Orange, and Yellow exist only on the portfolio surface each is mapped to (service pages, proposal decks, architecture diagrams for that portfolio — see Portfolio Mapping above). They never appear on core/corporate pages as decoration. Blue and Green are semantic only — information and success states — and never appear as brand decoration anywhere, including on portfolio surfaces.

---

## 6. Typography

**Single font family throughout:** `"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif`

No decorative display face, no serif contrast, no monospace accent.

### Scale

| Level | Token | Size | Weight | Line-height | Letter-spacing | Use |
|---|---|---|---|---|---|---|
| Display | `--text-title-lg` | `clamp(3.5rem, 6.6vw, 5.75rem)` | 600 | 1 | normal | Hero h1 only. Max ~10 words. |
| Headline | `--text-title-md` | `clamp(2.125rem, 4vw, 3.75rem)` | 600 | 1.04 | normal | Section h2 headings. |
| Feature | `--text-feature` | `clamp(2rem, 3.3vw, 3rem)` | 600 | 1.04 | normal | Case study headlines, pull-quotes. |
| Title | `--text-title-sm` | `1.5rem` | 600 | 1.2 | normal | Card headings, subcategory labels. |
| Body | `--text-body` | `1.0625rem` | 400 | 1.5 | normal | All explanatory copy. |
| UI | `--text-ui` | `0.875rem` | 600 | 1 | normal | Nav links, button labels. |
| Label | `--text-label` | `0.8125rem` | 600 | 1 | 0.04em | Eyebrows, chip labels, meta. |

### Typography Rules

**The Weight Gap Rule.** Display and Headline are always 600. Body is always 400. Never introduce weight 500 — it collapses the hierarchy's primary signal.

**All-caps prohibition.** Labels carry letter-spacing but never `text-transform: uppercase`. Weight alone signals hierarchy.

---

## 7. Elevation

Depth is conveyed through material (glass translucency) rather than shadow weight. Shadows are ambient and diffuse — wide spread, very low opacity, barely visible at rest.

### Shadow Tokens

| Name | Value | Use |
|---|---|---|
| Ambient Lift (`--shadow`) | `0 28px 70px rgba(18,18,18,0.08), 0 8px 24px rgba(18,18,18,0.04)` | Glass cards, case thumbnails, floating containers at rest |
| Deep Hover | `0 34px 90px rgba(18,18,18,0.13)` | Card hover state. One step up from Ambient Lift. |
| Header Float | `0 18px 48px rgba(18,18,18,0.08)` | Fixed navigation bar. Tighter spread than Ambient Lift. |
| Button Hover Depth | `inset 0 1px 0 rgba(255,255,255,0.18), 0 14px 30px rgba(18,18,18,0.18)` | Primary button hover. Inset creates top-edge specular; drop adds lift. |

### Elevation Rules

**Flat-By-Default Rule.** Interactive elements have no shadow at rest. Shadow appears only on hover. Never add a drop shadow to a non-interactive element.

**Glass Prerequisite Rule.** `backdrop-filter: blur()` is only meaningful when content exists visually behind the blurred surface. On solid backgrounds the effect is invisible — omit it rather than keep it for appearance's sake.

---

## 8. Motion

All easing is ease-out. No bouncing, no elastic curves, no spring physics.

### Easing

| Name | Value | Use |
|---|---|---|
| Exit Ease | `cubic-bezier(0.22, 1, 0.36, 1)` | UI transitions, menu opens, card hovers, button lifts |
| State Ease | `ease` | Short color/opacity/background transitions |

### Durations

| Name | Value | Use |
|---|---|---|
| Fast | `160ms` | Color, border, background state changes |
| Standard | `220ms` | Card hover, menu item transitions |
| Button | `260ms` | Button transform and box-shadow |
| Reveal | `560ms` | Scroll-triggered entrance animations |

### Scroll-Reveal Pattern

Add class `.reveal` to any section or container. `script.js` attaches an `IntersectionObserver` that adds `.is-visible` when the element enters the viewport. Animate from this in CSS:

```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 560ms cubic-bezier(0.22,1,0.36,1), transform 560ms cubic-bezier(0.22,1,0.36,1); }
.reveal.is-visible { opacity: 1; transform: none; }
```

Once visible the observer disconnects — no re-triggering on scroll-up.

### Motion Rules

- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`.
- No bouncing or elastic easing. Exit ease only.
- Always respect `prefers-reduced-motion` (handled globally in `styles.css` — see the `@media (prefers-reduced-motion: reduce)` block).

---

## 9. Components

### 9.1 Navigation Bar

**Class:** `.site-header` | rendered directly in `kitchensink.html` under the Navigation section

| Property | Value |
|---|---|
| Position | `fixed`, `top: 18px`, centered via `left: 50%; transform: translateX(-50%)` |
| Width | `min(1280px, calc(100% - 32px))` |
| Min-height | `68px` |
| Padding | `12px 14px 12px 24px` |
| Background | `rgba(255,255,255,0.72)` |
| Backdrop | `blur(22px) saturate(1.25)` |
| Border | `1px solid rgba(255,255,255,0.74)` |
| Border-radius | `999px` (pill) |
| Shadow | Header Float: `0 18px 48px rgba(18,18,18,0.08)` |
| Z-index | `50` |
| Grid | `auto 1fr auto` (logo / nav / CTA) |

**Nav link states:**

| State | Background | Color | Border |
|---|---|---|---|
| Rest | transparent | `rgba(18,18,18,0.72)` | none |
| Hover / Active | `rgba(18,18,18,0.04)` | `#121212` | inset `1px solid rgba(18,18,18,0.08)` |
| Focus-visible | `rgba(18,18,18,0.04)` | `#121212` | inset `1px solid rgba(18,18,18,0.14)` |

**Mega-menu:**
- Radius: `32px`, background: `rgba(255,255,255,0.64)`, backdrop: `blur(34px) saturate(1.3)`
- Max-width: `min(1080px, calc(100vw - 32px))`; never full-width
- Open: `opacity: 1; transform: translateX(-50%) translateY(0) scale(1)`
- Closed: `opacity: 0; transform: translateX(-50%) translateY(10px) scale(0.985); pointer-events: none`
- Transition in: `opacity 180ms ease, transform 220ms cubic-bezier(0.22,1,0.36,1)`

**Mobile nav:** Collapses below `980px`. Hamburger opens full-screen overlay. `body.menu-open` locks scroll.

---

### 9.2 Scroll Progress Bar

**Class:** `.site-progress`

```css
position: fixed; top: 0; left: 0; z-index: 80;
width: var(--scroll);   /* driven by JS */
height: 3px;
background: linear-gradient(90deg, var(--red-400), rgba(255,64,64,0.26));
transition: width 80ms linear;
```

The only place brand red appears as a fill color on core surfaces besides the button glint. Width is `0%`–`100%` driven by `--scroll`.

---

### 9.3 Buttons

Two variants only. Both use pill radius. Both share the same interactive pseudo-element glint system.

> **Class names corrected.** This reference build uses `.button-black` / `.button-white` — not `.button-red` / `.button-glass` as an earlier version of this document stated. The specs below match the actual CSS.

#### Primary Button (`.button.button-black`)

| Property | Value |
|---|---|
| Background | `#121212` (Applaudo Black) |
| Text color | Applaudo White (`--neutral-50`, `#f7f7f7`) |
| Border | `1px solid transparent` |
| Border-radius | `999px` |
| Padding | `0 22px` |
| Min-height | `44px` |
| Font | `0.875rem / 600` |
| Icon gap | `12px` |

| State | Transform | Shadow |
|---|---|---|
| Rest | none | none |
| Hover | `translateY(-1px)` | Button Hover Depth |
| Active | `translateY(0) scale(0.985)` | — |
| Focus-visible | none | `inset 0 0 0 1px rgba(255,255,255,0.3), 0 0 0 3px rgba(18,18,18,0.15)` |

#### Secondary Button (`.button.button-white`)

| Property | Value |
|---|---|
| Background | `rgba(255,255,255,0.64)` |
| Text color | `#121212` (Applaudo Black) |
| Border | `0.5px solid rgba(18,18,18,0.1)` |
| Border-radius | `999px` |
| Backdrop | `blur(20px) saturate(1.35)` |
| Inner shadow | `inset 0 1px 0 rgba(255,255,255,0.7)` |
| Padding | `0 22px` |
| Min-height | `44px` |
| Font | `0.875rem / 600` |

| State | Transform | Background |
|---|---|---|
| Rest | none | `rgba(255,255,255,0.64)` |
| Hover | `translateY(-1px)` | `rgba(255,255,255,0.82)` (border → `rgba(18,18,18,0.14)`) |
| Active | `translateY(0) scale(0.985)` | — |

**Two-Button Rule.** Every primary CTA section pairs exactly one `.button-black` with one `.button-white`. Black is the action; White is the deferral. Never two black buttons together.

**Glint effects:** Both buttons use `::before` / `::after` pseudo-elements driven by `--shine-x` / `--shine-y` for a cursor-following highlight. These are implemented in `styles.css` — preserve them when copying button HTML. The glint's internal gradient stops (cyan/magenta/amber) are optical effects, not brand colors, and are unaffected by the color system update.

**Ported to React.** `src/components/ui/button.tsx` implements this: a `.btn-glint` / `.btn-glint-black` / `.btn-glint-white` layer in `src/styles/globals.css` (faithful port of `styles.css:979-1192`, using the same `button-glass-dark.png` / `button-glass-light.png` overlays) plus an `onPointerMove` handler that sets `--shine-x` / `--shine-y` from the pointer position, mirroring `script.js`'s `setPointerVars`. One adaptation: the glint pseudo-elements use `z-index: -2` / `-1` (source used `0` / `1`) so they sit between the button's own background and its text/icon content without requiring callers to wrap children in a `z-indexed <span>` — visually equivalent, no consumer-facing API change.

**Icon Button.** `.icon-button` (`styles.css:956, 1194-1201`) — a solid 48px black pill: `background: var(--black)`, `color` on-dark, `box-shadow: 0 12px 30px rgba(18,18,18,0.08)`, `backdrop-filter: blur(18px)`, same pill radius and hover-lift/active-scale as `.button`. No glint (glint is `.button`-only). Ported as `src/components/ui/icon-button.tsx`; used for the nav's mobile menu toggle.

### 9.3.1 Components ported to React

Everything in `src/components/ui/` is a port of a pattern documented here, not a fresh interpretation. When adding a page, consume these rather than re-deriving the markup from `kitchensink.html` again.

| React component | Ported from | Notes |
|---|---|---|
| `button.tsx` | `.button-black` / `.button-white` (§9.3) | Includes the cursor-following glint. |
| `icon-button.tsx` | `.icon-button` | 48px solid black pill. |
| `stats-row.tsx` | `.stats-row` + count-up (`script.js:325-356`) | IntersectionObserver at 0.16 threshold triggers a quartic-eased count-up (`980ms + 120ms` per index) and a staggered reveal (90ms per index; icon +80ms). Skips straight to final values under `prefers-reduced-motion`. |
| `recognition.tsx` | `.recognition-layout` (`.award-feature` + `.partner-badge-grid`) | Award figure beside two 4-up badge rows. |
| `logo-cloud.tsx` | `.logo-cloud` | 80px logos, grayscale at 0.78 opacity, color + lift on hover. Source hardcodes 8 columns; the port uses auto-fit tracks so pages showing only a few logos still read correctly, and takes a `className` when a page wants a fixed row. |
| `section.tsx` | `.section` / `.section-inner` / `.section-heading` | The structural unit: one 1180px content width, `clamp(72px,8vw,108px)` vertical rhythm, 24px gutters, and the `base`/`lift` surface tone. Sections never set their own width. |
| `pillar.tsx` | `.services-pillars` / `.service-pillar` | Numbered index, black icon disc, glass reveal with pointer-tracked red bloom, and sibling dimming to 0.62 / `translateY(18px) scale(0.985)`. Dimming uses `:has()` instead of the source's JS `.has-active` class, so keyboard focus is covered with no state to sync. |
| `glass-card.tsx` | `.glass-card` | Pointer-tracked red bloom, `blur(24px) saturate(1.4)`. `interactive` adds the hover lift. |
| `reveal.tsx` | `.reveal` | 26px rise, 700ms, once. |
| `site-footer.tsx` | `.site-footer` | The three-block footer shared across every page. |
| `case-grid.tsx` | `.case-grid` / `.case-card-feature` / `.case-card-h` | One feature case beside two stacked horizontal cases, hairline centred in the column gap. **The reference's `.case-visual` backgrounds point at Unsplash URLs** — placeholders that break offline and are stock photography, one of this brand's stated anti-references. The port uses the commissioned glass renders in `public/assets/photos` instead, and squares off the aside crops (the source's shared 240px height assumes photographic content and turns an abstract render into an unreadable strip at 136px wide). |

**Tone pairing (learned the hard way).** Translucent surfaces need the *gray* tone under them. `.service-pillar` rests at `rgba(255,255,255,0.28)` and `.glass-card` at 0.82/0.46 — on `--color-surface-lift` (`#ffffff`) both disappear entirely; on `--color-surface` (`#f7f7f7`) they read as intended. This is why the kitchensink puts its glass sections (`.work-section`, `.recognition-section`) on `--color-surface`. Put pillars and glass cards on `tone="base"`; plain-content sections take `tone="lift"`.

**Icons are RemixIcon, everywhere.** The reference build loads RemixIcon 4.6 by CDN; the React port uses `@remixicon/react`, which compiles to inline SVG so it works offline in the single-file build. `lucide-react` was used briefly and has been removed from the project — do not reintroduce a second icon family. Where the reference already named an icon, the port keeps that exact one (`ri-global-line`, `ri-stack-line`, `ri-loop-right-line`, `ri-menu-line`, `ri-arrow-down-s-line`, and the footer socials).

**Section background art.** A photographic or rendered section background needs a scrim, not just low opacity — `PartnersHero.jpg` at full strength drove a hard red swoosh straight through body copy. The Landing "How it composes" section pairs `bg-cover` with a `before:` layer at `bg-surface-lift/78`, and `Section`'s inner container carries `relative z-10` so content always sits above it.

**Section heading size.** The system's default `h2` is `--text-section-title` (`clamp(1.75rem, 2.8vw, 2.5rem)`). `--text-title-md` is for the rare oversized section head and `--text-title-lg` is hero-only — using either as the routine section heading overpowers the 0.42fr heading column.

**`cn()` must know the theme's scales.** tailwind-merge only understands Tailwind's stock scales, so it read named sizes like `text-ui` and `text-body` as possible *text colors* and dropped them whenever a color sat in the same `cn()` call: `cn("text-ui", "text-neutral-50")` returned only `text-neutral-50`. Every Button therefore rendered at the inherited 17px instead of its specified 14px, and the same blindness had already caused the `max-w-narrow` bug. `src/lib/utils.ts` now registers the theme's `font-size` and `max-w` keys with `extendTailwindMerge`. Any new named size added to `@theme` must be added there too, or it will silently stop applying next to a color.

**One size, one token.** Every font size in the app resolves to a `--text-*` token; there are no arbitrary `text-[…]` font sizes. An audit found 25 arbitrary values covering 6 sizes that were off-scale (11px, 12px, 15px, 15.84px, 22px) plus 5 that merely restated an existing token. Off-scale values were mapped to the nearest token and `--text-stat` was added for the one genuinely distinct spec size (`.stats-row strong`). Rendered distinct sizes on the landing page: 15 → 10. `--text-title-xs` (1.25rem) fills the gap between body (17px) and `title-sm` (24px): compact card headings (outcome pillars) and stat figures sit there, so a card's name still outranks its number. The tab selector in "How it composes" uses `text-body` — it is a control, not a heading.

**Breakpoints — do not mix families.** Tailwind emits this project's custom breakpoints (`--breakpoint-mobile: 640px`, `--breakpoint-tablet: 981px`, matching the legacy build's own two breakpoints) *before* its built-in ones, regardless of value. So a default variant (`sm:`, `lg:`, …) beats `mobile:`/`tablet:` in the cascade at any width where both match — `sm:grid-cols-2 tablet:grid-cols-4` silently renders 2-up on desktop. Use only `mobile:` and `tablet:`.

---

### 9.4 Glass Card (`.glass-card`)

The signature surface. Pointer-reactive red radial highlight, frosted glass, ambient shadow.

| Property | Value |
|---|---|
| Background | `linear-gradient(145deg, rgba(255,255,255,0.82), rgba(255,255,255,0.46))` |
| Border | `1px solid rgba(255,255,255,0.76)` |
| Border-radius | `32px` |
| Backdrop | `blur(24px) saturate(1.4)` |
| Shadow (rest) | Ambient Lift |
| Padding | `28px 32px` |

| State | Transform | Shadow |
|---|---|---|
| Rest | none | Ambient Lift |
| Hover | `translateY(-4px)` | Deep Hover |

The red radial highlight is applied via CSS using `--shine-x` / `--shine-y` and is set to ~8% Applaudo Red (`rgba(255,64,64,0.08)`) — unchanged; `--red-400` did not change value. `script.js` updates these on `mousemove` for every `.glass-card`.

---

### 9.5 Case Card (`.case-card`)

Editorial work showcase. No glass. Defined by a top rule and generous spacing.

| Property | Value |
|---|---|
| Top border | `1px solid rgba(18,18,18,0.12)` |
| Padding bottom | `28px` |
| No side borders | — |

**Visual container:** `32px` radius, Ambient Lift shadow.

| State | Transform | Shadow |
|---|---|---|
| Card hover (visual) | `translateY(-4px)` | Deep Hover |

**Grid layout:** Asymmetric 2-column grid with the feature case spanning two rows via a stacked `.case-aside`. Never a uniform grid.

---

### 9.6 Industry Tile (`.industry-tile`)

| Property | Value |
|---|---|
| Border-radius | `32px` |
| Background | Full-bleed image with dark gradient overlay |
| Layout | Grid, collapses responsively |

| State | Transform | Shadow |
|---|---|---|
| Rest | none | none |
| Hover | `translateY(-4px)` | Deep Hover |

---

### 9.7 Section Heading Pattern

Standard opener for every major section: eyebrow kicker → headline → optional subhead.

```html
<p class="eyebrow">Label text</p>
<h2>Section headline</h2>
<p class="hero-subhead">Supporting copy. Max 65–75ch.</p>
```

| Class | Size | Weight | Color |
|---|---|---|---|
| `.eyebrow` | `--text-label` | 600 | `--red-400` (was `--muted`; eyebrows are colored red in this build, not gray — verified against `styles.css`). **Deliberate exception to the Usage Rules' light-background text step** — see the Kicker Exception in §11. |
| `h2` | `--text-title-md` / `--text-section-title` | 600 | `--neutral-900` |
| `.hero-subhead` | `--text-body` | 400 | `rgba(18,18,18,0.72)` |

---

## 10. Asset Map

All asset files live in **`public/assets/`**. Vite serves them at `/assets/…`, while the legacy reference build accesses the same files directly with `../../public/assets/…` paths. There is one canonical copy of every asset.

```
public/assets/
  brand/
    applaudo.svg              Logo (used in nav, footer)
  clients/
    *.svg                     Client logos for logo bar (14 clients)
    Industries Cards/
      *.svg                   Client logos for industry tile overlays
  effects/
    button-glass-dark.png     Glint overlay for dark glass buttons
    button-glass-light.png    Glint overlay for light glass buttons
    glass-1.jpeg              Glass texture reference
  partners/
    AWS.svg                   AWS wordmark
    Google Cloud.svg          Google Cloud wordmark
    Microsoft.svg              Microsoft wordmark
    aws-partner.svg            AWS partner badge
    google-cloud-partner.svg   GCP partner badge
    microsoft-partner.svg      Microsoft partner badge
    google-cloud-cosell.svg    GCP co-sell badge
    google-cloud-services.svg  GCP services badge
    salesforce-partner.svg     Salesforce badge
    fortinet-partner.svg       Fortinet badge
    mandiant-partner.svg       Mandiant badge
  photos/
    HeroImage.png              Home hero photo
    IndustriesHero.jpg         Industries page hero
    PartnersHero.jpg           Partnerships page hero
    work-hero.webp             Work/case-studies page hero
    DifferentPartner.png       Partnership differentiator section
    qupte.png                  Quote/testimonial photo
  stack/
    anthropic-logo.svg         AI model partner logo
    claude-logo.svg            AI model partner logo
    google-gemini-logo.svg
    microsoft-copilot-logo.svg
    openai-logo.svg
  ui/
    ai-spark.svg               Decorative spark icon used in chip components
  video/
    Glass_forward.mp4          AI stack section (scrubs forward with pointer)
    ServicesBanner.mp4         Services hero background video
    ServicesBanner_1.mp4       Services hero background video, alternate
    AWS.mp4                    AWS partner section video
    Google.mp4                 Google Cloud partner section video
    microsoft.mp4              Microsoft partner section video
```

> **Corrections from an earlier version of this map:** `photos/ai-stack.jpg` and `video/Glass_backward.mp4` are referenced by an earlier draft of this document but do not exist in `assets/` — remove any code path that expects them, or supply them before shipping. `stack/claude-logo.svg`, `photos/work-hero.webp`, and `video/ServicesBanner_1.mp4` exist in `assets/` and are used by `kitchensink.html` but were missing from the earlier map — added above.

---

## 11. Named Design Rules

These rules must not be broken without explicit design approval. They are not preferences — they are the load-bearing constraints that make the system coherent.

| Rule | Constraint |
|---|---|
| **The One Voice Rule** *(rescoped)* | On core/corporate surfaces, Applaudo Red is the only accent color. If you're adding a second color there, cut the first use instead. Portfolio pages are governed by the Portfolio Surface Rule below, not this one. |
| **The Portfolio Surface Rule** *(replaces the old Monochrome Field Rule; itself pending replacement by an outcome-based rule — see the Portfolio Mapping note in §5)* | Purple, Orange, and Yellow each belong to exactly one portfolio and appear only on that portfolio's own surfaces. Blue and Green are semantic (info/success) only — never decorative, on any surface. |
| **The Weight Gap Rule** | Headings: 600. Body: 400. Never introduce weight 500 — it collapses the hierarchy's primary signal. |
| **The Single Family Rule** | Avenir Next at every level. No secondary typeface anywhere. |
| **The Flat-By-Default Rule** | Interactive elements have no shadow at rest. Shadow appears only on hover. Never drop-shadow a non-interactive element. |
| **The Glass Prerequisite Rule** | `backdrop-filter: blur()` is only meaningful when content exists behind the surface. On solid backgrounds, omit it. |
| **The Two-Button Rule** | Every CTA section pairs exactly one `.button-black` with one `.button-white`. Never two black buttons. Never a solo black button. |
| **The Asymmetric Grid Rule** | Case study and work grids must be asymmetric. Feature item spans two rows. Never identical-size card grids. |
| **The Kicker Exception** *(new)* | `.eyebrow`, `.tagline`, `.section-kicker`, and the nested `.case-card .tagline` / `.note-card .tagline` are the one place colored text intentionally stays at `red-400` instead of the Usage Rules' AA-compliant `red-500` — a deliberate brand-recognition call, not an oversight. Every other colored-text use in the build (`.mega-view-all`, `.engagement-card span`, the active `.service-pillar .pillar-index`, `.partner-stack-row`/`.partner-lead-card`/`.partner-marketplace-card span`, `.partner-card-cta`) was fixed to `red-500` to meet the Usage Rules' contrast floor. Don't extend the exception to new components without the same explicit call. |

---

## 12. Do's and Don'ts

### Do

- Use `--red-400` on core surfaces the way the old palette used `--red`: sparingly, as the single accent.
- Use `-500` (yellow: `-600`) for colored text under ~18px — the Usage Rules' contrast floor — except the eyebrow/kicker pattern, which is the one documented exception (see the Kicker Exception, §11). Any ramp step is fair game for fills, tints, borders, and hover/active states; the floor only binds text and hairlines.
- Use Purple, Orange, and Yellow only on their own mapped portfolio surfaces — never mixed, never on core pages.
- Use pill radius (`999px`) for all buttons and nav elements. Use surface radius (`32px`) for cards and containers.
- Maintain the weight gap: headings 600, body 400.
- Pair every `.button-black` with exactly one `.button-white`.
- Keep shadows ambient: wide spread, low opacity, barely visible at rest.
- Use `backdrop-filter` only when content exists behind the surface.
- Keep case/work grids asymmetric — feature item must be larger.
- Animate `transform` and `opacity` only.
- Use `cubic-bezier(0.22, 1, 0.36, 1)` for entrance transitions; `ease` for short state changes.
- Keep body copy to 65–75ch max.
- Trigger scroll reveals once and disconnect the observer after firing.

### Don't

- Don't use neon grids, glowing orbs, particle effects, or spectacle motion.
- Don't use institutional navy, conservative serif headers, or stock handshake photography.
- Don't use gradient text (`background-clip: text`). Emphasis via weight and scale only.
- Don't use a colored `border-left` / `border-right` stripe as decoration on cards or callouts.
- Don't use identical-size card grids. Repetition without variation reads as template work.
- Don't introduce a modal as a first-choice interaction pattern.
- Don't use Blue or Green as decoration — they are semantic-only, on every surface, including portfolio pages.
- Don't mix two portfolio colors (e.g. Purple and Orange) on the same surface.
- Don't bounce or use elastic easing.
- Don't hardcode hex values in new CSS — use the CSS custom properties from Section 3, or the Tailwind utilities in the React app's `src/styles/tokens.css`.
- Don't add external JS libraries to this reference build without discussing it — it is intentionally dependency-free. (The React app is a separate build and already uses Radix + Tailwind by design.)

---

## 13. CSS Architecture

`styles.css` in this folder is a single file, ~6,970 lines after the color-system port (grew from ~5,027 — the `:root` token block alone expanded from 32 lines to ~136 to hold all 52 color values plus their legacy aliases). No preprocessor, no modules.

**Line numbers are not used below** — they drift every time the file is edited, and already drifted once during this port. Find sections by selector or by the banner comments in the file instead:

| Selector / banner comment | Section |
|---|---|
| `:root {` | **Custom Properties** — all color, type, geometry, and JS-driven tokens |
| `* {`, `body {`, `.site-progress {` | **Global Reset & Base** |
| `.site-header {` … `.two-col-menu` | **Navigation** — mega-menus, nav triggers |
| `.hero {` … `.hero-glass-accent` | **Hero Section** |
| `.ai-stack-section {` … `.ai-spark-chip` | **AI Stack Section** |
| `.eyebrow,` / `h1 {` / `p {` | **Global Type & Value Prop** |
| `.button,` / `.button::before` | **Button Base + Glint System** — the most complex CSS in the file; read carefully before touching button styles |
| `.button-black {` / `.button-white {` | **Button Variants** |
| `.focus-layout {` … `.stats-row` | **Stats Section** |
| `.logo-cloud,` | **Logo Cloud / Trust** |
| `.reason-visual {` … `.reason-item` | **Reason Cards** |
| `.glass-card {` … `.visual-*` | **Case Studies** |
| `.industry-stage {` … `.industry-board` | **Industries Section** |
| `.industry-tile-grid {` | **Industry Tiles** |
| `.engagement-card {` … `.notes-grid` | **Engagement & Notes** |
| `.note-feature {` … `.note-row` | **Notes Layout** |
| `.final-cta,` / `.services-final-cta,` | **Final CTA** — glass texture background |
| `.services-hero {` … `.services-hero-copy` | **Services Hero** |
| `.services-pillars {` … `.service-pillar` | **Services Pillars** |
| `.services-directory {` | **Services Directory** — hover-reveal background image system |
| `.services-proof-layout,` / `.partner-proof-card` | **Services Proof** |
| `.partner-hero-badge {` … `.partner-stack-row` | **Partner Pages** |
| `.partner-lead-card {` / `.partner-cosell-copy` | **Partner Co-sell & Lead Cards** — orange theming (`--aws-orange`, now aliased to `--orange-400`) |
| `.site-footer {` … `.recognition-layout` | **Footer** |
| `.reveal {` / `@keyframes` | **Reveal Animations**, `prefers-reduced-motion` query |
| `@media (max-width: 980px)` | **Tablet** — nav collapses, grid reflows to single column, hamburger menu |
| `@media (max-width: 640px)` | **Mobile** — section padding reductions, font size adjustments |
| `@media (min-width: 981px)` | **Wide** — minor `h1` line-height refinement |
| `/* Partnerships page */` | **Partnerships Page** — hero, partner card grid, proof bar, recognition layout |
| `/* INDUSTRIES PAGE */` | **Industries Page** — argument section, panel grid, secondary industries, pullquote |
| `/* WORK PAGE */` | **Work Page** — featured case grid, testimonials, customer story browser |
| `/* WORK ENTRY — DETAIL PAGE */` | **Work Entry Detail** — per-case-study page template |
| `/* HOME — WHAT WE SOLVE */` | **Solve Module** — tabbed list + cross-fading panel |

### Navigation tips

- All media queries are at the bottom of the file — desktop styles come first throughout.
- Page-specific style blocks are marked with `/* ===== … ===== */` or `/* ═══ … ═══ */` banner comments; search for those rather than counting lines.
- The button glint system is the most complex CSS in the file — read it carefully before touching button styles.
- Partner page orange theming uses `--aws-*` tokens defined on `:root`, aliased to the Orange ramp (`--orange-400`, `--orange-200`, `--orange-100`) — see §3.

---

## 14. Component Gallery

Open [kitchensink.html](kitchensink.html) in a browser to see every component rendered live with hover effects, glint interactions, and exact class names labeled — including a full 52-value color reference in its Colors section. Use it as the primary reference when building new sections. Mega-menu, tab, carousel, and filter *interactivity* is driven by `script.js` (see §1) — open the file in a browser rather than a static preview to see it work.
