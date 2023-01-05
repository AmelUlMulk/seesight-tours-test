import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer/footer';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />;
        <Footer />
      </ApolloProvider>
    </>
  );
}
