// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IHackathon {
    // define interface so that you can call functions from other contracts
}

contract Hacker {
    // Hacker = 0, Designer = 1, ProductManager = 2
    enum Skill {Hacker, Designer, ProductManager}
    Skill public skill;

    // store history of hackathons participated in, hackathon.length - 1 is the current hackathon
    address[] public hackathons;
    
    constructor(Skill _skill) {
        skill = _skill;
    } 

    // get the current hackathon address
    function getCurrentHackathon() public view returns (address) {
        return hackathons[hackathons.length - 1];
    }

    // get current team (by calling the current hackathon)

    // get previous teams (by calling the previous hackathons)

    // join a hackathon as a team member

    // join a hackathon as a captain

    // leave a hackathon (time constraint)

    // 
    
}