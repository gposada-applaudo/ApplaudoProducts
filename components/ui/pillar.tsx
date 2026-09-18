import { useId, useState, type ComponentType, type ReactNode } from "react";
import { RiArrowDownSLine } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { trackPointerVars } from "@/lib/pointer-vars";

/**
 * `.services-pillars` / `.service-pillar` (reference/legacy/styles.css:2510-2650),
 * restyled: at rest each pillar is an open column under a hairline rule, and the
 * glass panel, red bloom and sibling dimming (all in the `.pillar` layer in
 * globals.css) arrive on engage.
 *
 * The "See more" control is the disclosure button. Clicking anywhere on the card
 * works too — the button's own click just bubbles up to the card, so it carries
 * no handler of its own. It is visible at rest at every width.
 */
export function PillarGroup({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("pillar-group grid items-start gap-[22px]", className)}>{children}</div>;
}

export function Pillar({
  icon: Icon,
  title,
  details,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  title: string;
  details: ReactNode;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  const engaged =
    "[.pillar:focus-within_&]:-translate-y-1 [.pillar:focus-within_&]:border-transparent [.pillar:focus-within_&]:bg-neutral-900 [.pillar:focus-within_&]:text-neutral-50 [.pillar:focus-within_&]:shadow-[0_14px_28px_rgba(18,18,18,0.18)] [.pillar:hover_&]:-translate-y-1 [.pillar:hover_&]:border-transparent [.pillar:hover_&]:bg-neutral-900 [.pillar:hover_&]:text-neutral-50 [.pillar:hover_&]:shadow-[0_14px_28px_rgba(18,18,18,0.18)]";

  return (
    <article
      className={cn("pillar flex cursor-pointer flex-col p-7", open && "is-open")}
      onPointerMove={trackPointerVars}
      onClick={() => setOpen((v) => !v)}
    >
      <span
        className={cn(
          "inline-grid size-11 place-items-center rounded-pill border transition-[transform,box-shadow,background-color,border-color,color] duration-[360ms] ease-exit",
          open
            ? "-translate-y-1 border-transparent bg-neutral-900 text-neutral-50 shadow-[0_14px_28px_rgba(18,18,18,0.18)]"
            : cn("border-line bg-transparent text-ink", engaged),
        )}
      >
        <Icon className="size-[22px]" />
      </span>

      <h3 className="mt-6 mb-2.5 text-title-xs leading-[1.05] font-semibold text-balance">{title}</h3>

      {children}

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        className={cn(
          "mt-5 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-pill border px-3.5 py-2",
          "text-label font-semibold whitespace-nowrap",
          "transition-[opacity,transform,background-color,border-color,color,box-shadow] duration-[260ms] ease-exit",
          "border-[rgba(18,18,18,0.1)] bg-white/65 text-ink shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
          "backdrop-blur-[20px] backdrop-saturate-[1.35] hover:bg-white/85",
          // Always visible. It used to fade in on hover, which meant every card
          // reserved 86px for a control nobody could see, and the interaction
          // was undiscoverable without accidentally hovering. The Portfolios
          // rows below already show theirs at rest; this matches them.
          "translate-y-0 opacity-100",
        )}
      >
        {open ? "See less" : "See more"}
        <RiArrowDownSLine aria-hidden className={cn("size-3.5 transition-transform duration-[260ms]", open && "-rotate-180")} />
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-[420ms] ease-exit"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">{details}</div>
      </div>
    </article>
  );
}
