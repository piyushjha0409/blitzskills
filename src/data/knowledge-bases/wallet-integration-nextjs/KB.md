---
name: Wallet Integration with Next.js
description: Connect wallets to your Next.js app on Monad — providers setup, chain configuration, and transaction handling.
category: Wallet & Frontend
topic: wallets
author: Piyush Jha
version: "1.0.0"
tags:
  - Next.js
  - Wallet
  - Wagmi
  - Viem
---

## Overview

This guide shows how to add wallet connection to a Next.js app targeting Monad, using Wagmi v2 and Viem.

## 1. Install Dependencies

```bash
npm install wagmi viem @tanstack/react-query
```

## 2. Define Monad Chain

```typescript
// lib/chains.ts
import { defineChain } from 'viem'

export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: {
    name: 'MON',
    symbol: 'MON',
    decimals: 18,
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.monad.xyz'] },
  },
  blockExplorers: {
    default: {
      name: 'Monad Explorer',
      url: 'https://explorer.testnet.monad.xyz',
    },
  },
})
```

## 3. Create Wagmi Config

```typescript
// lib/wagmi.ts
import { createConfig, http } from 'wagmi'
import { monadTestnet } from './chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [monadTestnet],
  connectors: [injected()],
  transports: {
    [monadTestnet.id]: http(),
  },
})
```

## 4. Set Up Providers

```typescript
// app/providers.tsx
'use client'

import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
```

## 5. Connect Wallet Button

```typescript
'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    )
  }

  return (
    <button onClick={() => connect({ connector: connectors[0] })}>
      Connect Wallet
    </button>
  )
}
```

## 6. Read Contract Data

```typescript
import { useReadContract } from 'wagmi'

function TokenBalance() {
  const { data: balance } = useReadContract({
    address: '0x...',
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: ['0x...'],
  })

  return <p>Balance: {balance?.toString()}</p>
}
```

## 7. Send Transactions

```typescript
import { useWriteContract } from 'wagmi'

function MintButton() {
  const { writeContract } = useWriteContract()

  return (
    <button onClick={() =>
      writeContract({
        address: '0x...',
        abi: contractAbi,
        functionName: 'mint',
        args: [100n],
      })
    }>
      Mint
    </button>
  )
}
```
