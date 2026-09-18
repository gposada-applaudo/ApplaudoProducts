import type { ReactNode } from "react";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { FOOTER_BADGES, RECOGNITION_CERT_BADGES } from "@/content/landing";
import { FOOTER_GROUPS, SITE_NAVIGATION } from "@/content/site-map";

export default function CorporateSiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader links={SITE_NAVIGATION} action={{ label: "Contact Us", href: "/contact" }} />
      {children}
      <SiteFooter
        columns={FOOTER_GROUPS}
        badges={FOOTER_BADGES}
        certifications={RECOGNITION_CERT_BADGES}
        location="Austin, TX · San Salvador, SS"
        homeHref="/"
      />
    </div>
  );
}
