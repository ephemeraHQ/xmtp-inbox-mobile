import {useConnectionStatus} from '@thirdweb-dev/react-native';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react';

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
  const connectionStatus = useConnectionStatus();

  useEffect(() => {
    if (connectionStatus === 'connected') {
      setAuthStatus('AUTHED');
    } else if (connectionStatus === 'disconnected') {
      setAuthStatus('UNAUTHED');
    }
  }, [connectionStatus]);

  const callback = useCallback(() => {
    // setAuthStatus('AUTHED');
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
