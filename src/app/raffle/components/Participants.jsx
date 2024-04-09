import React from "react";

const Participants = () => {
  return (
    <div className="p-10 border border-gray-700 rounded-3xl">
      <h1 className="text-xl">Raffle Participants</h1>

      <div className="flex flex-col gap-4 mt-5">
        <div className="flex items-center justify-between ">
          <div className="flex gap-4 items-center">
            <div className="h-12 aspect-square bg-slate-500 rounded-full"></div>
            <div>
              <p>0xd141d5.....435A0a6</p>
              <p className="text-gray-500 text-sm md:hidden">2 Tickets</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm hidden md:block">2 Tickets</p>
        </div>
      </div>
    </div>
  );
};

export default Participants;
