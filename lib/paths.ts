const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Prefix a root-relative URL with the deployment base path.
 *
 * GitHub project pages live below `/<repository>`, while local development
 * runs at the domain root. Hash links, relative URLs, and external URLs pass
 * through unchanged.
 */
export function sitePath(path: string): string {
  if (!basePath || !path.startsWith("/") || path.startsWith("//")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
