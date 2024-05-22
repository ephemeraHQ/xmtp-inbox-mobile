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
  return {
    appVersion: 'EphmeraInboxMobile/1.0.0',
    codecs: supportedContentTypes,
    dbPath,
    enableAlphaMls: true,
    env: AppConfig.XMTP_ENV,
  };
};
