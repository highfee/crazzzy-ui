"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { ethers } from "ethers";
import { getNFT } from "thirdweb/extensions/erc721";
import { createThirdwebClient, defineChain, getContract } from "thirdweb";

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
  const [raffleImg, setRaffleImg] = useState("");

  const contract = getContract({
    client,
    chain: defineChain(338),
    address: raffle.NFTAddress,
  });

  const getSingleNFT = async () => {
    const nft = await getNFT({
      contract,
      tokenId: raffle.tokenId,
    });
  };

  getSingleNFT();

  const imgLoader = (url) => {
    return url;
  };

  return (
    <div>
      <Link href={`/raffles/${parseInt(raffle.raffleId)}`}>
        <div className=" rounded-2xl bg-[#1d1d29] p-5 flex justify-between gap-10 hover:scale-10 hover:scale-95">
          <div>
            <p className="text-xs p-2 px-6 border rounded-3xl w-fit">NFT</p>
            <p className="text-lg mt-5">Crazzzy Monster #12</p>

            <p className="text-sm text-gray-400 mt-6">
              {formatNumber(raffle.players.length)} Participants
            </p>
          </div>

          <div>
            <p className="mb-5 text-right text-lg text-gray-300">
              {ethers.utils.formatUnits(raffle.entryCost)} CRO
            </p>
            <Image
              loader={() =>
                imgLoader(
                  "https://ipfs.io/ipfs/QmcDkEBaugW744s1XEzUPA5auVAJn2MM18PjFH3sx1RHEd/1.png"
                )
              }
              src="https://ipfs.io/ipfs/QmcDkEBaugW744s1XEzUPA5auVAJn2MM18PjFH3sx1RHEd/1.png"
              alt=""
              height={150}
              width={150}
              className="rounded-xl  object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Raffle;
