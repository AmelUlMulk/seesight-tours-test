import '../styles/globals.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import PrivacyPolicy from '../layouts/component/PrivacyPolicy';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NavBar />
      <PrivacyPolicy />
      <Component {...pageProps} />;
    </>
  );
}
