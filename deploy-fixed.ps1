# Quick Deploy Script for Fixed Contract

# This deploys a properly SIP-010 compliant version
$env:STACKS_DEPLOYER_MNEMONIC = "your-mnemonic-here"

Write-Host "Deploying fixed sBurn contract..."
stx deploy_contract sburn-v3 contracts/sburn.clar --testnet --broadcast

Write-Host "Contract deployed! Check explorer in 2-3 minutes for proper token recognition."
