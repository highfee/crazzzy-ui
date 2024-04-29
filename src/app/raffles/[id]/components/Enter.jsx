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
import { prepareContractCall, resolveMethod, readContract } from "thirdweb";
import {
  raffleContract,
  getRaffleEndTime,
  crmTokenContract,
} from "@/utils/constants";
import { useActiveAccount } from "thirdweb/react";

import { ethers } from "ethers";
import { toast } from "sonner";

const tokens = [
  { name: "CRO", value: "cro" },
  { name: "FRTN", value: "frtn" },
  { name: "CBT", value: "cbt" },
];

const Enter = ({ data, isLoading }) => {
  const [raffle, setRaffle] = useState([]);
  const [open, setOpen] = useState(true);
  const [numOfTickets, setNumberOfTickets] = useState(0);
  const [approved, setApproved] = useState(false);
  const [allowance, setAllowance] = useState(0);

  const activeAccount = useActiveAccount();

  const getAllowance = async () => {
    const data = await readContract({
      contract: crmTokenContract,
      method: resolveMethod("allowance"),
      params: [activeAccount?.address, raffleContract.address],
    });
    setAllowance(data);
  };

  useEffect(() => {
    activeAccount && getAllowance();
    if (!isLoading && data) {
      setRaffle(data);
    }
  }, [allowance, isLoading, approved, activeAccount, numOfTickets, data]);

  if (isLoading) return <div>loading...</div>;

  const timeRemaining = getRaffleEndTime(data[9].toString());

  const ticketPrice = parseFloat(raffle[7]);

  return (
    <div>
      <h1 className="text-3xl">Crazzzy Monster #12</h1>
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
            <p className="text-xl">{ethers.utils.formatUnits(data[6])} CRO</p>
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
                onInput={(e) => {
                  setNumberOfTickets(e.target.value);
                }}
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

          {/* <button
            className="w-full disabled:cursor-not-allowed disabled:opacity-50"
            disabled={numOfTickets === 0}
          > */}
          {open &&
            (approved && allowance >= ticketPrice * numOfTickets ? (
              <TransactionBtn
                transaction={() => {
                  if (numOfTickets == 0)
                    return alert("Please select a number of tickets");
                  const trx = prepareContractCall({
                    contract: raffleContract,
                    method: resolveMethod("joinRaffle"),
                    params: [
                      data[7].toString() - 1,
                      numOfTickets,
                      crmTokenContract.address,
                    ],
                  });
                  return trx;
                }}
                onTransactionConfirmed={(trx) => {
                  toast("Success", {
                    description: "You have successfully bought your ticket(s)",
                    action: {
                      label: "View",
                      onClick: () => {
                        window.open(
                          "https://cronos.org/explorer/testnet3/tx/" +
                            trx.transactionHash,
                          "_blank"
                        );
                      },
                    },
                  });
                }}
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
                onError={(err) => toast("", { description: err.message })}
              />
            ) : (
              <TransactionBtn
                transaction={() => {
                  if (numOfTickets == 0)
                    return alert("Please select a number of tickets");
                  const trx = prepareContractCall({
                    contract: crmTokenContract,
                    method: resolveMethod("approve"),
                    params: [
                      raffleContract.address,
                      ticketPrice * numOfTickets,
                    ],
                  });
                  return trx;
                }}
                onTransactionConfirmed={(trx) => {
                  setApproved(true);
                  console.log(trx);
                }}
                onError={(err) => toast("", { description: err.message })}
                style={{
                  backgroundColor: "transparent",
                  color: "#FFF",
                  padding: "20px",
                  border: "1px solid white",
                  width: "100%",
                  marginTop: "30px",
                  borderRadius: "50px",
                }}
                text="Approve First"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Enter;
