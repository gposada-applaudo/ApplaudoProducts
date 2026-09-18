export interface SiteLink {
  label: string;
  href: string;
  external?: boolean;
  children?: SiteLink[];
  showOverview?: boolean;
}

export interface SitePage {
  path: string;
  title: string;
}

export const CAREERS_URL = "https://careers.smartrecruiters.com/ApplaudoStudios";

export const SITE_NAVIGATION: SiteLink[] = [
  {
    label: "Outcomes",
    href: "/outcomes",
    children: [
      { label: "Launch", href: "/outcomes/launch" },
      { label: "Modernize", href: "/outcomes/modernize" },
      { label: "Automate", href: "/outcomes/automate" },
      { label: "Operate & Protect", href: "/outcomes/operate-and-protect" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Agentic Engineering", href: "/products/agentic-engineering" },
      { label: "Knewton Ecosystem", href: "/products/knewton-ecosystem" },
      { label: "Partner Products", href: "/products/partner-products" },
      {
        label: "Managed Operations & Cybersecurity",
        href: "/products/managed-operations-and-cybersecurity",
      },
    ],
  },
  { label: "Work", href: "/work" },
  {
    label: "Company",
    href: "/company",
    showOverview: false,
    children: [
      { label: "About", href: "/company/about" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "How We Work", href: "/company/how-we-work" },
    ],
  },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: CAREERS_URL, external: true },
];

export const SITE_PAGES: SitePage[] = [
  { path: "/", title: "Home" },
  { path: "/outcomes", title: "Outcomes" },
  { path: "/outcomes/launch", title: "Launch" },
  { path: "/outcomes/modernize", title: "Modernize" },
  { path: "/outcomes/automate", title: "Automate" },
  { path: "/outcomes/operate-and-protect", title: "Operate & Protect" },
  { path: "/products", title: "Products" },
  { path: "/products/agentic-engineering", title: "Agentic Engineering" },
  { path: "/products/knewton-ecosystem", title: "Knewton Ecosystem" },
  { path: "/products/partner-products", title: "Partner Products" },
  {
    path: "/products/managed-operations-and-cybersecurity",
    title: "Managed Operations & Cybersecurity",
  },
  { path: "/work", title: "Work" },
  { path: "/work/case-study-template", title: "Case Study Template" },
  { path: "/company", title: "Company" },
  { path: "/company/about", title: "About" },
  { path: "/company/leadership", title: "Leadership" },
  { path: "/company/how-we-work", title: "How We Work" },
  { path: "/insights", title: "Insights" },
  { path: "/insights/article-template", title: "Article Template" },
  { path: "/contact", title: "Contact" },
];

export const FOOTER_GROUPS: { title: string; links: SiteLink[] }[] = [
  {
    title: "What we do",
    links: [
      { label: "Outcomes", href: "/outcomes" },
      { label: "Products", href: "/products" },
      { label: "Work", href: "/work" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "How We Work", href: "/company/how-we-work" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: CAREERS_URL, external: true },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function getPageByPath(path: string): SitePage | undefined {
  return SITE_PAGES.find((page) => page.path === path);
}
