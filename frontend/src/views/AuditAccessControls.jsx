import NavBar from "./NavBar";
import CollapsibleTable from "./CollapseTable";
import { Helmet } from "react-helmet";

const AuditAcess = () => {
  return (
    <>
      <Helmet>
        <title>Data Access History</title>
      </Helmet>
      <div
        className="h-screen flex flex-col items-center bg-contain"
        style={{
          backgroundImage: `url(/profileback.jpg)`,
        }}
      >
        <NavBar />
        <div className="mt-10 w-3/4">
          <CollapsibleTable />
        </div>
      </div>
    </>
  );
};

export default AuditAcess;
