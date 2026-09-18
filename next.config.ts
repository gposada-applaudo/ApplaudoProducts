import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain HTML files in out/ — upload that folder to any server.
  output: "export",

  // NO assetPrefix. "./" was tried so out/index.html could be double-clicked;
  // it works at the root but breaks every deeper route, because on
  // /kitchensink/ a relative "./_next/…" resolves to "/kitchensink/_next/…",
  // which does not exist — that page then loads with no CSS and no JS. Absolute
  // "/_next/…" is correct for anything served from a domain root, which is
  // every real deployment and also `npm run preview`.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
