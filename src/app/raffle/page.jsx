import ContainerLayout from "@/components/Container";
import React from "react";
import NFT from "./components/NFT";
import Enter from "./components/Enter";
import Participants from "./components/Participants";

const page = () => {
  return (
    <ContainerLayout>
      <div className="mt-20 flex gap-20 max-w-[1200px] mx-auto flex-wrap">
        <div className="flex-1 flex-grow-[2] basis-[300px">
          <NFT />
        </div>
        <div className="flex-1 flex-grow-[3] flex flex-col gap-16">
          <Enter />
          <Participants />
        </div>
      </div>
    </ContainerLayout>
  );
};

export default page;
