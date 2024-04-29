"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { ethers } from "ethers";
import { getNFT } from "thirdweb/extensions/erc721";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { Skeleton } from "./ui/skeleton";

function formatNumber(num) {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else {
    return num.toString();
  }
}

const client = createThirdwebClient({
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

const Raffle = ({ raffle }) => {
  const [isLoading, setIsloading] = useState(!true);

  const [nft, setNft] = useState(null);

  const contract = getContract({
    client,
    chain: defineChain(338),
    address: raffle.NFTAddress,
  });

  const getSingleNFT = async () => {
    const NFT = await getNFT({
      contract,
      tokenId: raffle.tokenId,
    });

    setNft(NFT.metadata);

    setIsloading(false);

    // return NFT.metadata;
  };

  useEffect(() => {
    getSingleNFT();
  });

  const imgLoader = (url) => {
    return url;
  };

  const nftImageUrl = nft?.image
    ? "https://ipfs.io/ipfs/" + nft?.image?.split("ipfs://")[1]
    : "/no-media.png";

  return (
    <div>
      <Link href={`/raffles/${parseInt(raffle.raffleId)}`}>
        <div className=" rounded-2xl bg-[#1d1d29] p-5 flex justify-between gap-10 hover:scale-10 hover:scale-95">
          <div>
            <p className="text-xs p-2 px-6 border rounded-3xl w-fit">NFT</p>

            {isLoading ? (
              <Skeleton className="w-40 h-3 rounded-2xl bg-slate-700" />
            ) : (
              <p className="text-lg mt-5">{nft?.name || "N/A"}</p>
            )}

            <p className="text-sm text-gray-400 mt-6">
              {formatNumber(raffle.players.length)} Participants
            </p>
          </div>

          <div>
            <p className="mb-5 text-right text-lg text-gray-300">
              {ethers.utils.formatUnits(raffle.entryCost)} CRO
            </p>

            {isLoading ? (
              <Skeleton className=" h-[150px] aspect-square bg-slate-700" />
            ) : (
              <Image
                loader={() => imgLoader(nftImageUrl)}
                src={nftImageUrl}
                alt=""
                height={150}
                width={150}
                className="rounded-xl object-cover h-[140px]  aspect-square"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Raffle;
