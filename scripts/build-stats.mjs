/**
 * Fetches GitHub profile data once and writes the stat cards into assets/.
 *
 * Run by .github/workflows/stats.yml on a schedule; the SVGs are committed back
 * to this repo, so the profile page serves plain static files and calls nothing
 * at render time.
 *
 *   GITHUB_TOKEN=... node scripts/build-stats.mjs [username]
 */

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { fetchUser, renderTopLangs, DEFAULT_ACCENT } from "./render.mjs";

const ASSETS = join(dirname(fileURLToPath(import.meta.url)), "..", "assets");

const username = process.argv[2] || process.env.PROFILE_USERNAME || "kristalynn-devv";
const accent = process.env.ACCENT || DEFAULT_ACCENT;
const token = process.env.GITHUB_TOKEN;

if (!token) {
  console.error("GITHUB_TOKEN is required");
  process.exit(1);
}

const user = await fetchUser(username, token);

const cards = {
  "top-langs.svg": renderTopLangs(user, accent),
};

await mkdir(ASSETS, { recursive: true });

let changed = 0;
for (const [name, body] of Object.entries(cards)) {
  const path = join(ASSETS, name);
  // Skip identical writes so a scheduled run with no new activity makes no commit.
  const previous = await readFile(path, "utf8").catch(() => null);
  if (previous === body) {
    console.log(`unchanged  ${name}`);
    continue;
  }
  await writeFile(path, body);
  console.log(`wrote      ${name}  (${body.length} bytes)`);
  changed++;
}

console.log(changed ? `${changed} card(s) updated` : "nothing to commit");
