import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const DisplayErrors = () => {
  const { logout } = useContext(AuthContext);
  const error = useRouteError();
  return (
    <div>
      <p className="text-2xl md:text-3xl text-center">Something went wrong</p>
      <p className="text-lg md:text-xl text-center">
        {error.statusText || error.message}
      </p>
      <p>
        Please Try{" "}
        <span onClick={logout} className="text-red-500 font-bold">
          logout
        </span>{" "}
        and Login
      </p>
    </div>
  );
};

export default DisplayErrors;
