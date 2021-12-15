import { useWeb3React } from "@web3-react/core";
import { FormEvent, useEffect, useRef, useState } from "react";
import { injected } from "./services/connector";
import { Web3Provider } from "@ethersproject/providers";
import AppJson from "./abis/App.json";
import Layout from "./UI/Layout";
import ConnectWallet from "./components/ConnectWallet";
import { ethers } from "ethers";
import { ButtonMetamask, TextFieldMetamask } from "./styles/MuiStyles";
import { FormStyle } from "./components/NewImageForm/FormStyle";
import { Buffer } from "buffer";
import { Web3Storage, getFilesFromPath, File } from "web3.storage";
const client = new Web3Storage({
  token: process.env.REACT_APP_WEB3_STORAGE_KEY as string,
});

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
  const textInput = useRef<string>();
  const [loaded, setLoaded] = useState(true);
  const [image, setImage] = useState<any>();
  const [imageDescription, setImageDescription] = useState<any>();
  const [imageName, setImageName] = useState<any>();
  const [imageFromIPFS, setImageFromIPFS] = useState<any>();
  const [images, setImages] = useState([]);
  const [contract, setContract] = useState<any>(undefined);
  function connect(): void {
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

  // useEffect(() => {
  //   if (!active) return;
  //   (async () => {
  //     const imagesCount = await contract.imageCount();
  //     console.log(imagesCount);
  //   })();
  // }, [image]);
  useEffect(() => {
    if (active) return;
    connect();
  }, []);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.JsonRpcProvider();
      const app = new ethers.Contract(
        AppJson.networks[1639593594007].address,
        AppJson.abi,
        provider.getSigner()
      );
      if (!app) return;
      setContract(app);
      app.name().then((res: any) => {
        console.log(res);
      });
    })();
  }, [setContract]);

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { description, file } = e.target as typeof e.target & {
      file: { value: any };
      description: { value: string };
    };
    if (!file.value || !description.value) return;
    uploadImage(description.value);
    textInput.current = "";
  };

  const captureFileEvent = async (e: any) => {
    e.preventDefault();
    const file = e.target.files[0];
    setImageName(file.name);
    setImage(file);
  };

  const uploadImage = async (description: string) => {
    setImageDescription(description);
    setLoaded(false);
    const cid = await client.put([image]);
    let res = await client.get(`${cid}`);
    if (!res?.ok) {
      throw new Error(
        `failed to get ${cid} - [${res?.status}] ${res?.statusText}`
      );
    }
    const file = await res?.files();
    const bufferArray = await file[0].arrayBuffer();
    const img = Buffer.from(bufferArray).toString("base64");
    setImageFromIPFS("data:image/png;base64," + img);
    setLoaded(true);
    contract.uploadImage("cid", "description").catch((er: any) => {
      ethers.utils.toUtf8String(Object.values(er));
    });
    // console.log(result);
    setLoaded(true);
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
          {imageFromIPFS && (
            <>
              <img src={imageFromIPFS} />
              <p>{imageDescription}</p>
            </>
          )}
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
              inputRef={textInput}
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
