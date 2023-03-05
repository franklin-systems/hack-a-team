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

    // Seed hackathon contract with hackers 
    // Developer1 
    const developer1 = new ethers.Wallet("0x6370fd033278c143179d81c5526140625662b8daa446c22ee2d73db3707e620c", provider);
    const nonce1 = await provider.getTransactionCount(developer1.address);
    tx = {
        type: 2,
        chainId: 1337,
        nonce: nonce1,
        maxPriorityFeePerGas: 1000000000,
        maxFeePerGas: 1000000000,
        gasPrice: null,
        gasLimit: 1000000,
        to: contract.address,
        value: 0,
        data: "0x7e101f780000000000000000000000000000000000000000000000000000000000000000",
        from: developer1.address,
    } 
    const signature1 = await developer1.signTransaction(tx);
    const submittedTx1 = await provider.sendTransaction(signature1);
    const registeredCorrectly1 = await contract.hackersByAddress(developer1.address);
    console.log('Registered as dev1?', registeredCorrectly1);
    
    // Developer2
    const developer2 = new ethers.Wallet("0x6cbed15c793ce57650b9877cf6fa156fbef513c4e6134f022a85b1ffdd59b2a1", provider);
    tx.from = developer2.address;
    const nonce2 = await provider.getTransactionCount(developer2.address);
    tx.nonce = nonce2;
    const signature2 = await developer2.signTransaction(tx);
    const submittedTx2 = await provider.sendTransaction(signature2);
    const registeredCorrectly2 = await contract.hackersByAddress(developer2.address);
    console.log('Registered as dev2?', registeredCorrectly2);

    // Developer3
    const developer3 = new ethers.Wallet("0x646f1ce2fdad0e6deeeb5c7e8e5543bdde65e86029e2fd9fc169899c440a7913", provider);
    tx.from = developer3.address;
    const nonce3 = await provider.getTransactionCount(developer3.address);
    tx.nonce = nonce3;
    const signature3 = await developer3.signTransaction(tx);
    const submittedTx3 = await provider.sendTransaction(signature3);

    const registeredCorrectly3 = await contract.hackersByAddress(developer3.address);
    console.log('Registered as dev3?', registeredCorrectly3);

    // Developer4
    const developer4 = new ethers.Wallet("0xadd53f9a7e588d003326d1cbf9e4a43c061aadd9bc938c843a79e7b4fd2ad743", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000000";
    tx.from = developer4.address;
    const nonce4 = await provider.getTransactionCount(developer4.address);
    tx.nonce = nonce4;
    const signature4 = await developer4.signTransaction(tx);
    const submittedTx4 = await provider.sendTransaction(signature4);

    const registeredCorrectly4 = await contract.hackersByAddress(developer4.address);
    console.log('Registered as developer4?', registeredCorrectly4);

    // Developer5
    const developer5 = new ethers.Wallet("0x395df67f0c2d2d9fe1ad08d1bc8b6627011959b79c53d7dd6a3536a33ab8a4fd", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000000";
    tx.from = developer5.address;
    const nonce5 = await provider.getTransactionCount(developer5.address);
    tx.nonce = nonce5;
    const sig5 = await developer5.signTransaction(tx);
    const submittedTx5 = await provider.sendTransaction(sig5);

    const registeredCorrectly5 = await contract.hackersByAddress(developer5.address);
    console.log('Registered as developer5?', registeredCorrectly5);

    // Developer6
    const developer6 = new ethers.Wallet("0xe485d098507f54e7733a205420dfddbe58db035fa577fc294ebd14db90767a52", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000000";
    tx.from = developer6.address;
    const nonce6 = await provider.getTransactionCount(developer6.address);
    tx.nonce = nonce6;
    const sig6 = await developer6.signTransaction(tx);
    const submittedTx6 = await provider.sendTransaction(sig6);

    const registeredCorrectly6 = await contract.hackersByAddress(developer6.address);
    console.log('Registered as developer6?', registeredCorrectly6);

    // Designer1
    const designer1 = new ethers.Wallet("0xa453611d9419d0e56f499079478fd72c37b251a94bfde4d19872c44cf65386e3", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000001";
    tx.from = designer1.address;
    const nonce7 = await provider.getTransactionCount(designer1.address);
    tx.nonce = nonce7;
    const sig7 = await designer1.signTransaction(tx);
    const submittedTx7 = await provider.sendTransaction(sig7);

    const registeredCorrectly7 = await contract.hackersByAddress(designer1.address);
    console.log('Registered as designer1?', registeredCorrectly7);
    
    // Designer2
    const designer2 = new ethers.Wallet("0x829e924fdf021ba3dbbc4225edfece9aca04b929d6e75613329ca6f1d31c0bb4", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000001";
    tx.from = designer2.address;
    const nonce8 = await provider.getTransactionCount(designer2.address);
    tx.nonce = nonce8;
    const sig8 = await designer2.signTransaction(tx);
    const submittedTx8 = await provider.sendTransaction(sig8);

    const registeredCorrectly8 = await contract.hackersByAddress(designer2.address);
    console.log('Registered as designer2?', registeredCorrectly8);

    // Designer3
    const designer3 = new ethers.Wallet("0xb0057716d5917badaf911b193b12b910811c1497b5bada8d7711f758981c3773", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000001";
    tx.from = designer3.address;
    const nonce9 = await provider.getTransactionCount(designer3.address);
    tx.nonce = nonce9;
    const sig9 = await designer3.signTransaction(tx);
    const submittedTx9 = await provider.sendTransaction(sig9);

    const registeredCorrectly9 = await contract.hackersByAddress(designer3.address);
    console.log('Registered as designer3?', registeredCorrectly9);

    // ProductManager1
    const product1 = new ethers.Wallet("0x77c5495fbb039eed474fc940f29955ed0531693cc9212911efd35dff0373153f", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000002";
    tx.from = product1.address;
    const nonce10 = await provider.getTransactionCount(product1.address);
    tx.nonce = nonce10;
    const sig10 = await product1.signTransaction(tx);
    const submittedTx10 = await provider.sendTransaction(sig10);

    const registeredCorrectly10 = await contract.hackersByAddress(product1.address);
    console.log('Registered as designer3?', registeredCorrectly10);

    // ProductManager2
    const product2 = new ethers.Wallet("0xd99b5b29e6da2528bf458b26237a6cf8655a3e3276c1cdc0de1f98cefee81c01", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000002";
    tx.from = product2.address;
    const nonce11 = await provider.getTransactionCount(product2.address);
    tx.nonce = nonce11;
    const sig11 = await product2.signTransaction(tx);
    const submittedTx11 = await provider.sendTransaction(sig11);

    const registeredCorrectly11 = await contract.hackersByAddress(product2.address);
    console.log('Registered as designer3?', registeredCorrectly11);

    // ProductManager3
    const product3 = new ethers.Wallet("0x9b9c613a36396172eab2d34d72331c8ca83a358781883a535d2941f66db07b24", provider);
    tx.data = "0x7e101f780000000000000000000000000000000000000000000000000000000000000002";
    tx.from = product3.address;
    const nonce12 = await provider.getTransactionCount(product3.address);
    tx.nonce = nonce12;
    const sig12 = await product3.signTransaction(tx);
    const submittedTx12 = await provider.sendTransaction(sig12);

    const registeredCorrectly12 = await contract.hackersByAddress(product3.address);
    console.log('Registered as designer3?', registeredCorrectly12);

    

}

main();
