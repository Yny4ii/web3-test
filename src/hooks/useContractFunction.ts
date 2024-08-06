import { useCallback } from "react";
import { parseEther } from "viem";
import { WETH_ABI, WETH_ADDRESS } from "../configs/WETH.ts";
import { useWriteContract } from "wagmi";

type FunctionName = "deposit" | "withdraw";

export const useContractFunction = (functionName: FunctionName) => {
  const { writeContractAsync } = useWriteContract();
  return useCallback(
    async (amount: number) => {
      try {
        const value = parseEther(amount.toString());
        const args = functionName === "withdraw" ? [value] : [];
        return await writeContractAsync({
          address: WETH_ADDRESS,
          abi: WETH_ABI,
          functionName: functionName,
          args: args,
          value: functionName === "deposit" ? value : undefined,
        }).catch((err) => {
          console.error(err);
          return null;
        });
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [functionName],
  );
};
