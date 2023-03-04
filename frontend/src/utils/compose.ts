import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { ComposeClient }from '@composedb/client'

const ethProvider = undefined
const addresses = await ethProvider.request({ method: 'eth_requestAccounts' })
const accountId = await getAccountId(ethProvider, addresses[0])
const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

const compose = new ComposeClient()

const loadSession = async (authMethod) => {
    // Check if user session already in storage
  const sessionStr = localStorage.getItem('didsession')
  let session

    // If session string available, create a new did-session object
  if (sessionStr) {
    session = await DIDSession.fromSession(sessionStr)
  }

    // If no session available, create a new user session and store in local storage
  if (!session || (session.hasSession && session.isExpired)) {
        const session = await DIDSession.authorize(authMethod, { resources: compose.resources})
    localStorage.setItem('didsession', session.serialize())
  }

  return session
}

const session = await loadSession(authMethod)
compose.setDID(session.did)

// pass ceramic instance where needed, ie glaze
// ...

// Before mutations, check if a session is still valid, if expired, create new
if (session.isExpired) {
  const session = loadSession(authMethod)
  compose.setDID(session.did)
}

// perform mutations, continue to use compose client
