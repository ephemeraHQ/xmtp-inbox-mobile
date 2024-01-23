import EncryptedStorage from 'react-native-encrypted-storage';

enum StorageKeys {
  clientKeys = 'CLIENT_KEYS',
}

export const saveClientKeys = (address: `0x${string}`, clientKeys: string) => {
  return EncryptedStorage.setItem(
    `${StorageKeys.clientKeys}_${address}`,
    clientKeys,
  );
};

export const getClientKeys = (address: `0x${string}`) => {
  return EncryptedStorage.getItem(`${StorageKeys.clientKeys}_${address}`);
};

export const clearClientKeys = (address: `0x${string}`) => {
  return EncryptedStorage.removeItem(`${StorageKeys.clientKeys}_${address}`);
};
