// Deploy contract using the dedicated contract owner wallet
const { 
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  createStacksPrivateKey,
  getAddressFromPrivateKey,
  TransactionVersion
} = require("@stacks/transactions");
const { StacksTestnet } = require("@stacks/network");
const fs = require('fs');
require('dotenv').config();

async function deployWithOwnerWallet() {
  try {
    const network = new StacksTestnet({ url: 'https://stacks-node-api.testnet.stacks.co' });
    
    // Get contract name from command line argument or use default
    const contractName = process.argv[2] || 'sburn-owner-v1';
    
    // Use the new contract owner private key
    const privateKeyHex = process.env.CONTRACT_OWNER_PRIVATE_KEY;
    const expectedOwnerAddress = process.env.CONTRACT_OWNER_ADDRESS;
    
    if (!privateKeyHex || !expectedOwnerAddress) {
      console.error('❌ CONTRACT_OWNER_PRIVATE_KEY or CONTRACT_OWNER_ADDRESS not found in .env');
      console.log('Please run the generate-owner-wallet script first!');
      return;
    }

    console.log('🚀 Deploying sBurn contract with dedicated owner wallet...');
    console.log('='.repeat(60));
    console.log(`📋 Contract: ${contractName}`);
    console.log(`👤 Owner: ${expectedOwnerAddress}`);
    
    // Verify the private key matches the expected address
    const privKey = createStacksPrivateKey(privateKeyHex);
    const derivedAddress = getAddressFromPrivateKey(privKey.data, TransactionVersion.Testnet);
    
    if (derivedAddress !== expectedOwnerAddress) {
      console.error(`❌ Private key mismatch!`);
      console.error(`Expected: ${expectedOwnerAddress}`);
      console.error(`Derived: ${derivedAddress}`);
      return;
    }
    
    console.log(`✅ Private key verified for ${derivedAddress}`);
    
    // Read contract source
    const contractSource = fs.readFileSync('./contracts/sburn.clar', 'utf8');
    
    // Create deployment transaction
    const txOptions = {
      contractName: contractName,
      codeBody: contractSource,
      senderKey: privateKeyHex,
      network: network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      fee: 150000 // Higher fee for deployment
    };

    console.log('📝 Creating deployment transaction...');
    const transaction = await makeContractDeploy(txOptions);
    
    console.log('📡 Broadcasting transaction...');
    const result = await broadcastTransaction(transaction, network);
    
    if (result.hasOwnProperty("error")) {
      console.error("❌ Deployment failed:", result);
      
      if (result.reason === 'NotEnoughFunds') {
        console.log('\n💰 The contract owner wallet needs STX tokens!');
        console.log(`🎁 Get testnet STX at: https://explorer.stacks.co/sandbox/faucet?chain=testnet`);
        console.log(`📍 Your address: ${expectedOwnerAddress}`);
        console.log(`💸 Or direct API call:`);
        console.log(`   curl -X POST "https://api.testnet.hiro.so/extended/v1/faucets/stx?address=${expectedOwnerAddress}"`);
      }
    } else {
      console.log("✅ Contract deployed successfully!");
      console.log(`📋 Transaction ID: ${result.txid}`);
      console.log(`🔍 View: https://explorer.stacks.co/txid/${result.txid}?chain=testnet`);
      console.log(`📄 Contract: ${expectedOwnerAddress}.${contractName}`);
      
      console.log('\n🎉 Next Steps:');
      console.log('1. Wait 5-10 minutes for deployment confirmation');
      console.log('2. Update your scripts to use the new contract name: sburn-owner-v1');
      console.log(`3. Use this private key for owner operations: ${privateKeyHex}`);
      console.log('4. Test minting and transfers!');
      
      // Save deployment info
      const deploymentInfo = {
        contractName: 'sburn-owner-v1',
        contractAddress: expectedOwnerAddress,
        ownerAddress: expectedOwnerAddress,
        ownerPrivateKey: privateKeyHex,
        transactionId: result.txid,
        deployedAt: new Date().toISOString(),
        networkUrl: network.coreApiUrl,
        explorerUrl: `https://explorer.stacks.co/txid/${result.txid}?chain=testnet`
      };
      
      fs.writeFileSync('./deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
      console.log('\n📄 Deployment info saved to deployment-info.json');
    }
    
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

deployWithOwnerWallet();
