declare module "ipfs-http-client" {
  import _ipfsHttpModule from "ipfs-http-client";
  export function create(host: string): ipfs;
  type ipfs = {
    add: (buffer: any, callback: (error: any, result: any) => void) => void;
  };

  interface Helper {
    any: any;
  }
}
