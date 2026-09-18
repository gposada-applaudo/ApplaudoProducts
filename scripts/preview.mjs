/**
 * Serves out/ on http://localhost:4000 so you can look at the finished site.
 *
 * Why this exists: double-clicking out/index.html does NOT work. Two reasons,
 * either one fatal. The built HTML asks for /assets/… and /_next/…, absolute
 * paths that only resolve when out/ is the top of the website — on a file://
 * page they point at the root of the disk. And React never finishes starting
 * up on file:// anyway, so every section that fades in on scroll stays blank.
 *
 * Why not VS Code's Live Preview: `next build` deletes and recreates out/, so a
 * server that latched onto the old folder when it started is now holding one
 * that no longer exists, and answers 404 to everything. Confirmed by watching
 * the inode change across a build. This server re-resolves the path on every
 * request instead, so it survives rebuilds. Any real web server is fine; this
 * is just the smallest one that needs no install.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const DIR = "out", PORT = 4000;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8", ".json": "application/json",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".mp4": "video/mp4",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  try {
    let p = join(DIR, normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^(\.\.[/\\])+/, ""));
    if ((await stat(p).catch(() => null))?.isDirectory()) p = join(p, "index.html");
    const body = await readFile(p);
    res.writeHead(200, { "content-type": TYPES[extname(p)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(await readFile(join(DIR, "404.html")).catch(() => "Not found"));
  }
});

// Fail loudly rather than serving 404s that look like a broken page.
if (!(await stat(DIR).catch(() => null))?.isDirectory()) {
  console.error(`\n  There is no ${DIR}/ folder to show yet.\n  Run:  npm run build\n`);
  process.exit(1);
}

server.on("error", (e) => {
  console.error(e.code === "EADDRINUSE"
    ? `\n  Port ${PORT} is already busy — the preview is probably already running.\n  Open:  http://localhost:${PORT}\n`
    : `\n  ${e.message}\n`);
  process.exit(1);
});

server.listen(PORT, () => console.log(`\n  Preview: http://localhost:${PORT}\n  (Ctrl+C to stop)\n`));
