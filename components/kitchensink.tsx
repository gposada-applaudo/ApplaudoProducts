"use client";

import { useState, type ReactNode } from "react";
import { RiArrowRightLine, RiArrowRightUpLine, RiMenuLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Section, SectionHeading } from "@/components/ui/section";
import { PillarGroup, Pillar } from "@/components/ui/pillar";
import { Reveal } from "@/components/ui/reveal";
import { StatsRow } from "@/components/ui/stats-row";
import { LogoCloud } from "@/components/ui/logo-cloud";
import { Recognition } from "@/components/ui/recognition";
import { CaseGrid } from "@/components/ui/case-grid";
import { SiteFooter } from "@/components/ui/site-footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Tag, TagRow } from "@/components/ui/tag";
import { Eyebrow } from "@/components/ui/eyebrow";
import { AiSparkChip } from "@/components/ui/ai-spark-chip";
import { EngagementCard, EngagementGrid } from "@/components/ui/engagement-card";
import { NextStepCard, NextStepGrid } from "@/components/ui/next-step-card";
import { StoryCard, StoryGrid } from "@/components/ui/story-card";
import { IndustryTile, IndustryTileGrid, IndustryRow, IndustryRowList, IndustryPanel, IndustryPanelRow } from "@/components/ui/industry";
import { ValueProp } from "@/components/ui/value-prop";
import { SolveModule } from "@/components/ui/solve-module";
import { OutcomePicker } from "@/components/ui/outcome-picker";
import { Testimonials } from "@/components/ui/testimonials";
import { StoryBrowser } from "@/components/ui/story-browser";
import { DEMO } from "@/components/kitchensink.demo";
import {
  OUTCOMES,
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
import type { Tokens, ResolvedToken } from "@/lib/read-tokens";
import { sitePath } from "@/lib/paths";

/* ── Gallery chrome ───────────────────────────────────────────────────── */

const NAV = [
  {
    group: "Foundations",
    items: [
      ["colour", "Colour"],
      ["semantic", "Semantic aliases"],
      ["type", "Typography"],
      ["geometry", "Geometry"],
      ["elevation", "Elevation"],
      ["motion", "Motion"],
      ["layout", "Layout"],
    ],
  },
  {
    group: "Primitives",
    items: [
      ["eyebrow", "Eyebrow"],
      ["tag", "Tag"],
      ["spark", "AI spark chip"],
      ["button", "Button"],
      ["icon-button", "Icon button"],
    ],
  },
  {
    group: "Surfaces",
    items: [
      ["section", "Section & heading"],
      ["glass-card", "Glass card"],
      ["pillar", "Pillar"],
    ],
  },
  {
    group: "Cards",
    items: [
      ["engagement", "Engagement card"],
      ["next-step", "Next-step card"],
      ["story-card", "Story card"],
      ["case-grid", "Case grid"],
      ["industry-tile", "Industry tile"],
      ["industry-row", "Industry row"],
      ["industry-panel", "Industry panel"],
    ],
  },
  {
    group: "Modules",
    items: [
      ["value-prop", "Value prop"],
      ["solve", "Solve module"],
      ["outcome-picker", "Outcome picker"],
      ["testimonials", "Testimonials"],
      ["story-browser", "Story browser"],
      ["stats", "Stats row"],
      ["logos", "Logo cloud"],
      ["recognition", "Recognition"],
      ["reveal", "Reveal"],
      ["footer", "Site footer"],
    ],
  },
  {
    group: "Rules",
    items: [
      ["page-patterns", "Page patterns"],
      ["rules", "Named rules"],
    ],
  },
] as const;

function Block({ id, title, source, children }: { id: string; title: string; source: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-6 border-b border-line px-6 py-14 tablet:px-12">
      <header className="mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-3">
        <h2 className="text-title-xs font-semibold">{title}</h2>
        <code className="font-mono text-label text-ink-muted">{source}</code>
      </header>
      {children}
    </section>
  );
}

/** Label above a specimen, so every example says what it is. */
function Spec({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-8 last:mb-0">
      <p className="mb-3 font-mono text-label text-ink-muted">{label}</p>
      {children}
    </div>
  );
}

function TokenRow({ t, swatch }: { t: ResolvedToken; swatch?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      {swatch}
      <code className="font-mono text-[0.6875rem] font-semibold text-ink">{t.name}</code>
      <code className="font-mono text-[0.6875rem] text-ink-muted">{t.resolved}</code>
      {t.note ? <span className="text-[0.6875rem] leading-snug text-ink-muted">{t.note}</span> : null}
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */

export function Kitchensink({ tokens }: { tokens: Tokens }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="tablet:grid tablet:grid-cols-[236px_minmax(0,1fr)]">
      <aside
        className={`border-line bg-surface-lift tablet:sticky tablet:top-0 tablet:block tablet:h-screen tablet:overflow-y-auto tablet:border-r ${open ? "block" : "hidden"} border-b p-6`}
      >
        <p className="mb-1 text-label font-semibold tracking-[0.08em] text-ink-muted uppercase">Applaudo</p>
        <p className="mb-6 text-body-sm font-semibold">Design system</p>
        {NAV.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <p className="mb-2 text-label font-semibold tracking-[0.08em] text-ink-muted uppercase">{group}</p>
            <ul className="grid gap-0.5">
              {items.map(([id, label]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="block rounded-tag px-2 py-1 text-body-sm text-ink-muted transition-colors duration-[160ms] hover:bg-ink/[0.05] hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      <main>
        <header className="border-b border-line px-6 py-12 tablet:px-12">
          <div className="mb-5 flex items-center justify-between gap-4">
            <p className="text-label font-semibold tracking-[0.08em] text-brand uppercase">Design system</p>
            <IconButton className="tablet:hidden" onClick={() => setOpen((v) => !v)} aria-label="Sections">
              <RiMenuLine />
            </IconButton>
          </div>
          <h1 className="mb-4 max-w-[18ch] text-title-md leading-[1.02] font-semibold">Applaudo, in parts.</h1>
          <p className="max-w-[68ch] text-body leading-relaxed text-ink-muted">
            Every component below is the real one the site ships, rendered live with real content — not a
            picture of it. Every token is read from{" "}
            <code className="rounded-tag bg-surface px-1.5 py-0.5 font-mono text-[0.8125rem]">styles/tokens.css</code>{" "}
            when this page is built, so the values here cannot drift from the values in use.
          </p>
        </header>

        {/* ── Foundations ─────────────────────────────────────────────── */}

        <Block id="colour" title="Colour" source={`${tokens.total} values · @theme in styles/tokens.css`}>
          <Spec label="Neutrals — the ramp ends are two of the three primary brand colours">
            <div className="grid grid-cols-5 gap-2 tablet:grid-cols-10">
              {tokens.neutrals.map((t) => (
                <TokenRow
                  key={t.name}
                  t={t}
                  swatch={
                    <div
                      className="h-[72px] rounded-[10px] border border-[rgba(18,18,18,0.08)]"
                      style={{ background: t.resolved }}
                    />
                  }
                />
              ))}
            </div>
          </Spec>
          {tokens.ramps.map(({ key, steps }) => (
            <Spec key={key} label={`${key} — main is the 400`}>
              <div className="grid grid-cols-4 gap-2 tablet:grid-cols-7">
                {steps.map((t) => (
                  <TokenRow
                    key={t.name}
                    t={t}
                    swatch={
                      <div
                        className={`rounded-[10px] border border-[rgba(18,18,18,0.08)] ${t.name.endsWith("-400") ? "h-[72px] ring-2 ring-neutral-900" : "h-14"}`}
                        style={{ background: t.resolved }}
                      />
                    }
                  />
                ))}
              </div>
            </Spec>
          ))}
        </Block>

        <Block id="semantic" title="Semantic aliases" source="what components actually reference">
          <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(190px,1fr))]">
            {tokens.semantic.map((t) => (
              <TokenRow
                key={t.name}
                t={t}
                swatch={
                  <div
                    className="h-[72px] rounded-xl border border-[rgba(18,18,18,0.12)]"
                    style={{ background: t.resolved }}
                  />
                }
              />
            ))}
          </div>
          <p className="mt-6 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            A further {tokens.shadcn.length} aliases map the shadcn/ui names (<code className="font-mono">background</code>,{" "}
            <code className="font-mono">primary</code>, <code className="font-mono">ring</code>, …) onto these, so
            generated components land on-brand without edits.
          </p>
        </Block>

        <Block id="type" title="Typography" source="one family, two weights · --text-* in tokens.css">
          {tokens.text.map((t) => (
            <div key={t.name} className="mb-6 border-b border-line pb-5 last:mb-0 last:border-0">
              <div className="mb-2 flex flex-wrap items-baseline gap-x-3">
                <code className="font-mono text-label font-semibold text-ink">{t.name.replace("--text-", "text-")}</code>
                <code className="font-mono text-label text-ink-muted">{t.resolved}</code>
                {t.note ? <span className="text-label text-ink-muted">{t.note}</span> : null}
              </div>
              <p className="leading-[1.1] font-semibold text-balance" style={{ fontSize: `var(${t.name})` }}>
                One partner, accountable end to end.
              </p>
            </div>
          ))}
          <div className="grid gap-2 rounded-card bg-surface-lift p-5 text-body-sm leading-relaxed">
            {tokens.fonts.map((t) => (
              <p key={t.name}>
                <code className="font-mono font-semibold">{t.name}</code> — {t.resolved}
              </p>
            ))}
            <p>
              <b>Weights are 400 and 600 only.</b> Never 500 — it collapses the hierarchy&apos;s primary signal.
            </p>
          </div>
        </Block>

        <Block id="geometry" title="Geometry" source="--radius-* · namespaced so Tailwind's own scale survives">
          <div className="grid gap-4 mobile:grid-cols-3 tablet:grid-cols-5">
            {tokens.radius.map((t) => (
              <div key={t.name}>
                <div
                  className="mb-2 h-20 border border-line bg-surface-lift"
                  style={{ borderRadius: `var(${t.name})` }}
                />
                <code className="font-mono text-[0.6875rem] font-semibold">
                  {t.name.replace("--radius-", "rounded-")}
                </code>
                <p className="font-mono text-[0.6875rem] text-ink-muted">{t.resolved}</p>
                {t.note ? <p className="text-[0.6875rem] text-ink-muted">{t.note}</p> : null}
              </div>
            ))}
          </div>
        </Block>

        <Block id="elevation" title="Elevation" source="--shadow-* · ambient only, never at rest on interactive elements">
          <div className="grid gap-6 mobile:grid-cols-2 tablet:grid-cols-4">
            {tokens.shadow.map((t) => (
              <div key={t.name}>
                <div
                  className="mb-3 h-24 rounded-card bg-surface-lift"
                  style={{ boxShadow: `var(${t.name})` }}
                />
                <code className="font-mono text-[0.6875rem] font-semibold">
                  {t.name.replace("--shadow-", "shadow-")}
                </code>
                <p className="font-mono text-[0.625rem] leading-snug break-all text-ink-muted">{t.resolved}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block id="motion" title="Motion" source="ease-out only, no bounce, transform and opacity only">
          <div className="grid gap-2 rounded-card bg-surface-lift p-5 text-body-sm">
            {tokens.motion.map((t) => (
              <p key={t.name}>
                <code className="font-mono font-semibold">{t.name}</code>{" "}
                <code className="font-mono text-ink-muted">{t.resolved}</code>
                {t.note ? <span className="text-ink-muted"> — {t.note}</span> : null}
              </p>
            ))}
          </div>
        </Block>

        <Block id="layout" title="Layout" source="two real breakpoints, two container widths">
          <div className="grid gap-2 rounded-card bg-surface-lift p-5 text-body-sm">
            {tokens.layout.map((t) => (
              <p key={t.name}>
                <code className="font-mono font-semibold">{t.name}</code>{" "}
                <code className="font-mono text-ink-muted">{t.resolved}</code>
                {t.note ? <span className="text-ink-muted"> — {t.note}</span> : null}
              </p>
            ))}
            <p className="mt-1">
              <b>Use only these two variants.</b> Custom breakpoints are emitted before Tailwind&apos;s defaults, so a
              default variant (<code className="font-mono">sm:</code>, <code className="font-mono">lg:</code>) beats
              them wherever both match. Never mix the families on one property.
            </p>
          </div>
        </Block>

        {/* ── Primitives ──────────────────────────────────────────────── */}

        <Block id="eyebrow" title="Eyebrow" source="components/ui/eyebrow.tsx · legacy .eyebrow / .tagline / .section-kicker">
          <Spec label="default — what every section on the site uses">
            <Eyebrow>AI engineering</Eyebrow>
          </Spec>
          <Spec label='tracking="spec" — the 0.08em the legacy stylesheet specifies'>
            <Eyebrow tracking="spec">AI engineering</Eyebrow>
          </Spec>
          <Spec label='tone="accessible" — red-500, the token vetted for text on light'>
            <Eyebrow tone="accessible">AI engineering</Eyebrow>
          </Spec>
          <p className="max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Two live discrepancies, both deliberate rather than overlooked. <b>Tracking:</b> the legacy spec says
            0.08em; every React eyebrow shipped at 0.04em, and the default here is the shipped value so adopting the
            component changed nothing. <b>Contrast:</b> <code className="font-mono">red-400</code> computes to roughly
            3.2:1 on the page ground, under the 4.5:1 threshold for normal text —{" "}
            <code className="font-mono">red-500</code> (6.88:1) is the vetted one. Changing either moves every eyebrow
            on the site at once, so both are surfaced here rather than swapped quietly.
          </p>
        </Block>

        <Block id="tag" title="Tag" source="components/ui/tag.tsx · legacy .case-pill">
          <Spec label='tone="muted" — the legacy chip, used in case cards'>
            <TagRow>
              <Tag>Retail &amp; Consumer</Tag>
              <Tag>Data Platforms</Tag>
              <Tag>ML Ops</Tag>
            </TagRow>
          </Spec>
          <Spec label='tone="solid" — larger, for chips sitting on tinted glass'>
            <TagRow>
              <Tag tone="solid">Efficient</Tag>
              <Tag tone="solid">Scalable</Tag>
              <Tag tone="solid">Secure</Tag>
            </TagRow>
          </Spec>
          <p className="max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Extracted because the recipe had been hand-written in three places with three different sets of values.
            Both variants here are the shipped ones, not an averaged compromise — adopting the component moved no
            pixels.
          </p>
        </Block>

        <Block id="spark" title="AI spark chip" source="components/ui/ai-spark-chip.tsx">
          <div
            className="rounded-card bg-cover bg-center p-8"
            style={{ backgroundImage: `url("${sitePath("/assets/effects/glass-1.jpeg")}")` }}
          >
            <AiSparkChip />
          </div>
          <p className="mt-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Shown on imagery on purpose. It is a frosted 40px square, and per the Glass Prerequisite Rule the blur only
            means anything when something sits behind it — on a flat band this becomes a white box.
          </p>
        </Block>

        <Block id="button" title="Button" source="components/ui/button.tsx · cva + Radix Slot">
          <Spec label='variant="black" · variant="white" — the documented pair'>
            <div className="flex flex-wrap items-center gap-3.5">
              <Button variant="black">
                Talk to an AI engineer <RiArrowRightUpLine />
              </Button>
              <Button variant="white">
                See the Outcomes <RiArrowRightLine />
              </Button>
            </div>
          </Spec>
          <Spec label='size="small" · size="icon"'>
            <div className="flex flex-wrap items-center gap-3.5">
              <Button size="small">
                Nav CTA <RiArrowRightUpLine />
              </Button>
              <Button size="icon" aria-label="Continue">
                <RiArrowRightLine />
              </Button>
            </div>
          </Spec>
          <Spec label="disabled">
            <Button disabled>Unavailable</Button>
          </Spec>
          <p className="max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Buttons carry the cursor-following glint (<code className="font-mono">.btn-glint</code> in globals.css) and
            have no shadow at rest — shadow appears on hover only. <code className="font-mono">asChild</code> renders
            the variant onto a link or any other element via Radix Slot.
          </p>
        </Block>

        <Block id="icon-button" title="Icon button" source="components/ui/icon-button.tsx">
          <div className="flex flex-wrap items-center gap-3.5">
            <IconButton aria-label="Menu">
              <RiMenuLine />
            </IconButton>
            <IconButton asChild aria-label="Continue">
              <a href="#icon-button">
                <RiArrowRightUpLine />
              </a>
            </IconButton>
          </div>
        </Block>

        {/* ── Surfaces ────────────────────────────────────────────────── */}

        <Block id="section" title="Section & heading" source="components/ui/section.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The page&apos;s structural unit: one content width (
            <code className="font-mono">--container-section</code>), one vertical rhythm, and the alternating
            surface tone that gives the page its bands. Sections never set their own width or padding.
          </p>
          <div className="overflow-hidden rounded-card border border-line">
            <Section>
              <SectionHeading
                eyebrow="Split layout"
                title="Title left, lede right, at the 0.42 / 0.58 split."
                lede="The default. Use it when the title needs a supporting sentence beside it."
              />
            </Section>
            <Section tone="lift">
              <SectionHeading
                layout="stacked"
                eyebrow="Stacked layout"
                title="One column: eyebrow, title, then lede beneath."
                lede="For a section that reads as one short statement rather than a title-plus-lede pair. This band also shows tone=&quot;lift&quot;."
              />
            </Section>
          </div>
        </Block>

        <Block id="glass-card" title="Glass card" source="components/ui/glass-card.tsx · legacy .glass-card">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The system&apos;s signature surface, and the one place glass is present <b>at rest</b> rather than on
            engage. Not the same component as Pillar, though they look related: a pillar is plain{" "}
            <code className="font-mono">rgba(255,255,255,0.28)</code> until hovered and keeps its glass on a hidden{" "}
            <code className="font-mono">::before</code>. Use GlassCard when the surface should read as glass
            immediately; use Pillar when glass is the reward for engaging.
          </p>
          <div
            className="grid gap-5 rounded-card bg-cover bg-center p-8 tablet:grid-cols-2"
            style={{ backgroundImage: `url("${sitePath("/assets/effects/glass-1.jpeg")}")` }}
          >
            <GlassCard className="p-7">
              <h3 className="mb-2 text-title-sm font-semibold">Static</h3>
              <p className="text-body-sm leading-relaxed text-ink-muted">
                For panels that hold controls of their own. A card full of buttons should not itself feel clickable.
              </p>
            </GlassCard>
            <GlassCard interactive className="p-7">
              <h3 className="mb-2 text-title-sm font-semibold">Interactive</h3>
              <p className="text-body-sm leading-relaxed text-ink-muted">
                Adds the hover lift and a white shine that follows the pointer. Hover this one.
              </p>
            </GlassCard>
          </div>
        </Block>

        <Block id="pillar" title="Pillar" source="components/ui/pillar.tsx + .pillar in globals.css">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Hover or focus one and it lifts into full glass with a pointer-tracked red bloom while its siblings dim to
            0.62 and drop back. Click anywhere on the card — or the &quot;See more&quot; button — to disclose the
            detail panel.
          </p>
          <PillarGroup className="mobile:grid-cols-2 tablet:grid-cols-4">
            {OUTCOMES.map((o) => (
              <Pillar
                key={o.id}
                icon={o.icon}
                title={o.name}
                details={
                  <dl className="mt-7 grid gap-4 border-t border-line pt-5">
                    <dt className="text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">What you get</dt>
                    <dd className="text-body-sm leading-[1.5] text-ink">{o.tangibleOutput}</dd>
                  </dl>
                }
              >
                <p className="text-body-sm leading-[1.58] text-ink-muted tablet:min-h-[8rem]">{o.need}</p>
              </Pillar>
            ))}
          </PillarGroup>
        </Block>

        {/* ── Cards ───────────────────────────────────────────────────── */}

        <Block id="engagement" title="Engagement card" source="components/ui/engagement-card.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The lightest card in the system: no fill, no border but a hairline across the top, no shadow. On hover the
            rule turns red rather than the card lifting far — restraint is the whole point.
          </p>
          <EngagementGrid>
            <EngagementCard step="01" title="Discovery">
              Two weeks to map the problem, the data and the constraints. You get a build sequence, not a deck.
            </EngagementCard>
            <EngagementCard step="02" title="Build">
              A working system in production behind a flag, reviewed weekly against the commitments we agreed.
            </EngagementCard>
            <EngagementCard step="03" title="Operate">
              We stay. Monitoring, defence, response and continuous change under one accountability model.
            </EngagementCard>
          </EngagementGrid>
        </Block>

        <Block id="next-step" title="Next-step card" source="components/ui/next-step-card.tsx">
          <NextStepGrid className="mt-0">
            <NextStepCard icon={RiArrowRightUpLine} title="Talk to an engineer" href="#next-step" cta="Book 30 minutes">
              Thirty minutes to map the fastest way to the outcome you are chasing.
            </NextStepCard>
            <NextStepCard icon={RiArrowRightLine} title="See the work" href="#next-step" cta="Browse stories">
              Systems in production at enterprise scale, with the constraints they were built under.
            </NextStepCard>
            <NextStepCard icon={RiMenuLine} title="Read the approach" href="#next-step" cta="How we work">
              How an engagement runs, who is accountable, and what you own at the end of it.
            </NextStepCard>
          </NextStepGrid>
        </Block>

        <Block id="story-card" title="Story card" source="components/ui/story-card.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Media is 16/7, not 16/10 — the legacy comment records it was cut ~30% in height deliberately so a
            two-column grid of these does not push the page absurdly long. The dark gradient over the image is what
            keeps the frosted badge legible whatever the photograph does.
          </p>
          <StoryGrid>
            {DEMO.stories.slice(0, 2).map((s) => (
              <StoryCard key={s.title} story={s} />
            ))}
          </StoryGrid>
        </Block>

        <Block id="case-grid" title="Case grid" source="components/ui/case-grid.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Asymmetric by rule: the feature item spans two rows. Never an identical-size card grid. Currently unused on
            the landing page — the Selected Work section is switched off — but kept for when work pages land.
          </p>
          <CaseGrid feature={CASE_FEATURE} aside={CASE_ASIDE} />
        </Block>

        <Block id="industry-tile" title="Industry tile" source="components/ui/industry.tsx">
          <IndustryTileGrid>
            {DEMO.industries.slice(0, 2).map((i) => (
              <IndustryTile key={i.name} industry={i} />
            ))}
          </IndustryTileGrid>
        </Block>

        <Block id="industry-row" title="Industry row" source="components/ui/industry.tsx">
          <p className="mb-2 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The editorial list for secondary industries, where tiles would over-promote them. Hover a row: it gains
            16px of left padding over 240ms, so the line steps forward. Quieter than a lift, and it survives a long
            list where lifting every row would be noise.
          </p>
          <IndustryRowList>
            {DEMO.industries.map((i) => (
              <IndustryRow key={i.name} industry={i} />
            ))}
          </IndustryRowList>
        </Block>

        <Block id="industry-panel" title="Industry panel" source="components/ui/industry.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The most expressive component in the system — one row of it per page, at most. Panels share a row at{" "}
            <code className="font-mono">flex: 1 1 0</code>; the hovered one grows to{" "}
            <code className="font-mono">flex-grow: 2.6</code> while its photograph scales to 1.07 behind a fixed
            overlay. The row height is fixed, so the expansion is purely horizontal and the page below never moves.
          </p>
          <IndustryPanelRow>
            {DEMO.industries.map((i) => (
              <IndustryPanel key={i.name} industry={i} />
            ))}
          </IndustryPanelRow>
        </Block>

        {/* ── Modules ─────────────────────────────────────────────────── */}

        <Block id="value-prop" title="Value prop" source="components/ui/value-prop.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            The page&apos;s biggest statement, on its own band. Two things carry it and are easy to lose in a port: the
            band is a vertical gradient rather than a flat tone, and two radial blooms at 5.5% and 6% opacity sit on a{" "}
            <code className="font-mono">::before</code> — almost subliminal, but they stop the large empty area reading
            as dead space. This is the one place purple appears on a core surface, predating the Portfolio Surface Rule.
          </p>
          <div className="overflow-hidden rounded-card border border-line">
            <ValueProp
              eyebrow="AI-native delivery"
              title="The AI partner that engineers the full enterprise stack."
              lede="We build across every layer: the application, the data that feeds it, the cloud it runs on, and the operating model your team runs it from. That's how AI reaches production and stays there."
              actions={
                <>
                  <Button>
                    Talk to an AI engineer <RiArrowRightUpLine />
                  </Button>
                  <Button variant="white">
                    See the work <RiArrowRightLine />
                  </Button>
                </>
              }
            />
          </div>
        </Block>

        <Block id="solve" title="Solve module" source="components/ui/solve-module.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Selector list left, detail panel right, sharing one grid row so they top- and bottom-align whatever the
            content does. Real tab semantics — <code className="font-mono">role=&quot;tablist&quot;</code> with
            arrow-key roving focus — because a row of buttons that swaps a panel is a tab set, whatever it looks like.
          </p>
          <SolveModule items={DEMO.solve} />
        </Block>

        <Block id="outcome-picker" title="Outcome picker" source="components/ui/outcome-picker.tsx · legacy .compose-picker">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            This was the landing page&apos;s &quot;Composed around you&quot; section before it was cut. Kept because
            the pattern is sound: the surface is a real GlassCard rather than a reimplementation, and the art bleeds
            off the right edge behind the copy under a left-to-right mask, so it dissolves before reaching the text
            instead of being scrimmed.
          </p>
          <OutcomePicker choices={DEMO.outcomes} />
        </Block>

        <Block id="testimonials" title="Testimonials" source="components/ui/testimonials.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Five cards share one grid cell, so the stack is as tall as the tallest and nothing reflows as it rotates.
            The blur goes on an inner wrapper, never the card: the card already carries{" "}
            <code className="font-mono">backdrop-filter</code>, and a <code className="font-mono">filter</code> on the
            same element would create a containing block and cancel it.
          </p>
          <Testimonials items={DEMO.testimonials} />
        </Block>

        <Block id="story-browser" title="Story browser" source="components/ui/story-browser.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Filtering is derived, never stored — the visible list and the facet counts are both computed from the
            query and selections on every render, so there is no second copy of the data to fall out of sync. The
            empty state is part of the component: a filter UI that can return nothing has to say so and offer the way
            back.
          </p>
          <StoryBrowser stories={DEMO.stories} groups={DEMO.storyGroups} />
        </Block>

        <Block id="stats" title="Stats row" source="components/ui/stats-row.tsx">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Figures count up once, when the row scrolls into view. The server-rendered HTML carries the final number,
            so the value is still correct if JavaScript never runs.
          </p>
          <StatsRow items={STATS} />
        </Block>

        <Block id="logos" title="Logo cloud" source="components/ui/logo-cloud.tsx">
          <LogoCloud logos={TRUST_LOGOS} />
        </Block>

        <Block id="recognition" title="Recognition" source="components/ui/recognition.tsx">
          <Recognition
            award={RECOGNITION_AWARD}
            topBadges={RECOGNITION_TOP_BADGES}
            bottomBadges={RECOGNITION_BOTTOM_BADGES}
            certBadges={RECOGNITION_CERT_BADGES}
          />
        </Block>

        <Block id="reveal" title="Reveal" source="components/ui/reveal.tsx + lib/use-once-visible.ts">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            A 26px rise over 700ms, once, when the element crosses into view. Used on the sections that introduce
            something, not on every block — a page where everything enters the same way reads as a template. Scroll
            this into view to fire it; reload to see it again.
          </p>
          <div className="grid gap-3 mobile:grid-cols-3">
            {[0, 120, 240].map((delay) => (
              <Reveal key={delay} delay={delay}>
                <div className="rounded-card border border-line bg-surface-lift p-6">
                  <code className="font-mono text-label">delay={delay}</code>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        <Block id="footer" title="Site footer" source="components/ui/site-footer.tsx">
          <div className="overflow-hidden rounded-card">
            <SiteFooter columns={FOOTER_COLUMNS} badges={FOOTER_BADGES} location="Austin, TX · San Salvador, SS" />
          </div>
        </Block>

        {/* ── Rules ───────────────────────────────────────────────────── */}

        <Block id="page-patterns" title="Page patterns" source="components/landing/Landing.tsx — composed in place, not extracted">
          <p className="mb-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            Five patterns live inside the landing page rather than in{" "}
            <code className="font-mono">components/ui/</code>. They are real and finished, but each is a composition of
            the primitives above arranged for one specific page, so extracting them would create components with one
            caller and a lot of props. They are listed here so the design system accounts for them — see them live on
            the landing page itself.
          </p>
          <div className="grid gap-3 rounded-card bg-surface-lift p-5 text-body-sm leading-relaxed">
            <p><b>Nav</b> — sticky glass header, right-aligned links, mobile disclosure. Legacy <code className="font-mono">.site-nav</code>.</p>
            <p><b>Hero</b> — full-bleed art right, eyebrow/title/lede/CTA pair left. Legacy <code className="font-mono">.hero</code>.</p>
            <p><b>AI layers</b> — heading left, three frosted rows right, revealed on a 130ms stagger. Legacy <code className="font-mono">.ai-stack</code>.</p>
            <p><b>Portfolio row</b> — index numeral above the name, disclosure on the right, full-bleed hover wash. Built on the legacy <code className="font-mono">.reason-item</code> grammar.</p>
            <p><b>Close / CTA</b> — centred statement over art, single CTA. Legacy <code className="font-mono">.cta-section</code>.</p>
          </div>
          <p className="mt-5 max-w-[70ch] text-body-sm leading-relaxed text-ink-muted">
            With these five accounted for, every section of the legacy gallery is now represented: 26 as real
            components above, five as page compositions here. Nothing in{" "}
            <code className="font-mono">reference/legacy/kitchensink.html</code> is unaccounted for.
          </p>
        </Block>

        <Block id="rules" title="Named rules" source="reference/legacy/DESIGN.md §11">
          <div className="grid gap-3 rounded-card bg-surface-lift p-5 text-body-sm leading-relaxed">
            <p>
              <b>One Voice.</b> On core surfaces, Applaudo Red is the only accent colour. Adding a second? Cut the
              first use instead.
            </p>
            <p>
              <b>Portfolio Surface.</b> Purple, orange and yellow appear only on the portfolio surface each is mapped
              to. Blue and green are semantic (info / success) only — never decorative, anywhere.
            </p>
            <p>
              <b>Weight Gap.</b> Headings 600, body 400. Never 500.
            </p>
            <p>
              <b>Single Family.</b> Avenir Next at every level. No secondary typeface.
            </p>
            <p>
              <b>Flat By Default.</b> Interactive elements have no shadow at rest. Shadow on hover only. Never
              drop-shadow a non-interactive element.
            </p>
            <p>
              <b>Glass Prerequisite.</b> <code className="font-mono">backdrop-filter: blur()</code> is only meaningful
              when something sits behind the surface. On solid backgrounds, omit it.
            </p>
            <p>
              <b>Asymmetric Grid.</b> Case and work grids are asymmetric — the feature item spans two rows.
            </p>
            <p>
              <b>Two-Button.</b> A CTA row pairs one black with one white. Never two blacks.{" "}
              <span className="text-ink-muted">
                The landing page has two live exceptions: the nav CTA (a nav bar is not a button row) and the closing
                CTA, whose white deferral pointed at a route that does not exist yet.
              </span>
            </p>
          </div>
        </Block>
      </main>
    </div>
  );
}
