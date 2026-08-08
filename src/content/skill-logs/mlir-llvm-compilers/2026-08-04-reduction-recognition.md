---
skill: "mlir-llvm-compilers"
title: "Reduction Recognition in Affine Dialect Loops"
date: 2026-08-04
tags: ["reduction", "affine", "pass"]
---

## What are Reductions?

A reduction occurs when multiple loop iterations update an accumulator variable using an associative and commutative operator (such as sum, product, min, or max).

## Implementation in MLIR

```cpp
// Traced in mlir/lib/Dialect/Affine/Utils/LoopUtils.cpp
bool mlir::isReductionLoop(AffineForOp forOp) {
  // Checks accumulator initialization and update op opcode
  return checkAssociativeAccumulator(forOp);
}
```

## Takeaway

Parallel loops with reduction accumulators can still be parallelized using atomic updates or thread-local reduction buffers.
