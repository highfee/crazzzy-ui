"use client";

import { useState } from "react";

import { DatePicker } from "@/components/DatePicker";
import TransactionBtn from "@/components/TransactionBtn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getNFTContract, raffleContract } from "@/utils/constants";
import { LucideLoader2, LucidePlusCircle } from "lucide-react";
import { toast } from "sonner";

import { prepareContractCall, resolveMethod } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";

const CreateRaffle = () => {
  const account = useActiveAccount();

  const [approved, setApproved] = useState(false);

  const [raffleData, setRaffleData] = useState({
    _nftAddress: "",
    _tokenId: "",
    _maxTicketsPerUser: "",
    _endTimestamp: "",
    _entryCost: "",
    _maxTickets: "",
  });

  const [date, setDate] = useState();

  const { data, isLoading } = useReadContract({
    contract: raffleContract,
    method: resolveMethod("isWhitelisted"),
    params: [account?.address],
  });

  const handleChange = (e) => {
    setRaffleData({
      ...raffleData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=" backdrop-blur-lg">
      {isLoading ? (
        <LucideLoader2 className=" animate-spin" />
      ) : (
        <Dialog className=" backdrop-blur-lg">
          <DialogTrigger
            className="group"
            style={{
              opacity: data ? 1 : 0.4,
              cursor: data ? "pointer" : "not-allowed",
            }}
            onClick={(e) => {
              !data && e.preventDefault();
            }}
          >
            <div
              className="flex items-center gap-2 cursor-pointer relative "
              style={{}}
              onClick={() => {}}
            >
              <LucidePlusCircle size="20" />
              <p className="text-lg">Create</p>

              {!data && (
                <p className="text-sm absolute top-10 w-[200px] opacity-0 left-0 text-red-200 group-hover:opacity-100">
                  You are not whitelisted to create raffle
                </p>
              )}
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create new Raffle</DialogTitle>
              <DialogDescription>
                <p className="text-red-300">
                  *Pls fill all info before you submit the form
                </p>
              </DialogDescription>
            </DialogHeader>

            <div className="my-3 flex flex-col gap-4">
              <div>
                <input
                  type="text"
                  placeholder="NFT collection address"
                  className="w-full p-3 rounded-md text-lg bg-transparent border border-white focus:outline-2 -outline-offset-4"
                  name="_nftAddress"
                  onInput={handleChange}
                  value={raffleData._nftAddress}
                />
              </div>

              <div className="flex gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="Token ID"
                    className="w-full p-3 rounded-md text-lg bg-transparent border border-white focus:outline-2 -outline-offset-4"
                    min={1}
                    name="_tokenId"
                    onInput={handleChange}
                    value={raffleData._tokenId}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max Tickets Per User"
                    className="w-full p-3 rounded-md text-lg bg-transparent border border-white focus:outline-2 -outline-offset-4"
                    min={1}
                    name="_maxTicketsPerUser"
                    onInput={handleChange}
                    value={raffleData._maxTicketsPerUser}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <input
                    type="number"
                    placeholder="Max Tickets"
                    className="w-full p-3 rounded-md text-lg bg-transparent border border-white focus:outline-2 -outline-offset-4"
                    min={1}
                    name="_maxTickets"
                    onInput={handleChange}
                    value={raffleData._maxTickets}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Entry Cost"
                    className="w-full p-3 rounded-md text-lg bg-transparent border border-white focus:outline-2 -outline-offset-4"
                    min={1}
                    name="_entryCost"
                    onInput={handleChange}
                    value={raffleData._entryCost}
                  />
                </div>
              </div>

              <div>
                <DatePicker date={date} setDate={setDate} />
              </div>
            </div>

            <DialogFooter>
              {approved ? (
                <TransactionBtn
                  transaction={() => {
                    const trx = prepareContractCall({
                      contract: raffleContract,
                      method: resolveMethod("createRaffle"),
                      params: [
                        raffleData._nftAddress,
                        raffleData._tokenId,
                        raffleData._maxTicketsPerUser,
                        parseInt(date / 1000),
                        Number(raffleData._entryCost * 1e18).toString(),
                        raffleData._maxTickets,
                      ],
                    });

                    return trx;
                  }}
                  onTransactionConfirmed={(trx) => {
                    toast("Success", {
                      description: "You have successfully added a new raffle",
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

                    setApproved(false);
                  }}
                  onError={(err) => {
                    toast("", { description: err.message });
                  }}
                  text="Add Raffle"
                  style={{
                    border: "1px solid white",
                    padding: "8px 20px ",
                  }}
                />
              ) : (
                <TransactionBtn
                  transaction={() => {
                    const trx = prepareContractCall({
                      contract: getNFTContract(raffleData._nftAddress),
                      method: resolveMethod("approve"),
                      params: [raffleContract.address, raffleData._tokenId],
                    });

                    return trx;
                  }}
                  onTransactionConfirmed={(trx) => {
                    toast("Success", { description: "NFT approved" });

                    setApproved(true);
                  }}
                  onError={(err) => {
                    toast("", { description: err.message });
                  }}
                  text="Approve"
                  style={{
                    border: "1px solid white",
                    padding: "8px 20px ",
                  }}
                />
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CreateRaffle;
