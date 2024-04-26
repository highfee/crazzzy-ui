import Image from "next/image";
import Link from "next/link";
import React from "react";

const Raffle = () => {
  return (
    <Link href={`/raffles/${1}`}>
      <div className=" rounded-2xl bg-[#1d1d29] p-5 flex justify-between gap-10 hover:scale-105">
        <div>
          <p className="text-xs p-2 px-6 border rounded-3xl w-fit">NFT</p>
          <p className="text-lg mt-5">Crazzzy Monster #12</p>

          <p className="text-sm text-gray-400 mt-6">12k Participants</p>
        </div>

        <div>
          <p className="mb-5 text-right text-lg text-gray-300">10 CRO</p>
          <Image
            src="/nft.png"
            alt=""
            height={150}
            width={150}
            className="rounded-xl  object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default Raffle;
