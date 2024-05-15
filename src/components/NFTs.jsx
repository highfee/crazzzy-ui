"use client";
import {
  filters,
  NFT_images,
  crmContract,
  collections,
} from "@/utils/constants";
import Image from "next/image";
import { useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import { getOwnedNFTs, getNFTs } from "thirdweb/extensions/erc721";

const NFTs = () => {
  const account = useActiveAccount();

  const getSingleCollectionNFTsOwnedByUser = async (contract) => {
    const crmNFT = await getOwnedNFTs({
      contract,
      owner: account.address,
    });
    return crmNFT;
  };

  const [active, setActive] = useState(filters[0]);
  const imgLoader = (url) => {
    return url;
  };

  return (
    <div className="flex-1">
      <header className="flex items-center justify-between">
        <p className="text-white text-2xl hidden md:block">My NFTs</p>
        <div className="flex py-2 px-3 bg-[#1d1d29] rounded-lg">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`py-1 px-4 ${
                active == filter && "bg-[#7c7caa5b]"
              } rounded-lg`}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </header>
      <div className="my-5 flex items-center gap-3">
        <button className="py-1 px-5 rounded-md border">Stake all</button>
        <button className="py-1 px-5 rounded-md bg-[#7C9938] text-white border border-[#7C9938]">
          Unstake all
        </button>
      </div>

      <section className="nfts mt-8">
        {NFT_images.map((nft, i) => (
          <div key={nft.name} className="h-[400p] rounded-2xl bg-[#1d1d29] p-5">
            <Image
              loader={() => imgLoader(nft.img)}
              src={nft.img}
              alt={nft.img}
              height={180}
              width={180}
              className=" rounded-xl w-full object-cover h-[250px]"
            />
            <p className="my-5">Crazzzy Monster {nft.name}</p>
            <div className="flex justify-between text-sm mb-2">
              <p className="text-gray-400">Earned</p>
              <p>0.004 cro</p>
            </div>
            <Range length={80} />
            <div className="flex justify-between text-sm mb-5">
              <p className="text-gray-400" title="to next possible claim">
                Time
              </p>
              <p>13 hours</p>
            </div>
            <div className="flex justify-between items-center">
              {i % 2 == 0 ? (
                <button className="py-1 px-6 rounded-3xl border">Stake</button>
              ) : (
                <button className="py-1 px-6 rounded-3xl border">
                  Unstake
                </button>
              )}
              <button className="py-1 px-6 rounded-3xl bg-[#7c9938]">
                Claim
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

const Range = ({ length }) => {
  return (
    <div className="pt-[6px] relative bg-white mb-2 rounded-xl overflow-hidden">
      <div
        className={`absolute h-full bg-[#7c9938]  left-0 top-0 rounded`}
        style={{ width: length + "%" }}
      ></div>
    </div>
  );
};

export default NFTs;
