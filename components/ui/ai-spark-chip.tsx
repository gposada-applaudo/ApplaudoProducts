import { cn } from "@/lib/utils";
import { sitePath } from "@/lib/paths";

/**
 * `.ai-spark-chip` (styles.css) — a 40px frosted square holding the AI spark
 * mark. Used as a lead-in above a heading on AI-related sections.
 *
 * Glass on a 40px square only reads when something sits behind it; on a solid
 * band the blur does nothing and this becomes a white box (the Glass
 * Prerequisite Rule). Put it over imagery or a gradient, not over flat surface.
 */
export function AiSparkChip({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid size-10 shrink-0 place-items-center rounded-inner",
        "border border-surface-lift bg-white/68",
        "shadow-[0_8px_18px_rgba(18,18,18,0.05)]",
        "backdrop-blur-[22px] backdrop-saturate-[1.28]",
        className,
      )}
    >
      <img src={sitePath("/assets/ui/ai-spark.svg")} alt="" className="size-[18px] object-contain" />
    </span>
  );
}
