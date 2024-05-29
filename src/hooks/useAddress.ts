import {useClient} from './useClient';

export const useAddress = () => {
  const {client, loading} = useClient();
  return {
    address: client?.address,
    loading,
  };
};
