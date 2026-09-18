"use client";

import { useMemo, useState } from "react";
import { RiAddLine, RiSearchLine, RiSubtractLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { StoryCard, StoryGrid, type Story } from "@/components/ui/story-card";

export interface FilterableStory extends Story {
  /** Facet values, keyed by group name — e.g. { Industry: ["Retail"], … } */
  facets: Record<string, string[]>;
}

/**
 * `.story-browser` (styles.css) — the filterable story listing: a sticky sidebar
 * of search plus accordion facets, and a grid that narrows as you choose.
 *
 * Filtering is derived, never stored: the visible list is computed from the
 * query and the selected facets on every render, so there is no second copy of
 * the data to fall out of sync. Facet counts are computed the same way and
 * reflect what is actually there — a facet with no matches reads 0 rather than
 * disappearing, which keeps the sidebar from reflowing as you click.
 *
 * It reuses `StoryCard` rather than restating the card markup. The empty state
 * is part of the component, not an afterthought: a filter UI that can return
 * nothing has to say so and offer the way back.
 */
export function StoryBrowser({
  stories,
  groups,
  className,
}: {
  stories: FilterableStory[];
  /** Facet group order. Keys must match those used in each story's `facets`. */
  groups: string[];
  className?: string;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Record<string, string[]>>({});
  const [open, setOpen] = useState<string[]>(groups);

  const options = useMemo(() => {
    const map: Record<string, Map<string, number>> = {};
    for (const g of groups) map[g] = new Map();
    for (const s of stories)
      for (const g of groups)
        for (const v of s.facets[g] ?? []) map[g].set(v, (map[g].get(v) ?? 0) + 1);
    return map;
  }, [stories, groups]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((s) => {
      if (q && !s.title.toLowerCase().includes(q) && !s.badge.toLowerCase().includes(q)) return false;
      return groups.every((g) => {
        const want = selected[g];
        return !want?.length || want.some((v) => (s.facets[g] ?? []).includes(v));
      });
    });
  }, [stories, groups, query, selected]);

  const active = Object.values(selected).flat().length + (query ? 1 : 0);
  const toggle = (g: string, v: string) =>
    setSelected((s) => {
      const cur = s[g] ?? [];
      return { ...s, [g]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  return (
    <div className={cn("grid gap-8 tablet:grid-cols-[minmax(240px,0.32fr)_minmax(0,1fr)] tablet:gap-12", className)}>
      <aside className="flex flex-col gap-[26px] tablet:sticky tablet:top-[100px] tablet:self-start">
        <div className="flex flex-col rounded-card border border-line bg-surface-lift p-[clamp(18px,1.5vw,24px)]">
          <label className="relative mb-5 block">
            <RiSearchLine
              aria-hidden
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories"
              aria-label="Search stories"
              className="w-full rounded-pill border border-line bg-surface py-2.5 pr-4 pl-10 text-body-sm text-ink placeholder:text-ink-muted"
            />
          </label>

          {groups.map((g) => {
            const isOpen = open.includes(g);
            return (
              <div key={g} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen((o) => (isOpen ? o.filter((x) => x !== g) : [...o, g]))}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 py-3.5 text-left text-body-sm font-semibold text-ink"
                >
                  {g}
                  {isOpen ? <RiSubtractLine className="size-4" /> : <RiAddLine className="size-4" />}
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-[320ms] ease-exit"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <ul className="m-0 grid list-none gap-1.5 pb-3.5 pl-0">
                      {[...options[g].entries()].map(([value, count]) => {
                        const on = (selected[g] ?? []).includes(value);
                        return (
                          <li key={value}>
                            <label className="flex cursor-pointer items-center gap-2.5 text-body-sm text-ink-muted">
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() => toggle(g, value)}
                                className="size-4 shrink-0 cursor-pointer accent-neutral-900"
                              />
                              <span className={cn("flex-1", on && "font-semibold text-ink")}>{value}</span>
                              <span className="font-mono text-label tabular-nums text-ink-muted">{count}</span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {active > 0 ? (
          <button
            type="button"
            onClick={() => {
              setSelected({});
              setQuery("");
            }}
            className="cursor-pointer self-start text-body-sm font-semibold text-ink underline underline-offset-4"
          >
            Clear {active} filter{active === 1 ? "" : "s"}
          </button>
        ) : null}
      </aside>

      <div>
        <p className="mb-5 text-body-sm text-ink-muted" aria-live="polite">
          {visible.length} of {stories.length} stories
        </p>
        {visible.length ? (
          <StoryGrid>
            {visible.map((s) => (
              <StoryCard key={s.title} story={s} />
            ))}
          </StoryGrid>
        ) : (
          <div className="rounded-card border border-line bg-surface-lift p-10 text-center">
            <p className="mb-2 text-title-sm font-semibold">Nothing matches that.</p>
            <p className="text-body-sm text-ink-muted">Try fewer filters, or a different search term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
