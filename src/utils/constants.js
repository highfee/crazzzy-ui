import { createThirdwebClient, getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";

// export const filters = ["All", "Hard Staked", "Unstaked"];

export const filters = [
  { name: "Your NFTs", path: "/staking?view=all" },
  { name: "Staked", path: "/staking?view=staked" },
  // { name: "Unstaked", path: "/stake/unstaked" },
];

export const NFT_images = [
  {
    name: "#25",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/25.png",
  },
  {
    name: "#12",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/12.png",
  },
  {
    name: "#134",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/134.png",
  },
  {
    name: "#132",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/132.png",
  },
  {
    name: "#144",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/144.png",
  },
  {
    name: "#25",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/25.png",
  },
  {
    name: "#12",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/12.png",
  },
  {
    name: "#144",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/144.png",
  },
  {
    name: "#25",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/25.png",
  },
  {
    name: "#12",
    img: "https://crazymonsters.s3.amazonaws.com/CrazyMonsterImages/12.png",
  },
];

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: "c6d7ac2c1d31bacea1af9db0b2593e09",
});

export const cronosTestnet = defineChain({
  id: 338,
});

// connect to  contract
export const raffleContract = getContract({
  client,
  chain: defineChain(338),
  address: "0x896667ffd62A3450FF72254Eacab47396898369E",
});

export const stakinContract = getContract({
  client,
  chain: defineChain(338),
  address: "0xF1Bde2488A947Aa4979b9EC73acee4beC1a6037f",
});

export const cbtTokenContract = getContract({
  client,
  chain: defineChain(338),
  address: "0x0d7e3f35d3F515E9E8491fbF9353D16Ca0E9F368",
});

export const getNFTContract = (address) => {
  return getContract({
    client,
    chain: defineChain(338),
    address,
  });
};

export const crmContract = getContract({
  client,
  chain: defineChain(338),
  address: "0x6167EC8dfcE64Fe84b03E34091c7Cfb8C67898c0",
});

export function hideMiddlePart(str) {
  const placeholder = ".";

  return str.slice(0, 7) + placeholder.repeat(10) + str.slice(-6);
}

export const getRaffleEndTime = (endTime) => {
  let now = Math.floor(Date.now() / 1000);

  let diff = endTime - now;

  const days = Math.floor(diff / (60 * 60 * 24));
  const hours = Math.floor((diff % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((diff % (60 * 60)) / 60);
  const seconds = Math.floor(diff % 60);

  return { days, hours, minutes, seconds };
};

export const collections = [
  {
    name: "OG CM Collection",
    contract: getContract({
      client,
      chain: defineChain(338),
      address: "0x6167EC8dfcE64Fe84b03E34091c7Cfb8C67898c0",
    }),
  },
  {
    name: "CRM Collection",
    contract: getContract({
      client,
      chain: defineChain(338),
      address: "0x73Beaf9BF108eB61795C79446Fb565D47976709a",
    }),
  },
  {
    name: "HunterZ collection",
    contract: getContract({
      client,
      chain: defineChain(338),
      address: "0xF6D083C80B3359fd6D6a8f10456Ebd5e3D518693",
    }),
  },
];

export const transformOwnedNFT = (data) => {
  return data.map((nft) => ({
    ...nft,
    tokenId: parseInt(nft.tokenId.toString()),
    accumulatedReward: parseInt(nft.accumulatedReward.toString()),
    stakedAt: parseInt(nft.stakedAt.toString()),

    lastClaimedAt: parseInt(nft.lastClaimedAt.toString()),
  }));
};

export const getSingleCollectionNFTsOwnedByUser = async (contract, account) => {
  const crmNFT = await getOwnedNFTs({
    contract,
    owner: account.address,
  });
  return crmNFT;
};

export function getTotalNFTs(data) {
  let total = 0;
  data.map((item) => {
    total += item.nfts.length;
  });

  return total;
}
