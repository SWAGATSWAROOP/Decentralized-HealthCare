import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./DNavbar";
import { useNavigate } from "react-router-dom";
import "./UploadDocuments.css";

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
      <div
        className="upload-container"
        style={{
          backgroundImage: `url(/dashboardphoto.jpg)`,
        }}
      >
        <NavBar />
        <div>
          <h1 className="mt-8 text-5xl text-black bg-white p-3 rounded-md">
            Patients
          </h1>
        </div>
        <div className="mt-4 w-full flex flex-col items-center cursor-pointer">
          {patients.map((patient, i) => (
            <div
              key={i}
              className="bg-white p-4"
              onClick={() =>
                navigate("/org/documents/patient", {
                  state: { pemail: patient },
                })
              }
            >
              {i + 1} {patient}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GetPatients;
