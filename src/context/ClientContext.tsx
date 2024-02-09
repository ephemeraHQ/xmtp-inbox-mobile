import {useAddress} from '@thirdweb-dev/react-native';
import {Client, RemoteAttachmentCodec} from '@xmtp/react-native-sdk';
import React, {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';
import {AppConfig} from '../consts/AppConfig';
import {getClientKeys} from '../services/encryptedStorage';

interface ClientContextValue {
  client: Client<unknown> | null;
  setClient: React.Dispatch<React.SetStateAction<Client<unknown> | null>>;
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
  const [client, setClient] = useState<Client<unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const address = useAddress();

  useEffect(() => {
    if (!address) {
      return setLoading(false);
    }
    getClientKeys(address as `0x${string}`)
      .then(keys => {
        if (!keys) {
          return setLoading(false);
        }
        Client.createFromKeyBundle(keys, {
          codecs: [new RemoteAttachmentCodec()],
          enableAlphaMls: AppConfig.GROUPS_ENABLED,
          env: AppConfig.XMTP_ENV,
        })
          .then(newClient => {
            setClient(newClient);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch(() => {
        return setLoading(false);
      });
  }, [address]);

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
