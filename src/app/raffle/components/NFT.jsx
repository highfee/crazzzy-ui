import Image from "next/image";
import React from "react";

const NFT = () => {
  return (
    <div className=" basis-[300px]">
      <Image
        // loader={() =>
        //   "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/144.png"
        // }
        src="/nft.png"
        alt=""
        height={400}
        width={400}
        className=" rounded-3xl  object-cover w-full"
      />
      <div className=""></div>
    </div>
  );
};

export default NFT;
