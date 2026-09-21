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

Full-stack developer in Thailand. I spent about three years on the core transaction system of a
pawnshop and lending business, used day to day across its branches. Most of what I know I picked
up there, usually by getting something wrong first and having to understand why.

## What I work on

Money-handling flows and what attaches to them: appraisal, quotations, pawning, interest renewals,
redemptions, payments, permissions. Alongside that, a fair amount of integration work —
fingerprint scanners, Thai national-ID card readers, OCR — and security findings that had to be
cleared before a release went out.

## Stack

Every day:

- **Vue + Nuxt + Pinia** — where most of my hours have gone; Vuetify on the internal screens
- **Node and PHP** — REST, Socket.io for the screens that cannot wait for a refresh
- **PostgreSQL / MSSQL** — schema first, and I usually try fixing the model before adding a join

Regularly:

- **Supabase** for RLS and RPC, so authorization sits in the database rather than in the client
- **TypeScript + Next.js** on everything new I start
- **Playwright** for the few flows that would cost something real if they broke
- **Google Maps API, face-api, OCR, smart card SDKs** — integration work where the docs stop early

Just starting:

- **Dart + Flutter** — early days. Coming from years of Vue, the widget tree and explicit state rebuilds are the part I am still rewiring my instincts around.

## Skills

Same grouping as my [CV](https://resume.krista-lyn.com), so the two cannot drift apart.

| | |
| --- | --- |
| **Frontend** | JavaScript · HTML & CSS · Vue.js · Nuxt · Vuetify · Pinia · Tailwind CSS |
| **Backend** | PHP · Node.js · REST API · Socket.io · PostgreSQL · MSSQL |
| **Integration** | Google Maps API · Face-api |
| **No-Code** | AppSheet · Google Apps Script · Google Sheets |
| **Tools** | Git · GitHub · GitLab · CI/CD · Claude · Cursor |
| **Familiar** | TypeScript · React · Next.js · NestJS · Java · C# |
| **Learning** | Dart · Flutter |

Nothing here carries a self-assigned rating. Anything I only know at a basic level sits under
**Familiar**, where the label says so.

## Security, specifically

- Worked through the reported penetration-test findings until the list was clear: SQL injection,
  clickjacking, OTP brute-force, unsafe file upload
- I treat OTP rate limiting and lockout as part of the feature rather than a follow-up ticket
- File upload is the endpoint I am most careful with
- I try to keep permission checks in one place; hiding a button in the UI is not a check

## Selected projects

### [ai-news](https://github.com/kristalynn-devv/ai-news)

A Thai AI news daily with the editorial back office attached — review queue, draft editor, and
approvals that stay immutable and still auditable. Next.js and Supabase, with authorization in
RLS and the editor workflow in RPCs. Unit tests, PostgreSQL contract tests, and Playwright.

### [LockGo](https://github.com/kristalynn-devv/LockGo)

Search and reserve a smart locker ahead of arrival — customer flow and admin console, React 19 +
Vite against a NestJS API on Supabase. Reservation and payment both run as Postgres functions so the
compartment lock and the insert stay together, and Realtime carries no payload — it signals that
something changed and the client refetches.

### [PyPath](https://github.com/kristalynn-devv/python-ai-course)

A Thai-language course taking Python from first syntax through to AI engineering — 5 courses,
40 lessons, with an adaptive coach that reads your first pass at an assessment bank and tells you
where to start. No accounts and no backend; progress stays in the learner's browser. A Python
script lints and runs every code sample, so the examples in the lessons are known to work.

### [poc-pricetrends](https://github.com/kristalynn-devv/poc-pricetrends)

Price extraction where the site has no API. Playwright screenshots the page, Gemini reads the
image against a per-category schema. The sites have no API and their markup changes often, so
reading a screenshot against a schema held up better than selectors did.

### [personal-finance](https://github.com/kristalynn-devv/personal-finance)

Net worth, budget, debt, retirement, tax and a health score, built out of a spreadsheet I was
maintaining by hand. Astro with React only where a page is genuinely interactive. Every table is
row-level-secured to its owner, so a mistake in a component cannot surface someone else's data.

## How I work

- I write the spec first. If I cannot turn a ticket into a decision, it is usually not ready to build.
- I look for something to reuse before adding a file; often the thing already exists.
- I try not to call a change done until I have verified it — a test, or a run of the real thing.
- Agents do a lot of the typing. Deciding what should exist is the part I keep for myself.
- I read the source in `node_modules` rather than trust what a blog post said the API was.
- I leave a handoff note, because the next session usually starts colder than I expect.

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

## 📊 Languages

<p align="center">
  <img height="200" src="https://raw.githubusercontent.com/kristalynn-devv/kristalynn-devv/stats/assets/top-langs.svg" alt="Top languages"/>
</p>

<sub>Rendered nightly by <a href="./.github/workflows/stats.yml">a GitHub Action</a> onto a separate
<code>stats</code> branch.</sub>

## Contact

Full CV at **[resume.krista-lyn.com](https://resume.krista-lyn.com)**.

Issues and discussions on any repo above, or:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-kristalyn--n-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/kristalyn-n)
[![Email](https://img.shields.io/badge/k.narongpiyawathana%40gmail.com-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:k.narongpiyawathana@gmail.com)

Or plainly: **k.narongpiyawathana@gmail.com**

---

Pathum Thani, Thailand · UTC+7 · [resume.krista-lyn.com](https://resume.krista-lyn.com) · [github.com/kristalynn-devv](https://github.com/kristalynn-devv)
