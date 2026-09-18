"use client";

import { useState } from "react";
import { RiArrowLeftLine, RiArrowRightLine, RiDoubleQuotesL, RiUser3Line } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar?: string;
}

/**
 * `.testimonial-stack` (styles.css) — a five-card horizontal carousel: one
 * centred, two receding each side, the rest hidden.
 *
 * Positions are derived from the active index, not stored: `pos` is the card's
 * offset around the ring, mapped to the five states the CSS knows. Anything
 * further away is `hidden`, so the component works with any number of quotes
 * from one upward — with fewer than five, the unused states simply never apply.
 *
 * The whole stack is clickable (advance), with real buttons underneath for
 * keyboard and screen-reader users; the dots are the accessible position
 * indicator the click target cannot provide on its own.
 */
export function Testimonials({ items, className }: { items: Testimonial[]; className?: string }) {
  const [active, setActive] = useState(0);
  const n = items.length;
  const go = (d: number) => setActive((i) => (i + d + n) % n);

  // Ring offset → the five position states the stylesheet defines.
  const posOf = (i: number) => {
    const d = (i - active + n) % n;
    if (d === 0) return "0";
    if (d === 1) return "1";
    if (d === 2) return "2";
    if (d === n - 1) return "4";
    if (d === n - 2) return "3";
    return "hidden";
  };

  return (
    // overflow-x: clip, not hidden — the side cards translate to ±36% and at
    // phone width that escapes the viewport. `clip` contains them without
    // creating a scroll container, so the vertical shadow still paints.
    <div className={cn("mx-auto mt-[clamp(40px,5vw,64px)] max-w-[640px] overflow-x-clip", className)}>
      <div
        className="relative mb-10 grid cursor-pointer"
        onClick={() => go(1)}
        aria-live="polite"
      >
        {items.map((t, i) => (
          <figure key={t.name} data-pos={posOf(i)} className="testimonial-card m-0 p-[clamp(30px,3vw,44px)]">
            <div className="testimonial-card-inner flex h-full flex-col gap-[22px]">
              <RiDoubleQuotesL aria-hidden className="size-[30px] text-red-400" />
              <blockquote className="m-0 text-body leading-relaxed text-ink">{t.quote}</blockquote>
              <figcaption className="mt-auto flex items-center gap-3.5">
                <span className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-pill bg-ink/[0.06] text-ink-muted">
                  {t.avatar ? (
                    <img src={t.avatar} alt="" className="size-full object-cover" />
                  ) : (
                    <RiUser3Line className="size-5" />
                  )}
                </span>
                <span className="grid">
                  <span className="text-body-sm font-semibold text-ink">{t.name}</span>
                  <span className="text-body-sm text-ink-muted">{t.role}</span>
                </span>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="grid size-10 cursor-pointer place-items-center rounded-pill border border-line text-ink transition-colors duration-[160ms] hover:bg-ink/[0.04]"
        >
          <RiArrowLeftLine className="size-4" />
        </button>
        <div className="flex gap-1.5">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1} of ${n}`}
              aria-current={i === active}
              className={cn(
                "size-1.5 cursor-pointer rounded-pill transition-colors duration-[160ms]",
                i === active ? "bg-ink" : "bg-ink/25 hover:bg-ink/50",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="grid size-10 cursor-pointer place-items-center rounded-pill border border-line text-ink transition-colors duration-[160ms] hover:bg-ink/[0.04]"
        >
          <RiArrowRightLine className="size-4" />
        </button>
      </div>
    </div>
  );
}
