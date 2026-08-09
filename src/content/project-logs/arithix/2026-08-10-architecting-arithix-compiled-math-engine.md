---
project: "arithix"
title: "Architecting Arithix: Introductory Log & MLIR Compilation Pipeline"
date: 2026-08-10
tags: ["mlir", "llvm", "compilers", "architecture"]
---

## Why Arithix?

When evaluating complex mathematical formulas over large numeric domains or in real-time loops, traditional interpreters spend the vast majority of CPU cycles traversing pointers across dynamic AST nodes (`BinaryOp`, `Literal`, `FunctionCall`).

```cpp
// Traditional Tree-Walking Interpreter (Slow overhead per evaluation)
double evaluate(ASTNode* node) {
    if (auto* b = dynamic_cast<BinaryOp*>(node)) {
        if (b->op == ADD) return evaluate(b->left) + evaluate(b->right);
        // ... indirect branch prediction overhead & stack recursion ...
    }
}
```

**Arithix** replaces this interpretation overhead with a dedicated compilation pipeline built on **MLIR** and **LLVM**.

---

## Architectural Pipeline Overview

The initial pipeline architecture lowers user-defined mathematical expressions through progressive compilation stages:

```
[ Math Expression String / AST ]
               │
               ▼
   [ Arithix Custom MLIR Dialect ]  ───► Algebraic Simplification & Folding
               │
               ▼
     [ Standard Arith & Vector ]   ───► SIMD Loop Vectorization
               │
               ▼
        [ LLVM IR Dialect ]        ───► Target LLVM Optimization Passes
               │
               ▼
  [ Native Machine Code / JIT ]    ───► Zero-Overhead Function Pointer Execution
```

---

## Initial Tech Stack & Milestones

Starting today, development is focused on setting up the MLIR build environment and dialect infra:

1. **MLIR & LLVM Infrastructure**: Building against LLVM/MLIR trunk with CMake.
2. **Custom MLIR Dialect (`arithix`)**: Defining custom operations (`arithix.eval`, `arithix.poly`, `arithix.reduce`).
3. **LLVM JIT Execution Engine**: Integrating LLVM `ExecutionEngine` and ORC JIT to execute compiled math expressions dynamically at runtime.

Stay tuned for upcoming progress entries as the MLIR dialect definitions and lowering passes take shape!

- Repository: [github.com/arithix](https://github.com/arithix)
