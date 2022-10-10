import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import { Header, Footer } from '../components';
import { NFTProvider } from '../context/NFTContext';

const MyApp = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <Header />
      <Component {...pageProps} />
      <Footer />
      <Script
        src="https://kit.fontawesome.com/fd05772b45.js"
        crossOrigin="anonymous"
      />
    </ThemeProvider>
  </NFTProvider>
);

export default MyApp;
