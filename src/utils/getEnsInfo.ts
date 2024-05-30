import {getEnsAvatar, getEnsName, normalize} from 'viem/ens';
import {viemClient} from './viemClient';

export const getEnsInfo = async (address: string) => {
  const ens = await getEnsName(viemClient, {address: address as `0x${string}`});
  if (!ens) {
    return {
      ens: null,
      avatarUrl: null,
    };
  }
  const avatarUrl = await getEnsAvatar(viemClient, {
    name: normalize(ens),
  });
  return {
    ens,
    avatarUrl,
  };
};
