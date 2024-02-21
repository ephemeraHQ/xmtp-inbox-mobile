import {useQuery} from '@tanstack/react-query';
import {useMutation} from 'wagmi';
import {QueryKeys} from '../queries/QueryKeys';
import {useFramesClient} from './useFramesClient';

const urlRegex = /(https?:\/\/[^\s]+)/g;

export const useFrame = (messageText: string) => {
  const {data: client} = useFramesClient();
  const {data: frameData} = useQuery({
    queryKey: [QueryKeys.Frame, messageText],
    queryFn: async () => {
      if (!client || !messageText || messageText.length === 0) {
        return null;
      }
      // extract a url from message text
      const url = messageText.match(urlRegex);
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
      return {
        image,
        postUrl,
        url: data.url,
        buttons,
      };
    },
    enabled: Boolean(client),
  });

  const {mutateAsync, data} = useMutation({
    mutationKey: ['post_frame'],
    mutationFn: async (buttonIndex: number) => {
      if (!client || !frameData) {
        return null;
      }
      const signedPayload = await client.signFrameAction({
        frameUrl: frameData.url,
        buttonIndex,
        conversationTopic: 'foo',
        participantAccountAddresses: ['amal', 'bola'],
      });
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
