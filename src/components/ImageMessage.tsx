import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
// import {Image} from 'native-base';
import React, {FC, useEffect, useState} from 'react';
// import {Image} from 'react-native';
import {Image} from 'native-base';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {useClientContext} from '../context/ClientContext';
import {mmkvStorage} from '../services/mmkvStorage';

interface ImageMessageProps {
  content: RemoteAttachmentContent;
}

export const ImageMessage: FC<ImageMessageProps> = ({content}) => {
  const {client} = useClientContext();
  const {url, scheme, ...metadata} = content;
  const [downloadedUri, setDownloadedUri] = useState<string | undefined>();
  // getImageCache(url),
  useEffect(() => {
    if (!downloadedUri) {
      // Download image
      // Save image to cache
      ReactNativeBlobUtil.config({
        fileCache: true,
        // appendExt: 'png',
      })
        .fetch('GET', url, {
          // 'Content-Type': 'image/jpg',
        })
        .then(res => {
          const downloadedPath = `file://${res.path()}`;

          console.log('downloadedPath', downloadedPath);
          console.log('content', content);
          client
            ?.decryptAttachment({
              encryptedLocalFileUri: downloadedPath,
              metadata: content,
            })
            .then(decrypted => {
              console.log('decrypted', decrypted);
              setDownloadedUri(decrypted.fileUri + '.jpg');
              mmkvStorage.saveImageCache(url, decrypted.fileUri);
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
      source={{
        uri: downloadedUri,
        headers: {
          'Content-Type': 'image/jpeg',
        },
      }}
      height={40}
      width={40}
      borderRadius={10}
      alt="image message"
    />
  );
};
