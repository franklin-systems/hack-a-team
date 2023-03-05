import getComposeClient from "utils/compose";
import { ethers } from "ethers";
import { getAccountId } from '@didtools/pkh-ethereum'

async function handleClick(event) {
  event.preventDefault();

  const ethProvider = new ethers.providers.Web3Provider(window.ethereum).provider;
  const addresses = await ethProvider.request({ method: 'eth_requestAccounts' })
  const accountId = await getAccountId(ethProvider, addresses[0])
  const wallet = accountId.address

  const compose = await getComposeClient()
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex(first: 10) {
        edges {
          node {
            wallet
            skills
            strengths
            weaknesses
          }
        }
      }
    }`
  )
  console.log(queryResponse)
  const response = await compose.executeQuery(`
    mutation CreateNewHackathonProfile($i: CreateHackathonProfileInput!){
      createHackathonProfile(input: $i){
        document{
          wallet
          skills
          strengths
          weaknesses
        }
      }
    }
  `, {
    "i": {
      "content": {
        "wallet": wallet,
        "skills": ["Bad at life"],
        "strengths": "None.",
        "weaknesses": "All."
      }
    }
  });
  console.log(response)
}

export default function HappyButtons() {
  return (
    <button className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" onClick={handleClick}>Create a random hacker profile!!</button>
  )
}
