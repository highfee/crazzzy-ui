"use client";

import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import Image from "next/image";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { prepareContractCall, resolveMethod } from "thirdweb";
import { stakinContract, stakingContractABI } from "@/utils/constants";
import TransactionBtn from "./TransactionBtn";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

const StakingInfo = () => {
  const { address } = useActiveAccount();
  const searchParams = useSearchParams();

  const view = searchParams.get("view");

  const staked = useSelector((state) => state.staking.staked);

  const userNFT = useSelector((state) => state.staking.userNFT);

  const { data, isLoading } = useReadContract({
    contract: stakinContract,
    method:
      "function getTotalRewards(address owner,uint256 dummyParam) public view returns (uint256, uint256)",
    params: [address, 0],
  });

  useEffect(() => {}, [view]);

  return (
    <div className="max-w-[350px] basis-[300px]">
      <div className="p-5 bg-[#1d1d29] rounded-xl mb-5">
        <p className="text-xl font-semibold">Staking Info</p>
        <div className="flex flex-col gap-4 mt-5">
          <div className="flex justify-between items-center text-gray-400">
            <p>Total monsters</p>
            <p>{userNFT}</p>
          </div>
          <div className="flex justify-between items-center text-gray-400">
            <p>Total staked monsters</p>
            <p>{staked.length}</p>
          </div>
        </div>
      </div>
      <div className="p-5 bg-[#1d1d29] rounded-xl">
        <p className="text-xl font-semibold">Available for withdraw</p>
        <div className="flex items-center gap-5 mt-5">
          <div>
            {/* <FaEthereum size={24} fill="white" /> */}
            <Image alt="" src="/cbt.png" width="70" height={70} />
          </div>
          <div>
            <p className="text-lg">
              {isLoading ? 0 : parseInt(data[0].toString())} CBT
            </p>
            <p className="text-gray-400">Available</p>
          </div>
        </div>

        {/* <button className="mt-5 w-full border py-2 rounded-3xl">
          Withdraw now
        </button> */}

        {data && (
          <div
            style={{
              opacity: parseInt(data[0]?.toString()) > 0 ? 1 : 0.2,
              cursor:
                parseInt(data[0]?.toString()) > 0 ? "pointer" : "not-allowed",
              pointerEvents: parseInt(data[0]?.toString()) > 0 ? "all" : "none",
            }}
          >
            <TransactionBtn
              transaction={() => {
                const trx = prepareContractCall({
                  contract: stakinContract,
                  method: resolveMethod("claimAllRewards"),
                  params: [],
                });

                return trx;
              }}
              onTransactionConfirmed={(trx) => {
                toast("Success", {
                  description: "Withdrawn",
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
              onError={(err) => {
                toast("", { description: err.message });
              }}
              text="Withdraw now"
              style={{
                width: "100%",
                padding: "8px 20px ",
                background: "transparent",
                color: "white",
                border: "1px solid white",
                borderRadius: "30px",
                marginTop: "20px",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StakingInfo;
