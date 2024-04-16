import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useLocation } from "react-router-dom";

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
    const provider = new ethers.JsonRpcProvider();
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
        console.log(item);
        return item;
      })
    );
    setDocuments(items);
  }

  useEffect(() => {
    console.log("Hello");
    loadData();
    console.log("hello2");
    setLoading(true);
  }, []);

  return (
    <>
      <Helmet>
        <title>Patient Details</title>
      </Helmet>
      <div className="">
        <div className="mt-4">
          {loading &&
            documents.map((document, i) => (
              <div key={i} className="flex flex-col w-8 h-8">
                <img className="w-8 h-8" src={document.image} alt="" />
                <div>{document.filename}</div>
                <div>{document.description}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default GetPatientDetailDocter;
