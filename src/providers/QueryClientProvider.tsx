import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {parse, stringify} from 'flatted'; // A library to handle cyclical structures
import React, {FC, PropsWithChildren} from 'react';
import {mmkvstorage} from '../services/mmkvStorage';
import {queryClient} from '../services/queryClient';

const mmkvStoragePersister = createSyncStoragePersister({
  storage: {
    setItem: (key, value) => {
      mmkvstorage.set(key, value);
    },
    getItem: key => {
      const value = mmkvstorage.getString(key);
      return value === undefined ? null : value;
    },
    removeItem: key => {
      mmkvstorage.delete(key);
    },
  },
  serialize: stringify,
  deserialize: parse,
});

export const QueryClientProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: mmkvStoragePersister,
      }}>
      {children}
    </PersistQueryClientProvider>
  );
};
