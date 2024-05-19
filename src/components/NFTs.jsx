"use client";
import { collections } from "@/utils/constants";
import { useEffect, useState } from "react";
import { useActiveAccount } from "thirdweb/react";

import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import NFT from "./SingleNft";

import { useDispatch } from "react-redux";
import { setUserNFT } from "@/context/stakingSlice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NFTs = () => {
  const dispatch = useDispatch();
  const account = useActiveAccount();

  const [nfts, setNfts] = useState([]);

  const getSingleCollectionNFTsOwnedByUser = async (contract) => {
    const crmNFT = await getOwnedNFTs({
      contract,
      owner: account.address,
    });
    return crmNFT;
  };

  function getTotalNFTs(data) {
    let total = 0;
    data.map((item) => {
      total += item.nfts.length;
    });
    console.log(total);
    return total;
  }

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
      dispatch(setUserNFT(getTotalNFTs(nftData)));
      // dispatch(setUserNFT(20));
    };

    if (account) {
      getAllNFTsOwnedByUserInAllCollections();
    }
  }, [account]);

  return (
    <div className="flex-1">
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
