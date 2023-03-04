import getComposeClient from "utils/compose";

async function handleClick(event) {
  const compose = await getComposeClient()
  event.preventDefault();
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex(first: 10) {
        edges {
          node {
            name
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
          id
          name
        }
      }
    }
  `, {
    "i": {
      "content": {
        "name": "Random Name " + Math.floor(Math.random() * 10000)
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
