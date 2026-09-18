/**
 * Every word and image path the landing page renders, kept out of the page
 * itself. Landing.tsx is the layout; this is what it lays out — so a copy
 * change never means scrolling past JSX to find it, and a layout change never
 * risks a typo in the copy. Icons live here rather than in the page because
 * each one belongs to the item it labels, not to the markup around it.
 */
import type { ComponentType } from "react";
import {
  RiAlarmWarningLine,
  RiArrowUpCircleLine,
  RiArtboardLine,
  RiBarChartBoxLine,
  RiBracesLine,
  RiCalendarLine,
  RiCheckDoubleLine,
  RiCheckboxCircleLine,
  RiCodeSSlashLine,
  RiCompass3Line,
  RiCpuLine,
  RiDashboard3Line,
  RiDatabase2Line,
  RiFileChartLine,
  RiFlashlightLine,
  RiFlowChart,
  RiFocus3Line,
  RiFunctionLine,
  RiGlobalLine,
  RiGovernmentLine,
  RiKey2Line,
  RiLayoutGridLine,
  RiLoopRightLine,
  RiMoneyDollarCircleLine,
  RiOrganizationChart,
  RiPlugLine,
  RiPulseLine,
  RiPuzzleLine,
  RiRadarLine,
  RiRoadMapLine,
  RiRocketLine,
  RiScales3Line,
  RiSearchEyeLine,
  RiShieldCheckLine,
  RiShieldKeyholeLine,
  RiSparkling2Line,
  RiStackLine,
  RiStoreLine,
  RiTeamLine,
  RiTicketLine,
  RiTimeLine,
  RiUserVoiceLine,
  RiVerifiedBadgeLine,
} from "@remixicon/react";


export const NAV_LINKS = [
  { href: "#outcomes", label: "Outcomes" },
  { href: "#products", label: "Products" },
  { href: "#proof", label: "Proof" },
];

export type Outcome = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  name: string;
  need: string;
  commitments: [string, string];
  tangibleOutput: string;
};

export const OUTCOMES: Outcome[] = [
  {
    id: "launch",
    icon: RiRocketLine,
    name: "Launch",
    need: "Bring a new digital product or channel to market. You get a validated product in production, not a prototype or a slide.",
    commitments: ["Efficient", "Scalable"],
    tangibleOutput: "A validated product in production.",
  },
  {
    id: "modernize",
    icon: RiLayoutGridLine,
    name: "Modernize",
    need: "Remove the technology constraints on the business. You get a modernized platform, with operations and data migrated and optimized.",
    commitments: ["Scalable", "Available"],
    tangibleOutput: "A modernized platform, with operations and data migrated and optimized.",
  },
  {
    id: "automate",
    icon: RiFlowChart,
    name: "Automate",
    need: "Reduce manual work, delay and process friction. You get integrated, governed agentic systems in production.",
    commitments: ["Efficient", "Secure"],
    tangibleOutput: "Integrated, governed automation in production.",
  },
  {
    id: "operate",
    icon: RiShieldCheckLine,
    name: "Operate & Protect",
    need: "Entrust continuity, cybersecurity and ongoing evolution. You get a secure, available platform with continuous evolution.",
    commitments: ["Secure", "Available"],
    tangibleOutput: "A secure, available platform with continuous evolution.",
  },
];

export type PortfolioItem = {
  icon?: ComponentType<{ className?: string }>;
  name: string;
  /** Description lines under the name; Knewton's products carry two (what it
      does, then what you get), the rest carry one. */
  lines?: string[];
};

export type PortfolioGroup = {
  label?: string;
  logos?: { alt: string; src: string }[];
  items?: PortfolioItem[];
};

/**
 * Engineering Solutions' services are bought by stage, not browsed as one menu,
 * so they are stored as a stage x track matrix instead of two flat groups.
 * `columns` is index-aligned with the matrix's `tracks`.
 */
