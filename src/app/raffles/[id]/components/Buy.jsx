import TransactionBtn from "@/components/TransactionBtn";

import { ChevronDown, ChevronUp } from "lucide-react";

import { cbtTokenContract, raffleContract } from "@/utils/constants";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { prepareContractCall, readContract, resolveMethod } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { ethers } from "ethers";

const tokens = [
  { name: "CRO", value: "CRO" },
  { name: "FRTN", value: "FRTN" },
  { name: "CBT", value: "CBT" },
];

const Buy = ({ open, ticketPrice, data }) => {
  const activeAccount = useActiveAccount();

  const [numOfTickets, setNumberOfTickets] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("CRO");
  const [selectOpen, setSelectOpen] = useState(false);

  // console.log(ticketPrice);

  const getTicketCount = (participant) => {
    let count = 0;

    data[5].map((ticket) => {
      if (ticket === participant) {
        count++;
      }
    });

    return count;
  };

  const getAllowance = async () => {
    const data = await readContract({
      contract: cbtTokenContract,
      method: resolveMethod("allowance"),
      params: [activeAccount?.address, raffleContract.address],
    });
    setAllowance(data);
  };

  const handleChange = (e) => {
    setNumberOfTickets(e.target.value);
    getAllowance();
  };

  const handleTicketWithCRO = () => {
    const trx = prepareContractCall({
      contract: raffleContract,
      method: resolveMethod("buyRaffleWithNativeToken"),
      params: [data[7].toString(), numOfTickets],
      value: ethers.BigNumber.from((ticketPrice * numOfTickets).toString()),
    });

    return trx;
  };

  const handleTicketWithERC20 = () => {
    const trx = prepareContractCall({
      contract: raffleContract,
      method: resolveMethod("buyRaffleWithERC20Token"),
      params: [cbtTokenContract.address, data[7].toString(), numOfTickets],
    });
    return trx;
  };

  const handleTokenApproval = () => {
    const trx = prepareContractCall({
      contract: cbtTokenContract,
      method: resolveMethod("approve"),
      params: [raffleContract.address, ticketPrice * numOfTickets],
    });
    return trx;
  };

  useEffect(() => {
    getAllowance();
  }, [numOfTickets, activeAccount, selectedToken, getAllowance, allowance]);

  return (
    <div>
      {open ? (
        <div className="mt-5 rounded-full overflow-hidde flex">
          <input
            type="number"
            min={1}
            className="w-full p-5 text-sm lg:text-xl border-0 outline-0 text-black rounded-tl-full rounded-bl-full"
            placeholder="Number of Tickets"
            onInput={handleChange}
          />
          <div className="w-40 grid place-items-center bg-[#15151f] text-lg rounded-tr-full rounded-br-full">
            <div className="w-full px-3 pr-5 relative ">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setSelectOpen(!selectOpen)}
              >
                <span>{selectedToken}</span>
                {selectOpen ? (
                  <ChevronUp className="h-4 w-4 opacity-50" />
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-50" />
                )}
              </div>

              <div
                className="absolute w-full rounded-md bg-white p-3 pl-6 left-0  z-[1000] top-[40px]"
                style={{
                  display: selectOpen ? "block" : "none",
                }}
              >
                <div className="flex flex-col gap-4">
                  {tokens.map((token) => (
                    <p
                      key={token.name}
                      className="text-black cursor-pointer text-sm "
                      onClick={() => {
                        setSelectedToken(token.value);
                        setSelectOpen(false);
                      }}
                    >
                      {token.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-1">
          <div className="h-[100px bg-white flex-[3] rounded-3xl flex flex-col items-center justify-center text-stone-800 gap-1 py-8">
            <p>Congratulations!!!</p>
            <p className="text-3xl">{data[10].slice(0, 10)}</p>
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
              <p className="text-4xl font-bold">{getTicketCount(data[10])}</p>
            </div>
          </div>
        </div>
      )}

      {open &&
        (selectedToken == "CRO" ? (
          <TransactionBtn
            transaction={handleTicketWithCRO}
            style={{
              backgroundColor: "transparent",
              color: "#FFF",
              padding: "20px",
              border: "1px solid white",
              width: "100%",
              marginTop: "30px",
              borderRadius: "50px",
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
            text="Buy Ticket(s)"
            onError={(err) => {
              toast("", { description: err.message });
            }}
          />
        ) : allowance < ticketPrice * numOfTickets ? (
          <TransactionBtn
            transaction={handleTokenApproval}
            style={{
              backgroundColor: "transparent",
              color: "#FFF",
              padding: "20px",
              border: "1px solid white",
              width: "100%",
              marginTop: "30px",
              borderRadius: "50px",
            }}
            onTransactionConfirmed={(trx) => {
              toast("Success", {
                description: "Token Approved",
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
            text="Approve"
            onError={(err) => {
              toast("", { description: err.message });
            }}
          />
        ) : (
          <TransactionBtn
            transaction={handleTicketWithERC20}
            style={{
              backgroundColor: "transparent",
              color: "#FFF",
              padding: "20px",
              border: "1px solid white",
              width: "100%",
              marginTop: "30px",
              borderRadius: "50px",
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
            text="Buy Ticket(s)"
            onError={(err) => {
              toast("", { description: err.message });
            }}
          />
        ))}
    </div>
  );
};

export default Buy;
