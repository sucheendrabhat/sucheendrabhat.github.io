---
title: "isLoopParallel: A Toy MLIR Parallelism Pass"
description: "A CLI tool that parses affine-dialect MLIR, builds a dependence graph, and reports which loops are safely parallelizable — modeled on MLIR's own isLoopParallel."
status: "active"
startDate: 2026-07-15
tags: ["mlir", "llvm", "compilers", "loop-analysis"]
techStack: ["Python", "MLIR", "Affine Dialect"]
featured: true
---

Full write-up: motivation, architecture (`ir.py`, `parser.py`, `dependence.py`, `reductions.py`, `emit.py`, `cli.py`), and how it mirrors MLIR's real `affine-scalrep` → `isLoopParallel` → `affine-parallelize` pipeline.
