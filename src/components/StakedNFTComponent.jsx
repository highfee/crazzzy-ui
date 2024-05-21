"use client";

import Image from "next/image";
import Range from "./Range";
import {
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { getNFTContract, stakinContract } from "@/utils/constants";

import { getNFT } from "thirdweb/extensions/erc721";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import TransactionBtn from "./TransactionBtn";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const NFT = ({ nft }) => {
  const [Nft, setNft] = useState([]);
  const { address } = useActiveAccount();

  const { data, isLoading } = useReadContract({
    contract: stakinContract,
    method: resolveMethod("getAccumulatedReward"),
    params: [address, nft.collection, nft.tokenId],
  });

  const getSingleNFT = async () => {
    const NFT = await getNFT({
      contract: getNFTContract(nft.collection),
      tokenId: parseInt(nft.tokenId.toString()),
    });

    setNft(NFT.metadata);
  };

  useEffect(() => {
    getSingleNFT();
  }, []);

  const imgLoader = (url) => {
    return url;
  };

  return (
    <div className="h-[400p] rounded-2xl bg-[#1d1d29] p-5">
      <MediaRenderer
        src={Nft.image}
        style={{ width: "100%", borderRadius: "1rem" }}
      />
      <p className="my-5">{Nft.name}</p>
      <div className="flex justify-between text-sm mb-2">
        <p className="text-gray-400">Earned</p>
        <p>{parseInt(data?.toString())} cbt</p>
      </div>
      {/* <Range length={80} /> */}
      {/* <div className="flex justify-between text-sm mb-5">
        <p className="text-gray-400" title="to next possible claim">
          Time
        </p>
        <p>13 hours</p>
      </div> */}
      <div className="flex justify-between items-center mt-5">
        <UnStakeNFT nft={nft} />

        <TransactionBtn
          transaction={() => {
            const trx = prepareContractCall({
              contract: stakinContract,
              method: resolveMethod("claimReward"),
              params: [nft.collection, nft.tokenId],
            });

            return trx;
          }}
          onTransactionConfirmed={(trx) => {
            toast("Success", {
              description: "Reward claimed",
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
          }}
          onError={(err) => {
            toast("", { description: err.message });
          }}
          text="Claim"
          style={{
            // border: "1px solid white",
            padding: "8px 20px ",
            background: "#7c9938",
          }}
        />
      </div>
    </div>
  );
};

export default NFT;

const UnStakeNFT = ({ nft }) => {
  return (
    <AlertDialog className="">
      <AlertDialogTrigger>
        <button className="py-1 px-6 rounded-3xl border">Unstake</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[#15151f] rounded-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Are you sure you want to unstake this
            NFT, Rewards will no longer be accrued.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <TransactionBtn
              transaction={() => {
                const trx = prepareContractCall({
                  contract: stakinContract,
                  method: resolveMethod("unstakeNFT"),
                  params: [nft.collection, nft.tokenId],
                });

                return trx;
              }}
              onTransactionConfirmed={(trx) => {
                toast("Success", {
                  description: "Your NFT have been unstaked",
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
              }}
              onError={(err) => {
                toast("", { description: err.message });
              }}
              text="Unstake NFT"
              style={{
                border: "1px solid white",
                padding: "8px 20px ",
              }}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
