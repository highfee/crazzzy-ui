"use client";
import { ThirdwebProvider } from "thirdweb/react";
import { Provider } from "react-redux";
import { store } from "@/context/store";

const Client = ({ children }) => {
  return (
    <ThirdwebProvider>
      <Provider store={store}>{children}</Provider>
    </ThirdwebProvider>
  );
};

export default Client;
