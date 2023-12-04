import React, { PropsWithChildren, useState } from 'react';
import ProviderI from '@/interfaces/ProviderI';
import ChatContext, { DEFAULT_VALUE } from './ChatContext';

const ChatProvider: React.FC<PropsWithChildren<ProviderI>> = ({ children }) => {
  const [userData, setUserData] = useState(DEFAULT_VALUE.userData);

  const contextValue = {
    userData,
    setUserData,
  };

  return (
    <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>
  );
};

export default ChatProvider;
