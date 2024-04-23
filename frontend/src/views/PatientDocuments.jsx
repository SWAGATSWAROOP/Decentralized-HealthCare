import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";
import axios from "axios";
import "./AccessRightsPatients.css"; // Import the CSS file

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const PatientDocuments = () => {
  const { email } = useContext(userContext);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMetaData = async () => {
    let provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );
    const array = await contract.getPatientDetails(email, email);

    const items = await Promise.all(
      array.map(async (i) => {
        const meta = await axios.get(i);
        let item = {
          filename: meta.data.filename,
          description: meta.data.description,
          image: meta.data.image,
        };
        return item;
      })
    );
    setDocuments(items);
  };

  useEffect(() => {
    loadMetaData();
    setLoading(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      <div
        className="upload-container flex flex-col"
        style={{
          backgroundImage: `url(/dashboardphoto.jpg)`,
        }}
      >
        <div>
          <NavBar />
        </div>
        <h1 className="mt-6 text-4xl text-black bg-white p-3 rounded-md">
          My Documents
        </h1>
        <div className="mt-4 bg-white">
          {loading &&
            documents.map((document, i) => (
              <div
                key={i}
                className="w-screen flex flex-col border-black border-2"
              >
                <div className="flex space-x-7 p-4">
                  <div className="flex items-center">
                    <div>({i + 1})</div>
                  </div>
                  <div>
                    <div>Name of Documents: {document.filename}</div>
                    <div>Description: {document.description}</div>
                  </div>
                  <div
                    className="flex justify-end cursor-pointer"
                    onClick={() => window.open(document.image, "_blank")}
                  >
                    <button className="bg-green-300 pl-3 pr-3 hover:scale-110">
                      Access Document
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PatientDocuments;
