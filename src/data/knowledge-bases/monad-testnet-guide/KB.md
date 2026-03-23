---
name: Monad Testnet Setup Guide
description: Complete guide to setting up Monad Testnet — RPC endpoints, chain ID, faucet, block explorer, and wallet configuration.
category: Monad Basics
topic: testnet
author: Piyush Jha
version: "1.0.0"
tags:
  - Testnet
  - RPC
  - Faucet
  - MetaMask
---

## Network Information

| Parameter | Value |
|-----------|-------|
| **Network Name** | Monad Testnet |
| **Chain ID** | 10143 |
| **RPC URL** | https://rpc.testnet.monad.xyz |
| **Currency Symbol** | MON |
| **Block Explorer** | https://explorer.testnet.monad.xyz |

## Add Monad Testnet to MetaMask

1. Open MetaMask and click "Add Network"
2. Click "Add a network manually"
3. Enter the following:
   - Network Name: `Monad Testnet`
   - RPC URL: `https://rpc.testnet.monad.xyz`
   - Chain ID: `10143`
   - Currency Symbol: `MON`
   - Block Explorer: `https://explorer.testnet.monad.xyz`
4. Click "Save"

## Get Testnet Tokens

Visit the Monad Faucet to claim free testnet MON tokens:

- You can claim tokens once every 12 hours
- Tokens are for testing only and have no monetary value
- Make sure your wallet is connected to Monad Testnet before claiming

## Programmatic Chain Configuration

### For Viem/Wagmi:
```typescript
import { defineChain } from 'viem'

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.monad.xyz'] },
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://explorer.testnet.monad.xyz' },
  },
})
```

### For Hardhat (hardhat.config.ts):
```typescript
networks: {
  monadTestnet: {
    url: 'https://rpc.testnet.monad.xyz',
    chainId: 10143,
    accounts: [process.env.PRIVATE_KEY!],
  },
}
```

### For Foundry (foundry.toml):
```toml
[rpc_endpoints]
monad_testnet = "https://rpc.testnet.monad.xyz"
```

## Verifying Contracts

Use the Monad block explorer for contract verification. Both Hardhat and Foundry verification plugins are supported.
