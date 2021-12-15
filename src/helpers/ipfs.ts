export const retrieveImageFromIPFS = async (cid: string, imageName: string) => {
  const res = await fetch(`https://${cid}.ipfs.dweb.link/${imageName}`);
  const imageBlob = await res.blob();
  const imageFromWeb3 = URL.createObjectURL(imageBlob);
  return imageFromWeb3;
};
