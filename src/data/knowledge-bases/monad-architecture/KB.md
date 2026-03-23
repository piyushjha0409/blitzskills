---
name: Monad Architecture Deep Dive
description: How Monad achieves 10K TPS — MonadBFT consensus, parallel execution, asynchronous execution, and MonadDb.
category: Monad Basics
topic: architecture
author: Piyush Jha
version: "1.0.0"
tags:
  - MonadBFT
  - Parallel Execution
  - Architecture
  - Consensus
---

## How Monad Achieves 10,000 TPS

Monad's performance comes from four key architectural innovations that work together.

## 1. MonadBFT Consensus

MonadBFT is a custom Byzantine Fault Tolerance consensus mechanism derived from HotStuff. Key improvements:

- **Two-phase confirmation** instead of HotStuff's three phases, reducing finalization latency
- **Pipelined block production** — validators can propose new blocks while previous ones are being finalized
- **Leader rotation** for fair block production distribution

## 2. Asynchronous Execution

Traditional EVM chains execute transactions during consensus. Monad separates these:

- **Consensus** happens first — validators agree on transaction ordering
- **Execution** happens after — transactions are processed in parallel against the agreed order
- This means complex transactions don't slow down block production

The result: blocks are produced every 400ms regardless of execution complexity.

## 3. Optimistic Parallel Execution

Instead of processing transactions one-by-one (like Ethereum), Monad executes them simultaneously:

- **Optimistic assumption** — transactions are executed in parallel assuming no conflicts
- **Conflict detection** — during merge phase, the validator checks if parallel transactions modified the same state
- **Re-execution** — conflicting transactions are re-executed in linear order
- Most transactions don't conflict, so parallel execution provides massive speedup

## 4. MonadDb

Monad uses a custom database optimized for blockchain state access:

- **Reduced state access latency** — faster reads/writes for contract storage
- **SSD-optimized** — designed for modern storage hardware
- **Asynchronous I/O** — disk operations don't block execution

## What This Means for Developers

As a developer, you don't need to think about these internals. Your Solidity code works exactly the same. But you benefit from:

- **Faster confirmations** — your users see results in under a second
- **Lower gas costs** — higher throughput means less competition for block space
- **New design patterns** — real-time on-chain applications become viable
- **Same tools** — Foundry, Hardhat, Ethers.js all work unchanged
