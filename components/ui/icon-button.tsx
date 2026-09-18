import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

/**
 * Icon-only circular action — ported from the kitchensink's `.icon-button`
 * (reference/legacy/styles.css:956, 1194-1201): a solid 48px black pill,
 * used for the nav's mobile menu toggle and footer socials.
 */
export interface IconButtonProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

function IconButton({ className, asChild = false, ...props }: IconButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="icon-button"
      className={cn(
        "relative isolate inline-flex size-12 shrink-0 cursor-pointer items-center justify-center gap-0",
        "rounded-pill border border-neutral-900 bg-neutral-900 text-neutral-50",
        "shadow-[0_12px_30px_rgba(18,18,18,0.08)] backdrop-blur-[18px]",
        "transition-[color,background-color,border-color,box-shadow,transform] duration-[260ms] ease-exit",
        "hover:-translate-y-px active:translate-y-0 active:scale-[0.985]",
        "disabled:pointer-events-none disabled:opacity-50",
        "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
        className,
      )}
      {...props}
    />
  );
}

export { IconButton };
