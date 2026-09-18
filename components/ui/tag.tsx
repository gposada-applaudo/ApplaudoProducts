import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * `.case-pill` (reference/legacy/styles.css) — the system's one chip.
 *
 * Extracted because the recipe had been hand-written in three places with three
 * different sets of values (`bg-ink/[0.07] px-2 py-0.5` in the case grid,
 * `bg-ink/[0.05] px-2 py-1` in the outcome pillars). The legacy value wins:
 * 2px/8px padding, 0.6875rem, radius-tag, muted ink on a 7% ink wash.
 *
 * `tone="solid"` is the darker variant the outcome pillars use for their Value
 * chips, where the chip sits on an already-tinted glass surface.
 */
export function Tag({
  tone = "muted",
  className,
  children,
}: {
  tone?: "muted" | "solid";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-tag font-semibold whitespace-nowrap",
        // Two real variants, both already in use — the values are the shipped
        // ones, not an averaged compromise, so adopting this component changed
        // no pixels. `muted` is the legacy `.case-pill`; `solid` is the larger
        // chip the outcome pillars use, where it sits on tinted glass.
        tone === "muted"
          ? "bg-ink/[0.07] px-2 py-0.5 text-[0.6875rem] leading-[1.6] tracking-[0.03em] text-ink-muted"
          : "bg-ink/[0.05] px-2 py-1 text-label text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** `.case-pills` — the row they sit in. 5px gap, not the section rhythm. */
export function TagRow({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-wrap gap-[5px]", className)}>{children}</div>;
}
