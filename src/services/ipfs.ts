// @ts-ignore
import { create } from "ipfs-http-client";
const client = await create();
// const ipfs = new IPFS({
//   host: "ipfs.infura.io",
//   port: 5001,
//   protocol: "https",
// });

export default client;
