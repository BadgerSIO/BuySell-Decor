import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const DisplayErrors = () => {
  const { logout } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();
  const logoutt = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p className="text-2xl md:text-3xl text-center">Something went wrong</p>
        <p className="text-lg md:text-xl text-center">
          {error.statusText || error.message}
        </p>
        <p>
          Please Try{" "}
          <span
            onClick={logoutt}
            className="text-red-500 font-bold cursor-pointer"
          >
            logout
          </span>{" "}
          and Login
        </p>
      </div>
    </div>
  );
};

export default DisplayErrors;
