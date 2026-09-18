import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * `.eyebrow` / `.tagline` / `.section-kicker` (styles.css:885) — one rule in the
 * legacy system, hand-written five times across the React port before this.
 *
 * TRACKING IS A KNOWN DISCREPANCY. The legacy spec says `letter-spacing: 0.08em`;
 * every React eyebrow shipped at 0.04em. The default here is **0.04em — what is
 * live** — so adopting this component changed nothing on the page. Pass
 * `tracking="spec"` for the documented 0.08em. Worth resolving one way or the
 * other, but not worth changing 6 eyebrows silently to find out.
 *
 * KNOWN CONTRAST GAP, pre-existing and deliberate: `red-400` (#ff4040) computes
 * to roughly 3.2:1 on the page ground, under the 4.5:1 normal-text threshold.
 * `red-500` (#a12828, 6.88:1) is the token actually vetted for text on light.
 * Changing it moves every eyebrow on the site at once, so it is flagged rather
 * than silently swapped — `tone="accessible"` opts a single instance in.
 */
export function Eyebrow({
  as: Tag = "p",
  tone = "brand",
  tracking = "shipped",
  className,
  children,
}: {
  as?: "p" | "h2" | "span";
  tone?: "brand" | "accessible";
  /** "shipped" = 0.04em, what the site uses. "spec" = 0.08em, what DESIGN.md says. */
  tracking?: "shipped" | "spec";
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "text-label font-semibold uppercase",
        tracking === "shipped" ? "tracking-[0.04em]" : "tracking-[0.08em]",
        tone === "brand" ? "text-red-400" : "text-red-500",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
