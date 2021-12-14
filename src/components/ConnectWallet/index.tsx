import React from "react";
import { LoadingMetamaskButton } from "../../styles/MuiStyles";
import { ConnectWalletStyle } from "./ConnectWalletStyle";

type ConnectWalletProps = {
  loaded: boolean;
  active: boolean;
  error: Error | undefined;
  account: string | null | undefined;
  disconnect: () => {};
  connect: () => {};
};

export default function ConnectWallet({
  active,
  connect,
  loaded,
  disconnect,
  error,
  account,
}: ConnectWalletProps) {
  return (
    <ConnectWalletStyle>
      <LoadingMetamaskButton
        variant="outlined"
        loading={!loaded}
        onClick={active ? disconnect : connect}
      >
        {active ? "Disconnect" : "Connect"} to metamask
      </LoadingMetamaskButton>
      <p>
        {active ? (
          <>
            Connected with <b>${account}</b>
          </>
        ) : (
          <>Not Connected</>
        )}
        <span className="status-icon">
          {active ? "🟢" : error ? "🔴" : "🟠"}
        </span>
      </p>
    </ConnectWalletStyle>
  );
}
