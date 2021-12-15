import React, { useEffect, useState } from "react";
import { retrieveImageFromWeb3Storage } from "../../helpers/ipfs";
import { Buffer } from "buffer";
import { ButtonMetamask } from "../../styles/MuiStyles";
type Props = {
  description: string;
  url: string;
  hash: string;
  onClick: (hash: string) => void;
};

export default function ImageItem({ description, url, onClick, hash }: Props) {
  return (
    <div>
      <img src={url} alt={description.slice(0, 50)} />
      <p>{description}</p>
      <ButtonMetamask
        variant="outlined"
        type="button"
        onClick={() => onClick(hash)}
      >
        Tip!
      </ButtonMetamask>
    </div>
  );
}
