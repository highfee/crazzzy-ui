"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React from "react";

const NFT = ({ nft, isLoading }) => {
  const nftImageUrl = nft?.image
    ? "https://ipfs.io/ipfs/" + nft?.image?.split("ipfs://")[1]
    : "/no-media.png";
  return (
    <div className=" basis-[300px]">
      {isLoading ? (
        <Skeleton className="w-full h-[400px] bg-[#1d1d29] rounded-3xl" />
      ) : (
        <Image
          loader={() => nftImageUrl}
          src={nftImageUrl}
          alt=""
          height={400}
          width={400}
          className=" rounded-3xl  object-cover w-full"
        />
      )}

      <div className=""></div>
    </div>
  );
};

export default NFT;
