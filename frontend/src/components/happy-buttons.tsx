import { ComposeClient } from '@composedb/client'
import { definition } from 'schema/runtime-composite.js'

const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
compose.setDID("did:key:z6MkmoPz6RB1aowAvXWVmEyTMsuKehT2J577nHLY6H1ZzMZU")

async function handleClick(event) {
  event.preventDefault();
  await compose.executeQuery(`
  `);
}

export default function HappyButtons() {


  return (
    <button type="button" onClick={handleClick}>Create a random hacker profile!!</button>
  )
}
