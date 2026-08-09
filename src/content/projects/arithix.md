---
title: "Arithix"
description: "An MLIR → LLVM JIT-compiled live calculation engine for Simple-Notes. Vectorized batch execution & symbolic differentiation embedded in a handwriting notebook."
status: "active"
startDate: 2026-08-10
tags: ["compilers", "mlir", "llvm", "math-engine", "jit", "calculus"]
techStack: ["MLIR", "LLVM", "C++", "Qt", "CMake"]
repoUrl: "https://github.com/arithix"
featured: true
---

## 🎯 The One-Line Pitch

**Arithix** is a live, spreadsheet-like math engine inside **Simple-Notes** — write `y = 2x + 1`, it solves inline; drag a variable, every dependent expression and graph updates instantly. Unlike existing interpreters, numbers are produced by a real, **JIT-compiled, vectorized native code path built on MLIR and LLVM**, with built-in **symbolic differentiation**.

---

## 🚀 What Makes Arithix Unique?

| Feature | Apple Math Notes | Soulver / Qalculate | **Arithix (This Project)** |
|---|---|---|---|
| **Architecture** | Proprietary interpreter | Tree-walking interpreter | **Custom MLIR dialect → LLVM JIT** |
| **Open Source** | ❌ No (Apple only) | ❌ No / REPL-only | **✅ Yes (Windows/Linux)** |
| **Vectorized Graphing** | ⚠️ Basic per-point | ❌ No | **✅ SIMD-Vectorized JIT call** |
| **Symbolic Calculus** | ❌ No derivatives/integrals | ❌ Minimal/Numeric | **✅ Full MLIR differentiation pass** |
| **UX Target** | Handwriting | Text REPL | **Handwriting + Interactive Notebook** |

---

## 🏗️ System Pipeline Architecture

```
 Handwritten / typed expression
            │
            ▼
      [ Recursive Parser ]           numbers, vars, binops, functions
            │
            ▼
   [ "expr" dialect ]               custom MLIR dialect (ODS/TableGen)
            │  lowering pass
            ▼
 [ arith / math / scf dialects ]    standard MLIR ops: addf, mulf, math.sin, scf.for
            │  canonicalization & CSE
            ▼
   [ vector dialect ]               batched/SIMD form for range & live graph eval
            │  lowering pass
            ▼
   [ llvm dialect ] ──► LLVM IR ──► [ ORC JIT via ExecutionEngine ]
                                                │
                                                ▼
                                    Native execution in Simple-Notes
```

Alongside the compilation pipeline lives a **dependency graph layer (DAG)** — spreadsheet-style: it tracks variable dependencies and recompiles/re-invokes only the JIT'd functions that actually depend on what changed.

---

## 🗓️ High-Level 6-Phase Roadmap

1. **Phase 0 — Foundations**: MLIR infrastructure, ODS TableGen literacy, and recursive-descent parser.
2. **Phase 1 — Core `expr` Dialect & Scalar JIT**: Define ODS ops, write lowering to `arith`/`math`, wire `ExecutionEngine`.
3. **Phase 2 — Dependency DAG & Caching**: Incremental recompilation set on variable edits.
4. **Phase 3 — Vectorized Batch Evaluation**: Vector dialect lowering for instant 1000+ point live graph redraws.
5. **Phase 4 — Symbolic Differentiation Pass**: MLIR structural rewriting pass (`d/dx` via product/quotient/chain rules).
6. **Phase 5 & 6 — Integration & Multi-Backend**: Embed into Simple-Notes Qt UI thread, benchmark, and target GPU/WASM dialects.
