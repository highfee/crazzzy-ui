"use client";

import Image from "next/image";
import React from "react";

const NFT = ({ nft, isLoading }) => {
  const nftImageUrl = nft?.image
    ? "https://ipfs.io/ipfs/" + nft?.image?.split("ipfs://")[1]
    : "/no-media.png";
  return (
    <div className=" basis-[300px]">
      <Image
        loader={() => nftImageUrl}
        src={nftImageUrl}
        alt=""
        height={400}
        width={400}
        className=" rounded-3xl  object-cover w-full"
      />

      <div className=""></div>
    </div>
  );
};

export default NFT;
