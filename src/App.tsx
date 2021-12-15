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
import { image, retrieveImageFromWeb3Storage } from "./helpers/ipfs";
import { client } from "./services/ipfs";
import ImageItem from "./components/ImageItem";
import ImageList from "./components/ImageList";
import Web3 from "web3";

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
  const [images, setImages] = useState<image[]>([]);
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

  useEffect(() => {
    if (!active || !contract) return;
    (async () => {
      const imagesCount = Number(await contract.imageCount());
      setImages([]);
      let images: image[] = [];
      for (let i = 0; i < imagesCount; i++) {
        const image: image = await contract.images(i);
        let url = "";
        try {
          url = await retrieveImageFromWeb3Storage(image.hash);
        } catch (e) {}

        url?.length
          ? images.push({ ...image, url })
          : images.push({ ...image });
      }
      console.log(images);
      setImages(images);
    })();
  }, [setImages, active, contract, imageFromIPFS]);

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

  const handleTip = async (hash: string) => {
    let tipAmount = Web3.utils.toWei("0.0001", "ether");
    contract.tipImageOwner(hash, tipAmount);
  };

  const uploadImage = async (description: string) => {
    setImageDescription(description);
    setLoaded(false);
    const cid = await client.put([image]);
    const imageUrl = await retrieveImageFromWeb3Storage(cid);
    setImageFromIPFS(imageUrl);
    try {
      await contract.uploadImage(cid, description);
    } catch (error) {
      ethers.utils.toUtf8String(Object.values(error as any));
    }
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
      {images.length > 0 && (
        <ImageList>
          {images.map((image: image) => {
            if (!image.url) return;
            return (
              <ImageItem
                hash={image.hash}
                key={image.hash}
                url={image.url}
                description={image.description}
                onClick={handleTip}
              />
            );
          })}
        </ImageList>
      )}
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
