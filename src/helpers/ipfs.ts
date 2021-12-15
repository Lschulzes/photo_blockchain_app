import { BigNumber } from "ethers";
import { client } from "../services/ipfs";
import { Buffer } from "buffer";

export const retrieveImageFromIPFS = async (cid: string, imageName: string) => {
  const res = await fetch(`https://${cid}.ipfs.dweb.link/${imageName}`);
  const imageBlob = await res.blob();
  const imageFromWeb3 = URL.createObjectURL(imageBlob);
  return imageFromWeb3;
};

export const retrieveImageFromWeb3Storage = async (cid: string) => {
  let res = await client.get(`${cid}`);
  if (!res?.ok) {
    throw new Error(
      `failed to get ${cid} - [${res?.status}] ${res?.statusText}`
    );
  }
  const file = await res?.files();
  const bufferArray = await file[0].arrayBuffer();
  return "data:image/png;base64," + Buffer.from(bufferArray).toString("base64");
};

export type image = {
  author: string;
  description: string;
  hash: string;
  id: BigNumber;
  tipAmount: BigNumber;
  url?: string;
};
