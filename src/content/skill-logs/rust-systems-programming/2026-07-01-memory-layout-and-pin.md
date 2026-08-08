---
skill: "rust-systems-programming"
title: "Understanding Self-Referential Structs and Pin<P>"
date: 2026-07-01
tags: ["rust", "memory", "pin"]
---

## The Problem with Self-Referential Types

When a struct contains a pointer to one of its own fields, moving the struct in memory invalidates the internal pointer.

## Rust Solution: `Pin<P>`

```rust
use std::pin::Pin;
use std::marker::PhantomPinned;

struct SelfRef {
    data: String,
    pointer: *const String,
    _marker: PhantomPinned,
}
```

`Pin` guarantees that the value pointed to will not be moved in memory until it is dropped.
