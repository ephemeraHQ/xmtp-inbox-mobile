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

const storage = new MMKV();

//#region Ens Name
export const getEnsNameKey = (address: string) => {
  return `${MMKVKeys.ENS_NAME}_${address}`;
};

export const saveEnsName = (address: string, ensName: string) => {
  return storage.set(getEnsNameKey(address), ensName);
};

export const getEnsName = (address: string) => {
  return storage.getString(getEnsNameKey(address));
};

export const clearEnsName = (address: string) => {
  //
  return storage.delete(getEnsNameKey(address));
};
//#endregion Ens Name

//#region Ens Avatar
export const getEnsAvatarKey = (address: string) => {
  return `${MMKVKeys.ENS_AVATAR}_${address?.toLowerCase()}`;
};

export const saveEnsAvatar = (address: string, ensAvatar: string) => {
  return storage.set(getEnsAvatarKey(address), ensAvatar);
};

export const getEnsAvatar = (address: string) => {
  return storage.getString(getEnsAvatarKey(address));
};

export const clearEnsAvatar = (address: string) => {
  return storage.delete(getEnsAvatarKey(address));
};
//#endregion Ens Avatar

//#region
export const getMessageRequestsCountKey = (address: string) => {
  return `${MMKVKeys.MESSAGE_REQUESTS_COUNT}_${address.toLowerCase()}`;
};

export const saveMessageRequestsCount = (
  address: string,
  messageRequestsCount: number,
) => {
  return storage.set(getMessageRequestsCountKey(address), messageRequestsCount);
};

export const getMessageRequestsCount = (address: string) => {
  return storage.getNumber(getMessageRequestsCountKey(address));
};

export const clearMessageRequestsCount = (address: string) => {
  return storage.delete(getMessageRequestsCountKey(address));
};
//#endregion

//#region Draft Text
export const getDraftTextKey = (address: string, topic: string) => {
  return `${
    MMKVKeys.DRAFT_TEXT
  }_${address.toLowerCase()}_${topic.toLowerCase()}`;
};

export const saveDraftText = (
  address: string,
  topic: string,
  draftText: string,
) => {
  return storage.set(getDraftTextKey(address, topic), draftText);
};

export const getDraftText = (address: string, topic: string) => {
  return storage.getString(getDraftTextKey(address, topic));
};

export const clearDraftText = (address: string, topic: string) => {
  return storage.delete(getDraftTextKey(address, topic));
};

//#endregion Draft Text

//#region Draft Image
export const getDraftImageKey = (address: string, topic: string) => {
  return `${
    MMKVKeys.DRAFT_IMAGE
  }_${address.toLowerCase()}_${topic.toLowerCase()}`;
};

export const saveDraftImage = (
  address: string,
  topic: string,
  draftImageUri: string,
) => {
  return storage.set(getDraftImageKey(address, topic), draftImageUri);
};

export const getDraftImage = (address: string, topic: string) => {
  return storage.getString(getDraftImageKey(address, topic));
};

export const clearDraftImage = (address: string, topic: string) => {
  return storage.delete(getDraftImageKey(address, topic));
};
//#endregion Draft Image

//#region Consent
export const getConsentKey = (address: string, peerAddress: string) => {
  return `${
    MMKVKeys.CONSENT
  }_${address.toLowerCase()}_${peerAddress.toLowerCase()}`;
};

export const saveConsent = (
  address: string,
  peerAddress: string,
  consent: boolean,
) => {
  return storage.set(getConsentKey(address, peerAddress), consent);
};

export const getConsent = (address: string, peerAddress: string) => {
  return storage.getBoolean(getConsentKey(address, peerAddress));
};

export const clearConsent = (address: string, peerAddress: string) => {
  return storage.delete(getConsentKey(address, peerAddress));
};
//#endregion Consent

//#region Topic Addresses
export const getTopicAddressesKey = (topic: string) => {
  return `${MMKVKeys.TOPIC_ADDRESSES}_${topic.toLowerCase()}`;
};

export const saveTopicAddresses = (topic: string, topicAddresses: string[]) => {
  return storage.set(getTopicAddressesKey(topic), topicAddresses.join(','));
};

export const getTopicAddresses = (topic: string): string[] => {
  return storage.getString(getTopicAddressesKey(topic))?.split(',') ?? [];
};

export const clearTopicAddresses = (topic: string) => {
  return storage.delete(getTopicAddressesKey(topic));
};

//#region Clear All

export const clearAll = () => {
  return storage.clearAll();
};

//#endregion Clear All

// #region Image cache
export const getImageCacheKey = (uri: string) => {
  return `${MMKVKeys.IMAGE_CACHE}_${uri}`;
};

export const saveImageCache = (uri: string, decryptedPath: string) => {
  return storage.set(getImageCacheKey(uri), decryptedPath);
};

export const getImageCache = (uri: string) => {
  return storage.getString(getImageCacheKey(uri));
};

export const clearImageCache = (uri: string) => {
  return storage.delete(getImageCacheKey(uri));
};
// #endregion

// #region Group Name

export const getGroupNameKey = (address: string, groupId: string) => {
  return `${MMKVKeys.GROUP_NAME}_${address}_${groupId}`;
};

export const saveGroupName = (
  address: string,
  groupId: string,
  groupName: string,
) => {
  return storage.set(getGroupNameKey(address, groupId), groupName);
};

export const getGroupName = (address: string, groupId: string) => {
  return storage.getString(getGroupNameKey(address, groupId));
};

export const clearGroupName = (address: string, groupId: string) => {
  return storage.delete(getGroupNameKey(address, groupId));
};

// #endregion Group Name
