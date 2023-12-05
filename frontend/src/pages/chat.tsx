import { useEffect, useState, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';
import ChatContext from '@/context/ChatContext';

function Chat() {
  const { userData } = useContext(ChatContext);

  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:4001');
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };

  useEffect(() => {
    socket?.on('message', messageListener);
    return () => {
      socket?.off('message', messageListener);
    };
  }, [messageListener]);

  useEffect(() => {
    console.log('username:', userData.username);
    console.log('Name:', userData.displayname);
  }, []);

  return (
    <div className='chat-main-div'>
      <ChatMessages messages={messages} />
      <ChatInput
        username={userData.username}
        displayname={userData.displayname}
        sendMessage={sendMessage}
      />
    </div>
  );
}

export default Chat;
