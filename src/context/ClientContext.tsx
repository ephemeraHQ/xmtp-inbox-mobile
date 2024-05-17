import {Client} from '@xmtp/react-native-sdk';
import React, {createContext} from 'react';
import {SupportedContentTypes} from '../consts/ContentTypes';

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

export const useClientContext = () => {
  return React.useContext(ClientContext);
};
