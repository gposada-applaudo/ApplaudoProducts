import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useOnceVisible } from "@/lib/use-once-visible";

/**
 * `.reveal` (reference/legacy/styles.css:3651+) — 26px rise, 700ms, once.
 * Used on the sections that introduce something, not on every block: a page
 * where everything enters the same way reads as a template.
 */
export function Reveal({ delay = 0, className, children }: { delay?: number; className?: string; children: ReactNode }) {
  const { ref, visible } = useOnceVisible<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-reveal=""
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-[26px] opacity-0",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
