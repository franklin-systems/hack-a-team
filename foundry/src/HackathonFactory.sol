// SPDX-License-Idetifier: MIT

pragma solidity ^0.8.0;

import "./Hackathon.sol";

contract HackathonFactory{
    address[] public hackathons;

    function createHackathon(uint256 _hackathonStartTime, uint256 _hackathonEndTime, uint8 _numberOfTracks) external {
        address newHackathon = address(new Hackathon(_hackathonStartTime, _hackathonEndTime, _numberOfTracks));
        hackathons.push(newHackathon);
    }

    function getNumberOfHackathons() external view returns(uint256){
        return hackathons.length;
    }
}