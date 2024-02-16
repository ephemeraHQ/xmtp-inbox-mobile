import {useQuery} from '@tanstack/react-query';
import {FramesClient} from '@xmtp/frames-client';
import {QueryKeys} from '../queries/QueryKeys';
import {useClient} from './useClient';

export const useFramesClient = () => {
  const {client} = useClient();

  return useQuery({
    queryKey: [QueryKeys.FramesClient, client?.address],
    queryFn: async () => {
      if (!client) {
        return;
      }
      return new FramesClient(client);
    },
    enabled: !!client,
  });
};
