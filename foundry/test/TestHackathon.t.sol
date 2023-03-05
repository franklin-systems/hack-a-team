// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Hackathon.sol";

contract TestHackathon is Test {
    Hackathon hackathon;
    
    address owner = makeAddr("owner");
    address captain = makeAddr("captain_test");
    address developer1 = makeAddr("developer1");
    address developer2 = makeAddr("developer2");
    address designer = makeAddr("designer");
    address productManager = makeAddr("productManager");

    address[] developers;
    address[] designers;
    address[] productManagers;
    address[] captains;

    function setUp() public{
        startHoax(owner);
        uint256 startTime = 100;
        uint256 endTime = 200;
        hackathon = new Hackathon(startTime, endTime);
    }

    //function to bootstrap users and tests 
    //add enough hackers to create 10 teams
    function bootstrapHackathon() internal {
        // create many different user types 
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("developer", i)));
            developers.push(newAddress);
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.Developer);
        }
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("designer", i)));
            designers.push(newAddress);
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.Designer);
        }
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("product", i)));
            productManagers.push(newAddress);
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.ProductManager);
        }

        // create teams with captains who are developers (for ease of use)
        for(uint i = 0; i < 10; i++){
            address newAddress = makeAddr(string(abi.encodePacked("captain", i)));
            captains.push(newAddress);
            changePrank(newAddress);
            hackathon.registerAsCaptain(Hackathon.Role.Developer);
        }
    }
    

    // test contract deployment 
    function testDeployHackathon() external {
        uint256 startTime = 100;
        uint256 endTime = 200;
        Hackathon newHackathon = new Hackathon(startTime, endTime);
        assertTrue(newHackathon.hackathonStartTime() == startTime);
        assertTrue(newHackathon.hackathonEndTime() == endTime);
    }

    // test register as captain 
    // requires that there are enough developers to create a team 
    function testCaptainRegistration() external {
        for(uint i = 0; i < 3; i++){
            address newAddress = makeAddr(string(abi.encodePacked("0", i)));
            changePrank(newAddress);
            hackathon.registerAsHacker(Hackathon.Role.Developer);
        }
        
        changePrank(captain);
        hackathon.registerAsCaptain(Hackathon.Role.Developer);
        assertTrue(hackathon.isHacker(captain));
        assertTrue(hackathon.isOnTeam(captain));
        // check that captain has the correct hacker role 
        (address hacker, Hackathon.Role role) = hackathon.hackersByAddress(captain);
        assertTrue(role == Hackathon.Role.Developer);
        // check that captain is the captain of a team
        assertTrue(hacker == captain);
        (address captainAddress,
        address team_developer1,
        address team_developer2,
        address team_designer,
        address team_productManager,
        bool winner) = hackathon.teamsByCaptain(captain);
        assertTrue(captainAddress == captain);
        assertTrue(team_developer1 == captain);
        assertTrue(team_developer2 == address(0));
        assertTrue(team_designer == address(0));
        assertTrue(team_productManager == address(0));
        assertTrue(winner == false);
    }

    // test register as a hacker 
    function testRegisterAsDeveloper() external {
        changePrank(developer1);
        hackathon.registerAsHacker(Hackathon.Role.Developer);
        assertTrue(hackathon.isHacker(developer1));
        // registered but not yet on a team
        assertTrue(!hackathon.isOnTeam(developer1));
        // check that hacker has the correct hacker role 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(developer1);
        assertTrue(role == Hackathon.Role.Developer);
    }

    function testRegisterAsDesigner() external {
        changePrank(designer);
        hackathon.registerAsHacker(Hackathon.Role.Designer);
        assertTrue(hackathon.isHacker(designer));
        // registered but not yet on a team
        assertTrue(!hackathon.isOnTeam(designer));
        // check that hacker has the correct hacker role 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(designer);
        assertTrue(role == Hackathon.Role.Designer);
    }

    function testRegisterAsProductManager() external {
        changePrank(productManager);
        hackathon.registerAsHacker(Hackathon.Role.Designer);
        assertTrue(hackathon.isHacker(productManager));
        // registered but not yet on a team
        assertTrue(!hackathon.isOnTeam(productManager));
        // check that hacker has the correct hacker role 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(productManager);
        assertTrue(role == Hackathon.Role.Designer);
    }

    // test select team member 
    function testSelectTeamMemeber() external {
        bootstrapHackathon();
        address our_captain = captains[0];
        changePrank(our_captain);
        // add a developer to the team 
        hackathon.selectTeamMember(developers[0]);
        // check that developer1 is on the team 
        assertTrue(hackathon.isOnTeam(developers[0]));
        // check that developer1 is a developer 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(developers[0]);
        assertTrue(role == Hackathon.Role.Developer);
        // check that developer1 is on the correct team 
        (address captainAddress,
        address team_developer1,
        address team_developer2,
        address team_designer,
        address team_productManager,
        bool winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_developer2 == developers[0]);
        // add a designer to the team 
        hackathon.selectTeamMember(designers[0]);
        // check that designers[0] is on the team 
        assertTrue(hackathon.isOnTeam(designers[0]));
        // check that designers[0] is a designers[0] 
        (team_captain, role) = hackathon.hackersByAddress(designers[0]);
        assertTrue(role == Hackathon.Role.Designer);
        // check that designers[0] is on the correct team 
        (captainAddress,
        team_developer1,
        team_developer2,
        team_designer,
        team_productManager,
        winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_designer == designers[0]);
        // add a product manager to the team 
        hackathon.selectTeamMember(productManagers[0]);
        // check that product manager is on the team 
        assertTrue(hackathon.isOnTeam(productManagers[0]));
        // check that product manager is a product manager 
        (team_captain, role) = hackathon.hackersByAddress(productManagers[0]);
        assertTrue(role == Hackathon.Role.ProductManager);
        // check that product manager is on the correct team 
        (captainAddress,
        team_developer1,
        team_developer2,
        team_designer,
        team_productManager,
        winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_productManager == productManagers[0]);
    }

    // test remove team member
    function testRemoveTeamMember() external {
        bootstrapHackathon();
        address our_captain = captains[0];
        changePrank(our_captain);
        // add a developer to the team 
        hackathon.selectTeamMember(developers[0]);
        // check that developer1 is on the team 
        assertTrue(hackathon.isOnTeam(developers[0]));
        // check that developer1 is a developer 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(developers[0]);
        assertTrue(role == Hackathon.Role.Developer);
        // check that developer1 is on the correct team 
        (address captainAddress,
        address team_developer1,
        address team_developer2,
        address team_designer,
        address team_productManager,
        bool winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_developer2 == developers[0]);
        // remove developer from team 
        hackathon.removeTeamMember(developers[0]);
        // check that developer1 is no longer on the team 
        assertTrue(!hackathon.isOnTeam(developers[0]));
        // check that developer1 is no longer on the correct team 
        (captainAddress,
        team_developer1,
        team_developer2,
        team_designer,
        team_productManager,
        winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_developer2 == address(0));
    }

    // test select winner
    function testSelectWinner() external {
        bootstrapHackathon();
        address our_captain = captains[0];
        changePrank(our_captain);
        // add a developer to the team 
        hackathon.selectTeamMember(developers[0]);
        // check that developer1 is on the team 
        assertTrue(hackathon.isOnTeam(developers[0]));
        // check that developer1 is a developer 
        (address team_captain, Hackathon.Role role) = hackathon.hackersByAddress(developers[0]);
        assertTrue(role == Hackathon.Role.Developer);
        // check that developer1 is on the correct team 
        (address captainAddress,
        address team_developer1,
        address team_developer2,
        address team_designer,
        address team_productManager,
        bool winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(team_developer2 == developers[0]);
        // change to hackathon owner 
        changePrank(owner);
        // progress time to stamp past end of hackathon
        skip(300);
        // select winner 
        hackathon.declareWinner(our_captain);
        // check that team is winner 
        (captainAddress,
        team_developer1,
        team_developer2,
        team_designer,
        team_productManager,
        winner) = hackathon.teamsByCaptain(our_captain);
        assertTrue(winner == true);
    }


    // test isWinner function 



    function test() public {
        assertTrue(true);
    }
}