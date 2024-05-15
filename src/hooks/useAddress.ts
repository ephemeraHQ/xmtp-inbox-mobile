import {useClient} from './useClient';

export const useAddress = () => {
  const {client} = useClient();
  return client?.address ?? null;
};
