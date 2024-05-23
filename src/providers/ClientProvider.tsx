import {useAddress, useConnectionStatus} from '@thirdweb-dev/react-native';
import {Client} from '@xmtp/react-native-sdk';
import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {ClientContext} from '../context/ClientContext';
import {encryptedStorage} from '../services/encryptedStorage';
import {createClientOptions} from '../utils/clientOptions';

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
    const handleClientCreation = async () => {
      try {
        const keys = await encryptedStorage.getClientKeys(
          address as `0x${string}`,
        );
        if (!keys) {
          return setLoading(false);
        }
        try {
          const clientOptions = await createClientOptions();
          const newClient =
            await Client.createFromKeyBundle<SupportedContentTypes>(
              keys,
              clientOptions,
            );
          setClient(newClient as Client<SupportedContentTypes>);
        } catch (err) {
          encryptedStorage.clearClientKeys(address as `0x${string}`);
        } finally {
          setLoading(false);
        }
      } catch (err) {
        console.log('Error in handleClientCreation', err);
        return setLoading(false);
      }
    };
    handleClientCreation();
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
