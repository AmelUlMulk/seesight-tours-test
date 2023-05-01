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
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
