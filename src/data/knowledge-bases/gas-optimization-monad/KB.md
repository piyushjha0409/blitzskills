---
name: Gas Optimization on Monad
description: Monad-specific gas optimization patterns — leveraging parallel execution, storage efficiency, and high throughput.
category: Smart Contracts
topic: optimization
author: Piyush Jha
version: "1.0.0"
tags:
  - Gas
  - Optimization
  - Solidity
  - Performance
---

## Gas on Monad

While Monad's higher throughput means less competition for block space (lower gas prices), writing efficient contracts is still important. These patterns help you build faster, cheaper contracts.

## Storage Optimization

### Pack your storage variables

```solidity
// Bad — uses 3 storage slots
contract Unoptimized {
    uint256 a;    // slot 0
    bool b;       // slot 1 (wastes 31 bytes)
    uint256 c;    // slot 2
}

// Good — packs into 2 slots
contract Optimized {
    uint256 a;    // slot 0
    uint256 c;    // slot 1
    bool b;       // slot 1 (packed with c if c < uint248)
}
```

### Use mappings over arrays for lookups

```solidity
// Expensive — O(n) search
address[] public users;

// Cheap — O(1) lookup
mapping(address => bool) public isUser;
```

## Calldata vs Memory

Use `calldata` for read-only function parameters:

```solidity
// More expensive
function process(uint256[] memory data) external { }

// Cheaper — no copy to memory
function process(uint256[] calldata data) external { }
```

## Batch Operations

Monad's parallel execution makes batch operations particularly effective:

```solidity
function batchTransfer(
    address[] calldata recipients,
    uint256[] calldata amounts
) external {
    for (uint i = 0; i < recipients.length; i++) {
        token.transfer(recipients[i], amounts[i]);
    }
}
```

On Monad, independent transfers within the batch may execute in parallel, giving you better throughput than sequential chains.

## Events Over Storage

Use events for data that doesn't need on-chain access:

```solidity
// Expensive — writes to storage
mapping(uint => string) public logs;

// Cheap — emits event (indexed off-chain)
event ActionLogged(uint indexed id, string data);
```

## Monad-Specific Considerations

- **Lower gas costs** — Higher throughput means less gas price competition
- **Parallel-friendly patterns** — Independent operations can execute simultaneously
- **Fast finality** — Don't over-optimize for gas at the expense of code clarity
- **Same EVM opcodes** — All Ethereum gas optimization patterns apply
