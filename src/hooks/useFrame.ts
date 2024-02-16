import {useQuery} from '@tanstack/react-query';
import {useMutation} from 'wagmi';
import {QueryKeys} from '../queries/QueryKeys';
import {useFramesClient} from './useFramesClient';

export const useFrame = (messageText: string) => {
  const {data: client} = useFramesClient();
  const {data: frameData} = useQuery({
    queryKey: [QueryKeys.Frame, messageText],
    queryFn: async () => {
      console.log('messageText', messageText, !client);
      if (!client || !messageText || messageText.length === 0) {
        return null;
      }
      // extract a url from message text
      const url = messageText.match(/(https?:\/\/[^\s]+)/g);
      console.log('url', url);
      if (!url?.[0]) {
        return null;
      }
      const metadata = client.proxy.readMetadata(url[0]);
      return metadata;
    },
    select: data => {
      if (!data) {
        return null;
      }
      const postUrl = data?.extractedTags['fc:frame:post_url'];
      const image = data?.extractedTags['fc:frame:image'];
      const buttons: string[] = [];
      Object.keys(data?.extractedTags ?? {}).forEach(key => {
        if (key.includes('fc:frame:button')) {
          buttons.push(data?.extractedTags[key]);
        }
      });
      console.log('postUrl', postUrl, data);
      return {
        image,
        postUrl,
        url: data.url,
        buttons,
      };
    },
  });

  const {mutateAsync, data} = useMutation({
    mutationKey: ['post_frame'],
    mutationFn: async (buttonIndex: number) => {
      if (!client || !frameData) {
        return null;
      }
      console.log('frameData1', frameData);
      const signedPayload = await client.signFrameAction({
        frameUrl: frameData.url,
        buttonIndex,
        conversationTopic: 'foo',
        participantAccountAddresses: ['amal', 'bola'],
      });
      console.log('signedPayload', signedPayload);
      const response = await client.proxy.post(
        frameData.postUrl,
        signedPayload,
      );
      if (!response) {
        return null;
      }
      const postUrl = response?.extractedTags['fc:frame:post_url'];
      const image = response?.extractedTags['fc:frame:image'];
      const buttons: string[] = [];
      Object.keys(response?.extractedTags ?? {}).forEach(key => {
        if (key.includes('fc:frame:button')) {
          buttons.push(response?.extractedTags[key]);
        }
      });
      console.log('postUrl', postUrl, data);
      return {
        image,
        postUrl,
        url: response.url,
        buttons,
      };
    },
  });

  return {
    frameData: data ?? frameData,
    postFrame: mutateAsync,
  };
};
