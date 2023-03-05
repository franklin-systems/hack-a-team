import Profile from "components/profile";
import { useHackthon } from "hooks/useHackathon";
import { useProvider } from "hooks/useProvider";
import { useEffect, useState } from "react";
import { useAuth } from "utils";

export default function Team() {
  let [isHacker, setIsHacker] = useState(false);
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

    async function getTeammates() {
      const hackerObject = await hackathon.hackersByAddress(auth.wallet)
      const captain = hackerObject.captain;
      // teammate struct
      const teammates = await hackathon.teamsByCaptain(captain);
      console.log("teammates", teammates)
      setTeammates(teammates);
    }

    getIsHacker();
    // getTeammates();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className=" mb-6 text-4xl font-bold text-white">Team</h1>
      <div className="flex items-center justify-between">
        <Profile
          name={auth.user.name}
          wallet={auth.wallet}
        />
        <Profile
          name={auth.user.name}
          wallet={auth.wallet}
        />
      </div>

      <h2 className="mt-12 mb-4 text-2xl font-bold text-white">Pick New Teammates</h2>
    </div>
  )
}
