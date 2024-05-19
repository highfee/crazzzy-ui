"use client";

import NFTs from "@/components/NFTs";
import { setStaked } from "@/context/stakingSlice";
import { stakinContract } from "@/utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const Stakingpage = () => {
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
    params: [account && account.address],
  });

  useEffect(() => {
    if (!isLoading) {
      dispatch(setStaked(transformNFT(stakedNFTS)));
    }
  }, [stakedNFTS]);
  return <NFTs />;
};

export default Stakingpage;
