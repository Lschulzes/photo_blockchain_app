import { useWeb3React } from "@web3-react/core";
import { FormEvent, useEffect, useState } from "react";
import { injected } from "./services/connector";
import { Web3Provider } from "@ethersproject/providers";
import AppJson from "./abis/App.json";
import Layout from "./UI/Layout";
import ConnectWallet from "./components/ConnectWallet";
import { ethers } from "ethers";
import { ButtonMetamask, TextFieldMetamask } from "./styles/MuiStyles";
import { FormStyle } from "./components/NewImageForm/FormStyle";
import { Buffer } from "buffer";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

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
  const [buffer, setBuffer] = useState<any>();
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
        AppJson.networks[1639478509425].address,
        AppJson.abi,
        provider
      );
      if (!app) return;
      setContract(app);
    })();
  }, [setContract]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { description } = e.target as typeof e.target & {
      file: { value: any };
      description: { value: string };
    };

    uploadImage(description.value);
  };

  const captureFileEvent = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      setBuffer(Buffer.from(reader.result as ArrayBuffer));
    };
  };

  const uploadImage = (description: string) => {
    console.log("Submitting file to ipfs");
    // console.log(ipfs);
    // ipfs.files.add(buffer, (error:any, result:any) => {
    //   console.log("Ipfs Result", result);
    //   if (error) console.error(error);
    //   // setLoaded(false);
    //   // contract
    //   //   .uploadImage(result[0].hash, description)
    //   //   .send({ from: account })
    //   //   .on("transactionHash", () => {
    //   //     setLoaded(true);
    //   //   });
    // });
  };

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
      {active && (
        <FormStyle onSubmit={(e) => handleFormSubmit(e)}>
          <input
            name="file"
            id="raised-button-file"
            type="file"
            style={{ display: "none" }}
            accept=".jpg, .jpeg, .png, .bmp, .gif"
            onChange={(e) => captureFileEvent(e)}
          />
          <label htmlFor="raised-button-file">
            {/* @ts-ignore */}
            <ButtonMetamask variant="outlined" component="span">
              Upload Image
            </ButtonMetamask>
          </label>
          <div className="">
            <TextFieldMetamask
              id="imageDescription"
              type="text"
              className="form-control"
              placeholder="Image description..."
              required
              name="description"
            />
          </div>
          <ButtonMetamask variant="outlined" type="submit">
            Post!
          </ButtonMetamask>
        </FormStyle>
      )}
    </Layout>
  );
}

export default App;
