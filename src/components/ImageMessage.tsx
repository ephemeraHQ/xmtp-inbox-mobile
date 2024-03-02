import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Center, Spinner} from 'native-base';
import React, {FC, useEffect, useMemo, useState} from 'react';
import {useWindowDimensions} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';
import {useClientContext} from '../context/ClientContext';
import {mmkvStorage} from '../services/mmkvStorage';
import {Icon} from './common/Icon';

interface ImageMessageProps {
  content: RemoteAttachmentContent;
}

const IMAGE_HEIGHT = 150;

export const ImageMessage: FC<ImageMessageProps> = ({content}) => {
  const {client} = useClientContext();
  const {url, scheme} = content;
  const [downloadedUri, setDownloadedUri] = useState<string | undefined>(
    mmkvStorage.getImageCache(url),
  );
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const {width} = useWindowDimensions();
  const imageWidth = width / 2 - 10;
  useEffect(() => {
    const getImageUri = async () => {
      if (!client) {
        return;
      }
      try {
        // Download image
        const res = await ReactNativeBlobUtil.config({
          fileCache: true,
        }).fetch('GET', url, {});

        const downloadedPath = `file://${res.path()}`;
        const decrypted = await client?.decryptAttachment({
          encryptedLocalFileUri: downloadedPath,
          metadata: content,
        });
        setDownloadedUri(decrypted.fileUri);
        mmkvStorage.saveImageCache(url, decrypted.fileUri);
      } catch (e) {
        setErrored(true);
      }
    };
    if (!downloadedUri) {
      getImageUri();
    }
  }, [downloadedUri, client, url, content, scheme]);

  const imageStyle = useMemo(() => {
    return {
      height: IMAGE_HEIGHT,
      width: imageWidth,
      borderRadius: 10,
    };
  }, [imageWidth]);

  if (!downloadedUri) {
    return (
      <Center style={imageStyle}>
        <Spinner />
      </Center>
    );
  }
  return (
    <>
      <FastImage
        resizeMode="cover"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        source={{
          uri: downloadedUri,
        }}
        style={imageStyle}
      />
      {!loaded && (
        <Center position={'absolute'} style={imageStyle}>
          <Spinner />
        </Center>
      )}
      {errored && (
        <Center position={'absolute'} style={imageStyle}>
          <Icon name="x-mark" size={30} color="red" />
        </Center>
      )}
    </>
  );
};
