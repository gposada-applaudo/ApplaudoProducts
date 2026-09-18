import type { ComponentType, ReactNode } from "react";
import { RiArrowRightLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

/**
 * `.next-step-card` (styles.css) — the filled counterpart to EngagementCard.
 * Border, radius, lifted surface, a black icon tile, and a text CTA whose arrow
 * slides on hover. Used for "where to go next" rows at the end of a page.
 *
 * It is a link, not a card with a link in it: the whole surface is the target,
 * so `href` is required. The arrow moving 3px is the only motion besides the
 * lift — the Flat-By-Default Rule means the shadow appears on hover, not at rest.
 */
export function NextStepCard({
  icon: Icon,
  title,
  href,
  cta = "Learn more",
  className,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  href: string;
  cta?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col gap-3.5 rounded-card border border-line bg-surface-lift p-[clamp(28px,3vw,38px)]",
        "transition-[transform,box-shadow] duration-[220ms] ease-out",
        "hover:-translate-y-1 hover:shadow-deep",
        className,
      )}
    >
      <span className="mb-1.5 grid size-13 place-items-center rounded-inner bg-neutral-900 text-on-dark">
        <Icon className="size-6" />
      </span>
      <h3 className="text-title-sm leading-[1.12] font-semibold">{title}</h3>
      <p className="flex-1 text-body-sm leading-[1.6] text-ink-muted">{children}</p>
      <span className="mt-2 inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink">
        {cta}
        <RiArrowRightLine
          aria-hidden
          className="size-4 transition-transform duration-[180ms] group-hover:translate-x-[3px]"
        />
      </span>
    </a>
  );
}

/** `.next-step-grid` — 3-up with a fluid gutter. */
export function NextStepGrid({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("mt-[clamp(32px,4vw,52px)] grid gap-[clamp(20px,2.4vw,28px)] tablet:grid-cols-3", className)}>
      {children}
    </div>
  );
}
