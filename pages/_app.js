import '../styles/globals.css';
import '@fontsource/varela-round';

import NearWalletProvider from '../components/NearWalletProvider';

import { getNearConfig } from '../config';
const config = getNearConfig('testnet');

function MyApp({ Component, pageProps }) {
  return (
    <NearWalletProvider config={config}>
      <Component {...pageProps} />
    </NearWalletProvider>
  );
}

export default MyApp;
