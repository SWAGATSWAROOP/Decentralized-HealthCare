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
    let provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
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
    let provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
    // For Connecting to Website provider like
    let wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
    let walletConnected = wallet.connect(provider);

    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      walletConnected
    );

    const transaction = await contract.revoke(docteremail, email);
    await transaction.wait();
    setLoading(false);
  };

  const giveAccess = async () => {
    let provider = new ethers.JsonRpcProvider(
      process.env.REACT_APP_SEPOLIA_RPC_URL
    );
    let wallet = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY);
    let walletConnected = wallet.connect(provider);
    let contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      walletConnected
    );
    accessRef.current.value = accessRef.current.value.trim();
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

      <div
        className="upload-container"
        style={{
          backgroundImage: `url(/dashboardphoto.jpg)`,
        }}
      >
        <NavBar />
        <div className="flex flex-col mt-9 pl-8 pr-8 pt-4 pb-4 bg-white">
          <div className="w-full md:w-80">
            <input
              type="email"
              ref={accessRef}
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-600 text-white border-black border-2 p-2 rounded-sm hover:scale-110"
              onClick={giveAccess}
            >
              Approve Access
            </button>
          </div>
        </div>

        <h1 className="mt-4 text-4xl text-black bg-white p-3 rounded-md">
          Access Rights
        </h1>
        <div className="flex flex-col bg-white w-screen mt-4 overflow-scroll">
          {loading &&
            rightsArr.map((rights, i) => (
              <div key={i} className="flex p-3  border-black border-1">
                <div className="w-1/2">
                  <div className="p-2">
                    ({i + 1}) {rights}
                  </div>
                </div>
                <div className="w-1/2 flex justify-center">
                  <button
                    className="p-2 bg-red-400 text-white rounded-md hover:scale-110"
                    onClick={() => revokeAccess(rights)}
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AccessRightsPatients;
