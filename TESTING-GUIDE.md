# Testing the sBurn Token Contract on Testnet

## Contract Owner Issue Resolution

The sBurn token contract was deployed with the contract owner address hardcoded as:
`ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`

However, the mnemonic in the `.env` file generates a different address:
`ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY`

To properly test the contract, we need to use the private key associated with the hardcoded owner address.

## Testing Steps

### 1. Verify Contract Deployment

The contract has been successfully deployed to testnet with transaction ID:
`9262ef31030d30225323017bb166506386eadcc6dbde33177abe9613615abf4b`

The contract can be accessed at:
`ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2`

### 2. Minting Tokens

To mint tokens, use the `mint-tokens-owner.cjs` script which prompts for the private key of the contract owner:

```bash
node scripts/mint-tokens-owner.cjs
```

You will need to enter the private key for the contract owner address `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`.

### 3. Transferring Tokens

After minting, you can test transfers with the burn mechanism using the `owner-transfer.cjs` script:

```bash
node scripts/owner-transfer.cjs
```

This script will:
1. Prompt for the private key of the contract owner
2. Ask for the recipient address
3. Ask for the amount to transfer
4. Execute the transfer transaction

### 4. Verifying Results

After each transaction, verify:

1. **Token Balances**: Check the balance of the owner and recipient addresses
2. **Burn Mechanism**: Confirm that 0.15% of tokens were burned during transfer
3. **Transaction Status**: Check the transaction ID in the Stacks Explorer

### 5. Running Automated Tests

To run the comprehensive test suite:

```bash
node scripts/run-tests.cjs
```

This will execute all tests defined in `tests/testnet-tests.md` and generate a report in `tests/testnet-results.md`.

## Important Notes

1. **Contract Owner**: All mint operations must be performed by the contract owner (`ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`).

2. **Fee Structure**: Each transfer incurs a 0.25% fee, of which:
   - 0.10% goes to the fee recipient
   - 0.15% is burned (removed from circulation)

3. **Minimum Transfer Amount**: The contract enforces a minimum transfer amount of 1000 units (0.00001 tokens with 8 decimal places).

4. **Address Derivation**: The mnemonic in the `.env` file generates the address `ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY`, but the contract owner is hardcoded as `ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG`.

## Troubleshooting

If you encounter issues:

1. **Transaction Errors**: Check the error message for details on why the transaction failed.
2. **Contract Ownership**: Verify you're using the correct private key for the contract owner.
3. **Network Issues**: Ensure the Stacks testnet is operational and your node is properly connected.
4. **Explorer Delays**: The Stacks Explorer may have delays in showing transaction results. Use the API for real-time verification.
