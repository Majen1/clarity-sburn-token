# sBurn2 Comprehensive Test Plan

This test plan provides basic coverage of the sBurn2 contract's public functions. Edge cases are covered in the automated test suite.

## 1. Basic Functionality Tests

### TC-01: Public Getter Functions Validation
**Description**: Call each getter function once  
**Steps**:
```clarity
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-name)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-symbol)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-decimals)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-token-uri)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-max-supply)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-supply)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-circulating-supply)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-fee-rate)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-burn-rate)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-burned)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-fees-collected)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-balance 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
```

**Expected Results**:
- get-name: (ok "sBurn Token") ✅
- get-symbol: (ok "SBRN") ✅
- get-decimals: (ok u6) ✅
- get-token-uri: (ok (some u"")) ✅
- get-max-supply: (ok u1000000000000) ✅
- get-total-supply: (ok u0) ✅
- get-circulating-supply: (ok u0) ✅
- get-fee-rate: (ok u10) ✅ 
- get-burn-rate: (ok u15) ✅ 
- get-total-burned: (ok u0) ✅
- get-total-fees-collected: (ok u0) ✅
- get-balance: (ok u0) ✅

### TC-02: Basic Action Functions
**Description**: Test mint and transfer functions with standard values
**Steps**:
```clarity
::set_tx_sender ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
;; Initial state check
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-supply)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-balance 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; Mint tokens
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 mint u10000000)

;; Post-mint state check
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-supply)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-balance 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)

;; Transfer tokens
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 transfer u5000000 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG none)

;; Post-transfer state check
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-balance 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-balance 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-burned)
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 get-total-fees-collected)
```

**Expected Results**:
- Initial total supply: (ok u0) ✅
- Initial deployer balance: (ok u0) ✅
- Mint result: (ok true) ✅
- Post-mint total supply: (ok u10000000) ✅
- Post-mint deployer balance: (ok u10000000) ✅
- Transfer result: (ok true) ✅
- Post-transfer deployer balance: (ok u5000000) ✅
- Post-transfer recipient balance: (ok u4987500) ✅
- Total burned: (ok u7500) ✅
- Total fees collected: (ok u5000) ✅

/* MATH EXPLANATION:
When transferring 5,000,000 tokens:
- Fee calculation: 5,000,000 * 0.1% = 5,000 tokens
- Burn calculation: 5,000,000 * 0.15% = 7,500 tokens
- Total deduction: 5,000 + 7,500 = 12,500 tokens
- Recipient receives: 5,000,000 - 12,500 = 4,987,500 tokens



### TC-03: Basic Error Handling
**Description**: Test common error conditions (requires restarting the console)
**Steps**:
```clarity
;; Test insufficient balance error
::set_tx_sender ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 transfer u1000000 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM none)

;; Test unauthorized mint error
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 mint u1000000)

;; Test self-transfer error
(contract-call? 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.sburn2 transfer u1000000 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG none)
```

**Expected Results**:
- Insufficient balance test: (err u104) ✅
- Unauthorized mint test: (err u109) ✅
- Self-transfer test: (err u106) ✅



## 2. Note on Comprehensive Testing

All edge cases and property-based testing are handled in the automated test suite (sburn.test.ts), including:
- Transfer with insufficient balance
- Transfers below minimum amount
- Transfers to burn address
- Sequential transfers and fee accumulation
- Permission control
- Mathematical invariants

## Error Codes Reference
- u101 : Transfer amount below minimum threshold
- u102 : Self-transfer not allowed (deprecated)
- u103 : Direct to burn address not allowed
- u104 : Insufficient balance for amount
- u105 : Zero-amount transfers or mints not allowed
- u106 : Self-transfer not allowed
- u107 : Mint amount exceeds maximum supply
- u109 : Only contract owner may mint