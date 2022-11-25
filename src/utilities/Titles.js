import React from "react";
import { useLocation } from "react-router-dom";

const Titles = ({ children }) => {
  const location = useLocation();
  let pathname = location.pathname.split("/")[1];
  let dashboard = pathname === "dashboard";
  return (
    <h1
      className={`text-2xl ${
        dashboard ? "md:text-xl" : "md:text-4xl"
      } text-neutral font-semibold uppercase`}
    >
      {children}
    </h1>
  );
};

export default Titles;
