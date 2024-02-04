import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import NavBar from "./NavBar";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const [text, setText] = useState("");
  const openingParagraph =
    "Welcome to our healthcare platform! Connect with providers, access records, and prioritize your well-being. Your health, your data, your control!!";

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < openingParagraph.length) {
        setText((prevText) => prevText + openingParagraph[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 30);

    return () => {
      clearInterval(intervalId);
    };
  }, [openingParagraph]);

  return (
    <div className={styles.dashboardContainer}>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="mt-4">
        <NavBar />
      </div>
      <div className={`${styles.dashboardContent} mt-10`}>
        <p style={{ lineHeight: "1.5" }}>{text}</p>
      </div>
      <div className="mt-4 z-10">
        {/* Additional content, like UserProfileBox, if needed */}
        {/* <UserProfileBox /> */}
      </div>
    </div>
  );
};

export default Dashboard;
