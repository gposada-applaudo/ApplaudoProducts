/**
 * Runs after `next build`. Deletes output files a single-page site never uses:
 *   *.txt        Next's client-side navigation payloads
 *   _not-found/  a duplicate of 404.html
 *   404/         another duplicate of 404.html
 *
 * It does NOT rewrite paths. An earlier version made every "/assets/…" and
 * "/_next/…" relative so out/index.html could be opened by double-clicking.
 * That looked like it worked — the page painted — but it silently broke React:
 * the chunk paths embedded in the server-component payload stayed absolute and
 * no longer matched, so hydration never completed and every scroll-reveal
 * section stayed blank. Verified by building with and without the rewrite.
 *
 * The site is served by a web server, so absolute paths are correct.
 * Use `npm run preview` to look at it locally.
 */
import { readdirSync, statSync, rmSync } from "node:fs";
import { join } from "node:path";

const OUT = "out";

function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

for (const dead of ["_not-found", "404"]) rmSync(join(OUT, dead), { recursive: true, force: true });
let removed = 0;
for (const file of walk(OUT)) if (file.endsWith(".txt")) { rmSync(file); removed += 1; }

console.log(`finish-site: removed ${removed} unused files`);
