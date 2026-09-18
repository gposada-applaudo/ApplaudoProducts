import { Eyebrow } from "@/components/ui/eyebrow";
import { sitePath } from "@/lib/paths";
/**
 * Ported from the kitchensink's `.recognition-layout` (reference/legacy/styles.css:3524-3636):
 * an award feature (image + caption) beside two rows of partner badges. Also used, with
 * page-specific tweaks, on the Partnerships page (`.partnerships-recognition-layout`) —
 * a real, reused pattern, not a one-off.
 */
export interface PartnerBadge {
  label: string;
  src: string;
}

function BadgeGrid({ badges, ariaLabel }: { badges: PartnerBadge[]; ariaLabel: string }) {
  return (
    <div className="grid grid-cols-1 gap-[34px] mobile:grid-cols-2 tablet:grid-cols-4" aria-label={ariaLabel}>
      {badges.map((badge) => (
        <div key={badge.label} className="flex min-h-[132px] items-center justify-center">
          <img src={sitePath(badge.src)} alt={badge.label} className="block max-h-[108px] w-[min(100%,207px)] object-contain" />
        </div>
      ))}
    </div>
  );
}

export function Recognition({
  award,
  topBadges,
  bottomBadges,
  certBadges,
}: {
  award: { src: string; title: string; detail: string };
  topBadges: PartnerBadge[];
  bottomBadges: PartnerBadge[];
  /** A third, shorter row — centered rather than forced into the 4-column
      grid, since it rarely fills one. Used for compliance marks (ISO, …)
      alongside the partner badges above. */
  certBadges?: PartnerBadge[];
}) {
  return (
    // The "Credentials" label reads as this section's eyebrow, so it sits above
    // the whole layout and centers on the page. It used to live inside the badge
    // column, which centered it on that column instead — off-centre against the
    // section it labels. mb-[34px] is SectionHeading's heading-to-content gap,
    // replacing the 30px that was a column-internal value.
    <div className="text-center">
      <Eyebrow className="mb-[34px]">Credentials</Eyebrow>
      <div className="grid grid-cols-1 items-center gap-10 tablet:grid-cols-[minmax(300px,0.82fr)_minmax(0,1.18fr)] tablet:gap-20">
        <figure className="m-0">
          <img
            src={sitePath(award.src)}
            alt={award.title}
            className="mx-auto mb-[18px] block w-[min(100%,238px)] drop-shadow-[0_22px_42px_rgba(18,18,18,0.16)]"
          />
          <figcaption>
            <h3 className="text-title-sm leading-[1.12] font-semibold">{award.title}</h3>
            <p className="mt-2 text-title-sm leading-[1.12] font-semibold">{award.detail}</p>
          </figcaption>
        </figure>
        <div>
          <div className="mb-[22px]">
            <BadgeGrid badges={topBadges} ariaLabel="Partner badges" />
          </div>
          <BadgeGrid badges={bottomBadges} ariaLabel="Additional partner recognitions" />
          {certBadges && certBadges.length > 0 ? (
            <div
              className="mt-[22px] flex flex-wrap items-center justify-center gap-x-[68px] gap-y-[34px]"
              aria-label="Certifications"
            >
              {certBadges.map((badge) => (
                <div key={badge.label} className="flex min-h-[132px] items-center justify-center">
                  <img
                    src={sitePath(badge.src)}
                    alt={badge.label}
                    className="block max-h-[108px] w-[min(100%,207px)] object-contain"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
