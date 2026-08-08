---
project: "isloopparallel-pass"
title: "Parser now handles nested affine.for with step expressions"
date: 2026-08-01
tags: ["parser", "milestone"]
---

What I built today:
Implemented support for arbitrary nested `affine.for` loops in the AST parser, including step expressions and symbolic lower/upper bounds.

```python
# Example MLIR snippet parsed today
def analyze_loop_nest(op):
    for iv in op.get_induction_vars():
        print(f"Induction variable: {iv}")
```

Fixed a edge case where step sizes > 1 were improperly normalized during dependence distance calculations.
