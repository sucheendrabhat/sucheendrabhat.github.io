---
project: "isloopparallel-pass"
title: "Built Distance Vector Dependence Matrix Solver"
date: 2026-07-28
tags: ["dependence", "solver", "compilers"]
---

## Problem Statement

To determine if an `affine.for` loop can be executed in parallel, we must prove that no iteration $i_1$ writes to a memory location that is read or written by another iteration $i_2$.

## Mathematical Approach

We compute the iteration distance vector:

$$\vec{d} = \vec{i}_2 - \vec{i}_1$$

If all distance vectors for all conflicting accesses have non-zero entries at the loop level, loop iterations are independent.

```python
def check_loop_parallelism(loop_nest, access_matrix):
    distance_vectors = solve_diophantine(access_matrix)
    for vec in distance_vectors:
        if vec.outer_loop_distance != 0:
            return False
    return True
```

## Results

Successfully detected parallelism in 2D matrix addition and 3D stencil loops.
