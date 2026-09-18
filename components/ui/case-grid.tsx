import { RiArrowRightLine } from "@remixicon/react";
import { Tag, TagRow } from "@/components/ui/tag";

/**
 * `.case-grid` (reference/legacy/styles.css:1640-1830) — one feature case beside
 * two stacked horizontal cases, split by a hairline centred in the column gap.
 *
 * The reference points its `.case-visual` backgrounds at Unsplash URLs. Those are
 * placeholders: they break in an offline file and stock photography is one of this
 * brand's stated anti-references. These use the commissioned glass renders in
 * public/assets/photos instead.
 */
export interface CaseStudy {
  tagline: string;
  pills: string[];
  title: string;
  visual: string;
  href: string;
}

function CasePills({ pills }: { pills: string[] }) {
  return (
    <TagRow className="mt-2 mb-4">
      {pills.map((pill) => (
        <Tag key={pill}>{pill}</Tag>
      ))}
    </TagRow>
  );
}

function CaseCta({ small }: { small?: boolean }) {
  return (
    <span
      className={
        small
          ? "mt-2.5 inline-flex items-center gap-1.5 text-label font-semibold text-ink"
          : "mt-[22px] inline-flex items-center gap-1.5 text-body-sm font-semibold text-ink"
      }
    >
      Read the story
      <RiArrowRightLine className="size-4 transition-transform duration-[180ms] group-hover:translate-x-[3px]" />
    </span>
  );
}

export function CaseGrid({ feature, aside }: { feature: CaseStudy; aside: CaseStudy[] }) {
  return (
    <div className="relative grid gap-6 tablet:grid-cols-2 tablet:gap-[clamp(24px,3.5vw,48px)]">
      {/* Hairline centred in the column gap, desktop only. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-line tablet:block"
      />

      <a href={feature.href} className="group flex flex-col gap-[18px]">
        <div
          className="h-[clamp(190px,20vw,240px)] w-full overflow-hidden rounded-card bg-cover bg-[position:60%_center] shadow-ambient transition-[transform,box-shadow] duration-[420ms] ease-exit group-hover:-translate-y-1 group-hover:shadow-deep"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.02), rgba(18,18,18,0.16)), url(${feature.visual})` }}
        />
        <div>
          <p className="m-0 text-label leading-[1.35] tracking-[0.08em] text-red-400">{feature.tagline}</p>
          <CasePills pills={feature.pills} />
          <h3 className="m-0 max-w-[760px] text-feature leading-[1.04] font-semibold text-balance">{feature.title}</h3>
          <CaseCta />
        </div>
      </a>

      <div className="flex flex-col justify-between">
        {aside.map((item, index) => (
          <a
            key={item.title}
            href={item.href}
            className={`group flex flex-row items-center gap-[clamp(14px,1.8vw,20px)] py-5 tablet:py-[clamp(20px,2.5vw,32px)] ${
              index === 0 ? "tablet:pt-0" : "border-t border-line tablet:pb-0"
            }`}
          >
            <div
              className="h-[clamp(120px,13vw,150px)] w-[clamp(110px,26%,150px)] shrink-0 overflow-hidden rounded-card bg-cover bg-[position:70%_center] shadow-ambient transition-[transform,box-shadow] duration-[420ms] ease-exit group-hover:-translate-y-1 group-hover:shadow-deep"
              style={{ backgroundImage: `linear-gradient(180deg, rgba(18,18,18,0.02), rgba(18,18,18,0.16)), url(${item.visual})` }}
            />
            <div className="min-w-0 flex-1">
              <p className="m-0 text-label leading-[1.35] tracking-[0.08em] text-red-400">{item.tagline}</p>
              <CasePills pills={item.pills} />
              <h3 className="m-0 text-body-sm leading-[1.3] font-semibold">{item.title}</h3>
              <CaseCta small />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
