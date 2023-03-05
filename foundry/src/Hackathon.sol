// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hackathon{

    address public hackathonAdmin;

    uint256 public hackathonStartTime;

    uint256 public hackathonEndTime;

    uint256 numberOfHackers;

    
    enum Role {Developer, Designer, ProductManager}

    // Hacker Struct 
    struct Hacker {
        // pointer to team captin address, 0 if not on a team 
        address teamCaptain;
        // their role on the team 
        Role role;
    }

    // Team struct (this design constrains team makeup, could be changed to allow any makeup)
    struct Team{

        address captainAddress;
        // developers split into distinct members instead of array because of how solidity returns teams from function calls (doesn't return arrays)
        address developer1;
        address developer2;
        address designer;
        address productManager;
        bool winner;
    }
    
    // mapping of addresses registered as hackers 
    mapping(address => bool) public isHacker;

    // get hacker from address 
    mapping(address => Hacker) public hackersByAddress;

    // get team from address
    mapping(address => Team) public teamsByCaptain;

    // list of teams
    Team[] public teams;

    constructor(uint256 _hackathonStartTime, uint256 _hackathonEndTime){
        hackathonAdmin = msg.sender;
        hackathonStartTime = _hackathonStartTime;
        hackathonEndTime = _hackathonEndTime;
    }

    // check if a hacker has been selected for a team 
    function isOnTeam(address _hacker) external view returns(bool){
        return hackersByAddress[_hacker].teamCaptain != address(0);
    }


    // get team by captain address
    function getTeamByCaptain(address _hacker) external view returns(Team memory){
        return teamsByCaptain[_hacker];
    }

    function teamRequiresDesigner(address _hacker) external view returns(bool){
        return teamsByCaptain[_hacker].designer == address(0) ? true : false;
    }

    function teamRequiresProductManager(address _hacker) external view returns(bool){
        return teamsByCaptain[_hacker].productManager == address(0) ? true : false;
    }

    function getDevelopersRequired(address _hacker) external view returns(uint256){
        // count number of developers on team
        uint256 numberOfDevelopers = 0;
        if(teamsByCaptain[_hacker].developer1 != address(0)){
            numberOfDevelopers++;
        }
        if(teamsByCaptain[_hacker].developer2 != address(0)){
            numberOfDevelopers++;
        }

        // return number of developers required
        return 2 - numberOfDevelopers;
    }

    // register as a captain 
    function registerAsCaptain(Role _roll) external returns(bool){
        // check if there are too many captains 
        require(teams.length < numberOfHackers / 3, "Too many captains");
        // check if hacker is already registered
        require(isHacker[msg.sender] == false, "Hacker is already registered");

        Team memory newTeam = Team(msg.sender, address(0), address(0), address(0), address(0), false);
        // add captain to team roles
        if(_roll == Role.Developer){
            // add to developers list
            newTeam.developer1 = msg.sender;
        }
        else if(_roll == Role.Designer){
            // add to designers list
            newTeam.designer = msg.sender;
        }
        else if(_roll == Role.ProductManager){
            // add to product managers list
            newTeam.productManager = msg.sender;
        }
        teams.push(newTeam);

        // add team to mapping of teams
        teamsByCaptain[msg.sender] = newTeam;
        // create hacker profile 
        Hacker memory newHacker = Hacker(msg.sender, _roll);
        // add hacker to mapping of hackers
        hackersByAddress[msg.sender] = newHacker;
        // add new hacker to the array of hackers
        isHacker[msg.sender] = true;


        return true;  
    }

    // register as a hacker for hire 
    function registerAsHacker(Role _roll) external returns(bool){
        // check if hacker is already registered
        require(!isHacker[msg.sender], "Hacker is already registered");
        // add hacker to hackers list
        Hacker memory newHacker = Hacker(address(0), _roll);
        // add hacker to mapping of hackers
        hackersByAddress[msg.sender] = newHacker;
        // add new hacker to the array of available hackers 
        numberOfHackers++;
        // add hacker to the mapping of registered hackers
        isHacker[msg.sender] = true;

        // return something 
        return true;
    }

    // select a team member 
    function selectTeamMember(address _hacker) external returns(bool){
        // requirer that caller is a captain
        require(teamsByCaptain[msg.sender].captainAddress == msg.sender, "Caller is not a captain");

        // check that hacker is registered
        require(isHacker[_hacker], "Hacker is not registered");

        // check that hacker is not already on a team
        require(hackersByAddress[_hacker].teamCaptain != address(0), "Hacker is already on a team");
        
        // check that hacker's skill is available on the team 
        if(hackersByAddress[_hacker].role == Role.Developer){
            // check that there is an open developer spot
            require(teamsByCaptain[msg.sender].developer1 == address(0) || teamsByCaptain[msg.sender].developer2 == address(0), "Team is full");
            // add hacker to team
            if(teamsByCaptain[msg.sender].developer1 == address(0)){
                teamsByCaptain[msg.sender].developer1= _hacker;
            }
            else{
                teamsByCaptain[msg.sender].developer2 = _hacker;
            }
        }
        else if(hackersByAddress[_hacker].role == Role.Designer){
            // check that there is an open designer spot
            require(teamsByCaptain[msg.sender].designer == address(0), "Team is full");
            // add hacker to team
            teamsByCaptain[msg.sender].designer = _hacker;
        }
        else if(hackersByAddress[_hacker].role == Role.ProductManager){
            // check that there is an open product manager spot
            require(teamsByCaptain[msg.sender].productManager == address(0), "Team is full");
            // add hacker to team
            teamsByCaptain[msg.sender].productManager = _hacker;
        }

        // update hacker to reflect they are on a team
        hackersByAddress[_hacker].teamCaptain = msg.sender;

        // assign the hacker to the captain's team
        teamsByCaptain[_hacker] = teamsByCaptain[msg.sender];

        return true;
    }

    // remove a team member 
    function removeTeamMember(address _hacker) external returns(bool){
        // require that the hackathon hasnt started
        require(block.timestamp < hackathonStartTime, "Conference has started, cannot remove team member");

        // requirer that caller is a captain
        require(teamsByCaptain[msg.sender].captainAddress == msg.sender, "Caller is not a captain");

        // check that hacker is on the caller's team
        require(teamsByCaptain[_hacker].captainAddress == msg.sender, "Hacker is not on the caller's team");

        // update hacker to reflect they are no longer on a team
        hackersByAddress[_hacker].teamCaptain = address(0);

        // remove hacker from team by assigning to default team values
        teamsByCaptain[_hacker] = Team(address(0), address(0), address(0), address(0), address(0), false);

        return true;
    }

    // declare winners
    function declareWinner(address _captain) external view returns(bool){
        // require the caller is the hackathonAdmin
        require(msg.sender == hackathonAdmin, "Caller is not the hackathon admin");
        // require that the hackathon has ended
        require(block.timestamp > hackathonEndTime, "Hackathon has not ended yet");

        // require that the captain is on a team
        require(teamsByCaptain[_captain].captainAddress == _captain, "Address not associated with a team");

        return true;
    }

    // is winner, function that makes it easy to check if an individual hacker was part of a winning team
    function isWinner(address _hacker) external view returns(bool){
        // require that the hackathon has ended
        require(block.timestamp > hackathonEndTime, "Hackathon has not ended yet");

        // require that the hacker is on a team
        require(hackersByAddress[_hacker].teamCaptain != address(0), "Hacker is not on a team");

        // require that the team is a winner
        bool winner = teamsByCaptain[hackersByAddress[_hacker].teamCaptain].winner;

        return winner;
    }
}
