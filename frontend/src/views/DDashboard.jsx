import DNavBar from "./DNavbar.jsx";
import styles from "./Dashboard.module.css";
import { Helmet } from "react-helmet";
import { useState, useEffect, useContext, useRef } from "react";
import Web3Modal from "web3modal";
import { userContext } from "../components/Global/components/ProtectedRoute/protectedroute";

// Importing ABI Contract.
import AccessRights from "../artifacts/contracts/accessrights.sol/RolesAndRights.json";
import { ethers } from "ethers";

const Dashboard = () => {
  const { email } = useContext(userContext);
  const moneyRef = useRef(null);
  const [text, setText] = useState("");
  const openingParagraph =
    "  Welcome to our healthcare platform! Connect with providers, access records, and prioritize your well-being. Your health, your data, your control!!";

  async function donateMoney(anon) {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const Contract = new ethers.Contract(
      process.env.REACT_APP_ACCESSRIGHTS_CONTRACT_ADDRESS,
      AccessRights.abi,
      signer
    );
    const regex = /^[0-9]*\.?[0-9]+$/;
    if (!regex.test(moneyRef.current.value)) {
      alert("Enter A valid amount in money");
      moneyRef.current.value = "";
      return;
    }
    try {
      const msg = { value: ethers.parseEther(moneyRef.current.value) };
      const tx = await Contract.donateMoney(email, anon, msg);
      await tx.wait();
    } catch (error) {
      alert("Transaction Rejected");
    }
    moneyRef.current.value = "";
  }

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < openingParagraph.length - 1) {
        setText((prevText) => prevText + openingParagraph[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 30);

    return () => {
      clearInterval(intervalId);
      setText(openingParagraph);
    };
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="mt-4">
        <DNavBar />
      </div>
      <div className={`${styles.dashboardContent} mt-10`}>
        <p style={{ lineHeight: "1.5" }}>{text}</p>
      </div>
      <div className="bg-white mt-4 p-3 text-black">
        <div>Support the developers by donating</div>
        <div className="mt-2 flex space-x-2">
          <input ref={moneyRef} placeholder="Enter the amount" />
          <button
            className="p-2 bg-green-300 hover:scale-110"
            onClick={() => donateMoney(false)}
          >
            Donate Money
          </button>
          <button
            className="p-2 bg-green-300 hover:scale-110"
            onClick={() => donateMoney(true)}
          >
            Donate Money Anonmously
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
