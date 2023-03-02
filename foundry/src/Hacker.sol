// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Hackathon.sol";


contract Hacker {
    // Hacker = 0, Designer = 1, ProductManager = 2
    Hackathon.Skill public skill;

    // store history of hackathons participated in, hackathon.length - 1 is the current hackathon
    address[] public hackathons;
    
    constructor(Hackathon.Skill _skill) {
        skill = _skill;
    } 

    // get the current hackathon address, returns 0x0 if no hackathon is active
    function getCurrentHackathon() public view returns (address) {
        address lastHackathon = hackathons[hackathons.length - 1];
        return block.timestamp < Hackathon(lastHackathon).hackathonEndTime() ? lastHackathon : address(0);
    }

    // get current team (by calling the current hackathon)
    function getCurrentHackathonTeam() external view returns(Hackathon.Team memory){
        // require that the hacker is a part of an active hackathon
        require(getCurrentHackathon() != address(0));
        Hackathon currentHackathon = Hackathon(getCurrentHackathon());
        Hackathon.Team memory currentTeam;
        (   currentTeam.captainAddress, 
            currentTeam.developer1, 
            currentTeam.developer2, 
            currentTeam.designer, 
            currentTeam.productManager, 
            currentTeam.track, 
            currentTeam.winner
        ) = currentHackathon.teamsByAddress(address(this));

        return currentTeam;
    }

    // get number of previous teams
    function getNumberOfHackathons() external view returns(uint256){
        return hackathons.length;
    }

    // join a hackathon as a team member
    function hackerRegistration(address hackathon, uint8 track) external {
        // require that the hacker isn't a part of an active hackathon by checking the most recent hackathon ended
        if(hackathons.length > 0){
            address lastHackathon = hackathons[hackathons.length - 1];
            require(block.timestamp > Hackathon(lastHackathon).hackathonEndTime());
        }
        // call hackathon contract to register 
        Hackathon newHackathon = Hackathon(hackathon);
        
        // revert if call is unsuccessful 
        require(newHackathon.registerAsHacker(skill, track));
        // add hackathon to history of hackathons 
        hackathons.push(hackathon);
    }

    // join a hackathon as a captain
    function captainRegistration(address hackathon, uint8 track) external {
        // require that the hacker isn't a part of an active hackathon by checking the most recent hackathon ended
        if(hackathons.length > 0){
            address lastHackathon = hackathons[hackathons.length - 1];
            require(block.timestamp > Hackathon(lastHackathon).hackathonEndTime());
        }
        // call hackathon contract to register 
        Hackathon newHackathon = Hackathon(hackathon);
        
        // revert if call is unsuccessful 
        require(newHackathon.registerAsCaptain(skill, track));

        // add hackathon to history of hackathons 
        hackathons.push(hackathon);
    }

    // leave a hackathon (time constraint)
    
    // change skill (not while in an active hackathon)

    // retrieve hackthons won, and the associated track which was won 
    function getHackathonsWon() external view returns (address[] memory, uint8[] memory) {
        address[] memory hackathonsWon = new address[](hackathons.length);
        uint8[] memory tracksWon = new uint8[](hackathons.length);
        uint8 hackathonsWonIndex = 0;
        for(uint8 i = 0; i < hackathons.length; i++){
            Hackathon hackathon = Hackathon(hackathons[i]);
            Hackathon.Team memory team;
            (   team.captainAddress, 
                team.developer1, 
                team.developer2, 
                team.designer, 
                team.productManager, 
                team.track, 
                team.winner
            ) =  hackathon.teamsByAddress(address(this));
            if(team.winner){
                hackathonsWon[hackathonsWonIndex] = hackathons[i];
                tracksWon[hackathonsWonIndex] = team.track;
                hackathonsWonIndex++;
            }
        }
        return (hackathonsWon, tracksWon);
    }
    
}