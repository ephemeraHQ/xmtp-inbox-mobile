import {usePrivy} from '@privy-io/expo';

export const useDisconnect = () => {
  const {logout} = usePrivy();
  return logout;
};