export type PortfolioStage = {
  /** Define / Frame / Build. */
  name: string;
  /** The plain-language gloss under the stage name. */
  note: string;
  columns: PortfolioItem[][];
};

export type PortfolioMatrix = {
  tracks: string[];
  stages: PortfolioStage[];
};

export type Portfolio = {
  id: string;
  num: string;
  name: string;
  role: string;
  howItHelps: string;
  brandLogo?: { alt: string; src: string };
  /** Revealed by the row's own "See more" disclosure. */
  detail?: PortfolioGroup[];
  /** Same disclosure, laid out by stage. Used instead of `detail`. */
  matrix?: PortfolioMatrix;
  /** Same disclosure, laid out as routes + vendor logos. Used instead of `detail`. */
  partners?: PartnerMatrix;
};

/**
 * Partner Platforms' disclosure, replacing an earlier `PortfolioGroup[]` that
 * mixed two grammars in one panel: hyperscalers got a full described list
 * (icon + name + sentence), everyone else got bare chips. Client's feedback
 * was that the panel read cluttered; the fix folds every vendor into the same
 * shape, and moves the route definitions to one shared legend instead of
 * repeating "Configure, deploy, migrate, and integrate." next to three
 * separate logos that all mean the same thing by "Implement."
 */
export type PartnerRoute = {
  icon?: ComponentType<{ className?: string }>;
  name: string;
  description: string;
};

export type PartnerVendor = {
  alt: string;
  src: string;
  /** Route names from `PartnerMatrix.routes`, matching by name — rendered as
      chips in the legend's order, not this array's, so every vendor's chips
      scan left-to-right the same way. Omit for a vendor sold outside the
      route model (use `note` instead). */
  tags?: string[];
  /** A vendor not sold by route at all (Archera, TD Synnex — resellers). */
  note?: string;
};

export type PartnerMatrix = {
  /** Defined once, shown once, above every vendor. */
  routes: PartnerRoute[];
  hyperscalers: PartnerVendor[];
  specialized: PartnerVendor[];
  commercialOverlay: PartnerVendor[];
};

