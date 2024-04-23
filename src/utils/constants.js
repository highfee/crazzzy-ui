import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";

export const filters = ["All", "Staked", "Unstaked"];

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
  clientId: "1639134fe6d77249631aa361f3a9cbe1",
});

export const cronosTestnet = defineChain({
  id: 338,
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(338),
  address: "0x15a4D6Fd878Ce16Eb8df3b777378BDF1f8Cf94eA",
});

export function hideMiddlePart(str, startChars, endChars) {
  const placeholder = ".";
  const middleChars = str.length - startChars - endChars;
  const hiddenPart = placeholder.repeat(Math.max(0, middleChars));
  return str.slice(0, startChars) + hiddenPart + str.slice(-endChars);
}
