"use client";

import { setStaked } from "@/context/stakingSlice";
import { stakinContract } from "@/utils/constants";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import { Skeleton } from "@/components/ui/skeleton";

import NFT from "@/components/StakedNFTComponent";

const StakedNFTPage = () => {
  const transformNFT = (data) => {
    return data.map((nft) => ({
      ...nft,
      tokenId: parseInt(nft.tokenId.toString()),
      accumulatedReward: parseInt(nft.accumulatedReward.toString()),
      stakedAt: parseInt(nft.stakedAt.toString()),

      lastClaimedAt: parseInt(nft.lastClaimedAt.toString()),
    }));
  };
  const dispatch = useDispatch();

  const account = useActiveAccount();

  const { data: stakedNFTS, isLoading } = useReadContract({
    contract: stakinContract,
    method: resolveMethod("getAllStakedNFTs"),
    params: [account && account?.address],
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(setStaked(transformNFT(stakedNFTS)));
    }
  }, [stakedNFTS]);

  console.log(stakedNFTS);

  return (
    <div>
      {isLoading ? (
        <div className="nfts mt-10">
          <Skeleton className="bg-[#1D1D29] h-[400px] w-full" />
          <Skeleton className="bg-[#1D1D29] h-[400px] w-full" />
          <Skeleton className="bg-[#1D1D29] h-[400px] w-full" />
        </div>
      ) : stakedNFTS?.length < 1 ? (
        <p className="text-xl text-gray-300 mt-10">
          You do not have any NFT staked, you can go to your NFTs and start
          staking NFTs
        </p>
      ) : (
        <div className="nfts mt-10">
          {stakedNFTS?.map((item) => (
            <NFT key={item} nft={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StakedNFTPage;
