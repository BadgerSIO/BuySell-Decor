import React, { useContext } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
const LoginRegister = () => {
  const { googleSignUp } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogle = () => {
    googleSignUp().then((res) => {
      const user = res.user;

      const infoForDb = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "buyer",
      };
      addUserToDB(infoForDb);
    });
  };
  const addUserToDB = (userInfo) => {
    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.userExist) {
          toast.success(`Welcome Back ${userInfo.name}`);
          navigate("/");
          return;
        }
        toast.success("User added succesfully");
        navigate("/");
      });
  };
  return (
    <div className="h-[86vh]">
      <div className="container flex justify-center items-center h-full">
        <div className="p-5 md:p-10 border border-primary/30 w-full md:w-[500px] ">
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
