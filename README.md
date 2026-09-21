<p align="center">
  <img src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/main/assets/header.svg" alt="Kristalyn Narongpiyawathana — Full-Stack Developer" width="880"/>
</p>
<p align="center">
  <img src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/main/assets/now.svg" alt="now" width="720"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-4FC08D?style=flat&logo=vuedotjs&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/Nuxt-00DC82?style=flat&logo=nuxtdotjs&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/Node.js-5FA04E?style=flat&logo=nodedotjs&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/PHP-777BB4?style=flat&logo=php&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/Supabase-3FCF8E?style=flat&logo=supabase&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white" height="22"/>
  <img src="https://img.shields.io/badge/Flutter-02569B?style=flat&logo=flutter&logoColor=white" height="22"/>
</p>

<p align="center">
  <a href="https://resume.krista-lyn.com"><img src="https://img.shields.io/badge/R%C3%A9sum%C3%A9-resume.krista--lyn.com-d9a441?style=flat&logo=readme&logoColor=white" height="22"/></a>
</p>

---

Full-stack developer in Thailand. For three years I worked on the core transaction system of a pawnshop and lending business — 100 branches, 33 provinces, somewhere between 150,000 and 200,000 transactions a month. Most of what I know about software I learned from systems where a bug means a branch stops taking customers.

## What I work on

Money-handling flows and the things attached to them: appraisal, quotations, pawning, interest renewals, redemptions, payments, permissions. Plus the parts nobody volunteers for — fingerprint scanners, Thai national-ID card readers, OCR, and penetration-test findings that have to reach zero before the release goes out.

## Stack

Every day:

- **Vue + Nuxt + Pinia** — years of it, Vuetify for the enterprise screens where consistency beats craft
- **Node and PHP** — REST, Socket.io for the screens that cannot wait for a refresh
- **PostgreSQL / MSSQL** — schema first, and I would rather fix the model than add a third join

Regularly:

- **Supabase** for RLS and RPC, so authorization lives in the database and not in four client branches
- **TypeScript + Next.js** on everything new I start
- **Playwright** for the handful of flows that cost real money when they break
- **Google Maps API, face-api, OCR, smart card SDKs** — integration work where the docs stop early

Just starting:

- **Dart + Flutter** — early days. Coming from years of Vue, the widget tree and explicit state rebuilds are the part I am still rewiring my instincts around.

## Security, specifically

- Closed **100% of reported penetration-test findings**: SQL injection, clickjacking, OTP brute-force, unsafe file upload
- Rate limiting and lockout on OTP is a product decision, not a backlog item
- File upload is the endpoint I always assume is already being abused
- Permissions belong in one place — if the UI is the only thing hiding a button, it is not hidden

## Selected projects

### [ai-news](https://github.com/kristalynn-devv/ai-news)

A Thai AI news daily with the editorial back office attached — review queue, draft editor, and
approvals that stay immutable and still auditable. Next.js and Supabase, with authorization in
RLS and the editor workflow in RPCs. Unit tests, PostgreSQL contract tests, and Playwright.

### [LockGo](https://github.com/kristalynn-devv/LockGo)

Search and reserve a smart locker ahead of arrival — customer flow and admin console, React 19 +
Vite against a NestJS API on Supabase. Reservation and payment both run as Postgres functions, so
the compartment lock and the insert cannot drift apart, and Realtime carries no payload: it says
something changed and the client refetches. A message that carries state is a second source of
truth waiting to disagree with the first.

### [PyPath](https://github.com/kristalynn-devv/python-ai-course)

A Thai-language course taking Python from first syntax through to AI engineering — 5 courses,
40 lessons, with an adaptive coach that reads your first pass at an assessment bank and tells you
where to start. No accounts and no backend; progress stays in the learner's browser. A Python
script lints and actually runs every code sample, because examples that do not run are worse
than none.

### [poc-pricetrends](https://github.com/kristalynn-devv/poc-pricetrends)

Price extraction where the site has no API. Playwright screenshots the page, Gemini reads the
image against a per-category schema. Selector-based scrapers break quietly and keep returning
plausible nonsense; a screenshot plus a bound schema fails loudly and survives a redesign.

### [personal-finance](https://github.com/kristalynn-devv/personal-finance)

Net worth, budget, debt, retirement, tax and a health score, built out of a spreadsheet I was
maintaining by hand. Astro with React only where a page is genuinely interactive. Every table is
row-level-secured to its owner — a bug in a component should not be able to show you someone
else's balance sheet.

## How I work

- Write the spec before the code. A ticket that cannot be resolved into a decision is not ready to build.
- Reuse before you add. Most new files are a duplicate of something already in the repo.
- If a change cannot be verified, it is not finished — tests, or a run of the real thing.
- AI agents do the typing. Deciding what should exist is still mine, and I keep that boundary sharp.
- Read the actual source in `node_modules` before trusting what a blog post said the API was.
- Leave a handoff note. The next session — mine or someone else's — starts from it.

## Currently

- Wiring **ai-news** from ingestion to approved article — the hard part is the review queue,
  where an approval has to be immutable and still auditable
- Learning **Dart and Flutter** from scratch. Coming from Vue, the thing I keep getting wrong is
  assuming state updates are reactive rather than a rebuild I asked for
- Rebuilding my default stack around TypeScript, Next.js and Supabase, one project at a time,
  keeping RLS as the authorization boundary instead of the client
- Planning anything larger than a session as a map of decision tickets before opening an editor

## Background

**B.Sc. Computer Science, First-Class Honors (GPA 3.71)** — Valaya Alongkorn Rajabhat University. A weekend program, finished while working full-time as a building technician at the same company I later joined as a developer.

**IT Passport Examination (IP)** — Career for the Future Academy × IPA Japan, 2021.

## 📊 Activity

<p align="center">
  <img height="200" src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/main/assets/stats.svg" alt="GitHub stats"/>
  <img height="200" src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/main/assets/top-langs.svg" alt="Top languages"/>
</p>
<p align="center">
  <img width="880" src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/main/assets/activity.svg" alt="Contribution activity"/>
</p>

<sub>Rendered nightly by <a href="./.github/workflows/stats.yml">a GitHub Action</a> and committed
as plain SVG — the profile page calls nothing at render time.</sub>

## Contact

Full CV at **[resume.krista-lyn.com](https://resume.krista-lyn.com)**.

Issues and discussions on any repo above, or:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-kristalyn--n-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/kristalyn-n)
[![Email](https://img.shields.io/badge/k.narongpiyawathana%40gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:k.narongpiyawathana@gmail.com)

Or plainly: **k.narongpiyawathana@gmail.com**

---

Pathum Thani, Thailand · UTC+7 · [resume.krista-lyn.com](https://resume.krista-lyn.com) · [github.com/kristalynn-devv](https://github.com/kristalynn-devv)
