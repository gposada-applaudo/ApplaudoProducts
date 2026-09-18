"use client";

import { useId, useState, type ComponentType, type ReactNode } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface SolveItem {
  id: string;
  num: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  body: string;
}

/**
 * `.solve-module` (styles.css) — a selector list on the left, a detail panel on
 * the right, sharing one grid row so they top- and bottom-align whatever the
 * content does. `grid-auto-rows: 1fr` on the list makes the three cards equal
 * height rather than each hugging its own title.
 *
 * The list label is deliberately sentence case, not a second uppercase kicker:
 * the section eyebrow above it is already a tracked label, and two stacked
 * tracked labels read as a mistake.
 *
 * Proper tab semantics — `role="tablist"`, arrow-key roving focus — because a
 * row of buttons that swaps a panel *is* a tab set, whatever it looks like.
 */
export function SolveModule({
  label = "What we solve",
  items,
  cta,
  className,
}: {
  label?: string;
  items: SolveItem[];
  cta?: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const base = useId();

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + items.length) % items.length;
    setActive(next);
    document.getElementById(`${base}-tab-${next}`)?.focus();
  };

  return (
    <div className={cn("grid gap-8 tablet:grid-cols-2 tablet:gap-[clamp(40px,6vw,96px)]", className)}>
      <div className="grid content-start gap-4">
        <p className="text-body-sm font-semibold text-ink-muted">{label}</p>
        <div role="tablist" aria-label={label} onKeyDown={onKey} className="grid auto-rows-fr gap-4">
          {items.map((item, i) => (
            <button
              key={item.id}
              id={`${base}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${base}-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "group grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-center gap-4 rounded-card border p-[22px] text-left",
                "transition-[background-color,border-color,box-shadow,color] duration-[220ms] ease-exit",
                i === active
                  ? "border-line bg-surface-lift text-ink shadow-[0_10px_30px_rgba(18,18,18,0.06)]"
                  : "border-transparent text-ink-muted hover:text-ink",
              )}
            >
              <span className="font-mono text-label font-semibold tabular-nums">{item.num}</span>
              <span className="text-body leading-snug font-semibold">{item.title}</span>
              <RiArrowRightLine
                aria-hidden
                className={cn(
                  "size-5 transition duration-[220ms] ease-exit",
                  i === active ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              />
            </button>
          ))}
        </div>
        {cta ? <div className="mt-2">{cta}</div> : null}
      </div>

      {items.map((item, i) => (
        <div
          key={item.id}
          id={`${base}-panel-${i}`}
          role="tabpanel"
          aria-labelledby={`${base}-tab-${i}`}
          hidden={i !== active}
          className="relative overflow-clip rounded-card border border-white/75 bg-white/90 p-8 shadow-ambient tablet:col-start-2 tablet:row-start-1"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute top-2 right-6 text-[clamp(104px,15vw,188px)] leading-none font-semibold tabular-nums text-[rgba(18,18,18,0.05)]"
          >
            {item.num}
          </span>
          <span className="relative mb-5 inline-grid size-11 place-items-center rounded-inner bg-neutral-900 text-on-dark">
            <item.icon className="size-5" />
          </span>
          <h3 className="relative mb-4 text-title-sm leading-tight font-semibold">{item.title}</h3>
          <p className="relative max-w-[52ch] text-body leading-relaxed text-ink-muted">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
