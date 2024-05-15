import { FaEthereum } from "react-icons/fa";
import React from "react";

const StakingInfo = () => {
  return (
    <div className="max-w-[350px] basis-[300px]">
      <div className="p-5 bg-[#1d1d29] rounded-xl mb-5">
        <p className="text-xl font-semibold">Staking Info</p>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex justify-between items-center text-gray-400">
            <p>Total monsters</p>
            <p>16</p>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <p>Total staked monsters</p>
            <p>4</p>
          </div>
        </div>
      </div>
      <div className="p-5 bg-[#1d1d29] rounded-xl">
        <p className="text-xl font-semibold">Available for withdraw</p>
        <div className="flex items-center gap-5 mt-5">
          <div className=" w-10 h-10 bg-slate-500 rounded-lg grid place-items-center">
            <FaEthereum size={24} fill="white" />
          </div>
          <div>
            <p className="text-lg">30 CRO</p>
            <p className="text-gray-400">Available</p>
          </div>
        </div>
        <button className="mt-5 w-full border py-2 rounded-3xl">
          Withdraw now
        </button>
      </div>
    </div>
  );
};

export default StakingInfo;
