import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';

function ChatInput({
  username,
  displayname,
  sendMessage,
}: {
  username: string;
  displayname: string;
  sendMessage: (value: string) => void;
}) {
  const [value, setValue] = useState('');

  return (
    <>
      <Input
        placeholder='Digite sua mensagem'
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <Button
        colorScheme='teal'
        onClick={() => {
          sendMessage(`@@${username}@@${displayname}@@${value}`);
          setValue('');
        }}
      >
        Enviar
      </Button>
    </>
  );
}

export default ChatInput;
