"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { Rubik_Bubbles } from "next/font/google";
import Image from "next/image";
import ContainerLayout from "./Container";

const rubik = Rubik_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

const Header = () => {
  return (
    <ContainerLayout>
      <section className="flex items-center justify-between ">
        <div className={rubik.className}>
          <Link href="/" className="flex items-center gap-3">
            <Image src="/staking.png" alt="" height={30} width={300} />
            {/* <p className="text-xl hidden md:block">Crazzzy Monsters</p> */}
          </Link>
        </div>

        <div>
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "right",
            }}
            switchToActiveChain
          />
        </div>
        <hr className="absolute left-0 right-0 border-0 p-[0.5px] bg-[#1d1d29] top-24" />
      </section>
    </ContainerLayout>
  );
};

export default Header;
