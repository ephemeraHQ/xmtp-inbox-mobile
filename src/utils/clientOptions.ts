import RNFS from 'react-native-fs';
import {AppConfig} from '../consts/AppConfig';
import {supportedContentTypes} from '../consts/ContentTypes';

export const createClientOptions = async () => {
  const dbDirPath = `${RNFS.DocumentDirectoryPath}/xmtp_db`;
  const directoryExists = await RNFS.exists(dbDirPath);
  if (!directoryExists) {
    await RNFS.mkdir(dbDirPath);
  }
  const dbPath = `${dbDirPath}/EphmeraInboxMobile.db3`;
  const dbEncryptionKey = new Uint8Array([
    233, 120, 198, 96, 154, 65, 132, 17, 132, 96, 250, 40, 103, 35, 125, 64,
    166, 83, 208, 224, 254, 44, 205, 227, 175, 49, 234, 129, 74, 252, 135, 145,
  ]);
  return {
    appVersion: 'EphmeraInboxMobile/1.0.0',
    codecs: supportedContentTypes,
    dbPath,
    dbEncryptionKey,
    enableAlphaMls: true,
    env: AppConfig.XMTP_ENV,
  };
};
