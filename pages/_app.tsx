import '../styles/globals.css';

import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer/footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecentConfirmBookings from '../components/Notifications/recentBookings';
import Script from 'next/script';
import { PaxProivder } from '../utils/checkoutContext';
import dynamic from 'next/dynamic';
const AppoloProvider = dynamic(() => import('../utils/dynamicAppolo'), {
  ssr: false
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=UA-8671114-2"
            defer
            async
          />
          <Script id="google-analytics" strategy="lazyOnload" defer async>
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
        <PaxProivder>
          <Component {...pageProps} />
        </PaxProivder>
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
