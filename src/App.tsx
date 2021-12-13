import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "./services/connector";
import { Web3Provider } from "@ethersproject/providers";

import Layout from "./UI/Layout";

function App() {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    error,
  } = useWeb3React<Web3Provider>();
  useEffect(() => {
    console.log({ active, account, library, connector, activate, deactivate });
  }, [active, account, library, connector, activate, deactivate]);
  async function connect() {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }

  async function disconnect() {
    try {
      await deactivate();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <h1 style={{ margin: "1rem", textAlign: "right" }}>
        {active ? "🟢" : error ? "🔴" : "🟠"}
      </h1>
      <button onClick={active ? disconnect : connect}>
        {active ? "Disconnect" : "Connect"} to metamask
      </button>
      <span>
        {active ? `Connected with <b>${account}</b>` : "Not Connected"}
      </span>
    </Layout>
  );
}

export default App;
