import { useState, useEffect, useContext, useRef } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";
import "./AccessRightsPatients.css"; // Import the CSS file

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const AccessRightsPatients = () => {
  const { email } = useContext(userContext);
  const [rightsArr, setRightsArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const accessRef = useRef(null);

  useEffect(() => {
    let provider = new ethers.JsonRpcProvider();
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );
    const getdata = async () => setRightsArr(await contract.getDocters(email));
    getdata();
    setLoading(true);
  }, [loading]);

  const revokeAccess = async (docteremail) => {
    let provider = new ethers.JsonRpcProvider();
    let signer = await provider.getSigner();
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      signer
    );

    const transaction = await contract.revoke(docteremail, email);
    await transaction.wait();
    setLoading(false);
  };

  const giveAccess = async () => {
    let provider = new ethers.JsonRpcProvider();
    let signer = await provider.getSigner();
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      signer
    );
    const transaction = await contract.approve(accessRef.current.value, email);
    await transaction.wait();
    accessRef.current.value = "";
    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Data Access History</title>
      </Helmet>
      <NavBar />
      <div className="container">
        
        <div className="input-container">
          <input type="email" ref={accessRef} placeholder="Enter Email" />
          <button className="border-black border-2 p-2 mt-2" onClick={giveAccess}>
            Approve Access
          </button>
        </div>
        <div className="rights-container">
          {loading &&
            rightsArr.map((rights, i) => (
              <div key={i} className="right">
                <div className="right-info">{rights}</div>
                <button className="revoke-button" onClick={() => revokeAccess(rights)}>
                  Revoke
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AccessRightsPatients;
