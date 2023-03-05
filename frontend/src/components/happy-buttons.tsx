

async function handleClick(event) {
  event.preventDefault();
  const queryResponse = await compose.executeQuery(
    `query{
      hackathonProfileIndex(first: 10) {
        edges {
          node {
            wallet
            skills
          }
        }
      }
    }`
  )
  console.log(queryResponse)

  console.log(response)
}

export default function HappyButtons() {
  return (
    <button className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" type="button" onClick={handleClick}>Create a random hacker profile!!</button>
  )
}
