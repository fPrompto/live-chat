import { useState } from 'react';
import { Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

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

    const { push } = useRouter();

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

  const sendButtonText = () => {
    if (!username && !displayname) {
      return 'Fazer Login'
    }
    return 'Enviar'
  };

  const clickButton = () => {
    if (!username && !displayname) {
      return push('/login');
    }
    if (value !== '') {
      sendMessage(`@@${username}@@${displayname}@@${value}`);
      setValue('');
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      clickButton();
    }
  };

  return (
    <div className='chat-input-div'>
      <div className='chat-input'>
        <Input
          placeholder={chatPlaceholder()}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => handleKeyPress(e)}
          value={value}
          disabled={disableInput()}
        />
      </div>
      <Button
        colorScheme='teal'
        onClick={() => clickButton()}
        className='send-button'
      >
        {sendButtonText()}
      </Button>
    </div>
  );
}

export default ChatInput;
