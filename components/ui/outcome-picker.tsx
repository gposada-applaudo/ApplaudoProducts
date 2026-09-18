"use client";

import { useId, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/ui/glass-card";
import { sitePath } from "@/lib/paths";

export interface OutcomeChoice {
  id: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  /** Art that cross-fades in behind the copy. Bleeds off the card's right edge. */
  image: string;
  note: string;
  listLabel: string;
  /** The ledger rows. `lead` marks the one this outcome usually starts in. */
  items: { name: string; lead?: boolean }[];
}

/**
 * `.compose-picker` (reference/legacy/styles.css) — the Outcome Picker. It was
 * the landing page's "Composed around you" section before that was cut, and is
 * kept here because the pattern is sound even though the page no longer uses it.
 *
 * Three things are doing the work:
 *  · the surface is a real `GlassCard`, not a reimplementation — it supplies the
 *    blur, the border and the pointer-tracked bloom;
 *  · the art bleeds off the right edge behind the copy, masked with a
 *    left-to-right transparent→black gradient so it dissolves before it reaches
 *    the text rather than being scrimmed;
 *  · `.compose-picker-body` is `position: relative` and that is load-bearing.
 *    The art layer precedes it in the DOM; without a stacking context on the
 *    body, the art paints over the copy.
 *
 * Panels share one grid cell and cross-fade, so the card height is the tallest
 * panel and nothing jumps as you switch.
 */
export function OutcomePicker({ choices, className }: { choices: OutcomeChoice[]; className?: string }) {
  const [active, setActive] = useState(0);
  const base = useId();

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + choices.length) % choices.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <GlassCard className={cn("relative overflow-clip p-[clamp(28px,3.4vw,40px)]", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] tablet:block">
        {choices.map((c, i) => (
          <span
            key={c.id}
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-exit",
              "[mask-image:linear-gradient(to_right,transparent,black_70%)]",
              i === active ? "opacity-100" : "opacity-0",
            )}
            style={{ backgroundImage: `url("${sitePath(c.image)}")` }}
          />
        ))}
      </div>

      <div className="relative max-w-[42ch]">
        <div role="tablist" aria-label="Outcomes" onKeyDown={onKey} className="mb-7 flex flex-wrap gap-2">
          {choices.map((c, i) => (
            <button
              key={c.id}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2 rounded-pill border px-4 py-2.5 text-body font-semibold",
                "transition-[color,background-color,border-color,box-shadow] duration-[220ms] ease-exit",
                i === active
                  ? "border-[rgba(18,18,18,0.1)] bg-white/65 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[20px] backdrop-saturate-[1.35]"
                  : "border-transparent bg-transparent text-ink-muted hover:text-ink",
              )}
            >
              <c.icon className="size-[18px]" />
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative grid">
          {choices.map((c, i) => (
            <div
              key={c.id}
              id={`${base}-panel-${i}`}
              role="tabpanel"
              aria-labelledby={`${base}-tab-${i}`}
              className={cn(
                "col-start-1 row-start-1 transition-opacity duration-[420ms] ease-exit",
                i === active ? "opacity-100" : "pointer-events-none opacity-0",
              )}
              {...(i === active ? {} : { inert: "" as unknown as boolean })}
            >
              <p className="mb-8 text-body leading-[1.6] text-ink-muted">{c.note}</p>
              <p className="mb-4 text-label font-semibold tracking-[0.06em] text-ink-muted uppercase">{c.listLabel}</p>
              <ul className="m-0 grid list-none gap-3 p-0">
                {c.items.map((item, n) => (
                  <li key={item.name} className="grid grid-cols-[auto_1fr] items-baseline gap-4">
                    <span
                      className={cn(
                        "font-mono text-label font-semibold tabular-nums transition-colors duration-[220ms]",
                        item.lead ? "text-red-500" : "text-ink/34",
                      )}
                    >
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-body transition-[opacity,transform] duration-[220ms] ease-exit",
                        item.lead ? "font-semibold text-ink" : "text-ink-muted opacity-[0.38]",
                      )}
                    >
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
