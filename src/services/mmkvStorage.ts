import {MMKV} from 'react-native-mmkv';

enum MMKVKeys {
  // Ens Info
  ENS_NAME = 'ENS_NAME',
  ENS_AVATAR = 'ENS_AVATAR',

  // Message Requests
  MESSAGE_REQUESTS_COUNT = 'MESSAGE_REQUESTS_COUNT',

  // Drafts
  DRAFT_TEXT = 'DRAFT_TEXT',
  DRAFT_IMAGE = 'DRAFT_IMAGE',

  // Contacts
  CONSENT = 'CONSENT',

  // Conversations
  TOPIC_ADDRESSES = 'TOPIC_ADDRESSES',
  IMAGE_CACHE = 'IMAGE_CACHE',

  // Groups
  GROUP_NAME = 'GROUP_NAME',
  GROUP_ID_PUSH_SUBSCRIPTION = 'GROUP_ID_PUSH_SUBSCRIPTION',
  GROUP_PARTICIPANTS = 'GROUP_PARTICIPANTS',
  GROUP_CONSENT = 'GROUP_CONSENT',

  GROUP_FIRST_MESSAGE_CONTENT = 'GROUP_FIRST_MESSAGE_CONTENT',
}

export const mmkvstorage = new MMKV();

class MMKVStorage {
  storage = mmkvstorage;

  //#region Ens Name
  private getEnsNameKey = (address: string) => {
    return `${MMKVKeys.ENS_NAME}_${address}`;
  };

  saveEnsName = (address: string, ensName: string) => {
    return this.storage.set(this.getEnsNameKey(address), ensName);
  };

  getEnsName = (address: string) => {
    return this.storage.getString(this.getEnsNameKey(address));
  };

  clearEnsName = (address: string) => {
    return this.storage.delete(this.getEnsNameKey(address));
  };

  //#endregion Ens Name

  //#region Ens Avatar
  private getEnsAvatarKey = (address: string) => {
    return `${MMKVKeys.ENS_AVATAR}_${address?.toLowerCase()}`;
  };

  saveEnsAvatar = (address: string, ensAvatar: string) => {
    if (!address) {
      return;
    }
    if (!ensAvatar) {
      return this.clearEnsAvatar(address);
    }
    return this.storage.set(this.getEnsAvatarKey(address), ensAvatar);
  };

  getEnsAvatar = (address: string) => {
    if (!address) {
      return;
    }
    return this.storage.getString(this.getEnsAvatarKey(address));
  };

  clearEnsAvatar = (address: string) => {
    return this.storage.delete(this.getEnsAvatarKey(address));
  };

  //#endregion Ens Avatar

  //#region
  private getMessageRequestsCountKey = (address: string) => {
    return `${MMKVKeys.MESSAGE_REQUESTS_COUNT}_${address.toLowerCase()}`;
  };

  saveMessageRequestsCount = (
    address: string,
    messageRequestsCount: number,
  ) => {
    return this.storage.set(
      this.getMessageRequestsCountKey(address),
      messageRequestsCount,
    );
  };

  getMessageRequestsCount = (address: string) => {
    return this.storage.getNumber(this.getMessageRequestsCountKey(address));
  };

  clearMessageRequestsCount = (address: string) => {
    return this.storage.delete(this.getMessageRequestsCountKey(address));
  };

  //#endregion

  //#region Draft Text

  private getDraftTextKey = (address: string, topic: string) => {
    return `${
      MMKVKeys.DRAFT_TEXT
    }_${address.toLowerCase()}_${topic.toLowerCase()}`;
  };

  saveDraftText = (address: string, topic: string, draftText: string) => {
    return this.storage.set(this.getDraftTextKey(address, topic), draftText);
  };

  getDraftText = (address: string, topic: string) => {
    return this.storage.getString(this.getDraftTextKey(address, topic));
  };

  clearDraftText = (address: string, topic: string) => {
    return this.storage.delete(this.getDraftTextKey(address, topic));
  };

  //#endregion Draft Text

  //#region Draft Image

  private getDraftImageKey = (address: string, topic: string) => {
    return `${
      MMKVKeys.DRAFT_IMAGE
    }_${address.toLowerCase()}_${topic.toLowerCase()}`;
  };

  saveDraftImage = (address: string, topic: string, draftImageUri: string) => {
    return this.storage.set(
      this.getDraftImageKey(address, topic),
      draftImageUri,
    );
  };

  getDraftImage = (address: string, topic: string) => {
    return this.storage.getString(this.getDraftImageKey(address, topic));
  };

  clearDraftImage = (address: string, topic: string) => {
    return this.storage.delete(this.getDraftImageKey(address, topic));
  };

  //#endregion Draft Image

  //#region Consent

  private getConsentKey = (address: string, peerAddress: string) => {
    return `${
      MMKVKeys.CONSENT
    }_${address.toLowerCase()}_${peerAddress.toLowerCase()}`;
  };

  saveConsent = (address: string, peerAddress: string, consent: boolean) => {
    return this.storage.set(this.getConsentKey(address, peerAddress), consent);
  };

