---
project: "isloopparallel-pass"
title: "Initial IR Representation and AST Data Structures"
date: 2026-07-20
tags: ["ir", "ast", "design"]
---

## Overview

Designed the core Python data structures for representing parsed MLIR Affine operations.

## Key Data Structures

1. `LoopOp`: Holds induction variable, lower bound expression, upper bound expression, and step.
2. `AccessRelation`: Represents read and write array access patterns inside loop nests.

```python
class LoopOp:
    def __init__(self, var_name: str, lb: int, ub: int, step: int = 1):
        self.var_name = var_name
        self.lb = lb
        self.ub = ub
        self.step = step
        self.body = []
```

## Next Steps

- Implement AST parsing for MLIR text format input.
