import {
  ContentTypeId,
  NativeContentCodec,
  NativeMessageContent,
  RemoteAttachmentCodec,
} from '@xmtp/react-native-sdk';

type GroupChangeContent = unknown;

class GroupChangeCodec implements NativeContentCodec<GroupChangeContent> {
  contentKey: 'groupChange' = 'groupChange';
  contentType: ContentTypeId = {
    authorityId: 'xmtp.org',
    typeId: 'group_membership_change',
    versionMajor: 1,
    versionMinor: 0,
  };

  encode(): NativeMessageContent {
    return {
      // remoteAttachment: content,
    };
  }

  decode(nativeContent: NativeMessageContent): GroupChangeContent {
    return nativeContent.text!;
  }

  fallback(): string | undefined {
    return 'This app doesn’t support attachments.';
  }
}

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
