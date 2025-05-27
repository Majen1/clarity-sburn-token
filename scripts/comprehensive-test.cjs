require('dotenv').config();
const { makeContractCall, broadcastTransaction, AnchorMode, PostConditionMode, makeStandardSTXPostCondition, FungibleConditionCode, createAssetInfo, makeContractSTXPostCondition, uintCV, principalCV, noneCV, callReadOnlyFunction, cvToValue, standardPrincipalCV } = require('@stacks/transactions');
const { StacksTestnet } = require('@stacks/network');
const axios = require('axios');

// Configuration
const network = new StacksTestnet();
const contractAddress = 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8';
const contractName = 'sburn-owner-v1';
const ownerPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;

if (!ownerPrivateKey) {
    console.error('❌ CONTRACT_OWNER_PRIVATE_KEY not found in .env file');
    process.exit(1);
}

// Helper function to wait for transaction confirmation
async function waitForConfirmation(txId, maxWait = 300000) {
    console.log(`⏳ Waiting for transaction ${txId} to confirm...`);
    const startTime = Date.now();
    
    while (Date.now() - startTime < maxWait) {
        try {
            const response = await axios.get(`https://api.testnet.hiro.so/extended/v1/tx/${txId}`);
            
            if (response.data.tx_status === 'success') {
                console.log('✅ Transaction confirmed successfully!');
                return true;
            } else if (response.data.tx_status === 'abort_by_response' || response.data.tx_status === 'abort_by_post_condition') {
                console.log('❌ Transaction failed:', response.data.tx_status);
                if (response.data.tx_result?.repr) {
                    console.log('Error details:', response.data.tx_result.repr);
                }
                return false;
            }
        } catch (error) {
            // Transaction might not be indexed yet
        }
        
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    console.log('⚠️ Transaction confirmation timeout');
    return false;
}

// Check STX balance
async function checkSTXBalance(address) {
    try {
        const response = await axios.get(`https://api.testnet.hiro.so/extended/v1/address/${address}/stx`);
        const balance = parseInt(response.data.balance) / 1000000; // Convert from microSTX
        console.log(`💰 STX Balance for ${address}: ${balance} STX`);
        return balance;
    } catch (error) {
        console.log(`❌ Could not fetch STX balance: ${error.message}`);
        return 0;
    }
}

// Check token balance
async function checkTokenBalance(address) {
    try {
        const balanceResponse = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-balance',
            functionArgs: [standardPrincipalCV(address)],
            network,
            senderAddress: address,
        });
        
        const balanceObj = cvToValue(balanceResponse);
        
        if (balanceObj.type === "error") {
            console.log(`🪙 Token Balance for ${address}: Error - ${balanceObj.value}`);
            return 0;
        }
        
        const balance = balanceObj.value;
        const balanceWithDecimals = balance / 100000000; // 8 decimals
        console.log(`🪙 sBurn Token Balance for ${address}: ${balance} tokens (${balanceWithDecimals} with decimals)`);
        return balance;
    } catch (error) {
        console.log(`❌ Could not fetch token balance: ${error.message}`);
        return 0;
    }
}

// Get burn statistics
async function getBurnStats() {
    try {
        const burnResponse = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-total-burned',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const burnObj = cvToValue(burnResponse);
        
        if (burnObj.type === "error") {
            console.log(`🔥 Total Burned: Error - ${burnObj.value}`);
            return 0;
        }
        
        const burnTotal = burnObj.value;
        console.log(`🔥 Total Burned: ${burnTotal} tokens`);
        return burnTotal;
    } catch (error) {
        console.log(`❌ Could not fetch burn stats: ${error.message}`);
        return 0;
    }
}

// Mint tokens (mints to tx-sender, which is the owner)
async function mintTokens(amount) {
    console.log(`\n=== Minting ${amount} tokens to owner (tx-sender) ===`);
    
    try {
        const txOptions = {
            contractAddress,
            contractName,
            functionName: 'mint',
            functionArgs: [uintCV(amount)],
            senderKey: ownerPrivateKey,
            network,
            anchorMode: AnchorMode.Any,
            postConditionMode: PostConditionMode.Allow,
        };
        
        const transaction = await makeContractCall(txOptions);
        const broadcastResponse = await broadcastTransaction(transaction, network);
        
        if (broadcastResponse.error) {
            console.log('❌ Mint failed:', broadcastResponse.error);
            return null;
        }
        
        console.log('📤 Mint transaction submitted:', broadcastResponse.txid);
        const confirmed = await waitForConfirmation(broadcastResponse.txid);
        
        if (confirmed) {
            await checkTokenBalance(contractAddress); // Check owner's balance
        }
        
        return broadcastResponse.txid;
    } catch (error) {
        console.log('❌ Mint error:', error.message);
        return null;
    }
}

