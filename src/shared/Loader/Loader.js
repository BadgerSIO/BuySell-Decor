import React from "react";
import { FaCog } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="h-screen w-screen fixed bg-white z-40 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 flex justify-center items-center">
      <FaCog className="text-5xl animate-spin"></FaCog>
      <p className="ml-4">Loading</p>
    </div>
  );
};

export default Loader;
