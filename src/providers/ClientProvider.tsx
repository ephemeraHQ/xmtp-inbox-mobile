import {useAddress, useConnectionStatus} from '@thirdweb-dev/react-native';
import {Client} from '@xmtp/react-native-sdk';
import {FC, PropsWithChildren, useEffect, useState} from 'react';
import {AppConfig} from '../consts/AppConfig';
import {
  SupportedContentTypes,
  supportedContentTypes,
} from '../consts/ContentTypes';
import {ClientContext} from '../context/ClientContext';
import {clearClientKeys, getClientKeys} from '../services/encryptedStorage';

export const ClientProvider: FC<PropsWithChildren> = ({children}) => {
  const [client, setClient] = useState<Client<SupportedContentTypes> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const address = useAddress();
  const status = useConnectionStatus();

  useEffect(() => {
    if (status === 'unknown' || status === 'connecting') {
      return;
    }
    if (status === 'disconnected') {
      return setLoading(false);
    }
    if (!address) {
      // Address still shows as undefined even when connected
      return;
    }
    getClientKeys(address as `0x${string}`)
      .then(keys => {
        if (!keys) {
          return setLoading(false);
        }
        // const keyBytes = new Uint8Array([
        //   233, 120, 198, 96, 154, 65, 132, 17, 132, 96, 250, 40, 103, 35, 125,
        //   64, 166, 83, 208, 224, 254, 44, 205, 227, 175, 49, 234, 129, 74, 252,
        //   135, 145,
        // ]);
        Client.createFromKeyBundle<SupportedContentTypes>(keys, {
          codecs: supportedContentTypes,
          enableAlphaMls: true,
          env: AppConfig.XMTP_ENV,
          // dbEncryptionKey: keyBytes,
          appVersion: 'Testing/0.0.0',
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
  }, [address, status]);

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
