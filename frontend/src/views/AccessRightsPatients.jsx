import { useState, useEffect, useContext, useRef } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";

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
      <div className="bg-green-600 h-screen flex flex-col items-center">
        <NavBar />
        <div className="bg-white flex flex-col items-center p-7 mt-8 w-1/2 border-black border-2">
          <input type="email" ref={accessRef} placeholder="Enter Email" />
          <button
            className="border-black border-2 p-2 mt-2"
            onClick={giveAccess}
          >
            Approve Access
          </button>
        </div>
        <div className="flex flex-col bg-white w-screen items-center mt-2">
          {loading &&
            rightsArr.map((rights, i) => (
              <div key={i} className="flex mt-4 p-2">
                <div
                  className="border-black border-2 flex justify-between p-4"
                  // onClick={(rights) => openDocter(rights)}
                >
                  <div className="w-full p-2">{rights}</div>
                  <div>
                    <button
                      className="ml-3 text-red-500 p-2 border-black border-2 hover:scale-110"
                      onClick={() => revokeAccess(rights)}
                    >
                      Revoke
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

export default AccessRightsPatients;
