// SPDX-License-idetifier: MIT

pragma solidity ^0.8.0;

import "./Hacker.sol";
import "./Hackathon.sol";

contract HackerFactor{
    address[] public hackers;

    function createHacker(Hackathon.Skill _skill) external returns(address newHacker){
        newHacker = address(new Hacker(_skill));
    }

    function getNumberOfHackers() external view returns(uint256){
        return hackers.length;
    }
}