import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Global from "./styles/Global";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

function getLibrary(provider: any) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Global />
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
