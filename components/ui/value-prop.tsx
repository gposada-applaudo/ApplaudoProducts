import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * `.value-prop-section` / `.value-prop-shell` (styles.css) — the page's single
 * biggest statement: heading left, lede and CTAs right, on its own tinted band.
 *
 * Two things carry the weight and are easy to lose in a port:
 *  · the band is a vertical white→surface gradient, not a flat tone, so it
 *    separates from the sections above and below without a rule;
 *  · two very low-opacity radial blooms (red at 18%/20%, purple at 84%/72%)
 *    sit on a `::before`. At 5.5% and 6% they are almost subliminal — they stop
 *    the large empty area reading as dead space. This is the one place purple
 *    appears on a core surface, and it predates the Portfolio Surface Rule.
 *
 * The right column has a hard `minmax(420px, …)` floor: below that the lede
 * wraps badly against a heading this large, so the grid collapses instead.
 */
export function ValueProp({
  eyebrow,
  title,
  lede,
  actions,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  /** The button row. Two buttons, per the Two-Button Rule. */
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-clip px-6 py-[clamp(72px,8vw,108px)]",
        "bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,247,247,0.82)_100%)]",
        "before:pointer-events-none before:absolute before:inset-0 before:content-['']",
        "before:bg-[radial-gradient(circle_at_18%_20%,rgba(255,64,64,0.055),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(160,68,232,0.06),transparent_30%)]",
        className,
      )}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-section items-start gap-[clamp(48px,8vw,132px)] tablet:grid-cols-[minmax(0,0.82fr)_minmax(420px,0.72fr)]">
        <div className="grid max-w-[760px] gap-4">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="max-w-[760px] text-section-title leading-[1.04] font-semibold text-balance">{title}</h2>
        </div>
        <div className="grid max-w-[420px] content-start gap-[22px]">
          <p className="max-w-[420px] text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[1.62] text-ink/72">{lede}</p>
          {actions ? <div className="mt-0.5 flex flex-wrap items-center gap-3.5">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}