export const PORTFOLIOS: Portfolio[] = [
  {
    id: "agentic",
    num: "01",
    name: "Engineering Solutions",
    role: "The engineering foundation, custom and composable. It spans software engineering, modernization, cloud, data, and integration, and underpins everything else we build.",
    howItHelps:
      "It's the layer the AI platforms, partner integrations, and managed operations all build on. Whether you're building new, modernizing what you have, or connecting systems, this is where it's engineered.",
    matrix: {
      tracks: ["Digital Products", "Agentic Systems"],
      stages: [
        {
          name: "Define",
          note: "What to build and why",
          columns: [
            [
              { icon: RiCompass3Line, name: "Product Strategy" },
              { icon: RiSearchEyeLine, name: "Product Discovery & Definition" },
            ],
            [
              { icon: RiRoadMapLine, name: "Agent Strategy" },
              { icon: RiFocus3Line, name: "Agent Discovery & Definition" },
            ],
          ],
        },
        {
          name: "Frame",
          note: "How it's shaped",
          columns: [
            [
              { icon: RiArtboardLine, name: "AI-Native Design" },
              { icon: RiStackLine, name: "AI-Native Architecture" },
            ],
            [
              { icon: RiOrganizationChart, name: "Multi-Agent Architecture" },
              { icon: RiUserVoiceLine, name: "Agent Experience Design" },
            ],
          ],
        },
        {
          name: "Build",
          note: "How it gets built",
          columns: [
            [
              { icon: RiCodeSSlashLine, name: "AI-Augmented Development" },
              { icon: RiVerifiedBadgeLine, name: "AI Quality Engineering" },
            ],
            [
              { icon: RiCpuLine, name: "Agent Engineering" },
              { icon: RiBarChartBoxLine, name: "Agent Evaluation & Testing" },
            ],
          ],
        },
      ],
    },
  },
  {
    id: "knewton",
    num: "02",
    name: "Knewton Ecosystem",
    role: "AI platforms ready to deploy on their own, or embedded inside a larger system we build for you. Adopt them as-is, or we engineer them directly into your custom build.",
    howItHelps:
      "Whether you use it ready-made or we build it into something larger, you get technology that's already proven elsewhere, not a first-time build. We own the roadmap, the data path, and the deployment.",
    brandLogo: { alt: "Knewton", src: "/assets/brand/Knewton.svg" },
    detail: [
      {
        label: "Proprietary products and platforms",
        items: [
          {
            icon: RiFunctionLine,
            name: "Knewton Product Suite",
            lines: [
              "Takes an idea to a validated definition and an interactive prototype.",
              "A clear definition, a working prototype, and stakeholders aligned before the spend starts.",
            ],
          },
          {
            icon: RiCheckDoubleLine,
            name: "Knewton QA",
            lines: [
              "Autonomous quality assurance with horizontal agent products ahead.",
              "Faster, more reliable releases at lower QA cost, quality that scales with the build.",
            ],
          },
          {
            icon: RiGovernmentLine,
            name: "Knewton for Government",
            lines: [
              "Public-sector workflow platforms.",
              "Public workflows stood up faster, on a foundation designed for the sector's requirements.",
            ],
          },
          {
            icon: RiStoreLine,
            name: "AI Marketplace",
            lines: [
              "Self-hosted AI with complete control of your data.",
              "AI in production inside regulated or data-sensitive environments, on your own infrastructure.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "partner",
    num: "03",
    name: "Partner Platforms",
    role: "A visible offer and a delivery engine in one. A direct route for clients who've already chosen a platform, and the engine running inside every outcome we deliver.",
    howItHelps:
      "We work across the platforms you already depend on, engaging at whatever depth you need, day to day, from a single license all the way to running the entire platform on your behalf, hands-on.",
    partners: {
      routes: [
        { icon: RiKey2Line, name: "License", description: "License or subscriptions." },
        { icon: RiPlugLine, name: "Implement", description: "Configure, deploy, migrate, and integrate." },
        { icon: RiPuzzleLine, name: "Extend", description: "Tailored solutions on top of the platform." },
        { icon: RiDashboard3Line, name: "Operate", description: "Secure, maintain, support and evolve the platform ecosystem." },
      ],
      // No per-vendor tags: all three support the same full route range,
      // so repeating "License Implement Extend Operate" underneath each of
      // the three logos said nothing a reader couldn't already tell from the
      // legend above and the portfolio's own intro copy ("from a single
      // license all the way to running the entire platform"). Chips earn
      // their place in Specialized Platforms below because they differ
      // vendor to vendor there; here they'd be pure repetition.
      hyperscalers: [
        { alt: "Microsoft", src: "/assets/partners/Microsoft.svg" },
        { alt: "Google Cloud", src: "/assets/partners/Google%20Cloud.svg" },
        { alt: "AWS", src: "/assets/partners/AWS.svg" },
      ],
      specialized: [
        { alt: "Fortinet", src: "/assets/partners/fortinet.svg", tags: ["License", "Implement", "Operate"] },
        { alt: "Salesforce", src: "/assets/partners/salesforce-partner.svg", tags: ["Implement"] },
        { alt: "Anthropic", src: "/assets/partners/anthropic.svg", tags: ["Implement"] },
      ],
      // No noteLabel per vendor: the group heading already reads "Commercial
      // overlay" — repeating it under Archera and again under TD Synnex was
      // the same redundancy as the hyperscaler chips, just in caption form.
      commercialOverlay: [
        {
          alt: "Archera",
          src: "/assets/partners/archera.svg",
          note: "Distribution. Applaudo is the reseller of record for partner licenses.",
        },
        {
          alt: "TD Synnex",
          src: "/assets/partners/td-synnex.svg",
          note: "Commitment and spend control across the platforms you run.",
        },
      ],
    },
  },
  {
    id: "managed",
    num: "04",
    name: "Managed Operations and Cybersecurity",
    role: "Cloud and application operations with active cyber defense, support, and continuous change, all under one accountability model.",
    howItHelps:
      "We monitor your systems, defend against threats, respond to incidents, and keep improving what's running, all under one team. No handoff between operations and security: one team, accountable for both.",
    // Four capability groups, replacing the earlier five-stage Observe/Test/
    // Defend & Respond/Run & Support/Evolve list on the client's updated
    // categorization. "Response", "Capacity" and "Monitoring" each appear in
    // two groups deliberately, not as an oversight — the same word means a
    // related but distinct thing in each context (an SLA response time vs. a
    // security incident response; infrastructure headroom vs. AI compute
    // headroom), so they share an icon rather than being forced apart into
    // two different words for one concept.
    detail: [
      {
        label: "Platform and Cloud Operations",
        items: [
          { icon: RiTimeLine, name: "Coverage" },
          { icon: RiFlashlightLine, name: "Response" },
          { icon: RiFileChartLine, name: "Reporting" },
          { icon: RiDatabase2Line, name: "Capacity" },
        ],
      },
      {
        label: "Application Support and Maintenance",
        items: [
          { icon: RiAlarmWarningLine, name: "Incidents" },
          { icon: RiCheckboxCircleLine, name: "Fixes" },
          { icon: RiArrowUpCircleLine, name: "Upgrades" },
          { icon: RiTicketLine, name: "Requests" },
        ],
      },
      {
        label: "Manage AI Operations",
        items: [
          { icon: RiPulseLine, name: "Monitoring" },
          { icon: RiShieldKeyholeLine, name: "Guardrails" },
          { icon: RiMoneyDollarCircleLine, name: "Cost" },
          { icon: RiDatabase2Line, name: "Capacity" },
        ],
      },
      {
        label: "Security Operations",
        items: [
          { icon: RiPulseLine, name: "Monitoring" },
          { icon: RiRadarLine, name: "Detection" },
          { icon: RiFlashlightLine, name: "Response" },
          { icon: RiScales3Line, name: "Governance" },
        ],
      },
    ],
  },
];

export const AI_LAYERS = [
  { icon: RiSparkling2Line, label: "In the solution", body: "Intelligent experiences, agents and automation inside the product you receive." },
  { icon: RiBracesLine, label: "In engineering", body: "AI-assisted definition and delivery, and autonomous quality in how the work is made." },
  { icon: RiRadarLine, label: "In operations", body: "Observability, cyber defense and continuous optimization in how the platform runs." },
];

export const STATS = [
  { icon: RiTeamLine, value: 800, suffix: "+", label: "Engineers" },
  { icon: RiGlobalLine, value: 27, label: "Countries" },
  { icon: RiLoopRightLine, value: 90, suffix: "%", label: "Client retention" },
  { icon: RiCalendarLine, value: 2013, label: "Founded in El Salvador" },
];

export const TRUST_LOGOS = [
  { name: "Walmart", src: "/assets/clients/Walmart.svg" },
  { name: "NBC Sports", src: "/assets/clients/NBC_Sports.svg" },
  { name: "The Ritz-Carlton", src: "/assets/clients/Ritz-Carlton.svg" },
  { name: "NCAA", src: "/assets/clients/NCAA.svg" },
  { name: "Taco Bell", src: "/assets/clients/Taco_Bell.svg" },
  { name: "Golden State Warriors", src: "/assets/clients/Golden_State_Warriors.svg" },
  { name: "Bain & Company", src: "/assets/clients/Bain.svg" },
  { name: "Volaris", src: "/assets/clients/Volaris.svg" },
];

export const CASE_FEATURE = {
  tagline: "AI ENGINEERING",
  pills: ["Retail & Consumer", "Data Platforms"],
  title: "A Fortune 1 retailer rebuilt inventory forecasting around AI and predictive analytics.",
  visual: "/assets/photos/work-hero.webp",
  href: "/work",
};

export const CASE_ASIDE = [
  {
    tagline: "AI ENGINEERING",
    pills: ["Sports & Media", "Product Design"],
    title: "An NBA franchise modernized arena operations with real-time AI and unified data.",
    visual: "/assets/photos/IndustriesHero.jpg",
    href: "/work",
  },
  {
    tagline: "AI ENGINEERING",
    pills: ["Travel & Hospitality", "Mobile"],
    title: "A luxury cruise brand drove higher mobile booking conversion with real-time AI personalization.",
    visual: "/assets/photos/PartnersHero.jpg",
    href: "/work",
  },
];

export const RECOGNITION_AWARD = {
  src: "/assets/awards/google-cloud-award.png",
  title: "Google Cloud Partner of the Year 2026",
  detail: "Public Sector LATAM",
};

export const RECOGNITION_TOP_BADGES = [
  { label: "Google Cloud Partner of the Year 2026 badge", src: "/assets/partners/google-cloud-partner.svg" },
  { label: "Google Cloud co-sell partner badge", src: "/assets/partners/google-cloud-cosell.svg" },
  { label: "Google Cloud services partner badge", src: "/assets/partners/google-cloud-services.svg" },
  { label: "Microsoft", src: "/assets/partners/microsoft-partner.svg" },
];

export const RECOGNITION_BOTTOM_BADGES = [
  { label: "Salesforce Partner", src: "/assets/partners/salesforce-partner.svg" },
  { label: "Mandiant", src: "/assets/partners/mandiant-partner.svg" },
  { label: "Fortinet", src: "/assets/partners/fortinet-partner.svg" },
  { label: "AWS Partner Select Tier Services badge", src: "/assets/partners/aws-partner.svg" },
];

export const RECOGNITION_CERT_BADGES = [
  { label: "IQNet certification mark", src: "/assets/certifications/iqnet.svg" },
  { label: "Icontec ISO certification mark", src: "/assets/certifications/icontec.svg" },
];

export const FOOTER_COLUMNS = [
  { title: "Outcomes", links: OUTCOMES.map((o) => o.name) },
  { title: "The right products", links: PORTFOLIOS.map((p) => p.name) },
  { title: "Company", links: ["Work", "How we work", "Contact", "Careers"] },
];

/**
 * Footer partner marks, monochrome. `h` is a per-logo cap in pixels, not one
 * shared value: these run from 8.8:1 (Fortinet) to 1.7:1 (AWS), so a single
 * height would make the wide ones enormous and the square one a speck. They are
 * sized to look equal, not to measure equal.
 *
 * The Google Cloud, Microsoft, Salesforce and Archera files are footer-only
 * partner lockups supplied by the client, already built for a monochrome
 * treatment. The Credentials section keeps its own separate badge artwork.
 * salesforce-partner.png is genuinely a PNG — it arrived named .svg.
 */
export const FOOTER_BADGES: { label: string; src?: string; h?: number }[] = [
  { label: "Google Cloud Partner", src: "/assets/partners/google-cloud-partners.svg", h: 20 },
  { label: "AWS", src: "/assets/partners/AWS.svg", h: 19 },
  { label: "Microsoft Solutions Partner", src: "/assets/partners/microsoft-solutions-partner.svg", h: 20 },
  // The client's Salesforce Partner lockup. Unlike the other three it is a
  // filled plate with the logo knocked out of it rather than line art, so it
  // reads heavier than its neighbours; the row's white-out is still applied so
  // at least its brightness matches. The bare cloud mark (salesforce.svg) is
  // the alternative if the plate ever looks wrong.
  { label: "Salesforce Partner", src: "/assets/partners/salesforce-partner-lockup.svg", h: 22 },
  { label: "Mandiant", src: "/assets/partners/mandiant.svg", h: 14 },
  { label: "Fortinet", src: "/assets/partners/fortinet.svg", h: 11 },
  { label: "Archera", src: "/assets/partners/archera.svg", h: 19 },
];
