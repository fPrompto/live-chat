import React, { createContext } from 'react';

type ChatType = {
  username: string;
  displayname: string;
};

type PropsChatContext = {
  userData: ChatType;
  setUserData: React.Dispatch<React.SetStateAction<ChatType>>;
};

export const DEFAULT_VALUE = {
  userData: {
    username: '',
    displayname: '',
  },
  setUserData: () => {},
};

const ChatContext = createContext<PropsChatContext>(DEFAULT_VALUE);

export default ChatContext;
