import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
// import {Image} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
// import {Image} from 'react-native';
import {Image} from 'native-base';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useClientContext} from '../context/ClientContext';
import {getImageCache, saveImageCache} from '../services/mmkvStorage';

interface ImageMessageProps {
  content: RemoteAttachmentContent;
}

export const ImageMessage: FC<ImageMessageProps> = ({content}) => {
  const {client} = useClientContext();
  const {url, scheme, ...metadata} = content;
  const [downloadedUri, setDownloadedUri] = useState<string | undefined>(
    getImageCache(url),
  );
  useEffect(() => {
    if (!downloadedUri) {
      // Download image
      // Save image to cache
      ReactNativeBlobUtil.config({
        fileCache: true,
      })
        .fetch('GET', url)
        .then(res => {
          const downloadedPath = `file://${res.path()}`;
          client
            ?.decryptAttachment({
              encryptedLocalFileUri: downloadedPath,
              metadata: content,
            })
            .then(decrypted => {
              setDownloadedUri(decrypted.fileUri);
              saveImageCache(url, decrypted.fileUri);
            });
        });
    }
  }, [downloadedUri, client, url, content, metadata, scheme]);

  if (!downloadedUri) {
    return null;
  }
  return (
    <Image
      resizeMethod="auto"
      resizeMode="cover"
      source={{uri: downloadedUri}}
      // source={require('../../assets/images/discover1.png')}
      height={40}
      width={40}
    />
  );
};
