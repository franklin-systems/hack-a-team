import { ethers } from "ethers";
import { Provider } from "@ethersproject/providers";

export const useProvider = () : Provider => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    return provider;
}
