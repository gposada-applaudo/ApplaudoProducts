import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * The page's structural unit, ported from `.section` / `.section-inner`
 * (reference/legacy/styles.css:525-552). One content width (1180px), one
 * vertical rhythm, and the alternating surface tone that gives the page
 * its bands — sections do not set their own width or padding.
 */
export function Section({
  id,
  tone = "base",
  className,
  children,
}: {
  id?: string;
  tone?: "base" | "lift";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-clip px-6 py-[clamp(72px,8vw,108px)]",
        tone === "lift" ? "bg-surface-lift" : "bg-surface",
        className,
      )}
    >
      <div className="relative z-10 mx-auto w-full max-w-section">{children}</div>
    </section>
  );
}

/**
 * `.section-heading` (styles.css:1599-1616): title left, lede right, at the
 * system's 0.42 / 0.58 split. `layout="stacked"` is a one-column variant —
 * eyebrow, then title, then lede below it — for a section that reads as one
 * short statement rather than a title-plus-supporting-lede pair.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  layout = "split",
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  layout?: "split" | "stacked";
}) {
  if (layout === "stacked") {
    return (
      <div className="mb-[34px]">
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="text-section-title leading-[0.98] font-semibold text-balance">{title}</h2>
        {lede ? <p className="mt-4 text-body leading-relaxed text-ink-muted">{lede}</p> : null}
      </div>
    );
  }

  return (
    <div className="mb-[34px] grid items-start gap-8 tablet:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] tablet:gap-[clamp(40px,6vw,96px)]">
      <div>
        <Eyebrow className="mb-4">{eyebrow}</Eyebrow>
        <h2 className="max-w-[760px] text-section-title leading-[0.98] font-semibold text-balance">{title}</h2>
      </div>
      {lede ? <p className="max-w-[62ch] self-end text-body leading-relaxed text-ink-muted">{lede}</p> : null}
    </div>
  );
}
