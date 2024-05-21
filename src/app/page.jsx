import ContainerLayout from "@/components/Container";
import NFTs from "@/components/NFTs";
import StakingInfo from "@/components/StakingInfo";
import Image from "next/image";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/staking?view=all");
  return (
    <ContainerLayout>
      <main className="mt-20 flex flex-col-reverse lg:flex-row gap-10">
        <div className="text-white text-3xl">Story telling</div>
      </main>
    </ContainerLayout>
  );
}
