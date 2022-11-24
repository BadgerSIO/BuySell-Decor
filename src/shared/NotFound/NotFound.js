import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex-col items-center justify-center text-center">
        <h1 className="text-3xl lg:text-9xl font-semibold text-center">
          <span className="text-primary block">404.</span> Page not found
        </h1>
        <button>
          <Link to="/" className=" bg-slate-100  btn btn-accent">
            <FaArrowLeft className="inline-block -mt-1 mr-2 " />
            Go Back{" "}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
