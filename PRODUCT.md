# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Enterprise decision-makers across the full buying committee: CTOs, VPs of Engineering, technical architects, and business leaders evaluating AI partners. They arrive with varying depth of technical knowledge but uniform high standards. They are skeptical, time-pressured, and have seen too many vendors over-promise. They are not easily impressed by aesthetics alone; they need to feel that Applaudo understands their problem before they'll invest 30 minutes on a call.

Primary industries: Financial Services, Retail, Travel, Sports and Media. Primary geography: the Americas.

## Product Purpose

Applaudo is an enterprise AI engineering consultancy. The site exists to move a skeptical but curious enterprise buyer from "who is this?" to "I want to talk to these people." Success is a scheduled conversation with an Applaudo engineer or account lead. The site's job is not to explain AI, not to educate the market, and not to impress designers. It is to make a serious buyer trust Applaudo enough to give them time.

## Positioning

**Resolved via approved landing-page copy: "One partner, from idea to operation."** The claim is full-lifecycle, single-accountability delivery — Applaudo builds, deploys, and operates digital products with AI in every layer, with one company staying accountable across all of it, rather than a buyer stitching together separate vendors per lifecycle stage. This supersedes the earlier "offer being reworked, no claim yet" status; treat this as the standing positioning claim going forward unless told otherwise.

## Operating Context

Evaluated by enterprise buying committees during vendor selection, typically alongside competing AI/engineering consultancies and often before or in place of an initial call. Readers are time-pressured and comparing multiple vendors, so the site is frequently one tab among several rather than a leisurely visit.

