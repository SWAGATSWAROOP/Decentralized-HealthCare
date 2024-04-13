import { useState, useRef } from "react";
import FormData from "form-data";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import NavBar from "./NavBar";
import { Helmet } from "react-helmet";
import axios from "axios";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const UploadDocuments = () => {
  const fileRef = useRef("");
  const desRef = useRef("");
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({ filename: "", description: "" });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      let data = new FormData();
      data.append("file", file);
      data.append("pinataOptions", '{"cidVersion":0}');
      data.append("pinataMetadata", '{"name":"Swagat"}');
      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
          },
        }
      );
      const url = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setFileUrl(url);
    } catch (error) {
      console.log("error uploading file, please try again:", error);
    }
  }

  const createMetaData = async () => {
    const { filename, description } = formInput;
    if (!filename || !description || !fileUrl) return;

    const data = JSON.stringify({
      pinataOptions: {
        cidVersion: 0,
      },
      pinataMetadata: {
        name: "DHM",
        keyvalues: {},
      },
      pinataContent: {
        filename,
        description,
        image: fileUrl,
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
    const provider = new ethers.BrowserProvider(connection);
    const signer = provider.getSigner();

    let contract = new ethers.Contract(
      process.env.REACT_APP_NFT_CONTRACT_ADDRESS,
      NFT.abi,
      signer
    );

    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();

    contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      signer
    );

    const email = sessionStorage.getItem("email");
    transaction = await contract.addDocuments(email, tokenId);
    await transaction.wait();
    setFileUrl(null);
    setFormInput({ filename: "", description: "" });
    fileRef.value = "";
  };

  return (
    <>
      <Helmet>
        <title>Upload Documents</title>
      </Helmet>
      <div className="flex-col justify-center space-y-10 bg-green-200 h-screen overflow-hidden">
        <div className="mt-4 flex justify-center">
          <NavBar />
        </div>
        <div className="flex justify-center">
          <div className="bg-white flex-col p-4 space-y-5 border-black border-2">
            <input
              ref={fileRef}
              type="text"
              placeholder="File Name"
              onChange={(e) =>
                setFormInput({ ...formInput, filename: e.target.value })
              }
            />
            <input
              type="text"
              ref={desRef}
              placeholder="Description"
              onChange={(e) =>
                setFormInput({
                  ...formInput,
                  description: e.target.value,
                })
              }
            />
            <input
              type="file"
              name="asset"
              className="my-3"
              placeholder="Choose File"
              onChange={onChange}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="p-2 w-32 bg-cyan-300 text-white hover:scale-110"
                onClick={createMetaData}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocuments;
