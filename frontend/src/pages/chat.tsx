import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

import ChatInput from '../components/ChatInput';
import ChatMessages from '../components/ChatMessages';

function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = (value: string) => {
    socket?.emit('message', value);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:4001');
    setSocket(newSocket)
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

  return (
    <div>
      Chat!!!!
      <ChatInput sendMessage={sendMessage} />
      <ChatMessages messages={messages} />
    </div>
  );
}

export default Chat;
