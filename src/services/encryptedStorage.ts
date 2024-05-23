import RNEncryptedStorage from 'react-native-encrypted-storage';

enum EncryptedStorageKeys {
  clientKeys = 'CLIENT_KEYS',
}

class EncryptedStorage {
  //#region Client Keys
  private getClientKeysKey = (address: string) => {
    return `${EncryptedStorageKeys.clientKeys}_${address}`;
  };

  saveClientKeys = (address: string, clientKeys: string) => {
    return RNEncryptedStorage.setItem(
      this.getClientKeysKey(address),
      clientKeys,
    );
  };

  getClientKeys = (address: string) => {
    return RNEncryptedStorage.getItem(this.getClientKeysKey(address));
  };

  clearClientKeys = (address: string) => {
    return RNEncryptedStorage.removeItem(this.getClientKeysKey(address));
  };

  //#endregion Client Keys
}

export const encryptedStorage = new EncryptedStorage();
