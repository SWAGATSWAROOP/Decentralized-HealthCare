import NavBar from "./NavBar";
import CollapsibleTable from "./CollapseTable";
import { Helmet } from "react-helmet";

const AuditAcess = () => {
  return (
    <>
      <Helmet>
        <title>Data Access History</title>
      </Helmet>
      <div className="bg-green-600 h-screen flex flex-col items-center">
        <NavBar />
        <div className="p-12 bg-green-600">
          <CollapsibleTable />
        </div>
      </div>
    </>
  );
};

export default AuditAcess;
