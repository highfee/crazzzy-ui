import TransactionBtn from "@/components/TransactionBtn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crmTokenContract, raffleContract } from "@/utils/constants";
import { useState } from "react";
import { toast } from "sonner";
import { prepareContractCall, readContract, resolveMethod } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";

const tokens = [
  { name: "CRO", value: "cro" },
  { name: "FRTN", value: "frtn" },
  { name: "CBT", value: "cbt" },
];

const Buy = ({ open, ticketPrice, data }) => {
  const activeAccount = useActiveAccount();

  const [numOfTickets, setNumberOfTickets] = useState(0);
  const [allowance, setAllowance] = useState(0);

  const getAllowance = async () => {
    const data = await readContract({
      contract: crmTokenContract,
      method: resolveMethod("allowance"),
      params: [activeAccount?.address, raffleContract.address],
    });
    setAllowance(data);
  };

  const handleChange = (e) => {
    setNumberOfTickets(e.target.value);
    getAllowance();
  };

  return (
    <div>
      {open ? (
        <div className="mt-5 rounded-full overflow-hidden flex">
          <input
            type="number"
            min={1}
            className="w-full p-5 text-sm lg:text-xl border-0 outline-0 text-black"
            placeholder="Number of Tickets"
            onInput={handleChange}
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

      {open &&
        (allowance >= ticketPrice * numOfTickets ? (
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
                params: [raffleContract.address, ticketPrice * numOfTickets],
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
  );
};

export default Buy;
