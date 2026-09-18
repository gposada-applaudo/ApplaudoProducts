import type { Metadata } from "next";
import { Kitchensink } from "@/components/kitchensink";
import { readTokens } from "@/lib/read-tokens";

/**
 * The design system. Internal reference, so noindex.
 *
 * This page is a Server Component purely so it can read styles/tokens.css from
 * disk at build time and hand the parsed values to the client gallery. That is
 * what makes the swatches impossible to get wrong — they are the stylesheet,
 * not a transcription of it.
 */
export const metadata: Metadata = {
  title: "Applaudo — Design system",
  robots: { index: false, follow: false },
};

export default function KitchensinkPage() {
  return <Kitchensink tokens={readTokens()} />;
}
