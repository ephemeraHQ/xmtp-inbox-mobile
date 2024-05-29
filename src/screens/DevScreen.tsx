import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {Box, Container, Pressable, ScrollView} from 'native-base';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useAddress} from '../hooks/useAddress';
import {useClient} from '../hooks/useClient';
import {translate} from '../i18n';
import {QueryKeys} from '../queries/QueryKeys';

interface RequestItemProps {
  title: string;
  request: () => Promise<any>;
}

const RequestItem: FC<RequestItemProps> = ({title, request}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown>(null);
  const [err, setErr] = useState<unknown>(null);

  useEffect(() => {
    request()
      .then((res: any) => {
        setData(res);
        setLoading(false);
      })
      .catch((resErr: any) => {
        setErr(resErr);
        setLoading(false);
      });
  }, [request]);

  const d = useMemo(() => {
    const cache: string[] = [];
    return JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;

        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
  }, [data]);

  return (
    <Container>
      <Text typography="text-title/bold">{title}</Text>
      <Text typography="text-base/regular" selectable>
        Loading: {String(loading)}
      </Text>
      <Text typography="text-base/regular" selectable>
        Data: {JSON.stringify(d)}
      </Text>
      <Text typography="text-base/regular" selectable>
        Error: {JSON.stringify(err)}
      </Text>
    </Container>
  );
};

interface DataItemProps {
  title: string;
  data: unknown;
}

const DataItem: FC<DataItemProps> = ({title, data}) => {
  const d = useMemo(() => {
    const cache: string[] = [];
    return JSON.stringify(data, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        // Duplicate reference found, discard key
        if (cache.includes(value)) return;

        // Store value in our collection
        cache.push(value);
      }
      return value;
    });
  }, [data]);
  return (
    <Container>
      <Text typography="text-title/bold">{title}</Text>
      <Text typography="text-base/regular">Data:</Text>
      <Text typography="text-base/regular" selectable>
        {d}
      </Text>
    </Container>
  );
};

export const DevScreen = () => {
  const {client} = useClient();
  const {address} = useAddress();
  const {goBack} = useNavigation();
  const queryClient = useQueryClient();
  const list = queryClient.getQueriesData({queryKey: [QueryKeys.List]});
  const conversationMessages = queryClient
    .getQueriesData({
      queryKey: [QueryKeys.ConversationMessages],
    })
    .map(x => x[1]);
  const groupParticipants = queryClient
    .getQueriesData({
      queryKey: [QueryKeys.GroupParticipants],
    })
    .map(x => x[1]);
  const groupMessages = queryClient
    .getQueriesData({
      queryKey: [QueryKeys.GroupMessages],
    })
    .map(x => x[1]);

  const getConversations = useCallback(async () => {
    return client?.conversations.list();
  }, [client]);

  const getGroups = useCallback(async () => {
    return client?.conversations.listGroups();
  }, [client]);

  const getContacts = useCallback(async () => {
    return client?.contacts.consentList();
  }, [client]);

  return (
    <Screen
      title={
        <Text typography="text-lg/heavy" textAlign={'center'}>
          {translate('dev_screen')}
        </Text>
      }
      left={
        <Pressable onPress={goBack}>
          <Icon name="chevron-left-thick" />
        </Pressable>
      }
      right={<Box />}>
      <Box flex={1}>
        <ScrollView height={'100%'} flex={1}>
          <DataItem title={translate('client')} data={client} />
          <DataItem title={translate('address')} data={address} />
          <DataItem title={translate('list_queries')} data={list} />
          <DataItem
            title={translate('conversation_messages_queries')}
            data={conversationMessages[1]}
          />
          <DataItem
            title={translate('group_members_queries')}
            data={groupParticipants[1]}
          />
          <DataItem
            title={translate('group_messages_queries')}
            data={groupMessages[1]}
          />
          <RequestItem
            title={translate('get_conversations')}
            request={getConversations}
          />
          <RequestItem title={translate('get_groups')} request={getGroups} />
          <RequestItem
            title={translate('get_contacts')}
            request={getContacts}
          />
          <Box height={200} />
        </ScrollView>
      </Box>
    </Screen>
  );
};
