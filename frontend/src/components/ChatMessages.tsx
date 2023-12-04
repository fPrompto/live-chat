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
import { parse } from 'path';

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

  return (
    <div>
      <Card>
        <CardHeader>
          <Heading size='md'>Mensagens</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            {messages.map((text, i) => {
              const parse = parseString(text);
              const { displayname, username, message } = parse;
              return (
                <Box key={i}>
                  <Heading size='sm'>
                    {`${displayname} - @${
                      username
                    }`}
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {message}
                  </Text>
                </Box>
              );
            })}
          </Stack>
        </CardBody>
      </Card>
    </div>
  );
}

export default ChatMessages;
