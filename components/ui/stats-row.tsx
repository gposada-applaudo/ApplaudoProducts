import { useEffect, useRef, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";

/**
 * Ported from the kitchensink's `.stats-row` (reference/legacy/styles.css:1250-1315,
 * count-up logic in reference/legacy/script.js:325-356). Icons come from
 * @remixicon/react — the same family the reference build uses.
 */
export interface StatItem {
  icon: ComponentType<{ className?: string }>;
  value: number;
  suffix?: string;
  label: string;
}

function useOnceVisible<T extends HTMLElement>(threshold = 0.16) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function StatCell({ icon: Icon, value, suffix = "", label, index, visible }: StatItem & { index: number; visible: boolean }) {
  // Seeded with the real figure so the server-rendered HTML shows "800+", not
  // "0". If JavaScript never runs, the number is still correct. On mount it
  // resets to 0 and counts up — invisible in practice, the stats sit far below
  // the fold.
  const [display, setDisplay] = useState(value);
  useEffect(() => setDisplay(0), []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    const duration = 980 + index * 120;
    const start = performance.now();
    let raf = requestAnimationFrame(tick);
    function tick(now: number) {
      const elapsed = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - elapsed, 4);
      setDisplay(Math.round(value * eased));
      if (elapsed < 1) raf = requestAnimationFrame(tick);
    }
    return () => cancelAnimationFrame(raf);
  }, [visible, value, index]);

  return (
    <div
      className={cn(
        "transition-[opacity,transform] duration-[560ms] ease-exit",
        visible ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0",
      )}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      <span
        className={cn(
          "mb-[18px] inline-grid size-11 place-items-center rounded-pill bg-neutral-900 text-neutral-50 transition-transform duration-[560ms] ease-exit",
          visible ? "scale-100" : "scale-[0.92]",
        )}
        style={{ transitionDelay: `${index * 90 + 80}ms` }}
      >
        <Icon className="size-[22px]" />
      </span>
      <strong className="mb-2 block text-stat leading-none font-semibold tabular-nums">
        {display}
        {suffix}
      </strong>
      <span className="text-body-sm font-semibold text-ink-muted">{label}</span>
    </div>
  );
}

export function StatsRow({ items }: { items: StatItem[] }) {
  const { ref, visible } = useOnceVisible<HTMLDivElement>();
  return (
    <div ref={ref} className="grid grid-cols-1 gap-[22px] mobile:grid-cols-2 tablet:grid-cols-4">
      {items.map((item, index) => (
        <StatCell key={item.label} index={index} visible={visible} {...item} />
      ))}
    </div>
  );
}
