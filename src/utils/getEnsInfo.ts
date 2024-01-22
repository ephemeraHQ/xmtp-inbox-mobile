import {Chain} from '@thirdweb-dev/chains';
import {getChainProvider} from '@thirdweb-dev/react-native';
import {ethers} from 'ethers';

export const getEnsInfo = async (
  address: string,
  supportedChains: Chain[],
  clientId?: string,
) => {
  const ethereum = supportedChains.find(chain => chain.chainId === 1);
  const provider = getChainProvider(1, {
    clientId,
    supportedChains: ethereum
      ? [
          {
            chainId: 1,
            rpc: [...ethereum.rpc],
            nativeCurrency: ethereum.nativeCurrency,
            slug: ethereum.slug,
          },
        ]
      : undefined,
  });
  if (provider instanceof ethers.providers.JsonRpcProvider) {
    const [ens, avatarUrl] = await Promise.all([
      provider.lookupAddress(address),
      provider.getAvatar(address),
    ]);
    return {
      ens,
      avatarUrl,
    };
  } else {
    const ens = await provider.lookupAddress(address);
    return {
      ens,
      avatarUrl: null,
    };
  }
};
