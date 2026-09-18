import {
  RiBuilding2Line,
  RiCompass3Line,
  RiFlashlightLine,
  RiHeartPulseLine,
  RiRouteLine,
  RiShieldCheckLine,
  RiShoppingBag3Line,
  RiStackLine,
} from "@remixicon/react";
import type { FilterableStory } from "@/components/ui/story-browser";
import type { Industry } from "@/components/ui/industry";

/**
 * Demo content for the gallery only — never imported by the site.
 *
 * It is deliberately realistic rather than lorem: a component gallery filled
 * with placeholder text hides the problems real copy causes (two-line titles,
 * long facet names, counts that do not fit). Images reuse the commissioned
 * renders already in public/assets, so the gallery works offline.
 */
export const DEMO = {
  industries: [
    { name: "Retail & Consumer", href: "#industry-tile", image: "/assets/photos/IndustriesHero.jpg", icon: RiShoppingBag3Line, line: "Commerce, supply chain and loyalty at national scale." },
    { name: "Financial Services", href: "#industry-tile", image: "/assets/photos/PartnersHero.jpg", icon: RiBuilding2Line, line: "Core modernization under real regulatory load." },
    { name: "Healthcare", href: "#industry-row", image: "/assets/photos/work-hero.webp", icon: RiHeartPulseLine, line: "Clinical data platforms and patient-facing products." },
  ] satisfies Industry[],

  solve: [
    { id: "strategy", num: "01", icon: RiCompass3Line, title: "AI product strategy", body: "We define which problems AI can solve in your business, in what order, with what data. You get a build sequence and a decision framework, not a roadmap deck." },
    { id: "deploy", num: "02", icon: RiRouteLine, title: "Orchestration & deployment", body: "We wire agents, models and tools into production workflows. Multi-step reasoning, tool-use, retrieval and safety layers all in place before we hand over the keys." },
    { id: "secure", num: "03", icon: RiShieldCheckLine, title: "Security & governance", body: "Enterprise AI needs guardrails before it ships: data access controls, audit trails, bias testing, and the regulatory review your legal team will ask for." },
  ],

  outcomes: [
    {
      id: "launch", label: "Launch", icon: RiFlashlightLine, image: "/assets/photos/Outcomes.jpg",
      note: "Any of the four products can lead here. Most engagements start in Engineering Solutions.",
      listLabel: "Products in play",
      items: [{ name: "Engineering Solutions", lead: true }, { name: "Knewton Ecosystem" }, { name: "Partner Platforms" }, { name: "Managed Operations and Cybersecurity" }],
    },
    {
      id: "modernize", label: "Modernize", icon: RiStackLine, image: "/assets/photos/composes.jpg",
      note: "Any of the four products can lead here. Most engagements pair Engineering Solutions with Partner Platforms.",
      listLabel: "Products in play",
      items: [{ name: "Engineering Solutions", lead: true }, { name: "Partner Platforms", lead: true }, { name: "Knewton Ecosystem" }, { name: "Managed Operations and Cybersecurity" }],
    },
    {
      id: "protect", label: "Operate & Protect", icon: RiShieldCheckLine, image: "/assets/photos/PartnersHero.jpg",
      note: "Managed Operations and Cybersecurity leads here. The other three compose in as the work requires.",
      listLabel: "Products in play",
      items: [{ name: "Managed Operations and Cybersecurity", lead: true }, { name: "Engineering Solutions" }, { name: "Partner Platforms" }, { name: "Knewton Ecosystem" }],
    },
  ],

  testimonials: [
    { quote: "They did not hand us a prototype and leave. The team stayed through launch, through the first incident, and through the quarter after that.", name: "VP Engineering", role: "National retailer" },
    { quote: "We had tried twice internally. The difference was that they owned the data path as well as the model — that is where both previous attempts died.", name: "Chief Data Officer", role: "Financial services" },
    { quote: "One team accountable for operations and security meant no argument about whose incident it was at two in the morning.", name: "Head of Platform", role: "Healthcare network" },
  ],

  stories: [
    { title: "Rebuilding checkout for 40 million customers", badge: "Retail", image: "/assets/photos/IndustriesHero.jpg", href: "#story-browser", facets: { Industry: ["Retail"], Capability: ["Engineering"] } },
    { title: "A data platform the regulator signed off", badge: "Financial services", image: "/assets/photos/PartnersHero.jpg", href: "#story-browser", facets: { Industry: ["Financial services"], Capability: ["Data", "Security"] } },
    { title: "Agentic support that deflects 60% of tickets", badge: "Artificial intelligence", image: "/assets/photos/Outcomes.jpg", href: "#story-browser", facets: { Industry: ["Retail"], Capability: ["AI"] } },
    { title: "Cloud operations, handed over in ninety days", badge: "Managed operations", image: "/assets/photos/work-hero.webp", href: "#story-browser", facets: { Industry: ["Healthcare"], Capability: ["Operations"] } },
  ] satisfies FilterableStory[],

  storyGroups: ["Industry", "Capability"],
};
