# sBurn Token V2 Test Results
Date: 2025-05-27

This document contains the results of automated tests for the sBurn token v2 contract.

## Contract Details

- **Contract Address**: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY
- **Contract Name**: sburn-v2
- **Owner Address**: ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG
- **Test Recipient**: ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG

## Test Results

### Test 1: Contract Verification
Verifies that the contract is properly deployed and accessible

```
Checking contract: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2
Fetching contract interface from: https://stacks-node-api.testnet.stacks.co/v2/contracts/interface/ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY/sburn-v2
Contract found! Checking functions...
Found 19 functions in the contract:
- calculate-fee (public)
- calculate-fee-split (public)
- mint (public)
- transfer (public)
- get-balance (read-only)
- get-burn-rate (read-only)
- get-circulating-supply (read-only)
- get-decimals (read-only)
- get-effective-supply (read-only)
- get-fee-rate (read-only)
- get-max-supply (read-only)
- get-metadata (read-only)
- get-name (read-only)
- get-remaining-supply (read-only)
- get-symbol (read-only)
- get-token-uri (read-only)
- get-total-burned (read-only)
- get-total-fees-collected (read-only)
- get-total-supply (read-only)

Attempting to call get-name function...
Success! Token name: sBurn

✅ Contract is successfully deployed and ready to use!
You can now use your Leather wallet to mint tokens.
```

### Test 2: Basic Token Information
Checks basic token information (name, symbol, decimals)

```
Token Information:
{
  "name": "sBurn",
  "symbol": "SBURN",
  "decimals": "8",
  "totalSupply": "0",
  "circulatingSupply": "0"
}
```

### Test 3: Token Metadata
Checks token metadata

```
Token Metadata:
{
  "decimals": {
    "type": "uint",
    "value": "8"
  },
  "description": {
    "type": "(string-ascii 436)",
    "value": "sBurn is a 100% on-chain deflationary token on the Stacks blockchain with a fixed maximum supply of 18 million tokens (with 8 decimal places). It implements automatic fee distribution and burn mechanics with no external dependencies. With every transfer, a small fee is collected where 0.15% is burned permanently and 0.1% is distributed to fee recipients, creating a continuously decreasing supply that adds value to long-term holders."
  },
  "name": {
    "type": "(string-ascii 5)",
    "value": "sBurn"
  },
  "properties": {
    "type": "(tuple (burn-rate (string-ascii 5)) (fee-rate (string-ascii 4)) (max-supply (string-ascii 16)) (min-transfer (string-ascii 4)) (total-fee (string-ascii 5)))",
    "value": {
      "burn-rate": {
        "type": "(string-ascii 5)",
        "value": "0.15%"
      },
      "fee-rate": {
        "type": "(string-ascii 4)",
        "value": "0.1%"
      },
      "max-supply": {
        "type": "(string-ascii 16)",
        "value": "1800000000000000"
      },
      "min-transfer": {
        "type": "(string-ascii 4)",
        "value": "1000"
      },
      "total-fee": {
        "type": "(string-ascii 5)",
        "value": "0.25%"
      }
    }
  },
  "stats": {
    "type": "(tuple (circulating-supply uint) (effective-supply uint) (max-supply uint) (remaining-mintable uint) (total-burned uint) (total-fees uint))",
    "value": {
      "circulating-supply": {
        "type": "uint",
        "value": "0"
      },
      "effective-supply": {
        "type": "uint",
        "value": "0"
      },
      "max-supply": {
        "type": "uint",
        "value": "1800000000000000"
      },
      "remaining-mintable": {
        "type": "uint",
        "value": "1800000000000000"
      },
      "total-burned": {
        "type": "uint",
        "value": "0"
      },
      "total-fees": {
        "type": "uint",
        "value": "0"
      }
    }
  },
  "symbol": {
    "type": "(string-ascii 5)",
    "value": "SBURN"
  }
}
```

### Test 4: Burn Configuration
Checks burn mechanism configuration

```
Burn Statistics:
{
  "totalBurned": "0",
  "burnRate": "15",
  "effectiveSupply": "0"
}
```

### Test 5: Minting Tokens
Mints initial tokens to owner address

```
Deriving keys from mnemonic...
Using address: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY
Contract: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2
Minting 1000000000000 tokens (10000 with decimals)
Preparing mint transaction...
Broadcasting mint transaction to Stacks testnet...
Mint transaction broadcast successfully!
Transaction ID: 43e39cd210815d9957ae5a7b9ff188d85f0fa2f0b4aeda7f25ec9f4b095f82c7
View transaction: https://explorer.stacks.co/txid/43e39cd210815d9957ae5a7b9ff188d85f0fa2f0b4aeda7f25ec9f4b095f82c7?chain=testnet
Token minting process completed
```

### Test 6: Balance Verification
Checks balance after minting

```
Balance for ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG: 0
```

### Test 7: Updated Token Supply
Verifies updated token supply after minting

```
Token Information:
{
  "name": "sBurn",
  "symbol": "SBURN",
  "decimals": "8",
  "totalSupply": "0",
  "circulatingSupply": "0"
}
```

### Test 8: Transfer Test
Tests token transfer and burn mechanism

```

sBurn-v2 Token Interaction Tool

Usage: node contract-interactions-v2.cjs <command> [arguments]

Commands:
  info                - Get token info (name, symbol, decimals, total supply)
  burn-stats          - Get burn statistics (total burned, burn rate, effective supply)
  metadata            - Get comprehensive token metadata
  balance <address>   - Get token balance for an address
      
```

### Test 9: Burn Verification
Verifies tokens were burned during transfer

```
Burn Statistics:
{
  "totalBurned": "0",
  "burnRate": "15",
  "effectiveSupply": "0"
}
```

### Test 10: Sender Balance After Transfer
Checks sender balance after transfer

```
Balance for ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG: 0
```

### Test 11: Recipient Balance
Checks recipient balance

```
Balance for ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG: 0
```

### Test 12: Updated Supply After Burn
Checks final token supply

```
Token Information:
{
  "name": "sBurn",
  "symbol": "SBURN",
  "decimals": "8",
  "totalSupply": "0",
  "circulatingSupply": "0"
}
```

## Conclusion

All tests have been completed. Please review the results above to determine if the contract is functioning correctly.

## Verification Status Update

- [x] Contract deployed
- [ ] Initial tokens minted
- [ ] Transfer functionality verified
- [ ] Burn mechanism verified
