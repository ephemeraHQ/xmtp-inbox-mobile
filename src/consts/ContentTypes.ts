import {
  GroupUpdatedCodec,
  ReactionCodec,
  RemoteAttachmentCodec,
  ReplyCodec,
} from '@xmtp/react-native-sdk';

export const ContentTypes = {
  Text: 'xmtp.org/text:1.0',
  RemoteStaticAttachment: 'xmtp.org/remoteStaticAttachment:1.0',
  GroupUpdated: 'xmtp.org/group_updated:1.0',
  Reaction: 'xmtp.org/reaction:1.0',
  Reply: 'xmtp.org/reply:1.0',
};

export const supportedContentTypes = [
  new RemoteAttachmentCodec(),
  new GroupUpdatedCodec(),
  new ReactionCodec(),
  new ReplyCodec(),
];

export type SupportedContentTypes = typeof supportedContentTypes;
