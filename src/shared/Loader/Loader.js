import React from "react";
import { FaCog } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <FaCog className="text-5xl animate-spin"></FaCog>
      <p className="ml-4">Loading</p>
    </div>
  );
};

export default Loader;
