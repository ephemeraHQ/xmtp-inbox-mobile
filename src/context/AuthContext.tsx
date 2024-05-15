import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {useClient} from '../hooks/useClient';
import {getClientKeys} from '../services/encryptedStorage';

type AuthedStatus = 'LOADING' | 'AUTHED' | 'UNAUTHED';

interface AuthContextValue {
  status: AuthedStatus;
  callback: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
  status: 'LOADING',
  callback: () => {
    throw new Error('Not implemented');
  },
});

export const AuthProvider: FC<PropsWithChildren> = ({children}) => {
  const [authStatus, setAuthStatus] = useState<AuthedStatus>('LOADING');
  const {client} = useClient();
  const address = client?.address;

  useEffect(() => {
    if (!address) {
      return setAuthStatus('UNAUTHED');
    }
    getClientKeys(address as `0x${string}`)
      .then(keys => {
        if (!keys) {
          return setAuthStatus('UNAUTHED');
        }
      })
      .catch(() => {
        return setAuthStatus('UNAUTHED');
      });
  }, [address]);

  const callback = useCallback(() => {
    setAuthStatus('AUTHED');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        callback,
        status: authStatus,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
