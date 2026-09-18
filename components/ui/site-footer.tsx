import { RiInstagramLine, RiLinkedinLine, RiYoutubeLine } from "@remixicon/react";
import { IconButton } from "@/components/ui/icon-button";

/**
 * `.site-footer` (reference/legacy/styles.css:3520+, markup at kitchensink.html:1353)
 * — "shared across every page": brand + columns, then the badge strip, then
 * socials and legal.
 */
export interface FooterBadge {
  label: string;
  /** Omit for an entry that has no usable logo; it renders as a label. */
  src?: string;
  /** Rendered height in px — tuned per logo so they look optically equal. */
  h?: number;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export function SiteFooter({
  columns,
  badges,
  location,
}: {
  columns: FooterColumn[];
  badges: FooterBadge[];
  location: string;
}) {
  return (
    <footer className="bg-surface-invert px-6 pt-16 pb-7 text-on-dark">
      <div className="mx-auto flex w-full max-w-section flex-col justify-between gap-12 tablet:flex-row">
        <div>
          <img
            src="/assets/brand/applaudo.svg"
            alt="Applaudo"
            className="mb-6 w-[170px] brightness-0 invert"
          />
          <p className="text-body-sm leading-[1.45] font-semibold text-on-dark/68">{location}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 tablet:grid-cols-3 tablet:gap-[46px]">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-body-sm leading-[1.3] font-semibold text-on-dark">{column.title}</h2>
              {column.links.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="mb-3 block text-body-sm leading-[1.45] font-semibold text-on-dark/68 transition-colors duration-[160ms] hover:text-on-dark"
                >
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Partner marks. `brightness-0 invert` flattens each logo to white — the
          same treatment the Applaudo mark above gets — because these arrive in
          their own brand colours and a row of clashing palettes on black reads
          as clip art. Muted at rest, full strength on hover. Heights come from
          the data, per logo: see the note on FOOTER_BADGES. */}
      <ul
        className="mx-auto mt-13 mb-8 flex w-full max-w-section list-none flex-wrap items-center gap-x-9 gap-y-6 p-0"
        aria-label="Partners and certifications"
      >
        {badges.map((badge) => (
          <li key={badge.label} className="flex items-center">
            {badge.src ? (
              <img
                src={badge.src}
                alt={badge.label}
                style={{ height: badge.h }}
                className="w-auto opacity-60 brightness-0 invert transition-opacity duration-[220ms] ease-exit hover:opacity-100"
              />
            ) : (
              <span className="text-body-sm font-semibold text-on-dark/60 transition-colors duration-[220ms] ease-exit hover:text-on-dark">
                {badge.label}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mx-auto flex w-full max-w-section flex-col justify-between gap-6 border-t border-white/10 pt-7 tablet:flex-row">
        <div className="flex flex-wrap gap-3" aria-label="Social links">
          <IconButton asChild className="border-white/12">
            <a href="#" aria-label="LinkedIn">
              <RiLinkedinLine />
            </a>
          </IconButton>
          <IconButton asChild className="border-white/12">
            <a href="#" aria-label="Instagram">
              <RiInstagramLine />
            </a>
          </IconButton>
          <IconButton asChild className="border-white/12">
            <a href="#" aria-label="YouTube">
              <RiYoutubeLine />
            </a>
          </IconButton>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {["Privacy policy", "Cookie policy", "Terms of service"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-body-sm leading-[1.45] font-semibold text-on-dark/68 transition-colors duration-[160ms] hover:text-on-dark"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
