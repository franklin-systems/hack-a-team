import { abi as HACKATHON_ABI } from '../compiled-contracts/Hackathon.json'
import { Contract} from '@ethersproject/contracts'
import { Web3Provider } from '@ethersproject/providers'


export function useHackthonContract(provider: Web3Provider, account: string | null ): Contract {

    const address = import.meta.env.VITE_HACKATHON_CONTRACT_ADDRESS;

    if (!address) {
        throw new Error('HACKATHON_CONTRACT_ADDRESS is not defined');
    }

    var contract = new Contract(address, HACKATHON_ABI, provider);

    if (account) {
        contract = contract.connect(provider.getSigner(account));
    }

    return contract;
}