  getConsent = (address: string, peerAddress: string) => {
    return this.storage.getBoolean(this.getConsentKey(address, peerAddress));
  };

  clearConsent = (address: string, peerAddress: string) => {
    return this.storage.delete(this.getConsentKey(address, peerAddress));
  };

  //#endregion Consent

  //#region Topic Addresses

  private getTopicAddressesKey = (topic: string) => {
    return `${MMKVKeys.TOPIC_ADDRESSES}_${topic.toLowerCase()}`;
  };

  saveTopicAddresses = (topic: string, topicAddresses: string[]) => {
    return this.storage.set(
      this.getTopicAddressesKey(topic),
      topicAddresses.join(','),
    );
  };

  getTopicAddresses = (topic: string): string[] => {
    return (
      this.storage.getString(this.getTopicAddressesKey(topic))?.split(',') ?? []
    );
  };

  clearTopicAddresses = (topic: string) => {
    return this.storage.delete(this.getTopicAddressesKey(topic));
  };

  //#region Clear All

  clearAll = () => {
    return this.storage.clearAll();
  };

  //#endregion Clear All

  // #region Image cache

  private getImageCacheKey = (uri: string) => {
    return `${MMKVKeys.IMAGE_CACHE}_${uri}`;
  };

  saveImageCache = (uri: string, decryptedPath: string) => {
    return this.storage.set(this.getImageCacheKey(uri), decryptedPath);
  };

  getImageCache = (uri: string) => {
    return this.storage.getString(this.getImageCacheKey(uri));
  };

  clearImageCache = (uri: string) => {
    return this.storage.delete(this.getImageCacheKey(uri));
  };

  // #endregion

  // #region Group Name

  private getGroupNameKey = (address: string, topic: string) => {
    return `${MMKVKeys.GROUP_NAME}_${address}_${topic}`;
  };

  saveGroupName = (address: string, topic: string, groupName: string) => {
    return this.storage.set(this.getGroupNameKey(address, topic), groupName);
  };

  getGroupName = (address: string, topic: string) => {
    return this.storage.getString(this.getGroupNameKey(address, topic));
  };

  clearGroupName = (address: string, topic: string) => {
    return this.storage.delete(this.getGroupNameKey(address, topic));
  };

  //#endregion Group Name

  //#region Group Id Push Subscription
  private getGroupIdPushSubscriptionKey = (topic: string) => {
    return `${MMKVKeys.GROUP_ID_PUSH_SUBSCRIPTION}_${topic}`;
  };

  saveGroupIdPushSubscription = (topic: string, pushSubscription: boolean) => {
    return this.storage.set(
      this.getGroupIdPushSubscriptionKey(topic),
      pushSubscription,
    );
  };

  getGroupIdPushSubscription = (topic: string) => {
    return this.storage.getBoolean(this.getGroupIdPushSubscriptionKey(topic));
  };

  clearGroupIdPushSubscription = (topic: string) => {
    return this.storage.delete(this.getGroupIdPushSubscriptionKey(topic));
  };

  //#endregion Group Id Push Subscription

  //#region Group Participants

  private getGroupParticipantsKey = (topic: string) => {
    return `${MMKVKeys.GROUP_PARTICIPANTS}_${topic}`;
  };

  saveGroupParticipants = (topic: string, participants: string[]) => {
    return this.storage.set(
      this.getGroupParticipantsKey(topic),
      participants.join(','),
    );
  };

  getGroupParticipants = (topic: string): string[] => {
    return (
      this.storage.getString(this.getGroupParticipantsKey(topic))?.split(',') ??
      []
    );
  };

  clearGroupParticipants = (topic: string) => {
    return this.storage.delete(this.getGroupParticipantsKey(topic));
  };

  //#endregion Group Participants

  //#region Group Consent

  private getGroupConsentKey = (id: string) => {
    return `${MMKVKeys.GROUP_CONSENT}_${id}`;
  };

  saveGroupConsent = (
    id: string,
    consent: 'allowed' | 'denied' | 'unknown',
  ) => {
    return this.storage.set(this.getGroupConsentKey(id), consent);
  };

  getGroupConsent = (id: string) => {
    return this.storage.getString(this.getGroupConsentKey(id)) as
      | 'allowed'
      | 'denied'
      | 'unknown';
  };

  clearGroupConsent = (id: string) => {
    return this.storage.delete(this.getGroupConsentKey(id));
  };

  //#region Group First Message

  private getGroupFirstMessageContentKey = (topic: string) => {
    return `${MMKVKeys.GROUP_FIRST_MESSAGE_CONTENT}_${topic}`;
  };

  saveGroupFirstMessageContent = (topic: string, message: string) => {
    return this.storage.set(
      this.getGroupFirstMessageContentKey(topic),
      message,
    );
  };

  getGroupFirstMessageContent = (topic: string) => {
    return this.storage.getString(this.getGroupFirstMessageContentKey(topic));
  };

  clearGroupFirstMessageContent = (topic: string) => {
    return this.storage.delete(this.getGroupFirstMessageContentKey(topic));
  };

  //#endregion Group First Message
}

export const mmkvStorage = new MMKVStorage();
