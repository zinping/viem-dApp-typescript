import { useMemo } from "react";
import { useConnex } from "@vechain/dapp-kit-react";
import { Provider } from "@vechain/web3-providers-connex";
import { createPublicClient, createWalletClient, custom } from "viem";

const testnet = {
  id: 1176455790972829965191905223412607679856028701100105089447013101863,
  name: "vechain_testnet",
  network: "homestead",
  nativeCurrency: {
    name: "VeChainThor",
    symbol: "VET",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://node-testnet.vechain.energy"],
    },
    default: {
      http: ["https://node-testnet.vechain.energy"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explore-testnet.vechain.org" },
  },
};

const mainnet = {
  id: 14018334920824264832118464179726739019961432051877733167310318607178,
  name: "vechain_mainnet",
  network: "homestead",
  nativeCurrency: {
    name: "VeChainThor",
    symbol: "VET",
    decimals: 18,
  },
  rpcUrls: {
    public: {
      http: ["https://node-mainnet.vechain.energy"],
    },
    default: {
      http: ["https://node-mainnet.vechain.energy"],
    },
  },
  batch: { multicall3: true },
  blockExplorers: {
    default: { name: "Explorer", url: "https://vechainstats.com" },
  },
};

export function useViem() {
  const connex = useConnex();

  const publicClient = useMemo(() => {
    return createPublicClient({
      chain: testnet,
      transport: custom(new Provider({ connex })),
    });
  }, [connex]);

  const walletClient = useMemo(() => {
    return createWalletClient({
      chain: testnet,
      transport: custom(new Provider({ connex })),
    });
  }, [connex]);

  return {
    walletClient,
    publicClient,
  };
}
