import ContainerLayout from "@/components/Container";
import Raffle from "@/components/Raffle";
import React from "react";

const page = () => {
  return (
    <div className="mt-20">
      <ContainerLayout>
        <div className="gap-10 raffles">
          <Raffle />
          <Raffle />
          <Raffle />
          <Raffle />
          <Raffle />
        </div>
      </ContainerLayout>
    </div>
  );
};

export default page;
