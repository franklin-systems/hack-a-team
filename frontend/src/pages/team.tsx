import Avatar from "components/avatar"
import Profile from "components/profile";
import { useHackthon } from "hooks/useHackathon";
import { useProvider } from "hooks/useProvider";
import { useEffect, useState } from "react";
import { useAuth } from "utils";
import getComposeClient from "utils/compose";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

function getFirstOption(hackers: any, ignored: any) {
  return hackers.find(option => {
    if (option.node) {
      return !ignored.includes(option.node.wallet)
    }
  })
}

export default function Team() {
  let auth = useAuth();
  let provider = useProvider()
  let hackathon = useHackthon(provider, auth.wallet)

  let [hackers, setHackers] = useState([]);
  let [ignored, setIgnored] = useState([]);

  let [team, setTeam] = useState(null);

  let addToTeam = () => {
    hackathon.selectTeamMember(currentOption.node.wallet)
    setIgnored([...ignored, currentOption.node.wallet])
  }

  let ignore = () => {
    setIgnored([...ignored, currentOption.node.wallet])
  }

  useEffect(() => {
    async function getHackers() {
      const compose = await getComposeClient()
      const queryResponse = await compose.executeQuery(
        `query{
          hackathonProfileIndex(first: 100) {
            edges {
              node {
                wallet
                skills
                role
                teamRole
              }
            }
          }
        }`)
      const edges = queryResponse.data.hackathonProfileIndex.edges

      setHackers(edges)
    }

    async function getTeam() {
      console.log("auth.wallet", auth.wallet)
      let team = await hackathon.teamsByCaptain(auth.wallet)
      setTeam(team)
      console.log("team", team)
    }

    getHackers();
    getTeam();
  }, [])

  const currentHacker = hackers.find(hacker => {
    if (hacker.node) {
      return hacker.node.wallet === auth.wallet
    }
  })

  let currentOption: any = null;
  let currentRole = "hacker";
  let teamFull = false;
  if (currentHacker && currentHacker.node.role === "CAPTAIN") {
    currentOption = getFirstOption(hackers, ignored)
    currentRole = "captain"

    teamFull = (
      team.developer1 != ZERO_ADDRESS &&
      team.developer2 != ZERO_ADDRESS &&
      team.designer != ZERO_ADDRESS &&
      team.productManager != ZERO_ADDRESS
    )
  }


  return (
    <div className="flex flex-col items-center justify-center h-full">
      {currentRole === "captain" && team && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center mb-6 text-4xl font-bold text-white">Team</h1>
          <div className="flex items-center justify-between">
            {team.developer1 != ZERO_ADDRESS && (
              <Profile
                wallet={team.developer1}
                highlight={team.developer1 == team.captainAddress}
              />
            )}
            {team.developer2 != ZERO_ADDRESS && (
              <Profile
                wallet={team.developer2}
                highlight={team.developer2 == team.captainAddress}
              />
            )}
            {team.designer != ZERO_ADDRESS && (
              <Profile
                wallet={team.designer}
                highlight={team.designer == team.captainAddress}
              />
            )}
            {team.productManager != ZERO_ADDRESS && (
              <Profile
                wallet={team.productManager}
                highlight={team.productManager == team.captainAddress}
              />
            )}

          </div>
        </div>
      )}

      {currentRole === "hacker" && (
        <div>
          <h1 className="text-center mb-6 text-4xl font-bold text-white">Team</h1>
          <div className="flex items-center justify-between">
            <Profile
              wallet={auth.wallet}
            />
          </div>
        </div>
      )}

      {currentOption && !teamFull && (
        <div>
          <h2 className="text-center mt-12 mb-4 text-2xl font-bold text-white">Pick New Teammate:</h2>
          <div className="flex flex-col items-center rounded-lg bg-black shadow-lg p-4 py-8 mx-4">
            <Avatar size="large"/>
            <div className="px-6 py-4">
              <div className="font-bold text-purple-500 text-xl mb-2">{currentOption.node.name}</div>
              <p className="text-gray-700 text-base">Address: {currentOption.node.wallet}</p>
              <p className="text-gray-700 text-base">Role: {currentOption.node.teamRole}</p>
              <p className="text-gray-700 text-base">Skills: {currentOption.node.skills}</p>
            </div>

            <div className="flex justify-around w-[80%]">
              <button onClick={addToTeam} className="p-4 rounded-md text-white focus:ring-2 focus:ring-white bg-green-600">
                Super Hot!
              </button>

              <button onClick={ignore} className="p-4 rounded-md text-white focus:ring-2 focus:ring-white bg-pink-600">
                no way not
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
