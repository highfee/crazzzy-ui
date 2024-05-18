"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { stakinContract } from "@/utils/constants";
import { useEffect, useState } from "react";
import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import NFT from "@/components/StakedNFTComponent";

const StakedNFTPage = () => {
  const account = useActiveAccount();

  const [NFTs, setNFTs] = useState([]);

  const { data: stakedNFTS, isLoading } = useReadContract({
    contract: stakinContract,
    method: resolveMethod("getUserStakedNFTs"),
    params: [account && account.address],
  });

  useEffect(() => {
    if (stakedNFTS && stakedNFTS.length > 0) {
      const transformedNFTs = stakedNFTS[1].map((tokenId, index) => {
        return [stakedNFTS[0][index], parseInt(tokenId.toString())];
      });
      setNFTs(transformedNFTs);
    } else {
      setNFTs([]);
    }
  }, [stakedNFTS]);

  return (
    <div>
      {isLoading ? (
        <div className="nfts">
          <Skeleton className="bg-white h-[300p] w-full" />
          <Skeleton className="bg-white h-[300p] w-full" />
          <Skeleton className="bg-white h-[300p] w-full" />
        </div>
      ) : (
        <div className="nfts mt-10">
          {NFTs.map((item) => (
            <NFT key={item} nft={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StakedNFTPage;
