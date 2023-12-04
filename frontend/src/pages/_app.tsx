// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from '@/context/ChatProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ChatProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ChatProvider>
  );
}

export default MyApp;
