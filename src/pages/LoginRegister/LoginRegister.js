import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
const LoginRegister = () => {
  const { googleSignUp } = useContext(AuthContext);
  const handleGoogle = () => {
    googleSignUp().then((res) => {
      const user = res.user;
      console.log(user);
    });
  };
  return (
    <div className="h-[86vh]">
      <div className="container flex justify-center items-center h-full">
        <div className="p-5 md:p-10 border w-full md:w-[500px] ">
          <Outlet></Outlet>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogle}
            className="text-lg capitalize w-full flex justify-center items-center border border-gray-100 py-2 bg-accent hover:bg-accent/50 "
          >
            <FcGoogle className="mr-3" /> Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
