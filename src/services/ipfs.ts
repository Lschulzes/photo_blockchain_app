import { Web3Storage } from "web3.storage";

export const client = new Web3Storage({
  token: process.env.REACT_APP_WEB3_STORAGE_KEY as string,
});