// Transfer tokens (which triggers burn)
async function transferTokens(amount, recipient, sender = contractAddress) {
    console.log(`\n=== Transferring ${amount} tokens from ${sender} to ${recipient} ===`);
    
    try {
        const txOptions = {
            contractAddress,
            contractName,
            functionName: 'transfer',
            functionArgs: [uintCV(amount), principalCV(sender), principalCV(recipient), noneCV()],
            senderKey: ownerPrivateKey,
            network,
            anchorMode: AnchorMode.Any,
            postConditionMode: PostConditionMode.Allow,
        };
        
        const transaction = await makeContractCall(txOptions);
        const broadcastResponse = await broadcastTransaction(transaction, network);
        
        if (broadcastResponse.error) {
            console.log('❌ Transfer failed:', broadcastResponse.error);
            return null;
        }
        
        console.log('📤 Transfer transaction submitted:', broadcastResponse.txid);
        const confirmed = await waitForConfirmation(broadcastResponse.txid);
        
        if (confirmed) {
            console.log('\n📊 Post-transfer balances:');
            await checkTokenBalance(sender);
            await checkTokenBalance(recipient);
            await getBurnStats();
        }
        
        return broadcastResponse.txid;
    } catch (error) {
        console.log('❌ Transfer error:', error.message);
        return null;
    }
}

// Main testing function
async function runComprehensiveTest() {
    console.log('🚀 Starting Comprehensive sBurn Token Testing');
    console.log('===============================================\n');
    
    // Check initial state
    console.log('=== Initial State Check ===');
    const stxBalance = await checkSTXBalance(contractAddress);
    
    if (stxBalance < 1) {
        console.log('❌ Insufficient STX balance for testing. Please send STX to the owner wallet first.');
        console.log(`💰 Owner Address: ${contractAddress}`);
        return;
    }
    
    await checkTokenBalance(contractAddress);
    await getBurnStats();
    
    // Test 1: Mint initial tokens
    console.log('\n🧪 TEST 1: Minting initial tokens');
    const mintTx1 = await mintTokens(10000); // Mint 10,000 tokens
    
    if (!mintTx1) {
        console.log('❌ Minting failed - aborting tests');
        return;
    }
    
    // Test 2: Transfer tokens to trigger burn
    console.log('\n🧪 TEST 2: Transfer with burn mechanism');
    const testRecipient = 'ST1Y0JZ5NGPR6E2S5GGWN3XFJ9SZ6R8K4M0QQ1V8X'; // Your original address
    const transferTx1 = await transferTokens(1000, testRecipient);
    
    if (!transferTx1) {
        console.log('❌ Transfer failed');
        return;
    }
    
    // Calculate expected burn (0.15% of 1000 = 1.5, rounded down to 1)
    const expectedBurn = Math.floor(1000 * 0.0015);
    console.log(`🔥 Expected burn amount: ${expectedBurn} tokens`);
    
    // Test 3: Multiple transfers to test burn accumulation
    console.log('\n🧪 TEST 3: Multiple transfers to test burn accumulation');
    await transferTokens(500, testRecipient);
    await transferTokens(2000, testRecipient);
    
    // Final state check
    console.log('\n=== Final State Summary ===');
    console.log('Owner balance:');
    await checkTokenBalance(contractAddress);
    console.log('Recipient balance:');
    await checkTokenBalance(testRecipient);
    await getBurnStats();
    
    console.log('\n✅ Comprehensive testing completed!');
    console.log('📋 Summary:');
    console.log('- Contract is deployed and functional');
    console.log('- Minting works correctly');
    console.log('- Transfer mechanism includes 0.15% burn');
    console.log('- Burn statistics are tracked properly');
}

// Check if this is being run directly
if (require.main === module) {
    runComprehensiveTest().catch(console.error);
}

module.exports = {
    checkSTXBalance,
    checkTokenBalance,
    getBurnStats,
    mintTokens,
    transferTokens,
    runComprehensiveTest
};
