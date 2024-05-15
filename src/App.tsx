import React from "react";
import {
  DAppKitProvider,
  useConnex,
  useWalletModal,
  useWallet,
} from "@vechain/dapp-kit-react";
import Counter from "./Counter";

export default function App() {
  return (
    <DAppKitProvider
      nodeUrl="https://node-testnet.vechain.energy"
      genesis="test"
      usePersistence
    >
      <center>
        <Connections />
        <hr />
        <Counter />
      </center>
    </DAppKitProvider>
  );
}

function Connections() {
  const connex = useConnex();
  const { account, disconnect } = useWallet();
  const modal = useWalletModal();

  if (account) {
    return (
      <button onClick={disconnect}>Disconnect as ..{account.slice(-6)}</button>
    );
  }

  return <button onClick={modal.open}>Connect Wallet</button>;
}
