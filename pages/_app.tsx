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
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
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

      <ApolloProvider client={client}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
        <RecentConfirmBookings />
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
      </ApolloProvider>
    </>
  );
}
