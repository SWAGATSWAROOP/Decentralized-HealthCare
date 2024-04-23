import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useLocation } from "react-router-dom";
import NavBar from "./DNavbar";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const GetPatientDetailDocter = () => {
  const { email } = useContext(userContext);
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const location = useLocation();
  const { pemail } = location.state;

  if (!pemail) {
    return (
      <>
        <div>Not able to fetch patient here</div>
      </>
    );
  }

  async function loadData() {
    const provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
    const contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );

    const arr = await contract.getPatientDetails(pemail, email);

    const items = await Promise.all(
      arr.map(async (i) => {
        const metadata = await axios.get(i);
        let item = {
          filename: metadata.data.filename,
          description: metadata.data.description,
          image: metadata.data.image,
        };
        return item;
      })
    );
    setDocuments(items);
  }

  useEffect(() => {
    loadData();
    setLoading(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Patient Details</title>
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
            Patient Details
          </h1>
        </div>
        <div className="mt-4">
          {loading &&
            documents.map((document, i) => (
              <div
                key={i}
                className="w-screen flex flex-col border-black border-2 bg-white"
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

export default GetPatientDetailDocter;
