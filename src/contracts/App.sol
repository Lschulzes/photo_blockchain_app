pragma solidity ^0.8.2;

contract App {
  string public name = "App";
  mapping(uint256 => Image) public images;

  // store images

  struct Image {
    uint256 id;
    string hash;
    string description;
    uint256 tipAmount;
    address payable author;
  }

  function uploadImage() public {
    images[1] = Image(1, "abc123", "Hello world!", 0, payable(0x0));
  }

  // create images
  // Tip images
}
