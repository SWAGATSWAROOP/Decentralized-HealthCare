import { useState, useRef } from "react";
import FormData from "form-data";
import { ethers } from "ethers";
import NavBar from "./NavBar";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./UploadDocuments.css";

import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const UploadDocuments = () => {
  const fileRef = useRef(null);
  const desRef = useRef(null);
  const uploadfileRef = useRef(null);
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
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
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
    const provider = new ethers.JsonRpcProvider();
    const signer = await provider.getSigner();

    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      signer
    );

    let transaction = await contract.createToken(url);
    // Wait for the transaction to be mined and get the receipt
    await transaction.wait();

    const tokenId = await contract.getTokenIds();
    console.log(tokenId);

    const email = sessionStorage.getItem("email");
    transaction = await contract.addDocuments(email, tokenId);
    await transaction.wait();
    setFileUrl(null);
    setFormInput({ filename: "", description: "" });
    fileRef.current.value = "";
    desRef.current.value = "";
    uploadfileRef.current.value = null;
  };

  return (
    <>
      <Helmet>
        <title>Upload Documents</title>
      </Helmet>

      <div className="upload-container">
        <div>
          <NavBar />
        </div>
        <div className="upload-form">
          <input
            ref={fileRef}
            type="text"
            className="input-field"
            placeholder="File Name"
            onChange={(e) =>
              setFormInput({ ...formInput, filename: e.target.value })
            }
          />
          <input
            type="text"
            ref={desRef}
            className="input-field"
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
            ref={uploadfileRef}
            name="asset"
            className="file-input"
            placeholder="Choose File"
            onChange={onChange}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="submit-button"
              onClick={createMetaData}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadDocuments;
