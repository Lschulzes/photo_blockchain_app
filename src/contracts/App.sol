// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract App {
  string public name = "App";

  // store images
  uint256 public imageCount = 0;
  mapping(uint256 => Image) public images;

  struct Image {
    uint256 id;
    string hash;
    string description;
    uint256 tipAmount;
    address payable author;
  }

  // create images
  function uploadImage(string memory _imgHash, string memory _description)
    public
  {
    // Add image to contract
    imageCount++;
    images[imageCount] = Image(
      imageCount,
      _imgHash,
      _description,
      0,
      payable(msg.sender)
    );
  }

  // Tip images
}
