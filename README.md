# sucheeLogs

> A personal developer journal, compiler engineering notebook, and continuous learning log built by **Sucheendra**.

Live Website: [https://sucheendrabhat.github.io](https://sucheendrabhat.github.io)

---

## 💡 Why I Built This Website

**sucheeLogs** was built as a content-first, lightweight personal notebook to document my daily software engineering milestones, compiler internals research (MLIR & LLVM), systems programming, and technical breakthroughs.

Unlike traditional marketing portfolios or complex CMS-backed blogs, **sucheeLogs** prioritizes:
- **Fast, friction-free writing**: Adding a new project milestone or study log is as simple as creating a local Markdown file.
- **Deep searchability**: Offline static full-text indexing across all entries.
- **Math & Code rigor**: First-class support for LaTeX mathematical formulas and syntax-highlighted code blocks.

---

## 🧩 Core Architecture & Components

### 1. Projects (`/projects`)
Tracks active and completed software engineering builds (such as compiler passes, CLI tools, and web infrastructure).
- **Metadata**: Project status badges (`active`, `planning`, `completed`), start/end timelines, tech stack, and repository links.
- **Dated Build Logs**: Dynamic sub-routes (`/projects/[slug]/[logSlug]`) documenting step-by-step implementation notes.

### 2. Learning & Knowledge Log (`/learning`)
A dedicated log for mastering complex engineering topics (e.g. Polyhedral model optimization, MLIR dialects, Rust async runtime internals).
- **Category & Skill Tracking**: Grouped by technical domains with chronological progress logs.
- **Dated Study Logs**: Dynamic sub-routes (`/learning/[slug]/[logSlug]`) capturing detailed technical summaries.

### 3. Sticky Dropdown Outline
- Pinned at the top of long log detail pages.
- Provides a compact, non-intrusive dropdown menu listing all section headings with smooth scroll navigation.

### 4. KaTeX LaTeX Math Engine
- Built-in KaTeX support for rendering mathematical expressions directly inside Markdown.
- Supports inline formulas (`$ \vec{d} = \vec{i}_2 - \vec{i}_1 $`) and display math blocks (`$$ \mathcal{D} = \{ \dots \} $$`).

### 5. Full-Text Search (Pagefind)
- Static search index generated during build time for instant, zero-latency searching across all entries without external servers.

### 6. Floating Back to Top Button
- Non-obtrusive floating button that smoothly fades in as you scroll down long articles for quick return to the header navigation.

---

## 🛠️ Tech Stack

- **Framework:** [Astro 6](https://astro.build/) (Static Output)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Custom Pale Ice-Blue Light Theme & Dark Mode)
- **Syntax Highlighting:** Shiki (`github-light` / `github-dark`)
- **Math Formula Rendering:** KaTeX
- **Search Engine:** Pagefind
- **Deployment:** GitHub Actions & GitHub Pages

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production static site
npm run build
```

---

## 📄 License

Created by **Sucheendra** ([@such3](https://github.com/such3)).
