"use client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

const Client = ({ children }) => {
  return <ThirdwebProvider activeChain="mumbai">{children}</ThirdwebProvider>;
};

export default Client;
