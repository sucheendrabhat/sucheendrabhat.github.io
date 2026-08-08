# sucheeLogs — Content Creation & Writing Guidelines

This document provides step-by-step instructions for **Sucheendra** on creating, editing, and publishing new projects, skills, and daily log entries in `sucheeLogs`.

---

## 1. Folder Structure & Naming Conventions

All content files reside in `src/content/`. Log files are organized in subfolders named strictly after their parent's ID:

```
src/content/
├── projects/
│   ├── isloopparallel-pass.md       # Project ID: "isloopparallel-pass"
│   └── portfolio-site.md            # Project ID: "portfolio-site"
├── project-logs/
│   ├── isloopparallel-pass/         # Subfolder matches project ID
│   │   ├── 2026-07-20-initial-ir-design.md
│   │   └── 2026-08-01-parser-milestone.md
│   └── portfolio-site/
├── skills/
│   └── mlir-llvm-compilers.md       # Skill ID: "mlir-llvm-compilers"
└── skill-logs/
    └── mlir-llvm-compilers/         # Subfolder matches skill ID
        └── 2026-07-25-affine-scalrep-pipeline.md
```

---

## 2. Creating New Content

### A. Adding a Project
Create a Markdown file in `src/content/projects/<project-id>.md`:

```markdown
---
title: "My New Compiler Pass"
description: "A CLI tool for IR transformations."
status: "active" # Options: 'planning' | 'active' | 'paused' | 'completed'
startDate: 2026-08-10
tags: ["compilers", "llvm"]
techStack: ["C++", "MLIR"]
repoUrl: "https://github.com/such3/repo"
featured: true
---

Overview writeup of the project goals and motivation...
```

### B. Adding a Project Log
Create a Markdown file in `src/content/project-logs/<project-id>/YYYY-MM-DD-title.md`:

```markdown
---
project: "isloopparallel-pass" # Must match parent project filename without .md
title: "Implemented Parser for Affine For Operations"
date: 2026-08-12
tags: ["parser", "ast"]
---

## Summary
Details on today's implementation...
```

---

## 3. LaTeX Math Formula Support

`sucheeLogs` supports full LaTeX math rendering powered by KaTeX.

- **Inline Math**: Surround with `$ ... $` or `\( ... \)`
  - Example: `The distance vector is $\vec{d} = \vec{i}_2 - \vec{i}_1$.`
- **Display Math (Centered Blocks)**: Surround with `$$ ... $$` or `\[ ... \]`
  - Example:
  ```markdown
  $$\mathcal{D} = \{ \vec{i} \in \mathbb{Z}^n \mid A \vec{i} + \vec{b} \ge \vec{0} \}$$
  ```

---

## 4. Code Highlighting & Outlines

- **Code Snippets**: Use standard fenced code blocks with language identifiers (`cpp`, `python`, `rust`, `bash`, `mlir`).
- **Sticky Table of Contents (Outline)**: Any `## Heading 2` or `### Heading 3` tags included in your log entry will automatically generate the PC sticky sidebar outline!
