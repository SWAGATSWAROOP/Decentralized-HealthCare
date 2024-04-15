import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";
import axios from "axios";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const PatientDocuments = () => {
  const { email } = useContext(userContext);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    let provider = new ethers.JsonRpcProvider();
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );

    const loadMetaData = async () => {
      setArr(await contract.getPatientDetails(email, email));
    };
    loadMetaData();
    async function loadItems() {
      const items = await Promise.all(
        arr.map(async (i) => {
          console.log(i);
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
    }
    loadItems();
    setLoading(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      <div className="flex flex-col">
        <div>
          <NavBar />
        </div>
        <div>
          {loading &&
            documents.map((document, i) => (
              <div key={i}>
                <div className="flex flex-col p-4">
                  <img src={document.image} alt="" />
                  <div>{document.filename}</div>
                  <div>{document.description}</div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default PatientDocuments;