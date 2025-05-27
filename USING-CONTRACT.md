# Using Your sBurn Token Contract with Leather Wallet

This guide will walk you through interacting with your sBurn token contract using the Stacks Explorer and your Leather wallet.

## Contract Information

- **Contract Address**: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2
- **Contract Owner**: ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG (Your Leather wallet address)
- **Explorer URL**: https://explorer.stacks.co/txid/9262ef31030d30225323017bb166506386eadcc6dbde33177abe9613615abf4b?chain=testnet

## Step 1: Access the Contract on Stacks Explorer

1. Go to the Stacks Explorer: https://explorer.stacks.co/
2. Make sure you're on the "Testnet" network (toggle in top-right corner)
3. Search for your contract: `ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2`
4. You should see all the contract details and functions

## Step 2: Connect Your Leather Wallet

1. Click "Connect Wallet" in the top-right corner of the Explorer
2. Select "Leather" from the wallet options
3. Your Leather wallet will prompt you to connect
4. Ensure you're connected with your address: `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`

## Step 3: Mint Initial Tokens

1. On the contract page, go to the "Write" tab
2. Find the `mint` function
3. Enter the amount to mint in micro-units (e.g., `1000000000000` for 10,000 tokens with 8 decimal places)
4. Click "Submit"
5. Confirm the transaction in your Leather wallet
6. Wait for the transaction to be confirmed (15-20 minutes on testnet)

## Step 4: Check Your Balance

1. Go to the "Read" tab
2. Find the `get-balance` function
3. Enter your Leather wallet address: `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`
4. Click "Call Function"
5. You should see your token balance displayed

## Step 5: Make a Transfer to Test Burning Mechanism

1. Go back to the "Write" tab
2. Find the `transfer` function
3. Enter the following parameters:
   - `amount`: The amount to transfer (e.g., `100000000` for 1 token)
   - `sender`: Your address `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`
   - `recipient`: Another testnet address you own or a test address
   - `memo`: Leave this blank or enter `0x` for an empty buffer
4. Click "Submit"
5. Confirm the transaction in your Leather wallet
6. After confirmation, check the burn statistics using `get-total-burned` function

## Troubleshooting

If you encounter any issues:

1. **Explorer Not Showing Contract Functions**: 
   - This is likely a caching issue with the Explorer
   - Try using a direct link to the contract, or wait and refresh
   - You can also use the `verify-contract.cjs` script to check if the contract is properly deployed

2. **Transaction Fails**: 
   - Make sure you have enough testnet STX for fees
   - Check that you're using the correct parameter formats
   - Ensure you're calling functions from the correct address

3. **Unable to Mint Tokens**:
   - Verify you're connected with your Leather wallet address: `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`
   - This is the only address that can mint tokens as it matches the CONTRACT_OWNER in the contract

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
