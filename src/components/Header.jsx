"use client";

import { ConnectWallet } from "@thirdweb-dev/react";
import Link from "next/link";
import { Rubik_Bubbles } from "next/font/google";
import Image from "next/image";
import ContainerLayout from "./Container";
import { FaBars } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import ConnectBtn from "./ConnectBtn";

import { usePathname } from "next/navigation";

const rubik = Rubik_Bubbles({
  subsets: ["latin"],
  weight: ["400"],
});

const links = [
  {
    name: "Staking",
    path: "/",
  },
  {
    name: "Raffle",
    path: "/raffles",
  },
  {
    name: "Auctions",
    path: "/",
  },
  {
    name: "Flip Coin",
    path: "/",
  },
];

const Header = () => {
  const path = usePathname();

  const logo = path.includes("raffles") ? "/raffle.png" : "/staking.png";

  return (
    <div className=" sticky top-0 py-4 bg-[#15151f] z-50">
      <ContainerLayout>
        <section className="flex items-center justify-between relative">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-3">
              <Image src={logo} alt="" height={30} width={300} />
              {/* <p className="text-xl hidden md:block">Crazzzy Monsters</p> */}
            </Link>
            <div className=" gap-8 text-lg hidden lg:flex">
              {links.map((link) => (
                <Link href={link.path} key={link.path}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <ConnectBtn />
            <div className="lg:hidden">
              <Sheet className="top-20 bg-white max-h-fit">
                <SheetTrigger>
                  <FaBars size="22" />
                </SheetTrigger>
                <SheetContent side="top">
                  <div className=" flex flex-col py-10 gap-8 justify-center bg-whit h-full">
                    {links.map((link) => (
                      <SheetClose key={link.path} asChild>
                        <Link href={link.path}>{link.name}</Link>
                      </SheetClose>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <hr className="absolute left-0 right-0 border-0 p-[0.5px] bg-[#1d1d29] top-20 hidden lg:block" />
        </section>
      </ContainerLayout>
    </div>
  );
};

export default Header;
