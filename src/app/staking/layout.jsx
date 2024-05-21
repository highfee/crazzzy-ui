"use client";

import ConnectBtn from "@/components/ConnectBtn";
import ContainerLayout from "@/components/Container";
import StakingInfo from "@/components/StakingInfo";
import { cn } from "@/lib/utils";
import { filters } from "@/utils/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActiveAccount } from "thirdweb/react";

export default function StakingLayout({ children }) {
  const searchParams = useSearchParams();

  const view = searchParams.get("view");

  const account = useActiveAccount();

  return (
    <ContainerLayout>
      {!account ? (
        <div className="w-full h-[calc(100vh-150px)] grid place-items-center">
          <ConnectBtn />
        </div>
      ) : (
        <main className="mt-20 flex flex-col-reverse lg:flex-row gap-10">
          <div className=" flex-1">
            <header className="flex items-center justify-between">
              <p className="text-white text-2xl hidden md:block">My NFTs</p>
              <div className="flex py-2 px-3 bg-[#1d1d29] rounded-lg">
                {filters.map((filter) => (
                  <Link
                    key={filter}
                    className={cn(
                      "py-1 px-4",
                      filter.path.includes(view)
                        ? "bg-[#7c7caa5b]"
                        : " bg-transparent"
                    )}
                    href={filter.path}
                  >
                    {filter.name}
                  </Link>
                ))}
              </div>
            </header>
            {children}
          </div>
          <StakingInfo />
        </main>
      )}
    </ContainerLayout>
  );
}
