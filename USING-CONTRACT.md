# Using Your sBurn Token Contract with Leather Wallet

This guide will walk you through interacting with your sBurn token contract using the Stacks Explorer.

## Contract Information

- **Contract Address**: `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1`
- **Contract Owner**: `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8` (Dedicated owner wallet)
- **Transaction ID**: `4d9f8c26f74b7a9ce7c6a0b357225c64dc9afefb76b0e4acfd05c3ef9c114be9`
- **Explorer URL**: https://explorer.stacks.co/address/ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8?chain=testnet

## Step 1: Access the Contract on Stacks Explorer

1. Go to the Stacks Explorer: https://explorer.stacks.co/
2. Make sure you're on the "Testnet" network (toggle in top-right corner)
3. Search for your contract: `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1`
4. You should see all the contract details and functions

## Step 2: Connect Your Wallet

1. Click "Connect Wallet" in the top-right corner of the Explorer
2. Select your preferred wallet (Leather, Hiro Wallet, etc.)
3. Your wallet will prompt you to connect
4. Note: The contract owner operations require the dedicated owner wallet credentials

## Step 3: Check Token Information

1. On the contract page, go to the "Read" tab
2. Use these functions to explore the contract:
   - `get-name`: Returns "sBurn Token"
   - `get-symbol`: Returns "SBURN"
   - `get-decimals`: Returns 8
   - `get-total-supply`: Shows total tokens in circulation
   - `get-total-burned`: Shows total tokens burned
   - `get-burn-rate`: Shows current burn rate (0.15%)

## Step 4: Check Token Balances

1. Use the `get-balance` function
2. Enter any address to check their token balance
3. Owner balance: `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8`
4. Check burn statistics with `get-circulating-supply`

## Step 5: Understanding the Burn Mechanism

The sBurn token implements an automatic burn mechanism:
- **Transfer Fee**: 0.25% total fee on all transfers
- **Burn Rate**: 0.15% of transfer amount is burned
- **Fee Collection**: 0.10% goes to fee recipient
- **Minimum Transfer**: 1000 tokens (0.00001 SBURN) minimum

## Step 6: Test Transfer (If You Have Tokens)

1. Go to the "Write" tab
2. Find the `transfer` function
3. Enter the following parameters:
   - `amount`: Amount in micro-units (e.g., `100000000` for 1 token)
   - `sender`: Your connected wallet address
   - `recipient`: Another testnet address
   - `memo`: Optional memo (can use `0x` for empty)
4. Note: Only works if you have tokens from the owner

## Troubleshooting

If you encounter any issues:

1. **Explorer Not Showing Contract Functions**: 
   - This is likely a caching issue with the Explorer
   - Try using a direct link to the contract, or wait and refresh
   - You can also use the `check-deployment.cjs` script to verify contract status

2. **Transaction Fails**: 
   - Make sure you have enough testnet STX for fees
   - Check that you're using the correct parameter formats
   - Ensure the minimum transfer amount (1000 tokens) is met

3. **Unable to Mint Tokens**:
   - Only the contract owner (`ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8`) can mint tokens
   - Minting operations require the dedicated owner wallet credentials

## Contract Testing Scripts

For programmatic interaction with the contract:

```bash
# Check deployment status
node scripts/check-deployment.cjs

# Check owner balance
node scripts/check-owner-balance.cjs

# Run comprehensive tests
node scripts/comprehensive-test.cjs

# Demonstrate burn mechanism
node scripts/demonstrate-contract.cjs
```

## Getting Testnet STX

If you need testnet STX for transactions:
1. Go to: https://explorer.stacks.co/sandbox/faucet?chain=testnet
2. Enter your Leather wallet address
3. Click "Request STX" to receive 500 testnet STX

## Understanding Token Units

Your sBurn token uses 8 decimal places, so:
- 100000000 = 1 sBurn token
- 1000000000 = 10 sBurn tokens
- 1000000000000 = 10,000 sBurn tokens
