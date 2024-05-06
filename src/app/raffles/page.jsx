"use client";

import ContainerLayout from "@/components/Container";
import Raffle from "@/components/Raffle";

import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

import { raffleContract } from "@/utils/constants";

import { Skeleton } from "@/components/ui/skeleton";

const RafflesPage = () => {
  const skeletonData = ["", "", "", ""];

  const { data, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("getAllRaffles"),
    params: [],
  });

  return (
    <div className="mt-20">
      <ContainerLayout>
        <div className="gap-10 raffles">
          {isLoading ? (
            skeletonData.map((_, i) => (
              <Skeleton className="w-full h-[235px] bg-slate-800" key={i} />
            ))
          ) : data.length < 1 ? (
            <p className="text-xl">No raffle, Check back later</p>
          ) : (
            data
              .toReversed()
              .map((item, index) => <Raffle key={index} raffle={item} />)
          )}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default RafflesPage;
