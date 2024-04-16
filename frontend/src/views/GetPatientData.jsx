import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./DNavbar";
import { useNavigate } from "react-router-dom";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const GetPatients = () => {
  const navigate = useNavigate();
  const { email } = useContext(userContext);
  const [patients, setPatients] = useState([]);

  async function loadPatients() {
    const provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );

    setPatients(await contract.getPatients(email));
  }

  useEffect(() => {
    loadPatients();
  }, []);

  return (
    <>
      <Helmet>
        <title>Patient List</title>
      </Helmet>
      <NavBar />
      <div className="mt-4">
        {patients.map((patient, i) => (
          <div
            key={i}
            className=""
            onClick={() =>
              navigate("/org/documents/patient", { state: { pemail: patient } })
            }
          >
            {patient}
          </div>
        ))}
      </div>
    </>
  );
};

export default GetPatients;
