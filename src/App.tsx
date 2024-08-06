import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import ConnectButton from "./components/ConnectButton/ConnectButton.tsx";
import { WETH_ADDRESS } from "./configs/WETH.ts";
import { useState } from "react";
import { useContractFunction } from "./hooks/useContractFunction.ts";

function App() {
  const [ethAmount, setEthAmount] = useState<string>("");
  const [wethAmount, setWethAmount] = useState<string>("");

  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: dataETH, isLoading: isLoadingETH } = useBalance({
    address: address,
  });
  const { data: dataWETH, isLoading: isLoadingWETH } = useBalance({
    address: address,
    token: WETH_ADDRESS,
  });
  const executeDeposit = useContractFunction("deposit");
  const executeWithdraw = useContractFunction("withdraw");

  const handleEthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setEthAmount(value);
      setWethAmount(value); // 1 ETH = 1 WETH
    }
  };

  const handleWethChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setWethAmount(value);
      setEthAmount(value); // 1 WETH = 1 ETH
    }
  };

  const handleDeposit = async () => {
    const result = await executeDeposit(Number(ethAmount)); // 1 ETH
    if (result === null) {
      alert("Deposit failed.");
    } else {
      alert(`Deposit succeeded:${result}`);
    }
  };

  const handleWithdraw = async () => {
    const result = await executeWithdraw(Number(wethAmount)); // 1 WETH
    if (result === null) {
      console.log("Withdraw failed.");
    } else {
      alert(`Withdraw succeeded:${result}`);
    }
  };

  if (isLoadingETH || isLoadingWETH) return <h1>IS LOADING...</h1>;
  return (
    <div>
      {address && isConnected ? (
        <>
          <button onClick={handleDeposit}>eth to weth</button>
          <button onClick={handleWithdraw}>weth to eth</button>
          <div>
            <h1>ETH: {dataETH?.formatted}</h1>
            <h1>WETH: {dataWETH?.formatted}</h1>
          </div>
          <div>
            <label>
              ETH to wrap:
              <input
                type="text"
                value={ethAmount}
                onChange={handleEthChange}
                placeholder="Amount in ETH"
              />
            </label>
          </div>
          <div>
            <label>
              WETH to unwrap:
              <input
                type="text"
                value={wethAmount}
                onChange={handleWethChange}
                placeholder="Amount in WETH"
              />
            </label>
          </div>
          <button onClick={() => disconnect()}>Disconnect</button>
        </>
      ) : (
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
            <ConnectButton
              key={connector.uid}
              connect={() => connect({ connector })}
              name={connector.name}
              icon={connector.icon}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
