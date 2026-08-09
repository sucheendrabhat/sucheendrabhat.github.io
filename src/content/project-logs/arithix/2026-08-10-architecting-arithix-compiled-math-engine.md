---
project: "arithix"
title: "Live Math Engine for Simple-Notes: Architecture, Roadmap & MLIR Pipeline Blueprint"
date: 2026-08-10
tags: ["mlir", "llvm", "compilers", "architecture", "jit", "roadmap"]
---

### An MLIR → LLVM JIT-compiled calculation engine, embedded in a handwriting notebook
*Working codename: **Arithix***

---

## 🎯 The One-Line Pitch

A live, spreadsheet-like math block inside **Simple-Notes** — write `y = 2x + 1`, it solves inline; drag a variable, every dependent expression and graph updates instantly — except unlike every existing version of this idea, the numbers aren't produced by an interpreter walking a syntax tree. They come out of a real, JIT-compiled, vectorized native code path built on MLIR and LLVM, and it can do calculus, which the most polished existing version of this feature explicitly cannot.

---

## 💥 The Problem

Every "notepad calculator" — type math, see the answer next to it, live-updating — is built the same way underneath: parse the line, walk the resulting tree, compute a number, repeat on every keystroke. That's a fine architecture for what these tools are actually used for (quick everyday sums, unit conversions, budgets), but it means none of them:

- get *faster* as you optimize them, because there's no compilation step to optimize
- can cheaply evaluate a function at thousands of points for a smooth, draggable graph
- extend naturally to symbolic operations like differentiation, because the interpreter has no representation of the expression beyond "a tree I already reduced to a number"

