import {useSigner} from '@thirdweb-dev/react-native';
import {Client} from '@xmtp/react-native-sdk';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

interface ClientContextValue {
  client: Client<unknown> | null;
}

export const ClientContext = createContext<ClientContextValue>({
  client: null,
});

export const ClientProvider: FC<PropsWithChildren> = ({children}) => {
  const [client, setClient] = useState<Client<unknown> | null>(null);
  const signer = useSigner();

  useEffect(() => {
    if (signer) {
      Client.create(signer, {
        env: 'dev',
      }).then(newClient => {
        console.log('here1116 client', newClient);
        setClient(newClient);
      });
    }
  }, [signer]);

  return (
    <ClientContext.Provider
      value={{
        client,
      }}>
      {children}
    </ClientContext.Provider>
  );
};
