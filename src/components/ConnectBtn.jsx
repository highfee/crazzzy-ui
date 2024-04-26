import { ConnectButton } from "thirdweb/react";
import { createWallet, inAppWallet } from "thirdweb/wallets";

import { client } from "@/utils/constants";

import { cronosTestnet } from "@/utils/constants";

const wallets = [
  // inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

function ConnectBtn() {
  return (
    <div>
      <ConnectButton
        client={client}
        wallets={wallets}
        chain={cronosTestnet}
        switchButton={{
          label: "Wrong Network",
        }}
      />
    </div>
  );
}

export default ConnectBtn;
