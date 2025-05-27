const axios = require('axios');

async function checkBalance(address) {
    console.log('=== STX Balance Checker ===');
    console.log(`🔍 Checking STX balance for ${address}...`);
    
    try {
        const response = await axios.get(`https://api.testnet.hiro.so/extended/v1/address/${address}/stx`);
        
        const balance = parseInt(response.data.balance) / 1000000; // Convert from microSTX
        const locked = parseInt(response.data.locked) / 1000000;
        const totalSent = parseInt(response.data.total_sent) / 1000000;
        const totalReceived = parseInt(response.data.total_received) / 1000000;
        
        console.log(`💰 Available Balance: ${balance} STX`);
        console.log(`🔒 Locked Balance: ${locked} STX`);
        console.log(`📤 Total Sent: ${totalSent} STX`);
        console.log(`📥 Total Received: ${totalReceived} STX`);
        
        if (balance > 0) {
            console.log('✅ Wallet has sufficient funds for testing');
        } else {
            console.log('⚠️ Wallet needs STX funds for testing');
            console.log('💡 Send testnet STX to this address to proceed with testing');
        }
        
        return balance;
    } catch (error) {
        console.log('❌ Could not fetch balance information');
        console.log('Error:', error.message);
        
        if (error.response?.status === 404) {
            console.log('💡 This usually means the address hasn\'t been used yet');
            console.log('Send some testnet STX to activate the address');
        }
        
        return 0;
    }
}

// Get address from command line argument or use default owner address
const targetAddress = process.argv[2] || 'ST1QJXK8F74X07Z67YVK7J221QMM6KRS3D93ZAXZ8';

checkBalance(targetAddress);
