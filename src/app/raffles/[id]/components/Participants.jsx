"use client";

import { resolveMethod } from "thirdweb";
import { useReadContract } from "thirdweb/react";
import { raffleContract, hideMiddlePart } from "@/utils/constants";
import { ethers } from "ethers";

const Participants = ({ data, isLoading }) => {
  // const { data, isLoading } = useReadContract({
  //   contract: raffleContract,
  //   method: resolveMethod("getRaffleDetails"),
  //   params: [1],
  // });

  const getTicketCount = (participant) => {
    let count = 0;

    data[5].map((ticket) => {
      if (ticket === participant) {
        count++;
      }
    });

    return count;
  };

  return (
    <div className="p-10 border border-gray-700 rounded-3xl">
      <h1 className="text-xl">Raffle Participants</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        data[4].map((participant, index) => (
          <div className="flex flex-col gap-4 mt-5" key={index}>
            <div className="flex items-center justify-between ">
              <div className="flex gap-4 items-center">
                <div className="h-12 aspect-square bg-slate-500 rounded-full"></div>
                <div>
                  <p>{hideMiddlePart(participant)}</p>
                  <p className="text-gray-500 text-sm md:hidden">
                    {getTicketCount(participant, index)} Tickets
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-sm hidden md:block">
                {getTicketCount(participant, index)} Tickets
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Participants;
