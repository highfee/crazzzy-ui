"use client";

import ContainerLayout from "@/components/Container";
import React, { useState } from "react";
import NFT from "./components/NFT";
import Enter from "./components/Enter";
import Participants from "./components/Participants";
import { useReadContract } from "thirdweb/react";
import { defineChain, getContract, resolveMethod } from "thirdweb";
import { raffleContract } from "@/utils/constants";
import { getNFT } from "thirdweb/extensions/erc721";
import { client } from "@/utils/constants";
import { Skeleton } from "@/components/ui/skeleton";

const RafflePage = ({ params }) => {
  const [nft, setNft] = useState(null);

  const { data, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("getRaffleDetails"),
    params: [params.id],
  });

  const contract = getContract({
    client,
    chain: defineChain(338),
    address: data && data[0],
  });

  const getSingleNFT = async () => {
    const NFT = await getNFT({
      contract,
      tokenId: data && data[1],
    });

    setNft(NFT.metadata);
  };

  getSingleNFT();

  return (
    <ContainerLayout>
      <div className="mt-20 flex gap-20 max-w-[1200px] mx-auto flex-wrap">
        <div className="flex-1 flex-grow-[2] basis-[300px">
          {isLoading ? (
            <Skeleton className="w-full h-[400px] bg-[#1d1d29] rounded-3xl" />
          ) : (
            <NFT nft={nft} isLoading={isLoading} />
          )}
        </div>
        <div className="flex-1 flex-grow-[3] flex flex-col gap-16">
          {isLoading ? (
            <div className="flex-1 flex-grow-[3] flex flex-col gap-16">
              <Skeleton className="w-full h-[400px] bg-[#1d1d29] rounded-3xl" />
              <Skeleton className="w-full h-[400px] bg-[#1d1d29] rounded-3xl" />
            </div>
          ) : (
            <div className="flex-1 flex-grow-[3] flex flex-col gap-16">
              <Enter data={data} isLoading={isLoading} nft={nft} />
              <Participants data={data} isLoading={isLoading} />
            </div>
          )}
        </div>
      </div>
    </ContainerLayout>
  );
};

export default RafflePage;
