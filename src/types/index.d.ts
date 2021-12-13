import { Ethereumish } from "./Ethereumish";

declare global {
  interface Window {
    ethereum: Ethereumish;
  }
}
