import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom"
import { useProvider } from "../hooks/useProvider"
import { useAuth } from "utils/auth";
import { shortWallet } from "utils";

export default function Layout() {
  let auth = useAuth();
  let navigate = useNavigate();

  async function checkConnection() {
    const provider = useProvider()
    const accounts = await provider.listAccounts()
    auth.setWallet(accounts[0])
  }

  async function connect() {
    const provider = useProvider()
    const account = await provider.send('eth_requestAccounts', [])

    if (account.length) {
      auth.setWallet(account[0])
    }
  }

  const signout = () => {
    auth.signout(() => {
      console.log('signed out')
      navigate('/')
    })
  }

  useEffect(() => {
    checkConnection()
    setInterval(checkConnection, 1000)
  }, [])


  return (
    <div className="min-h-screen isolate bg-gray-900">
      { gradientBackground() }

      <div className="px-6 pt-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex p-2 rounded-xl bg-black">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Franklin Hack-a-Team</span>
              <img className="h-20" src="https://user-images.githubusercontent.com/1410181/221963178-ebddf3f7-1361-42b0-91dd-ea73a1412715.png" alt="" />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {!auth.wallet && <button onClick={connect} className="p-4 rounded-md text-white focus:ring-2 focus:ring-white bg-purple-700">
                Connect Wallet
              </button>}
              {auth.wallet && <div className="flex items-center bg-purple-700 text-white p-4 rounded-md">{shortWallet(auth.wallet)}</div>}
            </div>
            <button type="button" onClick={signout}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
      <main className="max-w-4xl mx-auto p-12">
        {/* Render active route, defined in Router */}
        <Outlet />
      </main>
    </div>
  );
}

function gradientBackground() {
  return (
    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
      <svg
        className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#f4773080-2a16-4ab4-9fd7-579fec69a4f7)"
          fillOpacity=".2"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="f4773080-2a16-4ab4-9fd7-579fec69a4f7"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#9089FC" />
            <stop offset={1} stopColor="#FF80B5" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
