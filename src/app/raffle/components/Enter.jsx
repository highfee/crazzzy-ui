"use client";

import TransactionBtn from "@/components/TransactionBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { contract } from "@/utils/constants";
import { useReadContract } from "thirdweb/react";

const tokens = [
  { name: "$CRO", value: "cro" },
  { name: "$FRTN", value: "frtn" },
  { name: "$CBT", value: "cbt" },
];

const Enter = () => {
  const [open, setOpen] = useState(true);

  const { data, isLoading } = useReadContract({
    contract,
    method: resolveMethod("getRaffleDetails"),
    params: [1],
  });

  // useEffect(() => {
  //   setOpen(data[11]);
  // }, [data]);

  if (isLoading) return <div>loading...</div>;
  // console.log(data[9].toString());
  console.log(new Date(data[9].toString() * 1000));

  return (
    <div>
      <h1 className="text-3xl">Crazzzy Monster #12</h1>
      <div className="mt-10 flex flex-col lg:flex-row items-start lg:items-center justify-between bg-[#1d1d29] p-5 lg:p-10 rounded-3xl gap-2">
        <div className="flex items-center gap-6 ">
          {open ? (
            <div className="bg-[#15151f]  p-3 lg:p-5 rounded-full flex gap-3  ">
              <span>20days,</span>
              <span>10hrs,</span>
              <span>8mns,</span>
              <span>55secs</span>
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
            {/* {data[5].length}/{data[8].toString()} */}
          </p>
          <p className="text-gray-500">Tickets Sold</p>
        </div>
      </div>

      <div className="mt-10 bg-[#1d1d29] p-10 rounded-3xl">
        {open && (
          <div className="flex justify-between">
            <p className="text-gray-500">Ticket Price</p>
            <p className="text-xl">50 CRO</p>
          </div>
        )}

        <div>
          {open ? (
            <div className="mt-5 rounded-full overflow-hidden flex">
              <input
                type="number"
                min={1}
                className="w-full p-5 text-sm lg:text-xl border-0 outline-0 text-black"
                placeholder="Number of Tickets"
              />
              <div className="w-40 grid place-items-center bg-[#15151f] text-lg">
                <Select>
                  <SelectTrigger className="w-full border-0">
                    <SelectValue placeholder="Token" />
                  </SelectTrigger>
                  <SelectContent className="border-0 bg-white">
                    {tokens.map((token) => (
                      <SelectItem
                        value={token.value}
                        key={token.value}
                        className="text-black cursor-pointer"
                      >
                        {token.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="h-[100px bg-white flex-[3] rounded-3xl flex flex-col items-center justify-center text-stone-800 gap-1 py-8">
                <p>Congratulations!!!</p>
                <p className="text-3xl">0xd141d51....435A0a6</p>
              </div>

              <div className="flex-1 bg-white rounded-3xl relative ">
                <div className="flex flex-col gap-1 absolute top-1/2 -translate-y-1/2 -translate-x-[13px]">
                  <span className="w-[22px] h-[14px] bg-slate-500 rounded-full inline-block"></span>
                  <span className="w-[22px] h-[14px] bg-slate-500 rounded-full inline-block"></span>
                  <span className="w-[22px] h-[14px] bg-slate-500 rounded-full inline-block"></span>
                  <span className="w-[22px] h-[14px] bg-slate-500 rounded-full inline-block"></span>
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-900">
                  <p className="">Tickets</p>
                  <p className="text-4xl font-bold">2</p>
                </div>
              </div>
            </div>
          )}

          {open && (
            <TransactionBtn
              transaction={() => {
                const trx = prepareContractCall({
                  contract,
                  method: resolveMethod("joinRaffle"),
                  // params: [raffleId, numOfTickets, _token],
                  params: [1, 2, "0xEB52532a377b91Ee8F357F3041b28c589eADDde2"],
                });
                return trx;
              }}
              onTransactionConfirmed={(trx) => {}}
              onError={(err) => {}}
              style={{
                backgroundColor: "transparent",
                color: "#FFF",
                padding: "20px",
                border: "1px solid white",
                width: "100%",
                marginTop: "30px",
                borderRadius: "50px",
              }}
              text="Buy Ticket(s)"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Enter;
