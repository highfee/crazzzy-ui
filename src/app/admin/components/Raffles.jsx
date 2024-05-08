"use client";

import ContainerLayout from "@/components/Container";
import Raffle from "@/app/admin/components/Raffle";

import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";

import { raffleContract } from "@/utils/constants";

import { Skeleton } from "@/components/ui/skeleton";

const Raffles = () => {
  const skeletonData = ["", "", "", ""];

  const { data: raffles, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("getAllRaffles"),
    params: [],
  });

  //   console.log(raffles);

  return (
    <div className="mt-20">
      <ContainerLayout>
        <div className="gap-10 raffles">
          {isLoading ? (
            skeletonData.map((_, i) => (
              <Skeleton className="w-full h-[235px] bg-slate-800" key={i} />
            ))
          ) : raffles.length < 1 ? (
            <p className="text-xl">No raffle, Check back later</p>
          ) : (
            raffles &&
            Array.isArray(raffles) &&
            raffles
              .toReversed()
              .map((item, index) => <Raffle key={index} raffle={item} />)
          )}
        </div>
      </ContainerLayout>
    </div>
  );
};

export default Raffles;
