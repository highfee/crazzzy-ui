import ContainerLayout from "@/components/Container";
import NFTs from "@/components/NFTs";
import StakingInfo from "@/components/StakingInfo";
import Image from "next/image";

export default function Home() {
  return (
    <ContainerLayout>
      <main className="mt-20 flex flex-col-reverse lg:flex-row gap-10">
        <NFTs />
        <StakingInfo />
      </main>
    </ContainerLayout>
  );
}