The product itself (the consultancy's service) is delivered as embedded engineering engagements with enterprise clients — the site is marketing/sales collateral for that service, not the service's own operating surface.

## Capabilities and Constraints

- Built as a React 19 + Vite 7 + Tailwind CSS v4 app, using Radix primitives via shadcn/ui, on top of the Applaudo Color System (52 tokens, documented in `reference/legacy/DESIGN.md` §5) and its port into `src/styles/tokens.css`.
- Currently mid-migration: the only React surface that exists today is a token/component gallery (`src/App.tsx`). The real site pages — Home, Services, Industries, Work/Case Studies (with per-case detail pages), Partnerships — exist only in the pre-React reference build (`reference/legacy/kitchensink.html` + `styles.css`) and have not been ported yet.
- **Decided: site pages port as a multi-page Vite build, not a client-routed SPA.** Each page (Home, Services, Industries, Work, Partnerships, ...) gets its own real HTML entry and its own bundle, wired through one Vite multi-entry `rollupOptions.input` — matching the previous static site's one-file-per-page shape (N pages → N files), but now built from shared React components instead of copy-pasted HTML. Built normally for a real host (not the `vite-plugin-singlefile` inlining used for `landing.html`, which stays a one-off: the only surface with a "no server, no build step, double-click to open" requirement). Each new page's HTML entry is real build machinery, same category as `index.html`/`landing-entry.html` today — not deletable once the page exists, but not something anyone edits directly either.
- **The offer is now structured around four "outcomes," each delivered by composing four "portfolios."** Confirmed via approved landing-page copy; supersedes the "undecided" note that used to sit here. The color system's current portfolio→color mapping in `reference/legacy/DESIGN.md` §5 is still what's live in code and is unaffected until the item below is resolved.
  - **Outcomes** (the client-facing lead category — this is the dimension that gets color, per the earlier portfolio→outcome decision): **Launch** (bring a new product/channel to market; measured by time to market, adoption), **Modernize** (remove technology constraints on the business; measured by operating cost, release velocity, resilience), **Automate** (reduce manual work and process friction via governed agentic systems; measured by cycle time, errors, straight-through processing), **Operate & Protect** (continuity, cybersecurity, ongoing evolution; measured by SLA/availability, incidents/response time, operating cost, evolution cadence). Each outcome carries two of four cross-cutting "commitments": Efficient, Scalable, Secure, Available.
  - **Portfolios** (the delivery engine underneath; any portfolio can be the entry point for any outcome, and they compose together rather than being exclusive to one outcome): **Agentic Engineering for the Enterprise** (the engineering foundation — 15 products: 7 digital products + 8 agentic systems, each across Define/Frame/Build/Run), **Knewton Ecosystem** (4 product lines: Product Strategy, QA, AI Marketplace, Knewton for Government), **Partner Platforms** (Microsoft/Azure, Google Cloud, AWS; 5 modes: license, implement, extend, operate, optimize), **Managed Operations and Cybersecurity** (5 capability groups: observe, test, defend and respond, run and support, evolve — the delivery vehicle for the Operate & Protect outcome specifically).
  - **Inferred, not confirmed:** these four portfolio names read as renames/evolutions of the four currently documented in `reference/legacy/DESIGN.md` §5 — Digital Transformation → Agentic Engineering for the Enterprise; Partner Products → Partner Platforms; Live Systems / Operate and Protect → Managed Operations and Cybersecurity (with "Operate & Protect" now also an outcome name); Knewton Ecosystem unchanged. This mapping has not been explicitly confirmed — verify before updating the color system's Portfolio Mapping table and Named Design Rules.
  - **Still open, deliberately deferred:** which of the four existing colors (Red, Purple, Orange, Yellow) maps to which of the four outcomes. Decided approach until then: build outcome distinction without dedicated color (icons, typography, position) rather than guess a mapping — this also sidesteps the One Voice Rule tension (outcomes appearing together on a core surface with four different colors) until color assignment is actually decided.
- `reference/legacy/script.js` (612 lines) does implement the interactivity referenced in `kitchensink.html` — mega-menus, tab panels, testimonial carousel, story filters, scroll reveals, pointer/tilt effects, video scrubbing, stat count-up. (`README.md`'s "Known gaps" note claiming it was never provided is stale.) It's still vanilla JS, not React — this behavior is expected to be rebuilt as React state during the port, not restored verbatim.

## Brand Commitments

- Name: **Applaudo**. Logo asset: `public/assets/brand/applaudo.svg`.
- Voice/personality: expert, bold, human. Technically authoritative without being cold; confident without being arrogant. Speaks like the smartest engineer in the room who also knows how to talk to the board. The visitor should feel they're already in a conversation with someone who understands their problem, not being sold to.
- Single typeface throughout: Avenir Next (`"Avenir Next", Avenir, "Helvetica Neue", Arial, sans-serif`) — no secondary typeface anywhere (the Single Family Rule, `reference/legacy/DESIGN.md` §11).
- Identity constraints — three explicit anti-references the brand must not resemble:
  - **AI hype marketing** (GPT-wrapper aesthetics): neon particle grids, floating orbs, infinite scroll effects, "the future of AI is here" copy, generic tech iconography.
  - **Big 4 consulting** (McKinsey/Accenture/Deloitte): navy institutional palettes, conservative serif headers, stock handshake/glass-building photography, pitch-deck copy.
  - **Agency portfolio** (Dribbble aesthetic): colorful case-study grids, pastel gradients, "we craft digital experiences" language, work shown for visual impact over business outcome.

## Evidence on Hand

Confirmed real and usable (not placeholder):
- **Client testimonials** in `reference/legacy/kitchensink.html` (anonymized by role/company-type, e.g. "VP, Software Development — Risk Management Company") — genuine client feedback.
- **Case-study headlines** in the same file (e.g. "A Fortune 1 retailer rebuilt inventory forecasting around AI and predictive analytics") — describe real engagements; client-specific details still need to be filled in.
- **Company stats**: 27 countries, 12+ years in production, 90% client retention, founded 2013 — current and accurate.
  - **Confirmed rule (resolved conflict): do not cite engineer headcount.** A landing-page copy draft included "800+ Engineers" as a headline stat; the user chose to keep the standing no-headcount rule instead and drop that line. Don't invent a replacement number for that slot either — a stats row loses that entry rather than gaining a substitute.
- **Founding & locations**: founded 2013 in El Salvador; offices in Austin, TX and San Salvador, SS.
- **Partner/certification standing**: Google Cloud Partner of the Year 2026 (Public Sector, Latin America); Premier partner status with AWS, Microsoft, and Salesforce; ISO 27001 certified.
- **Broader client description**: Fortune 500 and Fortune 1 companies, NBA franchises, the NCAA, airlines, luxury hospitality, and financial institutions across the Americas — consistent with, and broader than, the named clients below.
- **Client logo set** in `public/assets/clients/` (Walmart, NBC Sports, Ritz-Carlton, Golden State Warriors, NCAA, Taco Bell, Miami Heat, Bain, Dollarama, Holiday Inn, Rappi, SXSW, Volaris, Atlantida Banco, Cuscatlan Banco, Blackhawk Network, Multimoney, Onlife, MRO Solutions, Keller Williams, Lifemiles) — cleared for public display. A landing page names Walmart, NBC, and Ritz-Carlton specifically.
- **Partner/technology ecosystem** logos in `public/assets/partners/` and `public/assets/stack/`: cloud/platform partners AWS, Google Cloud, Microsoft, Salesforce, Fortinet, Mandiant; AI model partners Anthropic (Claude), OpenAI, Google Gemini, Microsoft Copilot.

State absences future work must not fabricate:
- No numeric case-study outcomes beyond the confirmed stats above.
- Which color maps to which outcome (see Capabilities and Constraints) — don't invent an assignment.

## Product Principles

1. **Credibility over beauty.** Every design choice should earn trust, not admiration. If an element looks impressive but doesn't build confidence in Applaudo's capabilities, remove it.
2. **Show, don't claim.** Client names, case outcomes, and partner badges do more than adjectives. Replace unsupported superlatives with the evidence that would make someone believe them.
3. **Respect the reader's intelligence.** The audience includes engineers and executives who notice vague copy or visual effects substituting for substance. Precision in language and restraint in decoration signal competence.
4. **Restraint is the premium signal.** In a market full of neon grids and floating orbs, stillness and confidence communicate more sophistication than spectacle.
5. **Every call to action is an invitation, not a hook.** The design should build enough conviction that booking a call feels like a natural next step, not a conversion trap.

## Accessibility & Inclusion

No formal WCAG compliance target. Avoid obvious failures: sufficient color contrast for body text, keyboard-navigable interactive elements, meaningful alt text on images. Respect `prefers-reduced-motion` (already implemented in the legacy build). No known specific user needs to accommodate.
