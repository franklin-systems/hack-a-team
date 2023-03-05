import { DIDSession } from 'did-session'
import type { AuthMethod } from '@didtools/cacao'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { ComposeClient }from '@composedb/client'
import { definition } from 'schema/runtime-composite.js'
import { ethers } from "ethers";

const getComposeClient = async () => {
  const ethProvider = new ethers.providers.Web3Provider(window.ethereum).provider;
  const addresses = await ethProvider.request({ method: 'eth_requestAccounts' })
  const accountId = await getAccountId(ethProvider, addresses[0])
  console.log(accountId)
  const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)
  const sessionId = "didsession-" + accountId.address
  
  const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })
  
  const loadSession = async (authMethod, sessionId) => {
      // Check if user session already in storage
    const sessionStr = localStorage.getItem(sessionId)
    let session
  
      // If session string available, create a new did-session object
    if (sessionStr) {
      session = await DIDSession.fromSession(sessionStr)
    }
  
      // If no session available, create a new user session and store in local storage
    if (!session || (session.hasSession && session.isExpired)) {
      session = await DIDSession.authorize(authMethod, { resources: compose.resources})
      localStorage.setItem(sessionId, session.serialize())
    }
  
    return session
  }
  
  const session = await loadSession(authMethod, sessionId)
  compose.setDID(session.did)
  
  // Before mutations, check if a session is still valid, if expired, create new
  if (session.isExpired) {
    const session = loadSession(authMethod, sessionId)
    compose.setDID(session.did)
  }
  
  // perform mutations, continue to use compose client
  return compose
}

export default getComposeClient
