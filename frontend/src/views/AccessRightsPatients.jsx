import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";
import { Helmet } from "react-helmet";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";

const AccessRightsPatients = () => {
  const { email } = useContext(userContext);
  const [rightsArr, setRightsArr] = useState([]);

  useEffect(async () => {
    let provider = new ethers.JsonRpcProvider();
    let contract = new ethers.Contract(
      REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      provider
    );
    const data = await contract.getDocters(email);
    setRightsArr(data);
  }, [rightsArr]);

  const openDocter = (docterEmail) => {};

  return (
    <>
      <Helmet>Access Rights</Helmet>
      <div className="flex-col">
        {rightsArr.map((rights, i) => (
          <div key={i} className="flex-col">
            <div className="" onClick={(rights) => openDocter(rights)}>
              rights
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
