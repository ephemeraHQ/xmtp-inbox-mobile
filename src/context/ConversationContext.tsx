import {createContext} from 'react';

export interface ConversationContextValue {
  setReply: (id: string) => void;
  clearReply: () => void;

  setReaction: (id: string) => void;
  clearReaction: () => void;
}

export const ConversationContext = createContext<ConversationContextValue>({
  setReply: () => {
    throw new Error('not implemented');
  },
  clearReply: () => {
    throw new Error('setClient not implemented');
  },
  setReaction: () => {
    throw new Error('setClient not implemented');
  },
  clearReaction: () => {
    throw new Error('setClient not implemented');
  },
});
