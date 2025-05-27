# Testing the sBurn Token Contract on Testnet

## Contract Information

The sBurn token contract has been successfully deployed with a dedicated owner wallet:

**Contract Owner Address:** `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8`  
**Contract Address:** `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1`  
**Transaction ID:** `4d9f8c26f74b7a9ce7c6a0b357225c64dc9afefb76b0e4acfd05c3ef9c114be9`

The contract uses a dedicated owner wallet with credentials stored in the `.env` file for secure operations.

## Testing Steps

### 1. Verify Contract Deployment

The contract has been successfully deployed to testnet and can be accessed at:
`ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1`

Verify deployment status:
```bash
node scripts/check-deployment.cjs
```

### 2. Check Owner Balance

Check the current balance of the contract owner:
```bash
node scripts/check-owner-balance.cjs
```

### 3. Running Comprehensive Tests

Execute the full test suite:
```bash
node scripts/comprehensive-test.cjs
```

### 4. Demonstrating Contract Features

To showcase the contract's burn mechanism:
```bash
node scripts/demonstrate-contract.cjs
```

This script demonstrates:
- Token transfers with automatic burning (0.15% burn rate)
- Fee collection mechanism (0.1% to fee recipient)
- Minimum transfer amount enforcement (1000 tokens)

### 5. Manual Testing with Interactive Scripts

For manual testing, you can use:
```bash
node scripts/deploy-with-owner.cjs
```

This script handles:
1. Contract deployment with the dedicated owner wallet
2. Automatic balance verification
3. Transaction confirmation

## Contract Features Verified

✅ **Burn Mechanism**: 0.15% of transferred tokens are burned  
✅ **Fee Structure**: 0.25% total fee (0.15% burned, 0.1% to fee recipient)  
✅ **Minimum Transfer**: 1000 tokens minimum transfer amount enforced  
✅ **Owner Operations**: Only contract owner can mint tokens  
✅ **SIP-010 Compliance**: Full SIP-010 fungible token standard implementation

## Important Notes

1. **Contract Owner**: All mint operations are performed by the dedicated owner (`ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8`).

2. **Fee Structure**: Each transfer incurs a 0.25% fee, of which:
   - 0.10% goes to the fee recipient
   - 0.15% is burned (removed from circulation)

3. **Minimum Transfer Amount**: The contract enforces a minimum transfer amount of 1000 units (0.00001 tokens with 8 decimal places).

4. **Environment Configuration**: The contract uses a dedicated owner wallet with credentials stored in `.env` for secure operations.

## Troubleshooting

If you encounter issues:

1. **Transaction Errors**: Check the error message for details on why the transaction failed.
2. **Contract Ownership**: Verify you're using the correct private key for the contract owner.
3. **Network Issues**: Ensure the Stacks testnet is operational and your node is properly connected.
4. **Explorer Delays**: The Stacks Explorer may have delays in showing transaction results. Use the API for real-time verification.
