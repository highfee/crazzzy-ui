"use client";

import Image from "next/image";
import Range from "./Range";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { client, getNFTContract, stakinContract } from "@/utils/constants";

import { Skeleton } from "./ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import TransactionBtn from "./TransactionBtn";
import { useState } from "react";
import { toast } from "sonner";

const NFT = ({ nft, collectionAddress }) => {
  const nftImageUrl = nft?.metadata.image
    ? "https://ipfs.io/ipfs/" + nft?.metadata.image?.split("ipfs://")[1]
    : "/no-media.png";

  const imgLoader = (url) => {
    return url;
  };
  return (
    <div className="h-[400p] rounded-2xl bg-[#1d1d29] p-5 flex flex-col justify-between">
      <div>
        <Image
          loader={() => imgLoader(nftImageUrl)}
          src={nftImageUrl}
          alt={nftImageUrl}
          height={180}
          width={180}
          className=" rounded-xl w-full object-cover h-[250px] object-top"
        />
        <p className="my-5">{nft.metadata.name}</p>
      </div>

      <div className="flex justify-between items-center">
        <StakeNFT nft={nft} collectionAddress={collectionAddress} />
      </div>
    </div>
  );
};

export default NFT;

const StakeNFT = ({ nft, collectionAddress }) => {
  const [approved, setApproved] = useState(false);

  return (
    <Dialog className=" backdrop-blur-lg">
      <DialogTrigger className="group w-full">
        <button className="py-3 px-6 rounded-3xl border min-w-full">
          Stake
        </button>
      </DialogTrigger>
      <DialogContent>
        <MediaRenderer
          client={client}
          src={nft.metadata.image}
          style={{ minWidth: "100%" }}
        />

        <DialogFooter>
          {approved ? (
            <div className="flex gap-5 items-center">
              <TransactionBtn
                transaction={() => {
                  const trx = prepareContractCall({
                    contract: stakinContract,
                    method: resolveMethod("softStakeNFT"),
                    params: [collectionAddress, parseInt(nft.id.toString())],
                  });

                  return trx;
                }}
                onTransactionConfirmed={(trx) => {
                  toast("Success", {
                    description: "Your NFT have been staked",
                    action: {
                      label: "View",
                      onClick: () => {
                        window.open(
                          "https://cronos.org/explorer/testnet3/tx/" +
                            trx.transactionHash,
                          "_blank"
                        );
                      },
                    },
                  });

                  setApproved(false);
                }}
                onError={(err) => {
                  toast("", { description: err.message });
                }}
                text="Soft Stake NFT"
                style={{
                  border: "1px solid white",
                  padding: "8px 20px ",
                }}
              />
              <TransactionBtn
                transaction={() => {
                  const trx = prepareContractCall({
                    contract: stakinContract,
                    method: resolveMethod("hardStakeNFT"),
                    params: [collectionAddress, parseInt(nft.id.toString())],
                  });

                  return trx;
                }}
                onTransactionConfirmed={(trx) => {
                  toast("Success", {
                    description: "Your NFT have been staked",
                    action: {
                      label: "View",
                      onClick: () => {
                        window.open(
                          "https://cronos.org/explorer/testnet3/tx/" +
                            trx.transactionHash,
                          "_blank"
                        );
                      },
                    },
                  });

                  setApproved(false);
                }}
                onError={(err) => {
                  toast("", { description: err.message });
                }}
                text="Hard Stake NFT"
                style={{
                  border: "1px solid white",
                  padding: "8px 20px ",
                }}
              />
            </div>
          ) : (
            <TransactionBtn
              transaction={() => {
                const trx = prepareContractCall({
                  contract: getNFTContract(collectionAddress),
                  method: resolveMethod("approve"),
                  params: [stakinContract.address, parseInt(nft.id.toString())],
                });

                return trx;
              }}
              onTransactionConfirmed={(trx) => {
                toast("Success", { description: "NFT approved" });

                setApproved(true);
              }}
              onError={(err) => {
                toast("", { description: err.message });
              }}
              text="Approve"
              style={{
                border: "1px solid white",
                padding: "8px 20px ",
              }}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
