// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hackathon{

    address public hackathonAdmin;

    uint256 hackathonStartTime;

    uint256 hackathonEndTime;

    uint8 numberOfTracks;

    
    enum Skill {Developer, Designer, ProductManager}

    // Hacker Struct 
    struct Hacker {
        address hackerAddress;
        Skill skill;
        uint8 track;
        bool isOnTeam;
    }

    // Team struct (this design constrains team makeup, could be changed to allow any makeup)
    struct Team{
        address captainAddress;
        address[2] developers;
        address designer;
        address productManager;
        uint8 track;
        bool winner;
    }
    
    // mapping of addresses registered as hackers 
    mapping(address => bool) public isHacker;

    // get hacker from address 
    mapping(address => Hacker) public hackersByAddress;

    // get team from address
    mapping(address => Team) public teamsByAddress;

    // track winners
    mapping(uint8 => Team) public winnersByTrack;

    // list of available hackers
    Hacker[] public hackers;

    // list of available developers
    Hacker[] public developers;

    // list of available designers
    Hacker[] public designers;

    // list of available product managers
    Hacker[] public productManagers;

    // list of teams
    Team[] public teams;

    // track the number of hackers in each track

    constructor(uint256 _hackathonStartTime, uint256 _hackathonEndTime, uint8 _numberOfTracks){
        hackathonAdmin = msg.sender;
        hackathonStartTime = _hackathonStartTime;
        hackathonEndTime = _hackathonEndTime;
        numberOfTracks = _numberOfTracks;
    }


    // register as a captain 
    function registerAsCaptain(Skill _skill, uint8 _track) external returns(bool){
        // check if there are too many captains (can replace this with a variable that tracks the number of available hackers in a track or free agent)
        // @audit this is too simple, need to check if there are enough hackers in the track
        require(teams.length < hackers.length / 3, "Too many captains");
        // check if hacker is already registered
        require(isHacker[msg.sender], "Hacker is already registered");
        // create a team struct, if track is zero, then the team is available for any track
        Team memory newTeam = Team(msg.sender, [address(0), address(0)], address(0), address(0), _track, false);
        // add captain to team roles
        if(_skill == Skill.Developer){
            // add to developers list
            newTeam.developers[0] = msg.sender;
        }
        else if(_skill == Skill.Designer){
            // add to designers list
            newTeam.designer = msg.sender;
        }
        else if(_skill == Skill.ProductManager){
            // add to product managers list
            newTeam.productManager = msg.sender;
        }
        teams.push(newTeam);

        // add team to mapping of teams
        teamsByAddress[msg.sender] = newTeam;

        return true;  
    }

    // register as a hacker for hire 
    function registerAsHacker(Skill _skill, uint8 _track) external returns(bool){
        // check if hacker is already registered
        require(!isHacker[msg.sender], "Hacker is already registered");
        // add hacker to hackers list
        Hacker memory newHacker = Hacker(msg.sender, _skill, _track, false);
        // add new hacker to the array of available hackers 
        hackers.push(newHacker);
        // add hacker to the mapping of registered hackers
        isHacker[msg.sender] = true;
        if(_skill == Skill.Developer){
            // add to developers list
            developers.push(newHacker);
        }
        else if(_skill == Skill.Designer){
            // add to designers list
            designers.push(newHacker);
        }
        else if(_skill == Skill.ProductManager){
            // add to product managers list
            productManagers.push(newHacker);
        }

        // return something 
        return true;
    }

    // select a team member 
    function selectTeamMember(address _hacker) external returns(bool){
        // requirer that caller is a captain
        require(teamsByAddress[msg.sender].captainAddress == msg.sender, "Caller is not a captain");

        // check that hacker is registered
        require(isHacker[_hacker], "Hacker is not registered");

        // check that hacker is not already on a team
        require(!hackersByAddress[_hacker].isOnTeam, "Hacker is already on a team");

        // check that hacker is available
        require(!hackersByAddress[_hacker].isOnTeam, "Hacker is not available");

        // check that hacker is in the same track, if track is 0, then they are available for any track
        require(
            hackersByAddress[_hacker].track == teamsByAddress[msg.sender].track ||
            hackersByAddress[_hacker].track ==0, 
            "Hacker is not in the same track"
        );
        
        // check that hacker's skill is available on the team 
        if(hackersByAddress[_hacker].skill == Skill.Developer){
            // check that there is an open developer spot
            require(teamsByAddress[msg.sender].developers[0] == address(0) || teamsByAddress[msg.sender].developers[1] == address(0), "Team is full");
            // add hacker to team
            if(teamsByAddress[msg.sender].developers[0] == address(0)){
                teamsByAddress[msg.sender].developers[0] = _hacker;
            }
            else{
                teamsByAddress[msg.sender].developers[1] = _hacker;
            }
        }
        else if(hackersByAddress[_hacker].skill == Skill.Designer){
            // check that there is an open designer spot
            require(teamsByAddress[msg.sender].designer == address(0), "Team is full");
            // add hacker to team
            teamsByAddress[msg.sender].designer = _hacker;
        }
        else if(hackersByAddress[_hacker].skill == Skill.ProductManager){
            // check that there is an open product manager spot
            require(teamsByAddress[msg.sender].productManager == address(0), "Team is full");
            // add hacker to team
            teamsByAddress[msg.sender].productManager = _hacker;
        }

        // update hacker to reflect they are on a team
        hackersByAddress[_hacker].isOnTeam = true;

        // assign the hacker to the captain's team
        teamsByAddress[_hacker] = teamsByAddress[msg.sender];

        return true;
    }

    // remove a team member 
    function removeTeamMember(address _hacker) external returns(bool){
        // require that the hackathon hasnt started
        require(block.timestamp < hackathonStartTime, "Conference has started, cannot remove team member");

        // requirer that caller is a captain
        require(teamsByAddress[msg.sender].captainAddress == msg.sender, "Caller is not a captain");

        // check that hacker is on the caller's team
        require(teamsByAddress[_hacker].captainAddress == msg.sender, "Hacker is not on the caller's team");

        // update hacker to reflect they are no longer on a team
        hackersByAddress[_hacker].isOnTeam = false;

        // add them back to the list of available hackers 
        if(hackersByAddress[_hacker].skill == Skill.Developer){
            // add to developers list
            developers.push(hackersByAddress[_hacker]);
        }
        else if(hackersByAddress[_hacker].skill == Skill.Designer){
            // add to designers list
            designers.push(hackersByAddress[_hacker]);
        }
        else if(hackersByAddress[_hacker].skill == Skill.ProductManager){
            // add to product managers list
            productManagers.push(hackersByAddress[_hacker]);
        }

        // remove hacker from team by assigning to default team values
        teamsByAddress[_hacker] = Team(address(0), [address(0), address(0)], address(0), address(0), 0, false);

        return true;
    }

    // declare winners of a track 
    function declareTrackWinner(address _captain, uint8 _track) external returns(bool){
        // require the caller is the hackathonAdmin
        require(msg.sender == hackathonAdmin, "Caller is not the hackathon admin");
        // require that the hackathon has ended
        require(block.timestamp > hackathonEndTime, "Hackathon has not ended yet");

        // require that the captain is on a team
        require(teamsByAddress[_captain].captainAddress == _captain, "Address not associated with a team");

        // require that the track does not already have a winner 
        require(winnersByTrack[_track].captainAddress == address(0), "Track already has a winner");

        // require that the team is in the correct track
        require(teamsByAddress[_captain].track == _track, "Team is not in the correct track");

        // declare the team the winner of the track 
        winnersByTrack[_track] = teamsByAddress[_captain];

        return true;
    }


}

