---
name: Deploy an ERC-20 Token on Monad
description: Step-by-step guide to creating and deploying an ERC-20 token on Monad using OpenZeppelin and Foundry.
category: Smart Contracts
topic: tokens
author: Piyush Jha
version: "1.0.0"
tags:
  - ERC-20
  - Token
  - OpenZeppelin
  - Foundry
---

## Overview

This guide walks you through creating a standard ERC-20 token on Monad using OpenZeppelin contracts and deploying with Foundry.

## 1. Set Up Your Project

```bash
forge init --template monad-developers/foundry-monad my-token
cd my-token
forge install OpenZeppelin/openzeppelin-contracts
```

## 2. Write the Token Contract

```solidity
// src/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, initialSupply * 10 ** decimals());
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
```

## 3. Write Tests

```solidity
// test/MyToken.t.sol
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/MyToken.sol";

contract MyTokenTest is Test {
    MyToken public token;
    address public owner = address(this);

    function setUp() public {
        token = new MyToken("My Token", "MTK", 1000000);
    }

    function testInitialSupply() public view {
        assertEq(token.totalSupply(), 1000000 * 10 ** 18);
    }

    function testMint() public {
        token.mint(address(0x1), 100 * 10 ** 18);
        assertEq(token.balanceOf(address(0x1)), 100 * 10 ** 18);
    }
}
```

Run tests:

```bash
forge test
```

## 4. Deploy to Monad Testnet

```bash
forge create src/MyToken.sol:MyToken \
  --constructor-args "My Token" "MTK" 1000000 \
  --rpc-url https://rpc.testnet.monad.xyz \
  --private-key $PRIVATE_KEY \
  --broadcast
```

## 5. Verify on Explorer

```bash
forge verify-contract <CONTRACT_ADDRESS> src/MyToken.sol:MyToken \
  --constructor-args $(cast abi-encode "constructor(string,string,uint256)" "My Token" "MTK" 1000000) \
  --chain-id 10143
```

## Extensions

Add more features with OpenZeppelin:

- **Burnable**: `ERC20Burnable` — let holders burn their tokens
- **Pausable**: `ERC20Pausable` — pause all transfers in emergencies
- **Permit**: `ERC20Permit` — gasless approvals via signatures
- **Votes**: `ERC20Votes` — governance voting power
