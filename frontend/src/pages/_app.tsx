// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react';
import ChatProvider from '@/context/ChatProvider';

import '../css/app.css';
import '../css/login.css';

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return (
    <ChatProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ChatProvider>
  );
}

export default MyApp;
