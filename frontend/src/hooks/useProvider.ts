import { ethers } from "ethers";

export const useProvider = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider;
}
