import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackPointerVars } from "@/lib/pointer-vars";

/**
 * `.glass-card` (reference/legacy/styles.css:1626) — the system's signature
 * surface, and the one place glass is present at rest rather than on engage.
 *
 * Not the same component as `Pillar`, though they look related: a pillar is
 * plain `rgba(255,255,255,0.28)` until hovered and keeps its glass on a hidden
 * `::before`. Use GlassCard when the surface should read as glass immediately;
 * use Pillar when glass is the reward for engaging.
 *
 * `interactive` adds the hover lift and the pointer-following white shine.
 * Leave it off for panels that hold controls of their own rather than acting
 * as one target — a card full of buttons should not itself feel clickable.
 */
export function GlassCard({
  interactive = false,
  className,
  children,
}: {
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn("glass-card", interactive && "glass-card-interactive", className)}
      onPointerMove={trackPointerVars}
    >
      {children}
    </div>
  );
}
