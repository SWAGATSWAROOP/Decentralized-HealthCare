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

    console.log()

    const getdata = async () =>
      setArr(await contract.getPatientDetails(email, email));
    getdata();
    console.log(arr);
    let produceDocumentView = async () => {
      arr.map(async (i) => {
        const tokenURI = await contract.getTokenURI(i);
        const meta = await axios.get(tokenURI);
        let item = {
          filename: meta.data.filename,
          description: meta.data.description,
          image: meta.data.image,
        };
        return item;
      });
    };
    async function loadDocuments() {
      produceDocumentView = await Promise.all();
    }
    loadDocuments();
    setDocuments(produceDocumentView);
    console.log(produceDocumentView);
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
