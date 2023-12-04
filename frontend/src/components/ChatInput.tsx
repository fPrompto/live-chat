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

  const disableInput = (): boolean => {
    if (!username && !displayname) {
      return true;
    }
    return false;
  }

  const chatPlaceholder = (): string => {
    if (!username && !displayname) {
      return 'Faça Login antes de enviar uma mensagem';
    }
    return 'Digite sua mensagem';
  };

  return (
    <div>
      <Input
        placeholder={chatPlaceholder()}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        disabled={disableInput()}
      />
      <Button
        colorScheme='teal'
        onClick={() => {
          if (value !== '') {
            sendMessage(`@@${username}@@${displayname}@@${value}`);
            setValue('');
          }
        }}
      >
        Enviar
      </Button>
    </div>
  );
}

export default ChatInput;
