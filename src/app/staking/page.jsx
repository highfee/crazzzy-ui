"use client";

import { useSearchParams } from "next/navigation";

import NFTs from "@/components/NFTs";
import { setStaked, setUserNFT } from "@/context/stakingSlice";
import {
  collections,
  getSingleCollectionNFTsOwnedByUser,
  getTotalNFTs,
  stakinContract,
  transformOwnedNFT,
} from "@/utils/constants";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import StakedNFTPage from "@/components/StakedNFTs";
import { Skeleton } from "@/components/ui/skeleton";

const Stakingpage = () => {
  const [loadingNFTs, setLoadingNFTs] = useState(true);
  const [nfts, setNfts] = useState([]);

  const searchParams = useSearchParams();

  const view = searchParams.get("view");

  const dispatch = useDispatch();

  const account = useActiveAccount();

  const { data: stakedNFTS, isLoading } = useReadContract({
    contract: stakinContract,
    method: resolveMethod("getAllStakedNFTs"),
    params: [account && account.address],
  });

  useEffect(() => {
    const getAllNFTsOwnedByUserInAllCollections = async () => {
      const nftData = [];

      for (const collection of collections) {
        const nfts = await getSingleCollectionNFTsOwnedByUser(
          collection.contract,
          account
        );
        nftData.push({
          collection: collection.name,
          collectionAddress: collection.contract.address,
          nfts,
        });
      }

      setNfts(nftData);
      dispatch(setUserNFT(getTotalNFTs(nftData)));

      setLoadingNFTs(false);
    };
    if (!isLoading) {
      // dispatch(setStaked(transformOwnedNFT(stakedNFTS)));
      getAllNFTsOwnedByUserInAllCollections();
    }
  }, [stakedNFTS, view]);

  // console.log(stakedNFTS);
  return view == "all" ? (
    <>
      {loadingNFTs ? (
        <div className="flex flex-col gap-10 mt-8">
          <Skeleton className="w-full h-[calc(100vh-350px)] rounded-2xl bg-[#1D1D29]" />
        </div>
      ) : (
        <NFTs nfts={nfts} />
      )}
    </>
  ) : (
    <div>
      <div className="my-5 flex items-center gap-3">
        <button className="py-1 px-5 rounded-md bg-[#7C9938] text-white border border-[#7C9938]">
          Unstake all
        </button>
      </div>
      <StakedNFTPage />
    </div>
  );
};

export default Stakingpage;
