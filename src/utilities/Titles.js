import React from "react";

const Titles = ({ children }) => {
  return (
    <h1 className="text-2xl md:text-4xl text-neutral font-semibold uppercase">
      {children}
    </h1>
  );
};

export default Titles;
