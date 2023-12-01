import { useState } from 'react';

function ChatInput({ sendMessage }: { sendMessage: (value: string) => void }) {
  const [value, setValue] = useState('');
  return (
    <>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder='digite sua mensagem'
        value={value}
      />
      <button onClick={() => sendMessage(value)}>Enviar</button>
    </>
  );
}

export default ChatInput;
