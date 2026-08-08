# sucheeLogs

> A personal developer journal, compiler engineering notebook, and continuous learning log built by **Sucheendra**.

Live Website: [https://sucheendrabhat.github.io](https://sucheendrabhat.github.io)

---

## ⭐️ Credits & Acknowledgments

This website is built on top of **[AstroPaper](https://github.com/satnaing/astro-paper)** — an awesome, minimalist, and accessible Astro blog theme designed by **[Sat Naing](https://github.com/satnaing)**.

---

## 💡 Why I Built This Website

**sucheeLogs** was created as a content-first, friction-free developer journal for documenting daily software engineering milestones, compiler internals research (MLIR & LLVM), systems programming, and technical breakthroughs.

Key priorities:
- **Frictionless local writing**: Adding a new project milestone or study log is as simple as creating a local Markdown file.
- **Deep searchability**: Offline static full-text indexing via Pagefind.
- **Math & Code rigor**: First-class support for LaTeX mathematical formulas (via KaTeX) and Shiki syntax highlighting.

---

## 🧩 Website Components

### 1. Projects (`/projects`)
Tracks active software engineering builds and tools.
- **Metadata**: Status badges (`active`, `planning`, `completed`), start/end timelines, tech stack, and repository links.
- **Dated Build Logs**: Dynamic sub-routes (`/projects/[slug]/[logSlug]`) documenting implementation progress.

### 2. Learning Log (`/learning`)
A dedicated study log for mastering complex engineering topics (e.g. Polyhedral model optimization, MLIR dialects, Rust async runtime internals).
- **Category & Skill Tracking**: Grouped by technical domains with chronological progress logs.
- **Dated Study Logs**: Dynamic sub-routes (`/learning/[slug]/[logSlug]`) capturing detailed technical notes.

### 3. Sticky Dropdown Outline
- Pinned at the top of long log detail pages for quick section navigation.

### 4. KaTeX LaTeX Math Engine
- Renders inline (`$ \vec{d} = \vec{i}_2 - \vec{i}_1 $`) and block (`$$ \mathcal{D} = \{ \dots \} $$`) math equations.

### 5. Floating Back to Top Button
- Fades in as you scroll down long articles to smoothly return to top navigation.

---

## 🛠️ How to Reuse This Template for Your Personal Use

You can easily clone and adapt **sucheeLogs** into your own personal developer journal or knowledge base!

### Step 1: Fork or Clone the Repository
```bash
git clone git@github.com:sucheendrabhat/sucheendrabhat.github.io.git my-dev-log
cd my-dev-log
npm install
```

### Step 2: Update Site Configuration (`astro-paper.config.ts`)
Open `astro-paper.config.ts` and set your name, site URL, and social links:
```ts
export default defineAstroPaperConfig({
  site: {
    url: "https://yourusername.github.io/",
    title: "yourDevLogs",
    description: "Personal developer journal and continuous learning log.",
    author: "Your Name",
    profile: "https://github.com/yourusername",
  },
  socials: [
    { name: "github", url: "https://github.com/yourusername" },
    { name: "linkedin", url: "https://linkedin.com/in/yourusername" },
    { name: "mail", url: "mailto:yourname@example.com" },
  ],
});
```

### Step 3: Add Your Content (`src/content/`)
- **Adding a Project**: Create `src/content/projects/my-project.md`:
  ```markdown
  ---
  title: "My Open Source Project"
  description: "A fast Rust CLI tool."
  status: "active"
  startDate: 2026-08-10
  techStack: ["Rust", "Tokio"]
  repoUrl: "https://github.com/yourusername/repo"
  featured: true
  ---
  ```
- **Adding a Project Log**: Create `src/content/project-logs/my-project/2026-08-12-v1-release.md`:
  ```markdown
  ---
  project: "my-project"
  title: "Released v1.0.0 CLI Parser"
  date: 2026-08-12
  ---
  ```
- **Adding a Skill / Topic**: Create `src/content/skills/distributed-systems.md`.
- **Adding a Skill Log**: Create `src/content/skill-logs/distributed-systems/2026-08-15-raft-consensus.md`.

### Step 4: Run Locally & Build
```bash
npm run dev     # Starts local server at http://localhost:4321
npm run build   # Builds production bundle in ./dist
```

### Step 5: Deploy to GitHub Pages
1. Push your repository to GitHub: `git push -u origin main`
2. In your GitHub repository settings, go to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. GitHub Actions will automatically build and publish your site!

---

## 🤝 Acknowledgments

- **AstroPaper Theme**: Designed by [Sat Naing (satnaing/astro-paper)](https://github.com/satnaing/astro-paper).
- **Astro Framework**: Built by the [Astro Core Team](https://astro.build/).
