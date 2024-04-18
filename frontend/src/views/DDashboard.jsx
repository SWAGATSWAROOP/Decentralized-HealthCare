import DNavBar from "./DNavbar.jsx";
import styles from "./Dashboard.module.css";
import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [text, setText] = useState("");
  const openingParagraph =
    "  Welcome to our healthcare platform! Connect with providers, access records, and prioritize your well-being. Your health, your data, your control!!";

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
    </div>
  );
};

export default Dashboard;
