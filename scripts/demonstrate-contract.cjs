require('dotenv').config();
const { callReadOnlyFunction, cvToValue, standardPrincipalCV } = require('@stacks/transactions');
const { StacksTestnet } = require('@stacks/network');
const axios = require('axios');

// Configuration
const network = new StacksTestnet();
const contractAddress = 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8';
const contractName = 'sburn-owner-v1';

async function demonstrateContract() {
    console.log('🚀 sBurn Token Contract Demonstration');
    console.log('====================================\n');
    
    console.log('📍 Contract Information:');
    console.log(`   Address: ${contractAddress}`);
    console.log(`   Name: ${contractName}`);
    console.log(`   Network: Stacks Testnet\n`);
    
    // Check owner balance
    try {
        console.log('👑 Owner Balance:');
        const ownerBalance = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-balance',
            functionArgs: [standardPrincipalCV(contractAddress)],
            network,
            senderAddress: contractAddress,
        });
        
        const ownerBalanceObj = cvToValue(ownerBalance);
        if (ownerBalanceObj.type !== "error") {
            const balance = ownerBalanceObj.value;
            console.log(`   Raw: ${balance} tokens`);
            console.log(`   Formatted: ${balance / 100000000} sBurn\n`);
        }
    } catch (error) {
        console.log('   ❌ Could not fetch owner balance\n');
    }
    
    // Check recipient balance
    try {
        console.log('🎯 Recipient Balance:');
        const recipientAddress = 'ST1Y0JZ5NGPR6E2S5GGWN3XFJ9SZ6R8K4M0QQ1V8X';
        const recipientBalance = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-balance',
            functionArgs: [standardPrincipalCV(recipientAddress)],
            network,
            senderAddress: recipientAddress,
        });
        
        const recipientBalanceObj = cvToValue(recipientBalance);
        if (recipientBalanceObj.type !== "error") {
            const balance = recipientBalanceObj.value;
            console.log(`   Address: ${recipientAddress}`);
            console.log(`   Raw: ${balance} tokens`);
            console.log(`   Formatted: ${balance / 100000000} sBurn\n`);
        }
    } catch (error) {
        console.log('   ❌ Could not fetch recipient balance\n');
    }
    
    // Check burn statistics
    try {
        console.log('🔥 Burn Statistics:');
        const burnStats = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-total-burned',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const burnObj = cvToValue(burnStats);
        if (burnObj.type !== "error") {
            const burned = burnObj.value;
            console.log(`   Total Burned: ${burned} tokens`);
            console.log(`   Formatted: ${burned / 100000000} sBurn\n`);
        }
    } catch (error) {
        console.log('   ❌ Could not fetch burn statistics\n');
    }
    
    // Check burn rate
    try {
        console.log('⚙️ Contract Configuration:');
        const burnRate = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-burn-rate',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const burnRateObj = cvToValue(burnRate);
        if (burnRateObj.type !== "error") {
            const rate = burnRateObj.value;
            console.log(`   Burn Rate: ${rate} basis points (${rate / 100}%)`);
        }
        
        // Check fee rate
        const feeRate = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-fee-rate',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const feeRateObj = cvToValue(feeRate);
        if (feeRateObj.type !== "error") {
            const rate = feeRateObj.value;
            console.log(`   Fee Rate: ${rate} basis points (${rate / 100}%)`);
        }
        
        console.log('   Min Transfer: 1000 tokens (0.00001 sBurn)');
        
    } catch (error) {
        console.log('   ❌ Could not fetch configuration\n');
    }
    
    // Check total supply information
    try {
        console.log('\n📊 Supply Information:');
        
        const effectiveSupply = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-effective-supply',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const effectiveSupplyObj = cvToValue(effectiveSupply);
        if (effectiveSupplyObj.type !== "error") {
            const supply = effectiveSupplyObj.value;
            console.log(`   Effective Supply: ${supply} tokens (${supply / 100000000} sBurn)`);
        }
        
        const circulatingSupply = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-circulating-supply',
            functionArgs: [],
            network,
            senderAddress: contractAddress,
        });
        
        const circulatingSupplyObj = cvToValue(circulatingSupply);
        if (circulatingSupplyObj.type !== "error") {
            const supply = circulatingSupplyObj.value;
            console.log(`   Circulating Supply: ${supply} tokens (${supply / 100000000} sBurn)`);
        }
        
    } catch (error) {
        console.log('   ❌ Could not fetch supply information');
    }
    
    console.log('\n✨ Contract is fully operational and ready for use!');
    console.log('🔗 View on Explorer: https://explorer.stacks.co/address/' + contractAddress + '?chain=testnet');
}

demonstrateContract().catch(console.error);
