import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useToken from "../../customHooks/useToken";
const LoginRegister = () => {
  const [userEmail, setUserEmail] = useState("");
  const [token] = useToken(userEmail);
  let location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, token]);
  const { googleSignUp } = useContext(AuthContext);
  const handleGoogle = () => {
    googleSignUp().then((res) => {
      const user = res.user;
      const infoForDb = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        role: "buyer",
        verified: false,
      };
      addUserToDB(infoForDb);
    });
  };
  const addUserToDB = (userInfo) => {
    fetch(`https://buysell-decor-server.vercel.app/users`, {
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
          return setUserEmail(userInfo?.email);
        }
        toast.success("User added succesfully");
        return setUserEmail(userInfo?.email);
      });
  };
  return (
    <div className="py-10">
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
