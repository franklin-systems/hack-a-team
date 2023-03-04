import { abi as HACKATHON_ABI } from '../compiled-contracts/Hackathon.json'
import { Contract} from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

export function useHackthonContract(provider: Provider): Contract {
    const address = process.env.HACKATHON_CONTRACT_ADDRESS;

    if (!address) {
        throw new Error('HACKATHON_CONTRACT_ADDRESS is not defined');
    }
    
    return new Contract(address, HACKATHON_ABI, provider);
}
