const { generateWallet, getStxAddress } = require('@stacks/wallet-sdk');
const { TransactionVersion } = require('@stacks/transactions');
const { generateMnemonic } = require('bip39');

async function generateContractOwnerWallet() {
    try {
        console.log('🔐 Generating new wallet specifically for contract ownership...\n');

        // Generate a completely new mnemonic phrase
        const mnemonic = generateMnemonic();
        
        // Generate wallet from the new mnemonic
        const wallet = await generateWallet({
            secretKey: mnemonic,
            password: ''
        });

        // Get the first account
        const account = wallet.accounts[0];
        
        // Get testnet and mainnet addresses
        const testnetAddress = getStxAddress({
            account,
            transactionVersion: TransactionVersion.Testnet
        });

        const mainnetAddress = getStxAddress({
            account,
            transactionVersion: TransactionVersion.Mainnet
        });

        console.log('🎉 New Contract Owner Wallet Generated!');
        console.log('='.repeat(60));
        console.log(`🔑 Private Key: ${account.stxPrivateKey}`);
        console.log(`🌐 Testnet Address: ${testnetAddress}`);
        console.log(`🌐 Mainnet Address: ${mainnetAddress}`);
        console.log(`📝 Mnemonic: ${mnemonic}`);
        console.log('='.repeat(60));

        console.log('\n📋 Next Steps:');
        console.log('1. Update your .env file with these new values:');
        console.log(`   CONTRACT_OWNER_PRIVATE_KEY="${account.stxPrivateKey}"`);
        console.log(`   CONTRACT_OWNER_ADDRESS="${testnetAddress}"`);
        console.log(`   CONTRACT_OWNER_MNEMONIC="${mnemonic}"`);
        
        console.log('\n2. Update your contract to use this as the owner address');
        console.log('\n3. Get testnet STX for this address:');
        console.log(`   https://explorer.stacks.co/sandbox/faucet?chain=testnet`);
        console.log(`   Or direct API: https://api.testnet.hiro.so/extended/v1/faucets/stx?address=${testnetAddress}`);
        
        console.log('\n4. Deploy the contract using this new owner wallet');
        console.log('\n⚠️  IMPORTANT: Save the mnemonic and private key securely!');
        console.log('   This wallet will be the permanent owner of your contract.');

        return {
            privateKey: account.stxPrivateKey,
            testnetAddress: testnetAddress,
            mainnetAddress: mainnetAddress,
            mnemonic: mnemonic
        };

    } catch (error) {
        console.error('❌ Error generating wallet:', error.message);
        return null;
    }
}

// Run the function
generateContractOwnerWallet().then(wallet => {
    if (wallet) {
        console.log('\n✅ Wallet generation completed successfully!');
        console.log('\nYou can now use this dedicated wallet for contract ownership.');
    }
});
