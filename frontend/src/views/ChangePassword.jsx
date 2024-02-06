import NavBar from "./NavBar";

const ChangePassword = () => {
  return (
    <>
      <div className="flex justify-center">
        <NavBar />
        <div className="flex flex-col">
          <div className="w-1/2 border-black border-r-2">
            <img src="/forgetpassword.jpg" alt="" />
          </div>
          <div>
            <h1>Change Password</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