Separately, the apps that *do* have this UX polished (Apple's Math Notes) are Apple-only and closed-source, and the apps that are open and cross-platform (Qalculate!) are REPL-style calculators, not handwriting-first notebooks.

Simple-Notes already exists, is already cross-platform (Windows/Linux), and is already stylus/touchscreen-first. That's the gap this project fills.

---

## 📊 Competitive Landscape — What Exists Today

| Tool | Engine | Open source | Platforms | Live graphing | Calculus | Handwriting-first |
|---|---|---|---|---|---|---|
| **Apple Math Notes** | Proprietary interpreter + on-device handwriting ML | No | Apple only | Yes | **No** — no derivatives/integrals | Yes |
| **Soulver / SoulverCore** | Hand-rolled natural-language interpreter (Swift) | No | Mac-first | No | No | No — text-first |
| **Numi** | Proprietary interpreter | No | Mac-first | No | No | No |
| **Qalculate!** | libqalculate interpreter | **Yes** | Windows/Mac/Linux | Basic | Minimal, mostly numeric | No — REPL-style |
| **Wolfram Mathematica/Alpha** | Wolfram Kernel (proprietary symbolic engine) | No | Cross-platform, paid | Yes, extensive | Yes, full CAS | No |
| **Desmos** | JS interpreter | No | Web | Yes, excellent | Graphing-focused only | No |
| **Arithix (this project)** | **Custom MLIR dialect → LLVM JIT** | **Yes (planned)** | **Windows/Linux** | **Yes, vectorized** | **Yes — a real differentiation pass** | **Yes** |

---

## 🔥 What's Actually New Here

**1. Real compilation, not interpretation.**
re-evaluate the AST, every keystroke, forever. This project lowers expressions through an actual multi-level compiler: a custom `expr` dialect → MLIR's `arith`/`math`/`scf` dialects → LLVM dialect → LLVM IR → JIT-compiled native code. Constant folding, common subexpression elimination (CSE), and algebraic simplification come for free from MLIR's canonicalization infrastructure instead of being hand-rolled.

**2. Vectorized batch evaluation, for graphs that actually feel alive.**
Lowering through MLIR's `vector` dialect means redrawing a graph while someone drags a slider is *one* SIMD-vectorized JIT call, not thousands of interpreter round-trips.

**3. Calculus, where the best existing version stops.**
Apple's own documentation is explicit that Math Notes does not handle derivatives or integrals. Symbolic differentiation as an MLIR pass — pattern matching the `expr` dialect's ops and structurally rewriting them via the standard product/quotient/chain rules — is a natural extension of a compiler architecture.

**4. Open, cross-platform, and actually yours.**
Open source, targets Windows/Linux specifically — where this experience barely exists — and lives inside an app you already fully control.

**5. An extensible IR, not a dead end.**
The same architecture that gets you a CPU JIT this year is the same one that could retarget a GPU dialect for heavier workloads, or emit WASM for a browser demo later — without a rewrite.

---

## 🏛️ System Architecture & IR Lowering

```
 Handwritten / typed expression
            │
            ▼
      [ Parser ]                    recursive-descent; numbers, vars,
            │                       binops, function calls, comparisons
            ▼
   [ "expr" dialect ]               custom MLIR dialect (ODS/TableGen)
            │  lowering pass
            ▼
 [ arith / math / scf dialects ]    standard MLIR ops: addf, mulf, math.sin, scf.for
            │  canonicalization + optimization passes (free wins: const-fold, CSE)
            ▼
   [ vector dialect ]               batched/SIMD form — used for range & graph eval
            │  lowering pass
            ▼
   [ llvm dialect ]  → translate →  LLVM IR
            │
            ▼
  [ ORC JIT via ExecutionEngine ]   native machine code
            │
            ▼
      Result / live graph, rendered in the note
```

### Dependency Graph Layer (DAG)
Sitting alongside this pipeline is a **dependency graph layer** — spreadsheet-style: it tracks which expressions reference which variables, and on edit, recompiles and re-invokes only the JIT'd functions that actually depend on what changed.

### Illustrative sketch: the `expr` dialect (ODS/TableGen)

```tablegen
def Expr_Dialect : Dialect {
  let name = "expr";
  let cppNamespace = "::expr";
}

def Expr_ConstantOp : Expr_Op<"constant", [Pure]> {
  let arguments = (ins F64Attr:$value);
  let results = (outs F64:$result);
}

def Expr_AddOp : Expr_Op<"add", [Pure, Commutative]> {
  let arguments = (ins F64:$lhs, F64:$rhs);
  let results = (outs F64:$result);
}

def Expr_CallOp : Expr_Op<"call"> {
  let arguments = (ins StrAttr:$callee, Variadic<F64>:$operands);
  let results = (outs F64:$result);
}
```

### Illustrative sketch: lowering `2 * x + 1`

```mlir
// expr dialect:
%0 = expr.constant 2.0
%1 = expr.var "x"
%2 = expr.mul %0, %1
%3 = expr.constant 1.0
%4 = expr.add %2, %3

// lowered to arith:
%0 = arith.constant 2.0 : f64
%1 = <function argument x> : f64
%2 = arith.mulf %0, %1 : f64
%3 = arith.constant 1.0 : f64
%4 = arith.addf %2, %3 : f64
func.return %4 : f64
```

---

## 🗺️ Detailed Roadmap

### Phase 0 — Foundations (2–3 weeks)
- [ ] Work MLIR's official "Toy" tutorial end to end — infrastructure literacy (ODS, dialect definition, lowering mechanics)
- [ ] Build LLVM/MLIR from source; get comfortable with `mlir-opt` and pass-pipeline CLI tooling
- [ ] Write a recursive-descent parser for arithmetic: numbers, variables, `+ - * / ^`, function calls (`sin`, `cos`, `sqrt`, `exp`, …)

### Phase 1 — Core `expr` dialect + scalar JIT round-trip (4–6 weeks)
- [ ] Define `expr` dialect in ODS: constant, var, add/sub/mul/div, call
- [ ] Write lowering pass: `expr` → `arith` / `math` / `func`
- [ ] Wire up `ExecutionEngine`, JIT-invoke compiled function, get scalar result back
- [ ] **Milestone:** type `2 * sin(3.14/2) + 1`, get the correct number back through the *entire* pipeline

### Phase 2 — Dependency graph + incremental recompilation (3–4 weeks)
- [ ] Track variable references between expressions (spreadsheet-style DAG)
- [ ] Compute minimal recompilation set on edit instead of rebuilding everything
- [ ] Cache compiled functions; invalidate only what changed
- [ ] **Milestone:** change one variable, watch three dependent expressions update without full rebuild

### Phase 3 — Vectorized batch evaluation for live graphing (4–5 weeks)
- [ ] Lower scalar expression to array evaluation via `vector` dialect
- [ ] Wire into graph widget that redraws as variable/slider moves
- [ ] Benchmark vectorized JIT batch eval against naive per-point interpretation
- [ ] **Milestone:** dragging a slider redraws a 1000+ point graph at interactive frame rates with benchmark proof

### Phase 4 — Symbolic differentiation pass (3–5 weeks)
- [ ] Write MLIR pass pattern-matching `expr` ops emitting derivative IR (product/quotient/chain rules)
- [ ] Recursive rewriting for arbitrary expression trees
- [ ] **Milestone:** type `d/dx(sin(x^2))`, get `2x · cos(x^2)` — the calculus existing competitors don't do

### Phase 5 — Integration into Simple-Notes (4–6 weeks)
- [ ] Add expression/math block type to note format
- [ ] Compile off UI thread so typing never stutters
- [ ] Graceful in-note error handling (unbound variables, parse failures)
- [ ] **Milestone:** ship as usable feature in Simple-Notes

### Phase 6 — Stretch goals (open-ended)
- [ ] Retarget GPU dialect for 3D parametric surfaces
- [ ] Emit WASM for web demo
- [ ] Dimensional analysis dialect

---

## 🛠️ Tech Stack & Tooling

- **LLVM / MLIR** — Recent release branch build from source
- **C++** — Matches existing Simple-Notes codebase
- **Qt** — UI note-block integration
- **CMake** — Standard build system for LLVM/MLIR
- **GoogleTest & FileCheck/lit** — Unit & IR lowering verification

---

## 🎯 Definition of Done (v1)

- [ ] Arithmetic + trig + basic functions evaluate correctly through full JIT pipeline
- [ ] Note with 20+ interlinked expressions updates live with no visible lag
- [ ] Graphing over 1000+ points redraws at interactive rates while dragging variable
- [ ] Benchmark shows vectorized JIT beating naive interpreter with empirical numbers
- [ ] Symbolic differentiation passes documented test set
- [ ] Shipped inside Simple-Notes

- Repository: [github.com/arithix](https://github.com/arithix)
