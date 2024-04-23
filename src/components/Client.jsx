"use client";
import { ThirdwebProvider } from "thirdweb/react";

const Client = ({ children }) => {
  return (
    <ThirdwebProvider>
      {children}
    </ThirdwebProvider>
  );
};

export default Client;
