"use client";

import { type CSSProperties, useId, useState } from "react";
import {
  RiArrowDownSLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCloseLine,
  RiMenuLine,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { StatsRow } from "@/components/ui/stats-row";
import { Recognition } from "@/components/ui/recognition";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { CaseGrid } from "@/components/ui/case-grid";
import { Section, SectionHeading } from "@/components/ui/section";
import { PillarGroup, Pillar } from "@/components/ui/pillar";
import { Reveal } from "@/components/ui/reveal";
import { useOnceVisible } from "@/lib/use-once-visible";
import { SiteFooter } from "@/components/ui/site-footer";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Tag } from "@/components/ui/tag";
import { sitePath } from "@/lib/paths";
import {
  NAV_LINKS,
  OUTCOMES,
  type Portfolio,
  type PortfolioMatrix,
  type PartnerMatrix,
  PORTFOLIOS,
  AI_LAYERS,
  STATS,
  TRUST_LOGOS,
  CASE_FEATURE,
  CASE_ASIDE,
  RECOGNITION_AWARD,
  RECOGNITION_TOP_BADGES,
  RECOGNITION_BOTTOM_BADGES,
  RECOGNITION_CERT_BADGES,
  FOOTER_COLUMNS,
  FOOTER_BADGES,
} from "@/content/landing";

/* ── Sections ─────────────────────────────────────────────────────────── */

function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-[18px] left-1/2 z-50 flex w-[min(1180px,calc(100%-32px))] -translate-x-1/2 items-center justify-between gap-4 rounded-pill border border-white/74 bg-white/72 py-3 pr-3 pl-6 shadow-header backdrop-blur-[22px] backdrop-saturate-[1.25]">
        <a href={sitePath("/")} aria-label="Applaudo home" className="shrink-0">
          <img src={sitePath("/assets/brand/applaudo.svg")} alt="Applaudo" className="h-5 w-auto" />
        </a>
        <nav aria-label="Primary" className="ml-auto hidden items-center gap-1 tablet:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-inner px-3 py-2 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden tablet:inline-flex">
            <a href="https://applaudo.com/en/contact/">
              Talk to an AI engineer <RiArrowRightUpLine />
            </a>
          </Button>
          <IconButton
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="tablet:hidden"
          >
            {open ? <RiCloseLine /> : <RiMenuLine />}
          </IconButton>
        </div>
      </header>

      {open && (
        <div className="fixed inset-x-4 top-[86px] z-40 rounded-card border border-white/74 bg-white/95 p-3 shadow-header backdrop-blur-[22px] backdrop-saturate-[1.25] tablet:hidden">
          <nav aria-label="Primary" className="grid gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-inner px-4 py-3 text-ui font-semibold text-ink/72 transition-colors duration-[160ms] ease-exit hover:bg-ink/[0.04] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <Button asChild className="mt-2 w-full">
            <a href="https://applaudo.com/en/contact/">
              Talk to an AI engineer <RiArrowRightUpLine />
            </a>
          </Button>
        </div>
      )}
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-[clamp(148px,20vh,180px)] pb-[clamp(80px,10vh,112px)]">
      <video
        aria-hidden
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src={sitePath("/assets/video/ServicesBanner_1.mp4")}
        className="pointer-events-none absolute inset-0 z-0 size-full object-cover"
      />
      <div className="relative z-10 mx-auto w-full max-w-section px-6">
        <div className="max-w-[600px]">
          <Eyebrow className="mb-5">From idea to operation</Eyebrow>
          <h1 className="mb-6 max-w-[620px] text-title-lg leading-[0.96] font-semibold">One partner, accountable end to end.</h1>
          <p className="mb-9 max-w-[52ch] text-body leading-relaxed text-ink-muted">
            We build, deploy and operate digital products, with AI in every layer. We stay through every stage,
            long after it ships.
          </p>
          <div className="flex flex-wrap items-center gap-3.5">
            <Button asChild>
              <a href="https://applaudo.com/en/contact/">
                Talk to an AI engineer <RiArrowRightUpLine />
              </a>
            </Button>
            <Button asChild variant="white">
              <a href="#outcomes">
                See the Outcomes <RiArrowRightLine />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * "AI runs through all of it" — heading left, three stacked cards right.
 * Deliberately two columns: the page already steps 4-up (outcome pillars) to
 * 2-up (portfolio rows), and an intervening 3-up read as a third, unrelated
 * grid. Each card carries icon · label · rule · body, so the row reads across
 * rather than stacking into another column set.
 *
 * Motion is one beat per card — card lifts in, then its icon snaps from grey
 * to brand red a moment later, running down the stack. That sequencing is the
 * "runs through" idea; the earlier horizontal connector line belonged to the
 * three-column arrangement and does not survive the restack.
 */
