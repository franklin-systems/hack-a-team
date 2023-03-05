pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/Test.sol";
import "../src/Hackathon.sol";

contract MyScript is Script, Test {
    Hackathon hackathon;

    function bootstrapHackathon() internal {
        // create many different user types 
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("developer", i)));
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.Developer);
        }
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("designer", i)));
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.Designer);
        }
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("product", i)));
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.ProductManager);
        }

        // create teams with captains who are developers (for ease of use)
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("captain", i)));
            changePrank(newAddress);
            hackathon.registerAsCaptain(Hackathon.Role.Developer);
        }
    }
    function run() external {
        string memory mnemonic = "test test test test test test test test test test test junk";
        // deployer will be the owner of the hackathon 
        (address deployer, uint256 privateKey) = deriveRememberKey(mnemonic, 0);
        
        vm.startBroadcast(privateKey);
        // deploy hackathon that starts in 15 minutes and ends in 30 hours
        hackathon = new Hackathon(block.timestamp + 1_000, block.timestamp + 100_000);

        //set up the hackathon with a bunch of hacker types 
        bootstrapHackathon();

        vm.stopBroadcast();
    }
}