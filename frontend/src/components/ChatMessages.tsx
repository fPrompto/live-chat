import { useEffect, useRef } from 'react';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  StackDivider,
  Box,
} from '@chakra-ui/react';

function ChatMessages({ messages }: { messages: string[] }) {
  const parseString = (input: string) => {
    const regex = /@@(.*?)@@(.*?)@@(.*)/;
    const match = input.match(regex);

    if (match) {
      const [, username, displayname, message] = match;
      return {
        username,
        displayname,
        message,
      };
    } else {
      return {
        username: 'error',
        displayname: 'error',
        message: 'error',
      };
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size='md'>Mensagens</Heading>
        </CardHeader>

        <CardBody className='messages-box'>
          <Stack divider={<StackDivider />} spacing='4'>
            {messages.map((text, i) => {
              const parse = parseString(text);
              const { displayname, username, message } = parse;
              return (
                <Box key={i}>
                  <Heading size='xs'>{`${displayname} @${username}`}</Heading>
                  <Text pt='2' fontSize='lg'>
                    {message}
                  </Text>
                </Box>
              );
            })}
            <div ref={messagesEndRef} />
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChatMessages;
