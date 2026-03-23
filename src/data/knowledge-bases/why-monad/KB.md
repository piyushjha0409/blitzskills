---
name: Why Build on Monad
description: Understanding Monad's 10,000 TPS, 400ms blocks, EVM compatibility, and why it's the right chain for your hackathon project.
category: Monad Basics
topic: blockchain
author: Piyush Jha
version: "1.0.0"
tags:
  - Monad
  - EVM
  - Performance
  - Layer 1
---

## What is Monad?

Monad is a high-performance Ethereum-compatible Layer 1 blockchain built for speed without sacrificing decentralization. It delivers **10,000 transactions per second**, **400ms block times**, and **800ms finality** — all while maintaining full EVM bytecode compatibility.

## Why Monad for Your Hackathon Project?

### Performance That Changes What's Possible

With 10,000 TPS and sub-second finality, Monad enables applications that simply can't exist on slower chains:

- **Real-time DeFi** — Order books, prediction markets, and trading platforms that respond instantly
- **On-chain gaming** — Multiplayer games with on-chain state that updates in real-time
- **High-frequency operations** — Micro-transactions, streaming payments, and rapid settlement

### Full EVM Compatibility

Monad is **bytecode-compatible** with the EVM. This means:

- Deploy your existing Solidity contracts without any code changes
- Use the same tools you already know — Foundry, Hardhat, Remix
- Import OpenZeppelin libraries, use Ethers.js/Viem, connect with MetaMask
- Every Ethereum tutorial and resource applies directly to Monad

### Developer Experience

- **No new SDK required** — Standard Ethereum tools work out of the box
- **Same addresses, same ABI** — Your contract addresses and interfaces are identical
- **Familiar RPC** — Standard JSON-RPC endpoints, compatible with every Web3 library

## Key Metrics

| Metric | Monad | Ethereum |
|--------|-------|----------|
| TPS | 10,000 | ~15 |
| Block Time | 400ms | 12s |
| Finality | 800ms | ~15min |
| EVM Compatible | Yes (bytecode level) | Native |
| Gas Token | MON | ETH |

## Getting Started

1. **Set up your wallet** — Add Monad Testnet to MetaMask (Chain ID: 10143)
2. **Get test tokens** — Use the Monad Faucet to get testnet MON
3. **Deploy contracts** — Use Foundry or Hardhat with Monad RPC endpoint
4. **Build your frontend** — Connect with RainbowKit/Wagmi, same as Ethereum

## Resources

- Monad Developer Documentation: docs.monad.xyz
- Monad Testnet RPC: https://rpc.testnet.monad.xyz
- Chain ID: 10143
- Block Explorer: https://explorer.testnet.monad.xyz
