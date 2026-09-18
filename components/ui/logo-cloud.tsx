/**
 * Ported from the kitchensink's `.logo-cloud` (reference/legacy/styles.css:1345-1376).
 * The source hardcodes 8 columns (4 at tablet, 2 at mobile) for the full client wall;
 * auto-fit tracks give the same progression while also reading correctly when a page
 * shows only a few logos, as this one does.
 */
import { cn } from "@/lib/utils";

export interface LogoCloudItem {
  name: string;
  src: string;
}

export function LogoCloud({ logos, className }: { logos: LogoCloudItem[]; className?: string }) {
  return (
    <div className={cn("mt-7 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] items-center gap-[22px_18px] tablet:gap-[26px_22px]", className)}>
      {logos.map((logo) => (
        <figure key={logo.name} className="m-0 flex h-24 w-full items-center justify-center tablet:h-28">
          <img
            src={logo.src}
            alt={logo.name}
            className="h-[68px] w-[276px] max-w-full object-contain opacity-[0.78] contrast-[1.08] grayscale transition-[filter,opacity,transform] duration-[220ms] hover:-translate-y-0.5 hover:scale-105 hover:opacity-100 hover:contrast-[1.04] hover:grayscale-0 tablet:h-20 tablet:w-[312px]"
          />
        </figure>
      ))}
    </div>
  );
}
