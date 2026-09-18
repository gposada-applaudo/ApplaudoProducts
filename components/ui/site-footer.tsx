import {
  RiFacebookLine,
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";
import { sitePath } from "@/lib/paths";

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
  links: FooterLink[];
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export function SiteFooter({
  columns,
  badges,
  certifications,
  location,
  homeHref,
}: {
  columns: FooterColumn[];
  badges: FooterBadge[];
  certifications: FooterBadge[];
  location: string;
  homeHref?: string;
}) {
  return (
    <footer className="bg-surface-invert px-6 pt-16 pb-7 text-on-dark">
      <div className="mx-auto flex w-full max-w-section flex-col justify-between gap-12 tablet:flex-row">
        <div>
          {homeHref ? (
            <a href={sitePath(homeHref)} aria-label="Applaudo home" className="mb-6 inline-block">
              <img
                src={sitePath("/assets/brand/applaudo.svg")}
                alt="Applaudo"
                className="w-[170px] brightness-0 invert"
              />
            </a>
          ) : (
            <img
              src={sitePath("/assets/brand/applaudo.svg")}
              alt="Applaudo"
              className="mb-6 w-[170px] brightness-0 invert"
            />
          )}
          <p className="text-body-sm leading-[1.45] font-semibold text-on-dark/68">{location}</p>
          <ul className="mt-5 flex list-none items-center gap-4 p-0" aria-label="Certifications">
            {certifications.map((certification) => (
              <li key={certification.label} className="flex items-center">
                {certification.src ? (
                  <img
                    src={sitePath(certification.src)}
                    alt={certification.label}
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <span className="text-label font-semibold text-on-dark/68">{certification.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 tablet:grid-cols-3 tablet:gap-[46px]">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="mb-4 text-body-sm leading-[1.3] font-semibold text-on-dark">{column.title}</h2>
              {column.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href.startsWith("/") ? sitePath(link.href) : link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noreferrer" : undefined}
                  className="mb-3 block text-body-sm leading-[1.45] font-semibold text-on-dark/68 transition-colors duration-[160ms] hover:text-on-dark"
                >
                  {link.label}
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
      <div className="mx-auto mt-13 mb-8 w-full max-w-section">
        <h2 className="mb-6 text-body-sm leading-[1.3] font-semibold text-on-dark">Partnerships</h2>
        <ul className="flex list-none flex-wrap items-center gap-x-9 gap-y-6 p-0" aria-label="Partners">
          {badges.map((badge) => (
            <li key={badge.label} className="flex items-center">
              {badge.src ? (
                <img
                  src={sitePath(badge.src)}
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
      </div>

      <div className="mx-auto flex w-full max-w-section flex-col justify-between gap-6 border-t border-white/10 pt-7 tablet:flex-row tablet:items-center">
        <div className="flex min-h-11 flex-wrap items-center gap-1" aria-label="Social links">
          <a
            href="#"
            aria-label="LinkedIn"
            className="inline-flex size-11 items-center justify-center text-on-dark/55 transition-colors duration-[160ms] hover:text-on-dark focus-visible:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5"
          >
            <RiLinkedinLine />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="inline-flex size-11 items-center justify-center text-on-dark/55 transition-colors duration-[160ms] hover:text-on-dark focus-visible:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5"
          >
            <RiInstagramLine />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="inline-flex size-11 items-center justify-center text-on-dark/55 transition-colors duration-[160ms] hover:text-on-dark focus-visible:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5"
          >
            <RiFacebookLine />
          </a>
          <a
            href="#"
            aria-label="X"
            className="inline-flex size-11 items-center justify-center text-on-dark/55 transition-colors duration-[160ms] hover:text-on-dark focus-visible:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5"
          >
            <RiTwitterXLine />
          </a>
          <a
            href="#"
            aria-label="YouTube"
            className="inline-flex size-11 items-center justify-center text-on-dark/55 transition-colors duration-[160ms] hover:text-on-dark focus-visible:text-on-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&_svg]:size-5"
          >
            <RiYoutubeLine />
          </a>
        </div>
        <div className="flex min-h-11 flex-wrap items-center gap-x-6 gap-y-3">
          {["Privacy policy", "Cookie policy"].map((link) => (
            <a
              key={link}
              href="#"
              className="inline-flex min-h-11 items-center text-body-sm leading-none font-semibold text-on-dark/68 transition-colors duration-[160ms] hover:text-on-dark"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
