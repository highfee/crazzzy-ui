"use client";
import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  phantomWallet,
  localWallet,
} from "@thirdweb-dev/react";
import { Cronos } from "@thirdweb-dev/chains";

const Client = ({ children }) => {
  return (
    <ThirdwebProvider
      clientId="1639134fe6d77249631aa361f3a9cbe1"
      activeChain={Cronos}
      supportedWallets={[
        metamaskWallet({
          recommended: true,
        }),
        coinbaseWallet(),
        walletConnect(),
        trustWallet(),
        phantomWallet(),
        localWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
};

export default Client;
