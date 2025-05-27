# sBurn Token - Stacks Ascent Demo Guide

## 🎯 **Quick Overview**
sBurn is a deflationary SIP-010 token with automatic burn mechanics on the Stacks blockchain.

**Contract Address (Testnet):** `ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1`

## 🔍 **Explore the Contract**

### **1. View Contract on Stacks Explorer**
https://explorer.hiro.so/txid/4d9f8c26f74b7a9ce7c6a0b357225c64dc9afefb76b0e4acfd05c3ef9c114be9?chain=testnet

### **2. Read Contract Functions (No wallet needed)**

#### **Get Token Info:**
```clarity
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-name)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-symbol)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-decimals)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-total-supply)
```

#### **Check Burn Statistics:**
```clarity
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-total-burned)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-burn-rate)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-circulating-supply)
```

#### **Get Complete Metadata:**
```clarity
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-metadata)
```

### **3. Interactive Testing with Clarinet Console**

```bash
# Clone the repository
git clone https://github.com/Majen1/clarity-sburn-token.git
cd clarity-sburn-token

# Install dependencies
npm install

# Start Clarinet console for testnet interaction
clarinet console --testnet
```

**In the console:**
```clarity
;; Check current supply and burn stats
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-total-supply)
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-total-burned)

;; Check owner balance
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-balance 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8)

;; View metadata with all stats
(contract-call? 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1 get-metadata)
```

## 🔄 **How the Burn Mechanism Works**

Every transfer automatically:
1. **Calculates 0.25% fee** (25 basis points)
2. **Burns 0.15%** (60% of fee) - permanently destroyed
3. **Distributes 0.1%** (40% of fee) to fee recipient
4. **Transfers remainder** to recipient

**Example Transfer of 10,000 tokens:**
- Fee: 25 tokens (0.25%)
- Burned: 15 tokens (0.15%) 
- To Fee Recipient: 10 tokens (0.1%)
- To Recipient: 9,975 tokens

## 📊 **Current Stats (as of deployment)**
- **Total Supply**: 10,000 tokens minted
- **Tokens Burned**: 5 tokens (from testing)
- **Circulating Supply**: 9,995 tokens
- **Fee Recipient Earnings**: 3 tokens
- **Min Transfer**: 1,000 tokens (0.00001 with 8 decimals)

## 🛠️ **Technical Highlights**

### **Security Features:**
- ✅ Overflow protection on all arithmetic
- ✅ Input validation and sanity checks
- ✅ Owner-only minting with supply limits
- ✅ Burn address validation

### **Standards Compliance:**
- ✅ Full SIP-010 implementation
- ✅ External trait reference (no local dependencies)
- ✅ Proper error handling

### **Code Quality:**
- ✅ Comprehensive test suite (90+ test cases)
- ✅ Professional documentation
- ✅ Clean, readable code structure
- ✅ MIT licensed for ecosystem use

## 🚀 **Why sBurn is Valuable**

1. **Deflationary Pressure**: Supply decreases with usage
2. **Network Effects**: More transfers = more burning
3. **Fee Incentives**: Rewards for ecosystem participants
4. **Fixed Supply**: Only 18M tokens can ever exist
5. **DeFi Ready**: Standard SIP-010 for wallet/DEX integration

## 📞 **Contact & Collaboration**

**Developer**: Majen (Stacks Ascent Team Member)
**Repository**: https://github.com/Majen1/clarity-sburn-token
**License**: MIT (open for ecosystem adoption)

Ready for mainnet deployment and ecosystem integration!




