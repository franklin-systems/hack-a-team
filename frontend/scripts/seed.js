async function main() {
    const ethers = require('ethers');
    const { abi, bytecode } = require('../src/compiled-contracts/Hackathon.json');
    
    const provider = new ethers.providers.JsonRpcProvider('http://ganache:8545');
    
    const deployer_account = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);
    
    const hackathon = new ethers.ContractFactory(abi, bytecode, deployer_account);
    const startTime = Math.floor(new Date().getTime() / 1000);
    // 1 week from now
    const endTime = startTime + 604800;

    const contract = await hackathon.deploy(startTime, endTime);
    
    console.log('\nHackathon contract deployed to:', contract.address, '\n');
    
    console.log('Set this address as an env var named VITE_HACKATHON_CONTRACT_ADDRESS in .env\n')
}

main();
