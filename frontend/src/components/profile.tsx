import Avatar from "components/avatar"
import { useEffect, useState } from "react";
import getComposeClient from "utils/compose";
import { classNames } from 'utils'

const ROLE_MAP = {
  "DEVELOPER": "Developer",
  "DESIGNER": "Designer",
  "PROJECT_MANAGER": "Project Manager"
}

async function getComposeData(wallet: string) {
  if (!wallet) {
    return
  }

  const compose = await getComposeClient()
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex(first: 100) {
        edges {
          node {
            name
            wallet
            skills
            role
            teamRole
          }
        }
      }
    }`)
  const edges = queryResponse.data.hackathonProfileIndex.edges
  const element = edges.find(element => {
    return !!element.node && element.node.wallet.toLowerCase() == wallet.toLowerCase()
  })
  
  console.log("queryResponse", queryResponse)
}
// profile component with compose data and hacker data from hackathon smart contract

export default function Profile({ wallet, highlight=false }) {
  console.log("wallet", wallet)

  let [name, setName] = useState("Loading...");
  let [skills, setSkills] = useState("Loading...");
  let [role, setRole] = useState("Loading...");

  useEffect(() => {
    async function setAttributes() {
      let data = await getComposeData(wallet);
      if (data) {
        setName(data.name);
        setSkills(data.skills.join(", "));
        setRole(ROLE_MAP[data.teamRole]);
      }
    }

    setAttributes();
  }, []);

  return (
    <div key={wallet} className={classNames(
      "flex flex-col items-center rounded-lg bg-black shadow-lg p-4 mx-4 w-[500px] h-[300px]",
      highlight && "border border-green-600"
    )}>
      <Avatar size="large"/>
      <div className="px-6 pt-8">
        <p className="text-gray-700 text-base">Address: {wallet}</p>
        <p className="text-gray-700 text-base">Name: {name}</p>
        <p className="text-gray-700 text-base">Role: {role}</p>
        <p className="text-gray-700 text-base">Skills: {skills}</p>
      </div>
    </div>
  );
};
