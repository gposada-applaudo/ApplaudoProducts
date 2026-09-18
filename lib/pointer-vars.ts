import type { PointerEvent } from "react";

/**
 * Element-relative pointer position as CSS custom properties, mirroring
 * `setPointerVars` in reference/legacy/script.js:41-53. Every pointer-reactive
 * surface in this system (buttons, pillars, glass cards) reads the same four
 * variables, so they all track from one handler.
 */
export function trackPointerVars(event: PointerEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--mx", `${x}%`);
  el.style.setProperty("--my", `${y}%`);
  el.style.setProperty("--shine-x", `${x}%`);
  el.style.setProperty("--shine-y", `${y}%`);
}
