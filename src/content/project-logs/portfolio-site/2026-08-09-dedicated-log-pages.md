---
project: "portfolio-site"
title: "Added Dedicated Log Detail Pages with Table of Contents & Navigation"
date: 2026-08-09
tags: ["astro", "routing", "toc", "navigation"]
---

## Feature Architecture

Added individual dynamic routes for project and skill logs:
- `/projects/[slug]/[logSlug]`
- `/learning/[slug]/[logSlug]`

## Features Included

1. **Table of Contents (TOC)**: Automatically extracts markdown headings using `render(log).headings`.
2. **Previous / Next Navigation**: Computes chronological sibling logs under the same parent.
3. **Deep Search Indexing**: Pagefind indexes all generated log detail HTML files.
