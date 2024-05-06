"use client";

import { resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

import { raffleContract } from "@/utils/constants";
import ContainerLayout from "@/components/Container";
import ConnectBtn from "@/components/ConnectBtn";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

const AdminPage = () => {
  const activeAccount = useActiveAccount();

  const { data, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("owner"),
    params: [],
  });

  const isOwner = data && activeAccount?.address === data;

  data && !isOwner && redirect("/");

  return (
    <ContainerLayout>
      {!activeAccount ? (
        <div className=" min-h-[90dvh] grid place-items-center">
          <ConnectBtn />
        </div>
      ) : (
        <div>{isLoading ? <Skeleton /> : <p></p>}</div>
      )}
    </ContainerLayout>
  );
};

export default AdminPage;
