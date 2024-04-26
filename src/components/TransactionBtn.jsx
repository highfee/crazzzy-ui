"use client";

import {
  ConnectButton,
  TransactionButton,
  useActiveWallet,
  useActiveWalletChain,
} from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

import { client } from "@/utils/constants";

import { cronosTestnet } from "@/utils/constants";

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

const TransactionBtn = ({
  text,
  style,
  transaction,
  onTransactionConfirmed,
  onError,
}) => {
  const wallet = useActiveWallet();
  const chainId = useActiveWalletChain();

  return (
    <div>
      {wallet && chainId.id == cronosTestnet.id ? (
        <TransactionButton
          transaction={transaction}
          onTransactionConfirmed={onTransactionConfirmed}
          onError={onError}
          style={style}
        >
          {text}
        </TransactionButton>
      ) : (
        <ConnectButton
          connectButton={{
            style: {
              padding: "20px",
              border: "1px solid white",
              width: "100%",
              marginTop: "30px",
              borderRadius: "50px",
            },
          }}
          client={client}
          wallets={wallets}
          chain={cronosTestnet}
          switchButton={{
            label: "Wrong Network",
            style: {
              padding: "20px",
              border: "1px solid white",
              width: "100%",
              marginTop: "30px",
              borderRadius: "50px",
            },
          }}
        />
      )}
    </div>
  );
};

export default TransactionBtn;
