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
}

class MMKVStorage {
  storage = new MMKV();

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

  private getGroupNameKey = (address: string, groupId: string) => {
    return `${MMKVKeys.GROUP_NAME}_${address}_${groupId}`;
  };

  saveGroupName = (address: string, groupId: string, groupName: string) => {
    return this.storage.set(this.getGroupNameKey(address, groupId), groupName);
  };

  getGroupName = (address: string, groupId: string) => {
    return this.storage.getString(this.getGroupNameKey(address, groupId));
  };

  clearGroupName = (address: string, groupId: string) => {
    return this.storage.delete(this.getGroupNameKey(address, groupId));
  };

  //#endregion Group Name
}

export const mmkvStorage = new MMKVStorage();

// #endregion Group Name
