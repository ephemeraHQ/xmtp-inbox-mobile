import {ethers} from 'ethers';
import {RPC_URL} from '../consts/Chains';

export const getEnsInfo = async (address: string) => {
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const [ens, avatarUrl] = await Promise.all([
    provider.lookupAddress(address),
    provider.getAvatar(address),
  ]);
  return {
    ens,
    avatarUrl,
  };
};
