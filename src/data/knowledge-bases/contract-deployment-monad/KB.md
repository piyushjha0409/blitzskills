---
name: Deploying Smart Contracts on Monad
description: Step-by-step guide to deploying Solidity contracts on Monad using Foundry and Hardhat.
category: Smart Contracts
topic: deployment
author: Piyush Jha
version: "1.0.0"
tags:
  - Foundry
  - Hardhat
  - Deployment
  - Solidity
---

## Overview

Monad is fully EVM-compatible. No Monad-specific SDK is required — standard Ethereum tools work out of the box.

## Deploy with Foundry

### 1. Create a new project

```bash
forge init --template monad-developers/foundry-monad my-project
cd my-project
```

This creates a project pre-configured for Monad with the correct RPC endpoints.

### 2. Write your contract

```solidity
// src/Counter.sol
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }
}
```

### 3. Deploy to Monad Testnet

```bash
forge create src/Counter.sol:Counter \
  --rpc-url https://rpc.testnet.monad.xyz \
  --private-key $PRIVATE_KEY \
  --broadcast
```

### 4. Verify the contract

```bash
forge verify-contract <CONTRACT_ADDRESS> src/Counter.sol:Counter \
  --chain-id 10143 \
  --verifier-url https://explorer.testnet.monad.xyz/api
```

## Deploy with Hardhat

### 1. Create a new project

```bash
npx hardhat init
```

### 2. Configure Monad network

Add to `hardhat.config.ts`:

```typescript
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    monadTestnet: {
      url: "https://rpc.testnet.monad.xyz",
      chainId: 10143,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
```

### 3. Write deployment script

```typescript
// ignition/modules/Counter.ts
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("Counter", (m) => {
  const counter = m.contract("Counter");
  return { counter };
});
```

### 4. Deploy

```bash
npx hardhat ignition deploy ignition/modules/Counter.ts --network monadTestnet
```

## Tips

- Always test on testnet before mainnet
- Store private keys in `.env` files (never commit them)
- Use OpenZeppelin contracts for battle-tested implementations
- Monad's faster block times mean your deployments confirm in under a second
