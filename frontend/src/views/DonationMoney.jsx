import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NavBar from "./NavBar";
import DNavBar from "./DNavbar";
import Web3Modal from "web3modal";
import axios from "axios";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const DonateMoney = ({ isPatient = true }) => {
  async function donatemoney() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
  }

  return (
    <>
      <div className="upload-container">
        <div>{isPatient ? <NavBar /> : <DNavBar />}</div>
      </div>
    </>
  );
};

export default DonateMoney;
