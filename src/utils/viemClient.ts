import {createPublicClient, http} from 'viem';
import {RPC_URL, SUPPORTED_CHAIN} from '../consts/Chains';

export const viemClient = createPublicClient({
  chain: SUPPORTED_CHAIN,
  transport: http(RPC_URL),
});
