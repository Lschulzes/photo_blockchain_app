import { useEffect } from "react";
import Web3 from "web3";
import Layout from "./UI/Layout";

function App() {
  useEffect(() => {
    (async () => {
      let web3: Web3;
      if (window.ethereum) {
        // @ts-ignore
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      // @ts-ignore
      else if (window?.web3)
        // @ts-ignore
        window.web3 = new Web3(window.web3.currentProvider);
      else
        window.alert(
          "Non-Ethereum browser detected. You should consider trying MetaMask!"
        );
    })();
  }, []);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

export default App;
