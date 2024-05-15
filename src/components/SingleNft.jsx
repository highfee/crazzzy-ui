import Image from "next/image";
import Range from "./Range";

const NFT = ({ nft }) => {
  const nftImageUrl = nft?.metadata.image
    ? "https://ipfs.io/ipfs/" + nft?.metadata.image?.split("ipfs://")[1]
    : "/no-media.png";

  const imgLoader = (url) => {
    return url;
  };
  return (
    <div className="h-[400p] rounded-2xl bg-[#1d1d29] p-5">
      <Image
        loader={() => imgLoader(nftImageUrl)}
        src={nftImageUrl}
        alt={nftImageUrl}
        height={180}
        width={180}
        className=" rounded-xl w-full object-cover h-[250px] object-top"
      />
      <p className="my-5">{nft.metadata.name}</p>
      <div className="flex justify-between text-sm mb-2">
        <p className="text-gray-400">Earned</p>
        <p>0.004 cro</p>
      </div>
      <Range length={80} />
      <div className="flex justify-between text-sm mb-5">
        <p className="text-gray-400" title="to next possible claim">
          Time
        </p>
        <p>13 hours</p>
      </div>
      <div className="flex justify-between items-center">
        <button className="py-1 px-6 rounded-3xl border">Stake</button>

        <button className="py-1 px-6 rounded-3xl bg-[#7c9938]">Claim</button>
      </div>
    </div>
  );
};

export default NFT;
