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
export const raffleContract = getContract({
  client,
  chain: defineChain(338),
  address: "0x899e98326c7457915bc493a75Bb423077F9bbB3b",
});
export const crmTokenContract = getContract({
  client,
  chain: defineChain(338),
  address: "0xDBF048c4C1b4a0474a2b3682b0C813C78FE0c54c",
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
