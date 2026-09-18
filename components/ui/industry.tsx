import type { ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface Industry {
  name: string;
  href: string;
  image: string;
  icon?: ComponentType<{ className?: string }>;
  line?: string;
}

/* ── Tile ─────────────────────────────────────────────────────────────── */

/**
 * `.industry-tile` (styles.css) — photographic tile, content pinned to the
 * bottom, text knocked out in white over a dark gradient. The gradient is what
 * makes the type legible on an unknown photograph, so it is not optional.
 */
export function IndustryTile({ industry, className }: { industry: Industry; className?: string }) {
  const Icon = industry.icon;
  return (
    <a
      href={industry.href}
      className={cn(
        "relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-card p-[22px] text-on-dark",
        "bg-cover bg-center transition-[transform,box-shadow] duration-[220ms] ease-out",
        "hover:-translate-y-1 hover:shadow-[0_30px_78px_rgba(18,18,18,0.14)]",
        "before:absolute before:inset-0 before:-z-10 before:content-['']",
        "before:bg-[linear-gradient(180deg,rgba(18,18,18,0.08),rgba(18,18,18,0.7))]",
        className,
      )}
      style={{ backgroundImage: `url(${industry.image})` }}
    >
      <span className="flex items-center gap-2.5 text-[1.25rem] leading-[1.12] font-semibold text-on-dark">
        {Icon ? <Icon className="size-[22px]" /> : null}
        {industry.name}
      </span>
      {industry.line ? <p className="mt-3 text-[0.875rem] text-white/78">{industry.line}</p> : null}
    </a>
  );
}

/** `.industry-tile-grid` — 2-up, 14px gutter. */
export function IndustryTileGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("grid gap-3.5 mobile:grid-cols-2", className)}>{children}</div>;
}

/* ── Row ──────────────────────────────────────────────────────────────── */

/**
 * `.industry-row` (styles.css) — the editorial divider-row list used for
 * secondary industries, where tiles would over-promote them.
 *
 * The hover is the interesting part: the row gains 16px of left padding over
 * 240ms, so the whole line slides right as if stepping forward. Cheaper and
 * quieter than a lift, and it works in a long list where lifting every row
 * would be noise.
 */
export function IndustryRow({ industry, className }: { industry: Industry; className?: string }) {
  const Icon = industry.icon;
  return (
    <a
      href={industry.href}
      className={cn(
        "grid items-center gap-[clamp(20px,4vw,56px)] border-b border-[rgba(18,18,18,0.14)] px-1 py-[clamp(24px,3.2vw,36px)] text-ink",
        "tablet:grid-cols-[minmax(220px,0.9fr)_minmax(0,1.5fr)_auto]",
        "transition-[padding-left,background] duration-[240ms] ease-exit",
        "hover:bg-[rgba(18,18,18,0.018)] hover:pl-4",
        className,
      )}
    >
      <span className="flex items-center gap-4">
        {Icon ? <Icon className="size-6 shrink-0" /> : null}
        <h3 className="text-title-xs leading-[1.12] font-semibold">{industry.name}</h3>
      </span>
      {industry.line ? <p className="text-body-sm leading-[1.56] text-ink-muted">{industry.line}</p> : null}
    </a>
  );
}

/** `.industry-row-list` — the rule above the first row is part of the pattern. */
export function IndustryRowList({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mt-[clamp(40px,5vw,64px)] flex flex-col border-t border-[rgba(18,18,18,0.14)]", className)}>
      {children}
    </div>
  );
}

/* ── Panel ────────────────────────────────────────────────────────────── */

/**
 * `.industry-panel` (styles.css) — the expanding panel row.
 *
 * Panels share a row at `flex: 1 1 0`, and the hovered one grows to
 * `flex-grow: 2.6` while its photograph scales to 1.07 behind a fixed overlay.
 * The row has a fixed height so the expansion is purely horizontal — the page
 * below never moves. This is the most expressive component in the system;
 * one row of it per page, at most.
 */
export function IndustryPanel({ industry, className }: { industry: Industry; className?: string }) {
  return (
    <a
      href={industry.href}
      className={cn(
        "group relative flex min-w-0 flex-1 flex-col justify-end overflow-hidden rounded-card text-on-dark",
        "transition-[flex-grow,box-shadow] duration-[520ms] ease-exit",
        "hover:grow-[2.6] hover:shadow-[0_32px_80px_rgba(18,18,18,0.2)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-[600ms] ease-exit group-hover:scale-[1.07]"
        style={{ backgroundImage: `url(${industry.image})` }}
      />
      <span
        aria-hidden
        className="absolute inset-0 z-[1] bg-[linear-gradient(175deg,rgba(18,18,18,0.06)_0%,rgba(18,18,18,0.6)_52%,rgba(18,18,18,0.82)_100%)]"
      />
      <span className="relative z-[2] p-[22px]">
        <span className="block text-[1.25rem] leading-[1.12] font-semibold text-on-dark">{industry.name}</span>
        {industry.line ? <span className="mt-2 block text-[0.875rem] text-white/78">{industry.line}</span> : null}
      </span>
    </a>
  );
}

/** `.industry-panel-row` — fixed height so expansion never reflows the page. */
export function IndustryPanelRow({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex h-[clamp(210px,25vh,280px)] gap-3.5", className)}>{children}</div>;
}
