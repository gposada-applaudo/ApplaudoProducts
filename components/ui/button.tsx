import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

function handleGlintPointerMove(event: React.PointerEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  event.currentTarget.style.setProperty("--shine-x", `${x}%`);
  event.currentTarget.style.setProperty("--shine-y", `${y}%`);
}

/**
 * Two variants, by design.
 *
 * The Two-Button Rule: a button row carries exactly one `black` (the action)
 * and one `white` (the deferral). Never two primaries; never a solo primary.
 */
const buttonVariants = cva(
  [
    "relative isolate inline-flex items-center justify-center gap-3",
    "min-h-11 rounded-pill border border-transparent",
    "font-sans text-ui font-semibold leading-none whitespace-nowrap",
    "cursor-pointer overflow-hidden select-none",
    "transition-[color,background-color,border-color,box-shadow,transform]",
    "duration-[260ms] ease-exit",
    "hover:-translate-y-px active:translate-y-0 active:scale-[0.985]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        black: "bg-neutral-900 text-neutral-50 hover:shadow-button",
        white: [
          "border-[0.5px] border-[rgba(18,18,18,0.1)] bg-white/65 text-ink",
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-[20px] backdrop-saturate-[1.35]",
          "hover:border-[rgba(18,18,18,0.14)]",
          "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_10px_26px_rgba(18,18,18,0.08)]",
        ].join(" "),
      },
      size: {
        default: "px-[22px]",
        small: "px-[10px]",
        icon: "size-12 gap-0 px-0",
      },
    },
    defaultVariants: { variant: "black", size: "default" },
  },
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, onPointerMove, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        "btn-glint",
        variant === "white" ? "btn-glint-white" : "btn-glint-black",
        className,
      )}
      onPointerMove={(event: React.PointerEvent<HTMLElement>) => {
        handleGlintPointerMove(event);
        onPointerMove?.(event as never);
      }}
      {...props}
    />
  );
}

export { Button, buttonVariants };