function AiLayers() {
  const { ref, visible } = useOnceVisible<HTMLDivElement>();
  const STEP = 130;
  const EASE = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div
      ref={ref}
      className="mt-[clamp(56px,7vw,88px)] grid gap-8 tablet:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] tablet:items-center tablet:gap-x-[clamp(40px,6vw,96px)]"
    >
      <h3 className="text-feature leading-[1.02] font-semibold text-balance">
        AI runs through everything we build and operate.
      </h3>

      <div className="grid gap-3">
        {AI_LAYERS.map((layer, index) => (
          <div
            key={layer.label}
            data-reveal=""
            className={cn(
              "grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-4 rounded-inner px-5 py-4",
              "border border-[rgba(18,18,18,0.07)] bg-white/70",
              "shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_10px_26px_rgba(18,18,18,0.04)]",
              "backdrop-blur-[20px] backdrop-saturate-[1.35]",
            )}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 620ms ${EASE}, transform 620ms ${EASE}`,
              transitionDelay: `${index * STEP}ms`,
            }}
          >
            <span
              className="inline-grid place-items-center"
              style={{
                color: visible ? "var(--color-red-400)" : "var(--color-neutral-200)",
                transform: visible ? "scale(1)" : "scale(0.8)",
                transition: `color 420ms ease, transform 420ms ${EASE}`,
                transitionDelay: `${index * STEP + 180}ms`,
              }}
            >
              <layer.icon className="size-[26px]" />
            </span>

            <div className="grid gap-y-1 mobile:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] mobile:items-center mobile:gap-x-5">
              <p className="text-body leading-[1.25] font-semibold">{layer.label}</p>
              <p className="text-body-sm leading-[1.45] text-ink-muted mobile:border-l mobile:border-line mobile:pl-5">
                {layer.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Outcomes() {
  return (
    <Section id="outcomes">
      <SectionHeading
        layout="stacked"
        eyebrow="Outcomes"
        title="Start with the change you need."
        lede="Name the business problem you're solving, and we assemble the right team around it, each measured against four commitments: efficient, scalable, secure, available."
      />
      <PillarGroup className="mobile:grid-cols-2 tablet:grid-cols-4">
        {OUTCOMES.map((outcome) => (
          <Pillar
            key={outcome.id}
            icon={outcome.icon}
            title={outcome.name}
            details={
              <dl className="mt-7 grid gap-4 border-t border-line pt-5">
                <div>
                  <dt className="mb-1.5 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">
                    Value
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {outcome.commitments.map((commitment) => (
                      <Tag key={commitment} tone="solid">
                        {commitment}
                      </Tag>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1.5 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">
                    What you get
                  </dt>
                  <dd className="text-body-sm leading-[1.5] text-ink">{outcome.tangibleOutput}</dd>
                </div>
              </dl>
            }
          >
            <p className="text-body-sm leading-[1.58] text-ink-muted tablet:min-h-[8rem]">{outcome.need}</p>
          </Pillar>
        ))}
      </PillarGroup>

      <AiLayers />
    </Section>
  );
}

/**
 * Engineering Solutions' twelve services, arranged the way they are actually
 * bought: three stages down the page, two tracks across. Replaces the two flat
 * fifteen-item lists that were here before, which presented a menu where the
 * sales conversation has a sequence.
 *
 * The source deck is a literal 3x2 table of pill-shaped cells with the stages
 * in a left-hand rail. Two reasons this is not that. Pills are not this page's
 * language — Portfolios is a ledger, so the grid is carried by the same
 * hairlines the rows above already use. And the panel is only ~634px wide (it
 * lives in the row's 0.58fr column), which a third rail column would squeeze;
 * the stage name spans the two tracks instead of sitting beside them.
 *
 * No vertical rule between the tracks — tried, rejected on sight. The columns
 * are held apart by a wide gutter instead, which is the quieter way to group
 * and keeps the panel to horizontal hairlines only, like the rows above it.
 * The gutter is `gap-x-12`: at the panel's ~627px that still leaves 285px a
 * column, enough for all twelve service names to stay on one line.
 */
function StageMatrix({ matrix }: { matrix: PortfolioMatrix }) {
  return (
    <div>
      {/* Named once, above the first stage. Below `mobile` the two tracks stack,
          so each one repeats its name inside the stage instead. */}
      <div className="hidden gap-x-12 border-b border-line pb-3 mobile:grid mobile:grid-cols-2">
        {matrix.tracks.map((track) => (
          <p key={track} className="text-label font-semibold tracking-[0.06em] text-ink uppercase">
            {track}
          </p>
        ))}
      </div>

      <ol>
        {matrix.stages.map((stage, stageIndex) => (
          <li
            key={stage.name}
            className={cn("pt-5", stageIndex > 0 && "mt-5 border-t border-line")}
          >
            <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
              <h4 className="text-title-xs leading-[1.2] font-semibold text-ink">{stage.name}</h4>
              <p className="text-body-sm leading-[1.4] text-ink-muted">{stage.note}</p>
            </div>

            <div className="grid gap-x-12 gap-y-5 mobile:grid-cols-2">
              {stage.columns.map((items, trackIndex) => (
                <div key={matrix.tracks[trackIndex]}>
                  <p className="mb-2.5 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase mobile:hidden">
                    {matrix.tracks[trackIndex]}
                  </p>
                  <ul className="grid gap-2.5">
                    {items.map((item) => (
                      <li key={item.name} className="flex items-start gap-2.5">
                        {item.icon && <item.icon className="mt-px size-[18px] shrink-0 text-ink-muted" />}
                        <span className="text-body-sm leading-[1.4] text-ink">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Partner Platforms' disclosure. Replaced a version that showed hyperscalers
 * as a full described list (icon + name + sentence) and every other partner
 * as bare chips beside their logo — two grammars in one panel, and the client
 * read it as cluttered. This unifies on one shape (logo, then its routes or a
 * note) and moves the route definitions out of repetition into one legend.
 *
 * LOGO SIZING: capped to a shared 112x28px box (`w-auto h-auto object-contain`
 * inside `max-w-[112px] max-h-7`), not a fixed width alone. Width-only was the
 * first idea, and it broke on AWS: cropped to ink, AWS's mark is almost square
 * (1.66:1) where Fortinet's and Anthropic's wordmarks are near 8.8:1, so equal
 * width would have put AWS at ~58px tall next to their ~12px — a new
 * imbalance replacing the old one. Capping both dimensions keeps every logo
 * proportionate while still aligning every vendor's chips to the same shelf.
 *
 * LAYOUT: hyperscalers get their own column (they're the primary route and
 * read as three peers); specialized platforms and the commercial overlay sit
 * in a second column as two wrapped rows, since neither group is a fixed
 * count that benefits from its own column. Below `tablet` all three stack in
 * one flow — there's no room for two columns once the row's own two columns
 * have already stacked.
 */
function VendorLogo({ vendor }: { vendor: PartnerMatrix["hyperscalers"][number] }) {
  return (
    <img
      src={sitePath(vendor.src)}
      alt={vendor.alt}
      className="block h-auto max-h-7 w-auto max-w-[112px] object-contain object-left"
    />
  );
}

function VendorTags({ vendor, routeOrder }: { vendor: PartnerMatrix["hyperscalers"][number]; routeOrder: string[] }) {
  if (!vendor.tags) return null;
  // Ordered by the legend, not by this vendor's own array, so every vendor's
  // chips read License -> Implement -> Extend -> Operate left to right —
  // the standardization the panel was missing when chip order just followed
  // whatever order each vendor's data happened to list them in.
  const ordered = routeOrder.filter((route) => vendor.tags!.includes(route));
  return (
    <div className="mt-3 flex flex-wrap gap-1.5">
      {ordered.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </div>
  );
}

function PartnersPanel({ matrix }: { matrix: PartnerMatrix }) {
  const routeOrder = matrix.routes.map((route) => route.name);

  return (
    <div>
      {/* The shared vocabulary — reference material, not lead content, so it
          is built to look quieter than the vendor groups below it: term and
          definition run as one inline sentence instead of two stacked
          blocks, which is what let this collapse from four ~76px entries to
          four ~40-50px ones. The 64px gap after it (mb-16, on top of the
          border's own pb-8) is deliberately the single largest gap in the
          panel — everything below is "vendors," everything above is "terms,"
          and no other transition in this panel should read as bigger. */}
      <ul className="mb-16 grid gap-x-10 gap-y-3 border-b border-line pb-8 mobile:grid-cols-2">
        {matrix.routes.map((route) => (
          <li key={route.name} className="flex items-start gap-2">
            {route.icon ? (
              <route.icon className="mt-[3px] size-4 shrink-0 text-ink-muted" />
            ) : (
              <span aria-hidden />
            )}
            <p className="text-body-sm leading-[1.5] text-ink-muted">
              <span className="font-semibold text-ink">{route.name}</span>
              {" — "}
              {route.description}
            </p>
          </li>
        ))}
      </ul>

      {/* Hyperscalers: one full-width row, not a column sharing space with
          anything else. They carry no chips (all three support the same
          full route range — see the comment on the data itself), so there's
          nothing for a column to align against; a row of three logos is the
          whole of it. Client's explicit layout call, replacing an earlier
          version that gave this its own narrow column beside the other two
          groups — asymmetric column widths for asymmetric content was the
          idea, but it read as an odd, mostly-empty column instead. */}
      <div className="mb-10">
        <p className="mb-4 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">Hyperscalers</p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
          {matrix.hyperscalers.map((vendor) => (
            <VendorLogo key={vendor.alt} vendor={vendor} />
          ))}
        </div>
      </div>

      {/* Specialized Platforms and Commercial Overlay as two side-by-side
          columns, each vendor stacked within its own column rather than
          wrapped in a flex row — client's explicit call. This also fixes,
          as a side effect, the exact asymmetry problem Hyperscalers had one
          level up: Specialized (3 vendors) and Commercial (2) are different
          lengths, but neither column is stretched to match the other
          (`items-start`), so a shorter Commercial column just ends where its
          own content ends instead of trailing empty space. */}
      <div className="grid items-start gap-x-10 gap-y-8 tablet:grid-cols-2">
        <div>
          <p className="mb-4 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">
            Specialized platforms
          </p>
          <ul className="grid gap-6">
            {matrix.specialized.map((vendor) => (
              <li key={vendor.alt}>
                <VendorLogo vendor={vendor} />
                <VendorTags vendor={vendor} routeOrder={routeOrder} />
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">
            Commercial overlay
          </p>
          <ul className="grid gap-6">
            {matrix.commercialOverlay.map((vendor) => (
              <li key={vendor.alt}>
                <VendorLogo vendor={vendor} />
                <p className="mt-3 text-body-sm leading-[1.5] text-ink-muted">{vendor.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/**
 * One portfolio row. Left column carries identity (number, name, what it is);
 * right column carries "How it helps" plus a disclosure holding the full
 * product breakdown — same See more/See less grammar as the Outcomes pillars,
 * but always visible here, since a row this wide has no hover-reveal to lean on.
 */
function PortfolioRow({ portfolio, isLast }: { portfolio: Portfolio; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className={cn(
        "group relative isolate grid gap-y-4 border-t border-line py-[clamp(22px,2.5vw,32px)]",
        // The hover wash runs to the viewport edges; the hairline rules stay on the
        // container grid so they keep lining up with the section heading.
        "before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10",
        "before:w-screen before:-translate-x-1/2 before:bg-white/70 before:opacity-0 before:content-['']",
        "before:transition-opacity before:duration-[220ms] before:ease-exit hover:before:opacity-100",
        "tablet:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] tablet:gap-x-[clamp(40px,6vw,96px)]",
        isLast && "border-b",
      )}
    >
      <div>
        <span className="mb-3 block text-ui font-semibold tabular-nums text-ink/34">{portfolio.num}</span>
        <h3 className="text-title-sm leading-[1.06] font-semibold text-balance">{portfolio.name}</h3>
        <p className="mt-2.5 max-w-[46ch] text-body-sm leading-[1.5] text-ink-muted">{portfolio.role}</p>
      </div>

      <div>
        <p className="mb-2 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">How it helps</p>
        <p className="max-w-[70ch] text-body-sm leading-[1.58] text-ink-muted">{portfolio.howItHelps}</p>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "mt-5 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-pill border px-3.5 py-2",
            "text-label font-semibold whitespace-nowrap",
            "border-[rgba(18,18,18,0.1)] bg-white/65 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
            "backdrop-blur-[20px] backdrop-saturate-[1.35]",
            "transition-[background-color,border-color,color,box-shadow] duration-[260ms] ease-exit hover:bg-white/85",
          )}
        >
          {open ? "See less" : "See more"}
          <RiArrowDownSLine
            aria-hidden
            className={cn("size-3.5 transition-transform duration-[260ms]", open && "-rotate-180")}
          />
        </button>

        <div
          id={panelId}
          className="grid transition-[grid-template-rows] duration-[420ms] ease-exit"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="mt-6 border-t border-line pt-6">
              {portfolio.brandLogo && (
                <img
                  src={sitePath(portfolio.brandLogo.src)}
                  alt={portfolio.brandLogo.alt}
                  className="mb-6 h-6 w-auto"
                />
              )}

              {portfolio.matrix && <StageMatrix matrix={portfolio.matrix} />}
              {portfolio.partners && <PartnersPanel matrix={portfolio.partners} />}

              {portfolio.detail?.map((group, groupIndex) => (
                <div key={group.label ?? groupIndex} className={groupIndex > 0 ? "mt-7" : undefined}>
                  {group.label && (
                    <p className="mb-4 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">
                      {group.label}
                    </p>
                  )}

                  {group.logos && (
                    // The three source SVGs were 500x500 canvases holding a small
                    // centred wordmark (18%-38% ink); their viewBoxes are cropped to
                    // the artwork so one height class sizes all three optically alike.
                    <div className="mb-7 flex flex-wrap items-center gap-x-10 gap-y-5">
                      {group.logos.map((logo) => (
                        <img key={logo.alt} src={sitePath(logo.src)} alt={logo.alt} className="h-7 w-auto object-contain" />
                      ))}
                    </div>
                  )}

                  {/* Described items hang their copy off a fixed icon column so the
                      text aligns under the name, not under the icon; bare items
                      (Agentic's 15) pack into a tighter two-up grid instead. */}
                  {group.items &&
                    (group.items[0]?.lines ? (
                      <ul className="grid gap-4">
                        {group.items.map((item) => (
                          <li key={item.name} className="grid grid-cols-[18px_minmax(0,1fr)] gap-x-2.5">
                            {item.icon ? (
                              <item.icon className="mt-[3px] size-[18px] text-ink-muted" />
                            ) : (
                              <span aria-hidden />
                            )}
                            <div>
                              <p className="text-body-sm font-semibold text-ink">{item.name}</p>
                              {item.lines?.map((line) => (
                                <p key={line} className="mt-1 max-w-[62ch] text-body-sm leading-[1.5] text-ink-muted">
                                  {line}
                                </p>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ul className="grid gap-x-6 gap-y-3 mobile:grid-cols-2">
                        {group.items.map((item) => (
                          <li key={item.name} className="flex items-start gap-2.5">
                            {item.icon && <item.icon className="mt-px size-[18px] shrink-0 text-ink-muted" />}
                            <span className="text-body-sm leading-[1.4] text-ink">{item.name}</span>
                          </li>
                        ))}
                      </ul>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Portfolios() {
  // pb-0: the last row's own border-bottom already closes the section; the
  // system's default bottom padding on top of that read as dead space.
  // The banner reuses the same top-anchored, mask-faded technique as the old
  // "Composed around you" background (now archived in the kitchensink) —
  // just a shorter box, since there's an eyebrow + h2 to clear here, not a
  // heading-plus-lede pair.
  return (
    <Section
      id="products"
      className="pb-0 before:absolute before:inset-x-0 before:top-0 before:aspect-[1440/420] before:bg-[image:var(--products-background)] before:bg-[length:100%_auto] before:bg-top before:bg-no-repeat before:[mask-image:linear-gradient(to_bottom,black_0%,transparent_88%)] before:content-['']"
      style={{ "--products-background": `url("${sitePath("/assets/photos/Outcomes.jpg")}")` } as CSSProperties}
    >
      <SectionHeading
        layout="stacked"
        eyebrow="The right products"
        title="What each one brings to the outcome you need."
      />
      <div>
        {PORTFOLIOS.map((portfolio, index) => (
          <Reveal key={portfolio.id} delay={index * 70}>
            <PortfolioRow portfolio={portfolio} isLast={index === PORTFOLIOS.length - 1} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Proof() {
  return (
    <Section id="proof" tone="lift">
      <SectionHeading
        eyebrow="Proven at scale"
        title="Built and running at enterprise scale."
        lede="Who we build for: Fortune 500 and Fortune 1 companies, NBA franchises, the NCAA, airlines, luxury hospitality and financial institutions across the Americas."
      />

      {/* pt-, not mt-: an mt- here collapses with SectionHeading's own mb-[34px]
          (adjacent sibling margins), silently capping the gap at 34px instead of 56px. */}
      <div className="pt-[22px]">
        <StatsRow items={STATS} />
      </div>
    </Section>
  );
}

function Credentials() {
  return (
    <Section tone="lift">
      <Recognition
        award={RECOGNITION_AWARD}
        topBadges={RECOGNITION_TOP_BADGES}
        bottomBadges={RECOGNITION_BOTTOM_BADGES}
        certBadges={RECOGNITION_CERT_BADGES}
      />
    </Section>
  );
}

function Trust() {
  return (
    <section className="relative bg-surface-lift px-6 py-[clamp(40px,5vw,60px)]">
      <div className="mx-auto w-full max-w-section">
        <Eyebrow className="text-center">
          Building AI for enterprise leaders
        </Eyebrow>
        <LogoCloud logos={TRUST_LOGOS} className="grid-cols-2 mobile:grid-cols-4 tablet:grid-cols-8" />
      </div>
    </section>
  );
}

/**
 * Parked, not deleted — flip to `true` to bring the case grid back. It sits
 * directly after <Trust />, so the client logos lead into the work again.
 */
const SHOW_SELECTED_WORK = false;

function SelectedWork() {
  return (
    <Section tone="lift">
      <SectionHeading
        eyebrow="Selected work"
        title="What it looks like in production."
        lede="Three engagements where the outcome, not the technology, set the brief."
      />
      <CaseGrid feature={CASE_FEATURE} aside={CASE_ASIDE} />
    </Section>
  );
}

function Close() {
  return (
    <section className="relative overflow-hidden py-24 text-center tablet:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-90"
        style={{ backgroundImage: `url("${sitePath("/assets/effects/glass-1.jpeg")}")` }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.84), rgba(255,255,255,0.56) 38%, rgba(255,255,255,0.16) 100%)",
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-section px-6">
        <Eyebrow className="mb-5">Start here</Eyebrow>
        <h2 className="mx-auto mb-5 max-w-[26ch] text-title-md leading-[1.04] font-semibold text-balance">
          Tell us the outcome you&apos;re chasing.
        </h2>
        <p className="mx-auto mb-9 max-w-[52ch] text-body leading-relaxed text-ink-muted">
          Thirty minutes to map the fastest way to it.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <Button asChild>
            <a href="https://applaudo.com/en/contact/">
              Talk to an AI engineer <RiArrowRightUpLine />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function Landing() {
  return (
    <main>
      <Nav />
      <Hero />
      <Outcomes />
      <Portfolios />
      <Proof />
      <Trust />
      <Credentials />
      {SHOW_SELECTED_WORK && <SelectedWork />}
      <Close />
      <SiteFooter
        columns={FOOTER_COLUMNS}
        badges={FOOTER_BADGES}
        location="Austin, TX · San Salvador, SS"
      />
    </main>
  );
}
