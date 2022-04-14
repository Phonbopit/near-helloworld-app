import React, { useState, useEffect, createContext } from 'react';

import { connect, keyStores, Contract, WalletConnection } from 'near-api-js';

const initialState = {
  wallet: {},
  contract: {},
  currentAccount: {
    accountId: '',
    balance: ''
  },
  signIn: () => {},
  signOut: () => {},
  isSignIn: false,
  loadAccount: () => {}
};

export const WalletContext = createContext(initialState);

const NearWalletProvider = ({ config, children }) => {
  const [
    { wallet, account, contract, isSignIn, signIn, signOut, loadAccount },
    setState
  ] = useState(initialState);

  useEffect(() => {
    async function init() {
      const near = await connect({
        ...config,
        keyStore: new keyStores.BrowserLocalStorageKeyStore()
      });

      const wallet = new WalletConnection(near, 'helloworld');

      let accountId = wallet.getAccountId();

      if (accountId) {
        const accountState = await wallet.account().state();

        // initial contract.
        const contract = await new Contract(
          wallet.account(),
          config.contractName,
          {
            viewMethods: ['get_hello'],
            changeMethods: ['hello']
          }
        );

        setState({
          wallet,
          contract,
          account: {
            accountId,
            balance: accountState.amount
          },
          signIn: () => {
            wallet.requestSignIn(config.contractName);
          },
          signOut: () => wallet.signOut(),
          isSignedIn: wallet.isSignedIn(),
          loadAccount: (accountId) => () => near.account(accountId)
        });
      }
    }

    init();
  }, [config]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        contract,
        account,
        loadAccount,
        signIn,
        signOut,
        isSignIn
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default NearWalletProvider;
