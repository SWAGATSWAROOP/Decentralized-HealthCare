import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const PatientDocuments = () => {
  const { email } = useContext(userContext);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const provider = new ethers.JsonRpcProvider();
    const contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );

    (async () => {
      setDocuments(
        await contract.getPatientDetails("swagat@getMaxListeners.com", email)
      );
    })();
  }, []);

  return (
    <>
      <div>
        {documents.map((document, i) => {
          <div key={i}></div>;
        })}
      </div>
    </>
  );
};
