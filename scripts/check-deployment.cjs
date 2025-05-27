const axios = require('axios');

async function checkDeployment() {
    console.log('=== Deployment Status Check ===');
    const txId = '4d9f8c26f74b7a9ce7c6a0b357225c64dc9afefb76b0e4acfd05c3ef9c114be9';
    
    try {
        const response = await axios.get(`https://api.testnet.hiro.so/extended/v1/tx/${txId}`);
        
        console.log('🔍 Transaction ID:', txId);
        console.log('📊 Status:', response.data.tx_status);
        console.log('📝 Type:', response.data.tx_type);
        
        if (response.data.tx_status === 'success') {
            console.log('✅ Contract deployed successfully!');
            console.log('📍 Contract Address: ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8.sburn-owner-v1');
            
            // Check if contract is callable
            const contractUrl = 'https://api.testnet.hiro.so/v2/contracts/interface/ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8/sburn-owner-v1';
            try {
                const contractResponse = await axios.get(contractUrl);
                console.log('🎯 Contract is live and callable!');
            } catch (contractError) {
                console.log('⚠️ Contract deployed but not yet indexed');
            }
        } else if (response.data.tx_status === 'pending') {
            console.log('⏳ Transaction still pending confirmation...');
        } else {
            console.log('❌ Transaction failed:', response.data.tx_status);
        }
        
    } catch (error) {
        console.log('❌ Error checking transaction:', error.message);
        if (error.response?.status === 404) {
            console.log('⏳ Transaction not found yet - may still be processing');
        }
    }
}

checkDeployment();
