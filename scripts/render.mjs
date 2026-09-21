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
    name
    login
    followers { totalCount }
    repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
      totalCount
      nodes {
        stargazerCount
        languages(first: 12, orderBy: {field: SIZE, direction: DESC}) {
          edges { size node { name color } }
        }
      }
    }
    contributionsCollection {
      totalCommitContributions
      restrictedContributionsCount
      totalPullRequestContributions
      totalIssueContributions
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
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

export function renderStats(user, accent) {
  const c = user.contributionsCollection;
  const stars = user.repositories.nodes.reduce((sum, r) => sum + r.stargazerCount, 0);

  const rows = [
    ["Total stars earned", stars],
    ["Commits (past year)", c.totalCommitContributions + c.restrictedContributionsCount],
    ["Pull requests", c.totalPullRequestContributions],
    ["Issues opened", c.totalIssueContributions],
    ["Followers", user.followers.totalCount],
    ["Public repositories", user.repositories.totalCount],
  ];

  const top = 74;
  const step = 26;
  const height = top + rows.length * step + 18;

  const lines = rows
    .map(([label, value], i) => {
      const y = top + i * step;
      return `<circle cx="34" cy="${y - 4}" r="3" fill="#${accent}"/>
    <text class="label" x="50" y="${y}" font-size="13.5">${esc(label)}</text>
    <text class="value" x="446" y="${y}" font-size="13.5" font-weight="600" text-anchor="end">${fmt(value)}</text>`;
    })
    .join("\n    ");

  return card(470, height, accent, `${esc(user.name || user.login)} · GitHub`, lines);
}

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
    `<rect class="track" x="${barX}" y="66" width="${barW}" height="10" rx="5"/>
    <g clip-path="url(#barclip)">${slices}</g>
    <clipPath id="barclip"><rect x="${barX}" y="66" width="${barW}" height="10" rx="5"/></clipPath>
    ${legend}`
  );
}

export function renderActivity(user, accent, weeksWanted) {
  const all = user.contributionsCollection.contributionCalendar.weeks;
  const weeks = all.slice(-weeksWanted);
  const max = Math.max(1, ...weeks.flatMap((w) => w.contributionDays.map((d) => d.contributionCount)));

  const cell = 12;
  const gap = 3;
  const left = 30;
  const top = 64;

  const squares = weeks
    .map((week, wi) =>
      week.contributionDays
        .map((day) => {
          const di = new Date(day.date + "T00:00:00Z").getUTCDay();
          const x = left + wi * (cell + gap);
          const y = top + di * (cell + gap);
          const level = day.contributionCount === 0 ? 0 : Math.ceil((day.contributionCount / max) * 4);
          const fill = level === 0 ? null : `#${accent}`;
          const opacity = [0, 0.25, 0.45, 0.7, 1][level];
          return level === 0
            ? `<rect class="track" x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5"/>`
            : `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" rx="2.5" fill="${fill}" opacity="${opacity}"><title>${esc(day.date)}: ${day.contributionCount}</title></rect>`;
        })
        .join("")
    )
    .join("\n    ");

  const width = left * 2 + weeks.length * (cell + gap) - gap;
  const height = top + 7 * (cell + gap) + 30;
  const total = weeks.reduce((s, w) => s + w.contributionDays.reduce((a, d) => a + d.contributionCount, 0), 0);

  const legendX = width - left - 128;
  const legend = [0, 1, 2, 3, 4]
    .map((level, i) => {
      const x = legendX + 28 + i * 15;
      const y = height - 22;
      return level === 0
        ? `<rect class="track" x="${x}" y="${y}" width="11" height="11" rx="2.5"/>`
        : `<rect x="${x}" y="${y}" width="11" height="11" rx="2.5" fill="#${accent}" opacity="${[0, 0.25, 0.45, 0.7, 1][level]}"/>`;
    })
    .join("");

  return card(
    width,
    height,
    accent,
    `${fmt(total)} contributions in the last ${weeks.length} weeks`,
    `${squares}
    <text class="muted" x="${legendX}" y="${height - 13}" font-size="11">Less</text>
    ${legend}
    <text class="muted" x="${legendX + 108}" y="${height - 13}" font-size="11">More</text>`
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

const fmt = (n) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n));

const sanitizeHex = (v) => (v && /^[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null);

function clampInt(raw, fallback, min, max) {
  const n = parseInt(raw ?? "", 10);
  if (Number.isNaN(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}
