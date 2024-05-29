import {mainnet} from 'viem/chains';

export const SUPPORTED_CHAIN = mainnet;
export const RPC_URL = SUPPORTED_CHAIN.rpcUrls.default.http[0];
