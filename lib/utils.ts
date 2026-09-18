import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's stock scales. Our theme's named sizes
 * (`text-body`, `text-title-sm`, …) look to it like they could be text *colors*,
 * so `cn("text-ui", "text-neutral-50")` silently returned just `text-neutral-50`
 * and the font size was dropped — every Button rendered at the inherited 17px
 * instead of 14px. Same blindness applied to `max-w-section` / `max-w-narrow`.
 * Registering the theme's keys makes conflicts resolve on the right axis.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "label",
            "ui",
            "body-sm",
            "body",
            "title-xs",
            "title-sm",
            "stat",
            "section-title",
            "feature",
            "title-md",
            "title-lg",
          ],
        },
      ],
      "max-w": [{ "max-w": ["section", "narrow"] }],
    },
  },
});

/** shadcn/ui's class merger: conditional classes + Tailwind conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
