import { useState, useEffect } from "react";
import FormData from "form-data";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";
import AccessRights from "../../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const UploadDocuments = () => {
  const [url, setUrl] = useState("");
  const [formInput, setFormInput] = useState({ filename: "", description: "" });

  const fileUpload = async (e) => {
    const file = e.target.files[0];
    try {
      let data = new FormData();
      data.append("file", file);
      data.append("pinataOptions", '{"cidVersion":0}');
      data.append("pinataMetadata", '{"name":"DHM"}');
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
          },
        }
      );
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setUrl(url);
    } catch (err) {
      console.log("Error in uploading file", err);
    }
  };

  const createMetaData = async () => {
    const { name, description } = formInput;
    if (!name || !description || !url) return;

    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 0,
      },
      pinataMetadata: {
        name: "DHM",
        keyvalues: {},
      },
      pinataContent: {
        name,
        description,
        image: url,
      },
    });
    try {
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PINATA_JWT}`,
          },
        }
      );
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      console.log(url);
      createDocument(url);
    } catch (err) {
      console.log("Error in uploading file: ", err);
    }
  };

  const createDocument = async (url) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract();
  };

  return <></>;
};

export default UploadDocuments;
