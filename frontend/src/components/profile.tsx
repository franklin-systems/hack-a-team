import Avatar from "components/avatar"
import { useEffect, useState } from "react";
import getComposeClient from "utils/compose";

async function getComposeData(wallet: string) {
  const compose = await getComposeClient()
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex(first: 100) {
        edges {
          node {
            wallet
            skills
          }
        }
      }
    }`)
  const edges = queryResponse.data.hackathonProfileIndex.edges
  const element = edges.find(element => {
    return !!element.node && element.node.wallet == wallet.toLowerCase()
  })
  return element.node
}
// profile component with compose data and hacker data from hackathon smart contract

export default function Profile({ name, wallet, role}) {
  let [skills, setSkills] = useState("Loading...");

  useEffect(() => {
    async function getSkills() {
      let data = await getComposeData(wallet);
      setSkills(data.skills.join(", "));
    }

    getSkills();
  }, []);

  return (
    <div className="flex flex-col items-center rounded-lg bg-black shadow-lg p-4">
      <Avatar size="large"/>
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">Address: {wallet}</p>
        <p className="text-gray-700 text-base">Role: {role}</p>
        <p className="text-gray-700 text-base">Skills: {skills} {skills} {skills} {skills} {skills} {skills} {skills} {skills} {skills}</p>
      </div>
    </div>
  );
};
