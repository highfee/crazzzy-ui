"use client";

import { LuPlusCircle } from "react-icons/lu";

import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import { raffleContract } from "@/utils/constants";
import ContainerLayout from "@/components/Container";
import ConnectBtn from "@/components/ConnectBtn";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import CreateRaffle from "../components/CreateRaffle";
import Raffles from "../components/Raffles";

const AdminRafflePage = () => {
  const activeAccount = useActiveAccount();

  const { data, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("owner"),
    params: [],
  });

  const isOwner = data && activeAccount?.address === data;

  return (
    <ContainerLayout>
      {!activeAccount ? (
        <div className=" min-h-[90dvh] grid place-items-center">
          <ConnectBtn />
        </div>
      ) : (
        <div>
          {isLoading ? (
            <Skeleton />
          ) : (
            <div className="mt-4">
              <CreateRaffle />
              <Raffles />
            </div>
          )}
        </div>
      )}
    </ContainerLayout>
  );
};

export default AdminRafflePage;
