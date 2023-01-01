import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import { useApollo } from '../src/apollo';
import {ApolloProvider} from "@apollo/client"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />;
    </>
  );
}
