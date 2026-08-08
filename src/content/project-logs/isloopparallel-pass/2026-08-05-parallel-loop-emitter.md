---
project: "isloopparallel-pass"
title: "Emitting affine.parallel Dialect MLIR Transformation Output"
date: 2026-08-05
tags: ["codegen", "mlir-parallel", "emit"]
---

## Summary

Completed the CLI emitter component `emit.py` which rewrites parallelizable `affine.for` operations into `affine.parallel` operations.

## Example Transformation

Input IR:
```mlir
affine.for %i = 0 to 1024 {
  affine.for %j = 0 to 1024 {
    %0 = affine.load %arg0[%i, %j] : memref<1024x1024xf32>
    affine.store %0, %arg1[%i, %j] : memref<1024x1024xf32>
  }
}
```

Output IR:
```mlir
affine.parallel (%i, %j) = (0, 0) to (1024, 1024) {
  %0 = affine.load %arg0[%i, %j] : memref<1024x1024xf32>
  affine.store %0, %arg1[%i, %j] : memref<1024x1024xf32>
}
```

## Performance Impact

Enables automatic OpenMP/GPU lowering for loop nests in downstream MLIR passes.
