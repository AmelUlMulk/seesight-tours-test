import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer/footer';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import Newsletter from '../layouts/Newsletter/Newsletter';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />;
        <Newsletter />
        <Footer />
      </ApolloProvider>
    </>
  );
}
