"use client";
import { filters, collections } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import NFT from "./SingleNft";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NFTs = () => {
  const account = useActiveAccount();

  const [nfts, setNfts] = useState([]);

  const getSingleCollectionNFTsOwnedByUser = async (contract) => {
    const crmNFT = await getOwnedNFTs({
      contract,
      owner: account.address,
    });
    return crmNFT;
  };

  useEffect(() => {
    const getAllNFTsOwnedByUserInAllCollections = async () => {
      const nftData = [];

      for (const collection of collections) {
        const nfts = await getSingleCollectionNFTsOwnedByUser(
          collection.contract
        );
        nftData.push({
          collection: collection.name,
          collectionAddress: collection.contract.address,
          nfts,
        });
      }

      setNfts(nftData);
    };

    if (account) {
      getAllNFTsOwnedByUserInAllCollections();
    }
  }, [account]);

  const [active, setActive] = useState(filters[0]);

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

      <section className="mt-8">
        <Accordion type="single" collapsible className="w-full">
          {nfts.map((collection, i) => (
            <AccordionItem value={`item-${i + 1}`} key={i}>
              <AccordionTrigger>{collection.collection}</AccordionTrigger>
              <AccordionContent>
                <section className="nfts">
                  {collection.nfts.length < 1 ? (
                    <p className="text-gray-400">
                      You don&apos;t have any NFT in this collection
                    </p>
                  ) : (
                    collection.nfts.map((item) => (
                      <NFT
                        key={item}
                        nft={item}
                        collectionAddress={collection.collectionAddress}
                      />
                    ))
                  )}
                </section>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

export default NFTs;
