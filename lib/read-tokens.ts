import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Reads styles/tokens.css at build time and returns what it actually declares.
 *
 * The page this feeds used to hardcode all 52 hex values as a second copy of
 * the palette, which could drift from the real tokens without anything failing.
 * Parsing the stylesheet means the gallery cannot be wrong: if a token changes,
 * the next build shows the change; if a token is deleted, it disappears here.
 *
 * Runs on the server only (`node:fs`), at build time for the static export.
 */
export type Token = {
  name: string;
  value: string;
  /** Trailing `/* … *\/` on the declaration — the notes carry contrast ratios. */
  note?: string;
};

const TOKENS_CSS = join(process.cwd(), "styles", "tokens.css");

function parse(): Token[] {
  const css = readFileSync(TOKENS_CSS, "utf8");
  const out: Token[] = [];
  // One declaration per line: `--name: value;` plus an optional comment on the
  // SAME line. `[ \t]*` rather than `\s*` is load-bearing — with `\s*` the
  // pattern runs past the newline and swallows the next section's divider
  // comment as this token's note, which is how `--color-red-700` ended up
  // captioned "── Purple · Knewton Ecosystem ───".
  const re = /^[ \t]*(--[\w-]+):[ \t]*([^;]+);(?:[ \t]*\/\*[ \t]*(.*?)[ \t]*\*\/)?/gm;
  for (const m of css.matchAll(re)) {
    out.push({ name: m[1], value: m[2].trim(), ...(m[3] ? { note: m[3] } : {}) });
  }
  return out;
}

/** Resolves `var(--x)` one level deep so aliases show their real value too. */
function resolve(tokens: Token[]) {
  const byName = new Map(tokens.map((t) => [t.name, t.value]));
  const deref = (v: string): string => {
    const m = v.match(/^var\((--[\w-]+)\)$/);
    return m && byName.has(m[1]) ? deref(byName.get(m[1])!) : v;
  };
  return tokens.map((t) => ({ ...t, resolved: deref(t.value) }));
}

export type ResolvedToken = Token & { resolved: string };

export function readTokens() {
  const all = resolve(parse());
  const pick = (test: (t: ResolvedToken) => boolean) => all.filter(test);
  const ramp = (name: string) =>
    pick((t) => new RegExp(`^--color-${name}-\\d+$`).test(t.name)).sort(
      (a, b) => Number(a.name.split("-").pop()) - Number(b.name.split("-").pop()),
    );

  return {
    neutrals: ramp("neutral"),
    ramps: (["red", "purple", "orange", "yellow", "blue", "green"] as const).map((key) => ({
      key,
      steps: ramp(key),
    })),
    semantic: pick(
      (t) =>
        /^--color-(surface|ink|on-dark|brand|line)/.test(t.name) &&
        !/^--color-(text|success|info)/.test(t.name),
    ),
    shadcn: pick((t) =>
      /^--color-(background|foreground|card|popover|primary|secondary|muted|accent|destructive|border|input|ring)/.test(
        t.name,
      ),
    ),
    text: pick((t) => t.name.startsWith("--text-")),
    radius: pick((t) => t.name.startsWith("--radius-")),
    shadow: pick((t) => t.name.startsWith("--shadow-")),
    motion: pick((t) => t.name.startsWith("--ease-") || t.name.startsWith("--duration-")),
    fonts: pick((t) => t.name.startsWith("--font-")),
    layout: pick((t) => t.name.startsWith("--container-") || t.name.startsWith("--breakpoint-")),
    total: pick((t) => /^--color-[a-z]+-\d+$/.test(t.name)).length,
  };
}

export type Tokens = ReturnType<typeof readTokens>;
