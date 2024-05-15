import React from "react";
import { useViem } from "./useViem";
import { getContract } from "viem";
import { useWallet } from "@vechain/dapp-kit-react";

export default function Counter() {
  const { walletClient, publicClient } = useViem();
  const { account } = useWallet();

  const Contract = getContract({
    address: "0x8384738c995d49c5b692560ae688fc8b51af1059",
    abi: [
      {
        inputs: [],
        name: "increment",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    publicClient,
  });
  const [txId, setTxId] = React.useState("");
  const [txStatus, setTxStatus] = React.useState("");
  const handleIncrement = async () => {
    if (!account) return;
    const { request } = await publicClient.simulateContract({
      account: account as `0x${string}`,
      address: Contract.address,
      abi: Contract.abi,
      functionName: "increment",
      // args: []
    });
    const txId = await walletClient.writeContract(request);
    setTxId(txId);
    setTxStatus("pending");

    const transaction = await publicClient.waitForTransactionReceipt({
      hash: txId,
    });
    setTxStatus(transaction.status);
    console.log(transaction);
  };

  return (
    <div>
      <button onClick={handleIncrement}>Increment</button>
      {Boolean(txId) && (
        <p>
          Sent Transaction ID: {txId} ({txStatus})
        </p>
      )}
    </div>
  );
}
