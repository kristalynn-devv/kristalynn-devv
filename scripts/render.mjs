/**
 * Renders GitHub profile stat cards as theme-aware SVG.
 *
 * Pure rendering — no network, no filesystem. build-stats.mjs fetches and writes;
 * this file only turns a GraphQL user payload into markup.
 */

export const DEFAULT_ACCENT = "d9a441";
const FONT =
  'ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

const THEME = `
  :root { color-scheme: light dark; }
  .bg    { fill: #ffffff; stroke: #d8dee4; }
  .title { fill: #1f2328; }
  .label { fill: #59636e; }
  .muted { fill: #6e7781; }
  .value { fill: #1f2328; }
  .track { fill: #eaeef2; }
  @media (prefers-color-scheme: dark) {
    .bg    { fill: #0d1117; stroke: #30363d; }
    .title { fill: #e6edf3; }
    .label { fill: #9198a1; }
    .muted { fill: #7d8590; }
    .value { fill: #e6edf3; }
    .track { fill: #21262d; }
  }
  text { font-family: ${FONT}; }
`;

const QUERY = `
query ($login: String!) {
  user(login: $login) {
    login
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      nodes {
        languages(first: 12, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name color } }
        }
      }
    }
  }
}`;

export async function fetchUser(login, token) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      authorization: `bearer ${token}`,
      "content-type": "application/json",
      "user-agent": "gh-profile-stats",
    },
    body: JSON.stringify({ query: QUERY, variables: { login } }),
  });

  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  if (!json.data?.user) throw new Error(`no such user: ${login}`);
  return json.data.user;
}

/* ---------- cards ---------- */

export function renderTopLangs(user, accent) {
  const totals = new Map();
  for (const repo of user.repositories.nodes) {
    for (const edge of repo.languages.edges) {
      const { name, color } = edge.node;
      const prev = totals.get(name);
      totals.set(name, { size: (prev?.size || 0) + edge.size, color: color || `#${accent}` });
    }
  }

  const ranked = [...totals.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.size - a.size)
    .slice(0, 6);

  if (!ranked.length) return card(470, 120, accent, "Top languages", emptyNote("no language data yet"));

  const sum = ranked.reduce((s, l) => s + l.size, 0);
  const barX = 30;
  const barW = 410;

  // Stacked bar: every visible slice keeps a minimum width so small languages stay readable.
  let cursor = barX;
  const slices = ranked
    .map((l) => {
      const w = Math.max((l.size / sum) * barW, 6);
      const rect = `<rect x="${round(cursor)}" y="66" width="${round(w)}" height="10" fill="${esc(l.color)}"/>`;
      cursor += w;
      return rect;
    })
    .join("\n    ");

  const legend = ranked
    .map((l, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = barX + col * 208;
      const y = 106 + row * 24;
      const pct = ((l.size / sum) * 100).toFixed(1);
      return `<circle cx="${x + 5}" cy="${y - 4}" r="5" fill="${esc(l.color)}"/>
    <text class="label" x="${x + 18}" y="${y}" font-size="13">${esc(l.name)}</text>
    <text class="muted" x="${x + 186}" y="${y}" font-size="12.5" text-anchor="end">${pct}%</text>`;
    })
    .join("\n    ");

  const rows = Math.ceil(ranked.length / 2);
  const height = 106 + rows * 24 + 14;

  return card(
    470,
    height,
    accent,
    "Top languages",
    `<defs><clipPath id="barclip"><rect x="${barX}" y="66" width="${barW}" height="10" rx="5"/></clipPath></defs>
    <rect class="track" x="${barX}" y="66" width="${barW}" height="10" rx="5"/>
    <g clip-path="url(#barclip)">${slices}</g>
    ${legend}`
  );
}

/* ---------- shared chrome ---------- */

function card(width, height, accent, title, inner) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${round(width)}" height="${round(height)}" viewBox="0 0 ${round(width)} ${round(height)}" role="img" aria-label="${esc(title)}">
  <style>${THEME}</style>
  <rect class="bg" x="0.5" y="0.5" width="${round(width - 1)}" height="${round(height - 1)}" rx="10" stroke-width="1"/>
  <rect x="0" y="14" width="3" height="28" rx="1.5" fill="#${accent}"/>
  <text class="title" x="30" y="38" font-size="16" font-weight="600">${esc(title)}</text>
  ${inner}
</svg>`;
}

function emptyNote(text) {
  return `<text class="muted" x="30" y="74" font-size="13">${esc(text)}</text>`;
}

/* ---------- helpers ---------- */

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const round = (n) => Math.round(n * 100) / 100;

export const sanitizeHex = (v) => (v && /^[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null);

