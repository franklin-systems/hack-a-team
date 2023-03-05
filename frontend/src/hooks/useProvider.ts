import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

export const useProvider = () : Web3Provider => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider;
}
