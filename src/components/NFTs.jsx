"use client";

import NFT from "./SingleNft";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const NFTs = ({ nfts }) => {
  return (
    <div className="flex-1">
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
