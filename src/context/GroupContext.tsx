import {Group} from '@xmtp/react-native-sdk';
import {createContext} from 'react';
import {SupportedContentTypes} from '../consts/ContentTypes';

export interface GroupContextValue {
  group: Group<SupportedContentTypes> | null;
  setReplyId: (id: string) => void;
  clearReplyId: () => void;
  scrollToMessage: (id: string) => void;
}

export const GroupContext = createContext<GroupContextValue>({
  group: null,
  setReplyId: () => {
    throw new Error('Not Implemented');
  },
  clearReplyId: () => {
    throw new Error('Not Implemented');
  },
  scrollToMessage: () => {
    throw new Error('Not Implemented');
  },
});
