import '../styles/globals.css';
import 'react-calendar/dist/Calendar.css';
import type { AppProps } from 'next/app';
import NavBar from '../layouts/NavBar';
import Footer from '../layouts/Footer/footer';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecentConfirmBookings from '../components/Notifications/recentBookings';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    //This is done so that the page analytics are not called twice, once intially and once when the component loads on reload.
    window.history.replaceState({}, document.title);
    const analyticDelayedCall = setTimeout(() => {
      if (
        (router.pathname === '/' && router?.query?.prevPath?.length) ??
        0 < 0
      ) {
        return;
      }
      // @ts-ignore
      if (window.gtag) {
        // @ts-ignore
        window.gtag('config', 'UA-8671114-2', {
          page_title: router.pathname === undefined ? '/' : router.pathname,
          page_path: router.pathname === undefined ? '/' : router.pathname
        });
      }
    }, 0);
    return () => clearTimeout(analyticDelayedCall);
  }, [router.pathname, router.query]);

  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            strategy="lazyOnload"
            src="https://www.googletagmanager.com/gtag/js?id=UA-8671114-2"
          />
          <Script
            id="google-analytics"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'UA-8671114-2', {
                    page_path: window.location.pathname,
                    });
                `
            }}
          />
        </>
      )}

      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
        <RecentConfirmBookings />
      </ApolloProvider>
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
    </>
  );
}
