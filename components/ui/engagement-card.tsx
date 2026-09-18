import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * `.engagement-card` (styles.css) — the lightest card in the system: no fill,
 * no border except a hairline rule across the top, no shadow. A column of text
 * under a line, which is why it sits in a 3-up grid without feeling like boxes.
 *
 * On hover the top rule turns red rather than the card lifting far — the whole
 * point of the component is restraint. `min-h` keeps a row of them even when
 * the copy lengths differ.
 */
export function EngagementCard({
  step,
  title,
  className,
  children,
}: {
  /** The small red lead-in — a step number, a phase, a duration. */
  step?: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[330px] flex-col border-t border-[rgba(18,18,18,0.12)] bg-transparent",
        "pt-7 pr-2 pb-[18px]",
        "transition-[transform,border-color] duration-200 ease-out",
        "hover:-translate-y-[3px] hover:border-t-[rgba(255,64,64,0.36)]",
        className,
      )}
    >
      {step ? (
        <span className="mb-[38px] text-ui font-semibold tracking-[0.02em] text-red-500">{step}</span>
      ) : null}
      <h3 className="mb-3.5 text-title-sm leading-[1.12] font-semibold">{title}</h3>
      <p className="text-body-sm leading-[1.56] text-ink-muted">{children}</p>
    </div>
  );
}

/** `.engagement-grid` — 3-up, 18px gutter, collapsing to one column on mobile. */
export function EngagementGrid({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("grid gap-[18px] tablet:grid-cols-3", className)}>{children}</div>;
}
