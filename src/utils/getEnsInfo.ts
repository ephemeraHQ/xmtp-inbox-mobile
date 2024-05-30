import {getEnsAvatar, getEnsName, normalize} from 'viem/ens';
import {viemClient} from './viemClient';

export const getEnsInfo = async (address: string) => {
  const [ens, avatarUrl] = await Promise.all([
    getEnsName(viemClient, {address: address as `0x${string}`}),
    getEnsAvatar(viemClient, {name: normalize(address) as `0x${string}`}),
  ]);
  return {
    ens,
    avatarUrl,
  };
};
