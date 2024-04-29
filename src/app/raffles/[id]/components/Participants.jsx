"use client";

import { hideMiddlePart } from "@/utils/constants";

import { Skeleton } from "@/components/ui/skeleton";

const Participants = ({ data, isLoading }) => {
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
        <Loader />
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

const Loader = () => {
  const data = ["", "", ""];
  return data.map((item, index) => (
    <div className="flex flex-col gap-4 mt-5" key={index}>
      <div className="flex items-center justify-between ">
        <div className="flex gap-4 items-center">
          <Skeleton className="h-12 aspect-square bg-slate-500 rounded-full" />
          <div>
            <Skeleton className="w-full h-10" />
            <p className="text-gray-500 text-sm md:hidden">
              <Skeleton className="w-14 h-10 bg-[#1d1d29]" />
            </p>
          </div>
        </div>
        <p className="text-gray-500 text-sm hidden md:block">
          <Skeleton className="w-14 h-10 bg-[#1d1d29]" />
        </p>
      </div>
    </div>
  ));
};
