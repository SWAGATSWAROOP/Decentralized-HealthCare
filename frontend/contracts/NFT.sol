// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// URI stands for Uniform Resource Identifier
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage{

    uint256 private _tokenIds;
    address contractAddress;

    constructor(address marketPlaceAddress) ERC721("Decentralized Healthcare","DHM"){
        contractAddress = marketPlaceAddress;
        _tokenIds = 0;
    }

    function createToken(string memory tokenURI)public  returns(uint256){
        _tokenIds++;
        _mint(msg.sender, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        setApprovalForAll(contractAddress, true);
        return _tokenIds;
    }
}