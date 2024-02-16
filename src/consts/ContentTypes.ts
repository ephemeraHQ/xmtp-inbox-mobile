import {GroupChangeCodec, RemoteAttachmentCodec} from '@xmtp/react-native-sdk';

export const ContentTypes = {
  Text: 'xmtp.org/text:1.0',
  RemoteStaticAttachment: 'xmtp.org/remoteStaticAttachment:1.0',
  GroupMembershipChange: 'xmtp.org/group_membership_change:1.0',
};

export const supportedContentTypes = [
  new RemoteAttachmentCodec(),
  new GroupChangeCodec(),
];

export type SupportedContentTypes = typeof supportedContentTypes;
