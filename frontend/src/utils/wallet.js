import { ethers } from "ethers"

export function shortWallet(wallet) {
    const checksummedWallet = ethers.utils.getAddress(wallet)
    return checksummedWallet.slice(0, 6) + "..." + checksummedWallet.slice(-4)
}
