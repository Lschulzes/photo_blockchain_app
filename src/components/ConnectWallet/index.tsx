import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/material";
import React from "react";
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

const LoadingMetamaskButton = styled(LoadingButton)({
  borderColor: "#333",
  borderWidth: "2px",
  background: "#00fa9a",
  color: "#333",
  fontWeight: 700,
  fontSize: "1rem",
  transition: "all .2s",
  "&:hover": {
    borderColor: "#333",
    background: "#00fa9a",
    color: "#333",
    fontWeight: 700,
    fontSize: "1rem",
    borderWidth: "2px",

    filter: "brightness(0.8)",
  },
  "&:active": {
    borderColor: "#333",
    background: "#00fa9a",
    borderWidth: "2px",
    color: "#333",
    fontWeight: 700,
    fontSize: "1rem",
    filter: "brightness(0.8)",
  },
  "&:focus": {
    borderColor: "#333",
    background: "#00fa9a",
    borderWidth: "2px",
    color: "#333",
    fontWeight: 700,
    fontSize: "1rem",
    filter: "brightness(0.8)",
  },
});
