import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { mainnet } from "wagmi/chains";

export const defaultChain = mainnet;

export const config = createConfig({
  chains: [defaultChain],
  transports: {
    [defaultChain.id]: http(
      "https://virtual.mainnet.rpc.tenderly.co/32d2857b-df06-434b-9765-35078b00f5a9",
    ),
  },
  storage: createStorage({
    storage: cookieStorage,
  }),
});
