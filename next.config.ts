import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain HTML files in out/ — upload that folder to any server.
  output: "export",

  // GitHub project pages are served from /<repository>. The Pages workflow
  // supplies this value; local development leaves it empty and stays at `/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,

  // NO assetPrefix. `basePath` is the supported way to host the whole app at a
  // sub-path; assetPrefix only moves Next's own static files and would leave
  // public assets behind. Relative "./_next/…" paths also break deeper routes
  // such as /kitchensink/. Local preview stays at the domain root because the
  // Pages-only environment variable is absent there.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
