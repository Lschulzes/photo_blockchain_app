import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injected } from "./services/connector";
import { Web3Provider } from "@ethersproject/providers";
import AppJson from "./abis/App.json";
import Layout from "./UI/Layout";
import ConnectWallet from "./components/ConnectWallet";
import Web3 from "web3";
import { ethers } from "ethers";

function App() {
  const {
    active,
    account,
    library,
    connector,
    activate,
    deactivate,
    error,
    setError,
  } = useWeb3React<Web3Provider>();
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({
    account: "",
    app: null,
    images: [],
    loading: true,
  });
  const [contract, setContract] = useState<any>(undefined);
  async function connect() {
    try {
      setLoaded(false);
      activate(injected).finally(() => setLoaded(true));
    } catch (error) {
      setError(error as any);
    }
  }

  async function disconnect() {
    try {
      await deactivate();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (active) return;
    setLoaded(false);
    activate(injected).finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const app = new ethers.Contract(
        AppJson.networks[1337].address,
        AppJson.abi as any,
        provider
      );
      if (!app) return;
      const imageCount = await app.methods;
      console.log(app);
      console.log(imageCount);
      setContract(app);
    })();
  }, [setContract]);

  return (
    <Layout account={account}>
      <ConnectWallet
        account={account}
        active={active}
        connect={connect}
        disconnect={disconnect}
        error={error}
        loaded={loaded}
      />
    </Layout>
  );
}

export default App;
