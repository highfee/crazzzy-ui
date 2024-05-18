"use client";

import ContainerLayout from "@/components/Container";
import StakingInfo from "@/components/StakingInfo";
import { filters } from "@/utils/constants";
import Link from "next/link";
import { useState } from "react";

export default function StakingLayout({ children }) {
  const [active, setActive] = useState(filters[0].name);
  return (
    <ContainerLayout>
      <main className="mt-20 flex flex-col-reverse lg:flex-row gap-10">
        <div className=" flex-1">
          <header className="flex items-center justify-between">
            <p className="text-white text-2xl hidden md:block">My NFTs</p>
            <div className="flex py-2 px-3 bg-[#1d1d29] rounded-lg">
              {filters.map((filter) => (
                <Link
                  key={filter}
                  className={`py-1 px-4 ${
                    active == filter.name && "bg-[#7c7caa5b]"
                  } rounded-lg`}
                  onClick={() => setActive(filter.name)}
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
    </ContainerLayout>
  );
}
