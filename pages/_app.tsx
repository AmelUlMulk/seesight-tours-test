import '../styles/globals.css';

import type { AppProps } from 'next/app';

const Footer = dynamic(() => import('../layouts/Footer/footer'));

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';
import dynamic from 'next/dynamic';

const PaxProvider = dynamic(() => import('../utils/checkoutContext'));
import NavBar from '../layouts/NavBar';
import { useEffect, useState } from 'react';
const AppoloProvider = dynamic(() => import('../utils/dynamicAppolo'), {
  ssr: false
});
export default function App({ Component, pageProps }: AppProps) {
  const [delayAnalyticsLoad, setAnalyticsLoad] = useState<boolean>(false);

  useEffect(() => {
    const analyticsTimeout = setTimeout(() => {
      setAnalyticsLoad(true);
    }, 7000);
    return () => clearTimeout(analyticsTimeout);
  }, []);

  return (
    <>
      {process.env.NODE_ENV === 'production' && delayAnalyticsLoad && (
        <>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=UA-8671114-2"
          />
          <Script id="google-analytics" strategy="lazyOnload">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-8671114-2', {
          page_path: window.location.pathname,
          });
      `}
          </Script>
        </>
      )}

      <AppoloProvider>
        <NavBar />
        <PaxProvider>
          <Component {...pageProps} />
        </PaxProvider>
        <Footer />
        {/* <RecentConfirmBookings /> */}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        />
      </AppoloProvider>
    </>
  );
}
