import Image from "next/image";
import React from "react";

const NFT = () => {
  return (
    <div className=" basis-[300px]">
      <Image
        src="/25.PNG"
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
