import {usePrivy} from '@privy-io/expo';
import {Client} from '@xmtp/react-native-sdk';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import {AppConfig} from '../consts/AppConfig';
import {
  SupportedContentTypes,
  supportedContentTypes,
} from '../consts/ContentTypes';
import {clearClientKeys, getClientKeys} from '../services/encryptedStorage';

interface ClientContextValue {
  client: Client<SupportedContentTypes> | null;
  setClient: React.Dispatch<
    React.SetStateAction<Client<SupportedContentTypes> | null>
  >;
  loading: boolean;
}

export const ClientContext = createContext<ClientContextValue>({
  client: null,
  setClient: () => {
    throw new Error('setClient not implemented');
  },
  loading: true,
});

export const ClientProvider: FC<PropsWithChildren> = ({children}) => {
  const [client, setClient] = useState<Client<SupportedContentTypes> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const {user, isReady} = usePrivy();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    if (!user) {
      return setLoading(false);
    }
    const wallet = user.linked_accounts.find(account => {
      return account.type === 'wallet';
    });
    if (!wallet) {
      return setLoading(false);
    }
    const address = wallet?.address as `0x${string}`;

    getClientKeys(address)
      .then(keys => {
        if (!keys) {
          return setLoading(false);
        }
        Client.createFromKeyBundle<SupportedContentTypes>(keys, {
          codecs: supportedContentTypes,
          enableAlphaMls: true,
          env: AppConfig.XMTP_ENV,
        })
          .then(newClient => {
            setClient(newClient as Client<SupportedContentTypes>);
            setLoading(false);
          })
          .catch(() => {
            clearClientKeys(address as `0x${string}`);
            setLoading(false);
          });
      })
      .catch(() => {
        return setLoading(false);
      });
  }, [isReady, user]);

  return (
    <ClientContext.Provider
      value={{
        client,
        setClient,
        loading,
      }}>
      {children}
    </ClientContext.Provider>
  );
};

export const useClientContext = () => {
  return React.useContext(ClientContext);
};
