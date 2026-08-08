---
skill: "mlir-llvm-compilers"
title: "Traced the affine-scalrep → isLoopParallel → affine-parallelize pipeline"
date: 2026-07-25
tags: ["affine-dialect", "pipeline"]
---

Notes on the pass pipeline:
Traced through the C++ source in `mlir/lib/Dialect/Affine/Analysis/LoopAnalysis.cpp`. Key insight: dependence matrices check element-wise distance vectors before asserting loop independence.
