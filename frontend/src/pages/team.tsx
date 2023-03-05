import Profile from "components/profile";
import { useHackthon } from "hooks/useHackathon";
import { useProvider } from "hooks/useProvider";
import { useEffect, useState } from "react";
import { useAuth } from "utils";
import getComposeClient from "utils/compose";

async function getComposeData(wallet: string) {
  const compose = await getComposeClient()
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex($wallet: String) {
        edges {
          node {
            skills
          }
        }
      }
    }`,
    {
      "wallet": wallet
    }
  )
  return queryResponse
}

export default function Team() {
  let [isHacker, setIsHacker] = useState(false);
  let [skills, setSkills] = useState(null);
  let [teammates, setTeammates] = useState(null);

  let auth = useAuth();
  let provider = useProvider();
  let hackathon = useHackthon(provider, auth.wallet);

  useEffect(() => {
    async function getIsHacker() {
      let isHacker = await hackathon.isOnTeam(auth.wallet);
      console.log(isHacker)
      setIsHacker(isHacker);
    }
    
    async function getSkills() {
      let data = await getComposeData(auth.wallet);
      // setSkills(data);
    }

    async function getTeammates() {
      const hackerObject = await hackathon.hackersByAddress(auth.wallet)
      const captain = hackerObject.captain;
      // teammate struct
      const teammates = await hackathon.teamsByCaptain(captain);
      setTeammates(teammates);
    }

    getIsHacker();
    // getSkills();
    // getTeammates();
 }, [])


  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" mb-6 text-4xl font-bold text-white">Team</h1>
      <Profile
        name={auth.user.name}
        wallet={auth.wallet}
        skills="Payroll software"
        role="Developer"
      />
    </div>
  )
}
