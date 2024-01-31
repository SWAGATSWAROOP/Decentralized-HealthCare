import DNavBar from "./DNavbar.jsx";
import styles from "./Dashboard.module.css";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>DashBoard</title>
      </Helmet>
      <div className={styles.dashboardContainer}>
        <DNavBar />
      </div>
    </>
  );
};

export default Dashboard;
