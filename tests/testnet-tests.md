# sBurn Token V2 Tests

> Tests for the sBurn token v2 contract deployed on Stacks testnet at ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY.sburn-v2

## Testing Using Node.js Scripts

This document outlines a script-based testing approach for the sBurn token v2 contract. The scripts provide a reliable, reproducible way to verify all contract functionality.

## Test Execution Plan

Execute tests in the order shown below to ensure proper state progression:

## 1. Contract Verification

First, verify the contract is properly deployed and accessible:

```powershell
node scripts/verify-contract.cjs
```

**Expected Result**: 
- All 19 contract functions should be available
- The `get-name` function should return "sBurn"

## 2. Basic Token Information

Check basic token information:

```powershell
node scripts/contract-interactions-v2.cjs info
```

**Expected Result**:
- Name: "sBurn"
- Symbol: "SBURN"
- Decimals: "8"
- Initial supplies should be 0

## 3. Token Metadata

Check token metadata:

```powershell
node scripts/contract-interactions-v2.cjs metadata
```

**Expected Result**:
- Should return valid token URI information

## 4. Burn Configuration

Check the burn mechanism configuration:

```powershell
node scripts/contract-interactions-v2.cjs burn-stats
```

**Expected Result**:
- Burn rate: "15" (0.15%)
- Total burned: "0" (initially)

## 5. Minting Tokens

Mint initial tokens:

```powershell
node scripts/mint-tokens-v2.cjs
```

**Expected Result**:
- Transaction should be successful
- Should show transaction ID for the mint operation

## 6. Balance Verification

Check balance after minting:

```powershell
node scripts/contract-interactions-v2.cjs balance ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG
```

**Expected Result**:
- Should show a non-zero balance matching the minted amount

## 7. Updated Token Supply

Verify updated token supply:

```powershell
node scripts/contract-interactions-v2.cjs info
```

**Expected Result**:
- Total supply and circulating supply should match the minted amount

## 8. Transfer Test

Test token transfer (which also tests the burn mechanism):

```powershell
node scripts/contract-interactions-v2.cjs transfer ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG 1000000000
```

**Expected Result**:
- Transaction should be successful
- Should show transaction ID for the transfer

## 9. Burn Verification

Verify tokens were burned during transfer:

```powershell
node scripts/contract-interactions-v2.cjs burn-stats
```

**Expected Result**:
- Total burned should be 0.15% of transferred amount (1,500,000 microunits)
- Burn rate should still show "15"

## 10. Sender Balance After Transfer

Check sender balance after transfer:

```powershell
node scripts/contract-interactions-v2.cjs balance ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG
```

**Expected Result**:
- Balance should be reduced by transferred amount plus burn fee

## 11. Recipient Balance

Check recipient balance:

```powershell
node scripts/contract-interactions-v2.cjs balance ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG
```

**Expected Result**:
- Balance should show transferred amount minus burn fee

## 12. Updated Supply After Burn

Check final token supply:

```powershell
node scripts/contract-interactions-v2.cjs info
```

**Expected Result**:
- Total supply should be less than initially minted amount due to burning

## Complete Test Script

For convenience, here's a PowerShell script to run all tests in sequence:

```powershell
# Run all tests in sequence and document results
# 1. Verification
Write-Host "Test 1: Contract Verification" -ForegroundColor Green
node scripts/verify-contract.cjs

# 2. Basic Info
Write-Host "`nTest 2: Basic Token Information" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs info

# 3. Metadata
Write-Host "`nTest 3: Token Metadata" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs metadata

# 4. Burn Config
Write-Host "`nTest 4: Burn Configuration" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs burn-stats

# 5. Mint Tokens
Write-Host "`nTest 5: Minting Tokens" -ForegroundColor Green
node scripts/mint-tokens-v2.cjs

# Wait for confirmation
Write-Host "`nWaiting 60 seconds for mint transaction to confirm..." -ForegroundColor Yellow
Start-Sleep -Seconds 60

# 6. Balance Check
Write-Host "`nTest 6: Balance Verification" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs balance ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG

# 7. Updated Supply
Write-Host "`nTest 7: Updated Token Supply" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs info

# 8. Transfer Test
Write-Host "`nTest 8: Transfer Test" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs transfer ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG 1000000000

# Wait for confirmation
Write-Host "`nWaiting 60 seconds for transfer transaction to confirm..." -ForegroundColor Yellow
Start-Sleep -Seconds 60

# 9. Burn Verification
Write-Host "`nTest 9: Burn Verification" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs burn-stats

# 10. Sender Balance After Transfer
Write-Host "`nTest 10: Sender Balance After Transfer" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs balance ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG

# 11. Recipient Balance
Write-Host "`nTest 11: Recipient Balance" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs balance ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG

# 12. Updated Supply After Burn
Write-Host "`nTest 12: Updated Supply After Burn" -ForegroundColor Green
node scripts/contract-interactions-v2.cjs info
```

## Test Results Documentation

After running the tests, document the results here:

### Test 1: Contract Verification
<!-- Results go here -->

### Test 2: Basic Token Information
<!-- Results go here -->

### Test 3: Token Metadata
<!-- Results go here -->

### Test 4: Burn Configuration
<!-- Results go here -->

### Test 5: Minting Tokens
<!-- Results go here -->

### Test 6: Balance Verification
<!-- Results go here -->

### Test 7: Updated Token Supply
<!-- Results go here -->

### Test 8: Transfer Test
<!-- Results go here -->

### Test 9: Burn Verification
<!-- Results go here -->

### Test 10: Sender Balance After Transfer
<!-- Results go here -->

### Test 11: Recipient Balance
<!-- Results go here -->

### Test 12: Updated Supply After Burn
<!-- Results go here -->

## Verification Status

- [x] Contract deployed
- [ ] Initial tokens minted
- [ ] Transfer functionality verified
- [ ] Burn mechanism verified

Update these checkboxes after completing the tests.

## Contract Details

- **Contract Address**: ST1HJBP42BAG96ZN0VF6N4ZET178PN3DHJKWRJKKY
- **Contract Name**: sburn-v2
- **Owner Address**: ST1D5T4V67KDJ96GA1BR5728AJ2HDBWZH63Y0WTXG
- **Explorer URL**: https://explorer.stacks.co/txid/9262ef31030d30225323017bb166506386eadcc6dbde33177abe9613615abf4b?chain=testnet


