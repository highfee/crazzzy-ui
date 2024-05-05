"use client";

import TransactionBtn from "@/components/TransactionBtn";

import { useState } from "react";

import { getRaffleEndTime } from "@/utils/constants";

import { ethers } from "ethers";

import { Skeleton } from "@/components/ui/skeleton";
import Buy from "./Buy";

const Enter = ({ data, isLoading, nft }) => {
  const [open, setOpen] = useState(data[11]);

  const timeRemaining = getRaffleEndTime(data[9].toString());

  // const ticketPrice = ethers.utils.parseUnits(data[6].toString(), 18);
  const ticketPrice = data[6].toString();

  return (
    <div>
      <h1 className="text-3xl">{nft?.name || "N/A"}</h1>

      <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-[#1d1d29] p-5 lg:p-10 rounded-3xl gap-2">
        <div className="flex items-center gap-6 ">
          {open ? (
            <div className="bg-[#15151f]  p-3 lg:p-5 rounded-full flex gap-3  ">
              <span>{timeRemaining.days}days,</span>
              <span>{timeRemaining.hours}hrs,</span>
              <span>{timeRemaining.minutes}mins,</span>
              <span>{timeRemaining.seconds}secs</span>
            </div>
          ) : (
            <div className="bg-[#15151f] p-3 lg:p-5 rounded-full flex gap-3  px-8 ">
              <span>Ended</span>
            </div>
          )}

          <span className="hidden md:block">Time left</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <p className="text-xl">
            {data[5].length}/{data[8].toString()}
          </p>
          <p className="text-gray-500">Tickets Sold</p>
        </div>
      </div>

      <div className="mt-10 bg-[#1d1d29] p-10 rounded-3xl">
        {open && (
          <div className="flex justify-between">
            <p className="text-gray-500">Ticket Price</p>
            {isLoading ? (
              <Skeleton className="w-[10] h-4 bg-[#1d1d29]" />
            ) : (
              <p className="text-xl">{ethers.utils.formatUnits(data[6])} CRO</p>
            )}
          </div>
        )}
        <Buy ticketPrice={ticketPrice} open={open} data={data} />
      </div>
    </div>
  );
};

export default Enter;
