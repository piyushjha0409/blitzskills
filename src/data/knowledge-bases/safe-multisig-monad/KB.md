---
name: Safe Multisig on Monad
description: Set up Safe multisig wallets on Monad for team treasury management and secure contract operations.
category: Deployment & Infra
topic: multisig
author: Piyush Jha
version: "1.0.0"
tags:
  - Safe
  - Multisig
  - Security
  - Treasury
---

## Why Multisig?

For hackathon teams and production projects, a multisig wallet ensures:

- **No single point of failure** — multiple team members must approve transactions
- **Treasury security** — funds require N-of-M signatures to move
- **Governance** — contract upgrades and admin operations need consensus

## What is Safe?

Safe (formerly Gnosis Safe) is the most widely used multisig wallet in the EVM ecosystem. It works on Monad because Monad is fully EVM-compatible.

## Setting Up Safe on Monad

### 1. Deploy Safe Contracts

Since Monad is EVM-compatible, you can deploy the Safe contracts using the official Safe deployment scripts or use the Safe SDK:

```bash
npm install @safe-global/protocol-kit @safe-global/api-kit
```

### 2. Create a Safe Wallet

```typescript
import Safe from '@safe-global/protocol-kit'

const protocolKit = await Safe.init({
  provider: 'https://rpc.testnet.monad.xyz',
  signer: OWNER_PRIVATE_KEY,
  predictedSafe: {
    safeAccountConfig: {
      owners: [
        '0xOwner1...',
        '0xOwner2...',
        '0xOwner3...',
      ],
      threshold: 2, // 2-of-3 multisig
    },
  },
})

const safeAddress = await protocolKit.getAddress()
console.log('Safe address:', safeAddress)
```

### 3. Propose a Transaction

```typescript
import { MetaTransactionData } from '@safe-global/types-kit'

const transaction: MetaTransactionData = {
  to: '0xRecipient...',
  value: '1000000000000000000', // 1 MON
  data: '0x',
}

const safeTransaction = await protocolKit.createTransaction({
  transactions: [transaction],
})
```

### 4. Sign and Execute

```typescript
// Owner 1 signs
const signedTx = await protocolKit.signTransaction(safeTransaction)

// Owner 2 signs (on their device)
const signedTx2 = await protocolKit2.signTransaction(signedTx)

// Execute when threshold is met
const result = await protocolKit.executeTransaction(signedTx2)
```

## Best Practices for Hackathon Teams

- **2-of-3 for small teams** — any 2 members can approve
- **3-of-5 for larger teams** — majority consensus required
- **Use for**: treasury management, contract upgrades, admin functions
- **Store the Safe address** in your project's `.env` as the admin/owner
- **Test on testnet first** — deploy and test the multisig flow before mainnet
