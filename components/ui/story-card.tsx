import { RiArrowRightLine } from "@remixicon/react";
import { cn } from "@/lib/utils";

export interface Story {
  title: string;
  badge: string;
  image: string;
  href: string;
}

/**
 * `.story-card` (styles.css) — image card for customer stories.
 *
 * The media block is 16/7, not 16/10: the legacy comment records that it was
 * cut ~30% in height deliberately so a two-column grid of these does not push
 * the page absurdly long. A dark gradient sits over the image so the frosted
 * badge stays legible whatever the photograph does behind it.
 */
export function StoryCard({ story, className }: { story: Story; className?: string }) {
  return (
    <a
      href={story.href}
      className={cn(
        "group flex w-full flex-col overflow-hidden rounded-card border border-line bg-surface-lift",
        "transition-[transform,box-shadow] duration-[220ms] ease-out hover:-translate-y-1 hover:shadow-deep",
        className,
      )}
    >
      <div
        className="relative aspect-[16/7] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.04), rgba(18,18,18,0.24)), url(${story.image})`,
        }}
      >
        <span className="absolute top-3.5 left-3.5 rounded-pill bg-white/82 px-[13px] py-[7px] text-label font-semibold tracking-[0.02em] text-ink backdrop-blur-[14px] backdrop-saturate-[1.3]">
          {story.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-[clamp(20px,2vw,26px)]">
        <h3 className="text-[clamp(1.1rem,1.4vw,1.3rem)] leading-[1.24] font-semibold">{story.title}</h3>
        <span className="mt-auto inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink">
          Read the story
          <RiArrowRightLine
            aria-hidden
            className="size-4 transition-transform duration-[180ms] group-hover:translate-x-[3px]"
          />
        </span>
      </div>
    </a>
  );
}

/** `.story-grid` — 2-up. The sidebar, where present, holds the left column. */
export function StoryGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("grid gap-[clamp(20px,2.4vw,32px)] tablet:grid-cols-2", className)}>{children}</div>;
}
