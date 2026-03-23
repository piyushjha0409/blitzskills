---
name: Deploy Web3 Apps on Vercel
description: Deploy your Monad frontend on Vercel — environment variables, RPC configuration, and production best practices.
category: Deployment & Infra
topic: deployment
author: Piyush Jha
version: "1.0.0"
tags:
  - Vercel
  - Deployment
  - Next.js
  - Production
---

## Overview

Vercel is the best platform for deploying Next.js Web3 frontends. This guide covers the setup for Monad dApps.

## 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/you/your-project.git
git push -u origin main
```

## 2. Import to Vercel

1. Go to vercel.com/new
2. Import your GitHub repository
3. Vercel auto-detects Next.js — no build configuration needed
4. Click "Deploy"

## 3. Environment Variables

Add these in Vercel Project Settings > Environment Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_WC_PROJECT_ID` | `your_id` | WalletConnect project ID |
| `NEXT_PUBLIC_MONAD_RPC_URL` | `https://rpc.testnet.monad.xyz` | Monad RPC endpoint |
| `PRIVATE_KEY` | `0x...` | Server-side only — never expose to client |

**Important**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Never put private keys in public variables.

## 4. RPC Configuration for Production

Don't hardcode RPC URLs. Use environment variables:

```typescript
// lib/chains.ts
export const monadTestnet = defineChain({
  id: 10143,
  name: 'Monad Testnet',
  nativeCurrency: { name: 'MON', symbol: 'MON', decimals: 18 },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_MONAD_RPC_URL || 'https://rpc.testnet.monad.xyz'],
    },
  },
})
```

## 5. API Routes for Server-Side Operations

Use Next.js API routes for operations that need private keys:

```typescript
// app/api/mint/route.ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { monadTestnet } from '@/lib/chains'

export async function POST(req: Request) {
  const { to, amount } = await req.json()

  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
  const client = createWalletClient({
    account,
    chain: monadTestnet,
    transport: http(),
  })

  const hash = await client.writeContract({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: 'mint',
    args: [to, amount],
  })

  return Response.json({ hash })
}
```

## 6. Production Checklist

- Use environment variables for all configuration
- Never expose private keys to the client
- Set up a custom domain
- Enable Vercel Analytics for monitoring
- Use edge functions for low-latency API routes
- Configure CORS if your API is accessed from other domains
