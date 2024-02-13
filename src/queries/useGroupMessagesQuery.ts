import {useQuery} from '@tanstack/react-query';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from './QueryKeys';

export const useGroupMessagesQuery = (id: string) => {
  const {group} = useGroup(id);

  return useQuery<DecodedMessage<SupportedContentTypes>[]>({
    queryKey: [QueryKeys.GroupMessages, id],
    queryFn: () =>
      group?.messages() as Promise<DecodedMessage<SupportedContentTypes>[]>,
    enabled: !!group,
  });
};
